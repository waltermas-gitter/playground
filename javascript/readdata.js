let APIKEY = localStorage.getItem("apikey");
if (!APIKEY) {
  APIKEY = prompt("ingresa la apikey");
  localStorage.setItem("apikey", APIKEY);
}

const params = {
  apiKey: APIKEY,
  spreadsheetId: "1q5PbYgCM4EUTxKq1RrUv-ftGNAFoDLmaiGKV6IJZacw",
};
const ms = Date.now();
const url = new URL("https://api.sheetson.com/v2/sheets/bookmarker"+"?dummy="+ms);
Object.keys(params).forEach((key) =>
  url.searchParams.append(key, encodeURIComponent(params[key]))
);
fetch(url, {'Cache-Control': 'no-cache'})
  .then((r) => r.json())
  .then((json) => {
    console.log(json)
  const carpetas = new Set();
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
    json.results.forEach((el) => {
      carpetas.add(el.folder);
    });

    console.log(carpetas);
    carpetas.forEach((el) => {
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
    });
    $carpetas.appendChild($fragmentc);
    carpetas.forEach((carp) => {
      const $fetch = document.getElementById(`${carp}`),
        $fragmentf = document.createDocumentFragment();
      json.results.forEach((el) => {
        if (el.folder == carp) {
          const $li = document.createElement("li");

          $li.innerHTML = `      
      <div class="d-flex p-2 bd-highlight">
      <a class="dropdown-item" href="${el.link}">
      <img src="favicon.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
      ${el.name}
        </a>
      <button class="btn btn-sm btn-outline-secondary m-1" type="button">M</button>
      <button class="btn btn-sm btn-outline-secondary m-1" type="button">D</button>
    </div>
      `;
          $fragmentf.appendChild($li);
        }
      });
      $fetch.appendChild($fragmentf);
    });
  })
  .catch((err) => {
    alert("api no valida");
    localStorage.removeItem("apikey");
  });

//submit
$botonSubmit = document.getElementById("boton-submit");
$botonSubmit.addEventListener("click", () => {
  nombre = document.getElementById("nombre").value;
  link = document.getElementById("link").value;
  desc = document.getElementById("descripcion").value;
  folder = document.getElementById("folder").value;
});
