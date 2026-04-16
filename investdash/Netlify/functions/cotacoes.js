// netlify/functions/cotacoes.js
// Roda no servidor Netlify — sem CORS
// Chamada: /.netlify/functions/cotacoes?symbols=PETR4,VALE3

exports.handler = async function(event) {
  var symbols = (event.queryStringParameters && event.queryStringParameters.symbols) || "";
  var token   = "ojPMC2vsSvFtcriTX97gGx";

  if (!symbols) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "symbols parameter required" })
    };
  }

  var url = "https://brapi.dev/api/quote/" + symbols + "?token=" + token + "&fundamental=false";

  try {
    var https = require("https");

    var data = await new Promise(function(resolve, reject) {
      https.get(url, function(res) {
        var body = "";
        res.on("data", function(chunk) { body += chunk; });
        res.on("end", function() { resolve(body); });
        res.on("error", reject);
      }).on("error", reject);
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
