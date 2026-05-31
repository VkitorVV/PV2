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

    console.log("Evento enviado ao GA4:", eventName);
    console.log("Transaction ID:", transactionId);
    console.log("Valor:", value);

    const gaPayload = {
      client_id: `vega_${transactionId}`,
      events: [
        {
          name: eventName,
          params: {
            transaction_id: String(transactionId),
            currency: "BRL",
            value,
            source_platform: "vegacheckout",
            webhook_origin: "vega",
            engagement_time_msec: 100,
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

function mapVegaEventToGA4(body) {
  const text = JSON.stringify(body).toLowerCase();

  if (
    text.includes("aprov") ||
    text.includes("approved") ||
    text.includes("paid") ||
    text.includes("pago")
  ) {
    return "purchase";
  }

  if (
    text.includes("aguard") ||
    text.includes("pending") ||
    text.includes("pendente")
  ) {
    return "vega_payment_pending";
  }

  if (
    text.includes("recus") ||
    text.includes("refused") ||
    text.includes("failed") ||
    text.includes("falhou")
  ) {
    return "vega_payment_refused";
  }

  if (text.includes("chargeback")) {
    return "vega_chargeback";
  }

  if (
    text.includes("estorn") ||
    text.includes("refund") ||
    text.includes("reembols")
  ) {
    return "refund";
  }

  if (text.includes("cancel")) {
    return "vega_sale_cancelled";
  }

  if (text.includes("abandon") || text.includes("carrinho")) {
    return "vega_cart_abandoned";
  }

  return "vega_webhook_event";
}

function extractValue(body) {
  const possibleValues = [
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
    (item) => item !== undefined && item !== null
  );

  if (found === undefined || found === null) {
    return 0;
  }

  if (typeof found === "number") {
    return found > 1000 ? found / 100 : found;
  }

  const cleaned = String(found)
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const number = Number(cleaned);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return number > 1000 ? number / 100 : number;
}

function maskSensitiveData(data) {
  try {
    const cloned = JSON.parse(JSON.stringify(data));

    const sensitiveKeys = [
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
      "address",
      "endereco",
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
