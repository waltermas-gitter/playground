let APIKEY = localStorage.getItem("apikey")
    if (!APIKEY) {    
APIKEY = prompt("ingresa la apikey")
localStorage.setItem("apikey", APIKEY)
} 

const params = {
    apiKey: APIKEY,
    spreadsheetId: "1q5PbYgCM4EUTxKq1RrUv-ftGNAFoDLmaiGKV6IJZacw"
  }
  const url = new URL("https://api.sheetson.com/v2/sheets/bookmarker");
  Object.keys(params).forEach(key => url.searchParams.append(key, encodeURIComponent(params[key])));
  fetch(url).then(r => r.json())
    .then(result => console.log(result))
    .catch((err) => {
        alert("api no valida");
        localStorage.removeItem("apikey");
    })  