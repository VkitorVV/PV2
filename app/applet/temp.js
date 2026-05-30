fetch("https://ibb.co/rGhy0sGS").then(r=>r.text()).then(t=>console.log(t.match(/<meta property=\"og:image\" content=\"([^\"]+)\"/)?.[1]));
