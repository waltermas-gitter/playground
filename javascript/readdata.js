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
  .then((json) => {
    const carpetas = new Set;
/*     <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Internet
    </a>
    <ul class="dropdown-menu" id="fetch">
      <!-- <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li> -->
    </ul>
  </li> */
  const $carpetas = document.getElementById("carpetas"),
  $fragmentc = document.createDocumentFragment();
    json.results.forEach(el => {
      carpetas.add(el.folder)
          });
    console.log(carpetas);
    carpetas.forEach((el) => {
      console.log(el);
      const $licarpeta = document.createElement("li");
      $licarpeta.className = "nav-item dropdown";
      $licarpeta.innerHTML = `
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${el}
    </a>
    <ul class="dropdown-menu" id="${el}">
    </ul>
      `;
      $fragmentc.appendChild($licarpeta);
    })
    $carpetas.appendChild($fragmentc);
    console.log($fragmentc)

    carpetas.forEach((carp) => {

    const $fetch = document.getElementById(`${carp}`),
      $fragmentf = document.createDocumentFragment();
    json.results.forEach(el => {
      if (el.folder == carp) {
        
            const $li = document.createElement("li");
      
      $li.innerHTML = `<a class="dropdown-item" href="${el.link}">${el.name}</a>`;
      $fragmentf.appendChild($li);
      }
    });
    $fetch.appendChild($fragmentf);
  
  });

  })
  .catch((err) => {
    alert("api no valida");
    localStorage.removeItem("apikey");
  })  