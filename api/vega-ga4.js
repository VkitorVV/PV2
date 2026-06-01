export function GET(request) {
  return Response.json({
    ok: true,
    message: "Webhook Vega -> GA4 online",
  });
}

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token || token !== process.env.VEGA_WEBHOOK_TOKEN) {
      return Response.json(
        { ok: false, error: "Token inválido" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));

    const safeBody = maskSensitiveData(body);
    console.log("Webhook recebido da Vega:", JSON.stringify(safeBody, null, 2));

    const eventName = mapVegaEventToGA4(body);

    const transactionId =
      body.transaction_token ||
      body.sale_code ||
      body.transaction_id ||
      body.transactionId ||
      body.order_id ||
      body.orderId ||
      body.id ||
      body.code ||
      body.sale_id ||
      body.saleId ||
      `vega_${Date.now()}`;

    const value = extractValue(body);
    const productData = extractProductData(body, value);

    console.log("Evento enviado ao GA4:", eventName);
    console.log("Status Vega:", body.status);
    console.log("Transaction ID:", transactionId);
    console.log("Valor:", value);
    console.log("Produto:", productData.productName);
    console.log("Plano:", productData.planName);

    const items = [
      {
        item_id: productData.productId,
        item_name: productData.productName,
        item_variant: productData.planName,
        price: productData.productPrice || value,
        quantity: productData.quantity,
      },
    ];

    console.log("Items enviados ao GA4:", JSON.stringify(items, null, 2));

    const gaPayload = {
      client_id: `vega_${transactionId}`,
      events: [
        {
          name: eventName,
          params: {
            transaction_id: String(transactionId),
            currency: "BRL",
            value: value,
            payment_type: body.method || null,
            vega_status: body.status || null,
            transaction_token: body.transaction_token || null,
            sale_code: body.sale_code || null,
            source_platform: "vegacheckout",
            webhook_origin: "vega",
            engagement_time_msec: 100,
            items: items,
          },
        },
      ],
    };

    const gaUrl =
      `https://www.google-analytics.com/mp/collect` +
      `?measurement_id=${process.env.GA4_MEASUREMENT_ID}` +
      `&api_secret=${process.env.GA4_API_SECRET}`;

    const gaResponse = await fetch(gaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gaPayload),
    });

    console.log("GA4 status:", gaResponse.status);

    return Response.json({
      ok: true,
      sent_to_ga4: true,
      ga_status: gaResponse.status,
      event_name: eventName,
      transaction_id: transactionId,
      value,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// Mapeamento de evento — prioriza body.status
// Evita falso positivo de "approved" dentro de
// chaves como "approved_at" com valor null
// ─────────────────────────────────────────────
function mapVegaEventToGA4(body) {
  const status = String(body.status || "").toLowerCase().trim();

  if (
    status === "approved" ||
    status === "paid" ||
    status === "pago" ||
    status === "aprovado"
  ) {
    return "purchase";
  }

  if (
    status === "pending" ||
    status === "pendente" ||
    status === "waiting_payment" ||
    status === "waiting"
  ) {
    return "vega_payment_pending";
  }

  if (
    status === "refused" ||
    status === "failed" ||
    status === "recused" ||
    status === "recusado" ||
    status === "falhou"
  ) {
    return "vega_payment_refused";
  }

  if (
    status === "cancelled" ||
    status === "canceled" ||
    status === "cancelado"
  ) {
    return "vega_sale_cancelled";
  }

  if (
    status === "refunded" ||
    status === "refund" ||
    status === "estornado" ||
    status === "reembolsado"
  ) {
    return "refund";
  }

  // Fallback: se approved_at tiver valor real (não null), é purchase
  if (body.approved_at) {
    return "purchase";
  }

  return "vega_webhook_event";
}

// ─────────────────────────────────────────────
// Normaliza valores em centavos para reais
// Ex: 1990 → 19.90
// ─────────────────────────────────────────────
function normalizeMoney(value) {
  if (value === undefined || value === null || value === "") {
    return 0;
  }

  if (typeof value === "number") {
    return value >= 100 ? value / 100 : value;
  }

  const cleaned = String(value)
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const number = Number(cleaned);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return number >= 100 ? number / 100 : number;
}

// ─────────────────────────────────────────────
// Extração de valor — prioriza campos da Vega
// ─────────────────────────────────────────────
function extractValue(body) {
  const possibleValues = [
    body.total_price,
    body.products?.[0]?.amount,
    body.plans?.[0]?.products?.[0]?.amount,
    body.value,
    body.amount,
    body.total,
    body.price,
    body.total_value,
    body.totalAmount,
    body.valor,
    body.payment?.value,
    body.payment?.amount,
    body.order?.value,
    body.order?.amount,
    body.order?.total,
    body.transaction?.value,
    body.transaction?.amount,
    body.sale?.value,
    body.sale?.amount,
    body.sale?.total,
  ];

  const found = possibleValues.find(
    (item) => item !== undefined && item !== null && item !== ""
  );

  return normalizeMoney(found);
}

// ─────────────────────────────────────────────
// Identifica o plano pelo valor normalizado
// ─────────────────────────────────────────────
function inferPlanName(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "Plano não identificado";
  }

  const isCloseTo = (target) => Math.abs(price - target) < 0.05;

  if (isCloseTo(24.9)) return "Completo - R$24,90";
  if (isCloseTo(14.9)) return "Básico - R$14,90";
  if (isCloseTo(19.9)) return "Oferta de Redirecionamento - R$19,90";
  if (isCloseTo(17.9)) return "Oferta de Retorno - R$17,90";

  return "Plano não identificado";
}

// ─────────────────────────────────────────────
// Extração de dados do produto/plano
// ─────────────────────────────────────────────
function extractProductData(body, value) {
  const product =
    body.products?.[0] ||
    body.plans?.[0]?.products?.[0] ||
    body.items?.[0] ||
    {};

  const productId =
    product.code ||
    product.id ||
    body.plans?.[0]?.id ||
    body.product_id ||
    body.productId ||
    body.product?.id ||
    "produto_nao_identificado";

  const productName =
    product.title ||
    product.name ||
    body.product?.title ||
    body.product?.name ||
    body.product_name ||
    body.productName ||
    "+120 Dinâmicas de Sofá para Mães Cansadas";

  const quantity = Number(product.quantity || 1);
  const productPrice = normalizeMoney(product.amount || product.price || value);
  const planName = inferPlanName(value);

  return {
    productId: String(productId),
    productName: String(productName),
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    productPrice,
    planName,
  };
}

// ─────────────────────────────────────────────
// Mascara dados sensíveis antes de logar
// ─────────────────────────────────────────────
function maskSensitiveData(data) {
  try {
    const cloned = JSON.parse(JSON.stringify(data));

    const sensitiveKeys = [
      "customer",
      "address",
      "user_ip",
      "pix_code",
      "pix_code_image64",
      "billet_digitable_line",
      "email",
      "phone",
      "telefone",
      "document",
      "documento",
      "cpf",
      "cnpj",
      "name",
      "nome",
      "full_name",
      "fullname",
      "customer_name",
      "buyer_name",
      "street",
      "rua",
      "number",
      "numero",
      "zip",
      "zipcode",
      "cep",
    ];

    function walk(obj) {
      if (!obj || typeof obj !== "object") return;

      for (const key of Object.keys(obj)) {
        const lowerKey = key.toLowerCase();

        if (sensitiveKeys.includes(lowerKey)) {
          obj[key] = "[MASKED]";
        } else if (typeof obj[key] === "object") {
          walk(obj[key]);
        }
      }
    }

    walk(cloned);
    return cloned;
  } catch (error) {
    return { error: "Não foi possível mascarar o body", raw_type: typeof data };
  }
}
