/* let APIKEY = localStorage.getItem("apikey");
if (!APIKEY) {
  APIKEY = prompt("ingresa la apikey");
  localStorage.setItem("apikey", APIKEY);
} 
let APIKEY;
fetch('file://home/waltermas/MEGAsync/scripts/apikey.txt')
  .then(response => response.text())
  .then(text => APIKEY = text)
*/
const APIKEY = atob(
  "ZDJhdjVrcWRnaEo1MVQ4bFVfNkRvYUlhVHZRbzN6ZTlnbzc3RlNMLVdobVItUi1PbS1nMGVTcVo5ZFE="
);
const $agregar = document.getElementById("agregar");

const params = {
  apiKey: APIKEY,
  spreadsheetId: "1q5PbYgCM4EUTxKq1RrUv-ftGNAFoDLmaiGKV6IJZacw",
};
const ms = Date.now();
const url = new URL(
  "https://api.sheetson.com/v2/sheets/bookmarker" + "?dummy=" + ms
);
Object.keys(params).forEach((key) =>
  url.searchParams.append(key, encodeURIComponent(params[key]))
);
fetch(url, { "Cache-Control": "no-cache" })
  .then((r) => r.json())
  .then((json) => {
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
          if (!el.favicon) {
            el.favicon = "favicon.png";
          }
          $li.innerHTML = `      
      <div class="d-flex p-2 bd-highlight">
      <a class="dropdown-item" href="${el.link}">
      <img src="${el.favicon}" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
      ${el.name}
        </a>
      <button id="M${el.rowIndex}" class="btn btn-sm btn-outline-secondary m-1" type="button">M</button>
      <button id="D${el.rowIndex}" class="btn btn-sm btn-outline-secondary m-1" type="button">D</button>
    </div>
      `;
          $fragmentf.appendChild($li);
        }
      });
      $fetch.appendChild($fragmentf);
    });
  })
  .catch((err) => {
    alert("error");
    // localStorage.removeItem("apikey");
    console.log(err);
  });

//submit
$botonSubmit = document.getElementById("boton-submit");
$botonSubmit.addEventListener("click", () => {
  //https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.github.com
  const url = document.getElementById("link").value;
  const faviconurl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}`;
  const nombre = document.getElementById("nombre").value;
  const link = document.getElementById("link").value;
  const desc = document.getElementById("descripcion").value;
  const folder = document.getElementById("folder").value;

  const bookmark = {
    name: nombre,
    link: link,
    desc: desc,
    folder: folder,
    favicon: faviconurl,
  };
  if ($agregar.textContent == "Agregar") {
    fetch("https://api.sheetson.com/v2/sheets/bookmarker", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${APIKEY}`,
        "X-Spreadsheet-Id": "1q5PbYgCM4EUTxKq1RrUv-ftGNAFoDLmaiGKV6IJZacw",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookmark),
    })
      .then((r) => r.json())
      .then((result) => {
        location.reload();
      });
  }
  if ($agregar.textContent == "Modificar") {
row = $agregar.id;
console.log(row);

fetch("https://api.sheetson.com/v2/sheets/bookmarker/"+ row, {
  method: "PUT",
  headers: {
    "Authorization": `Bearer ${APIKEY}`,
    "X-Spreadsheet-Id": "1q5PbYgCM4EUTxKq1RrUv-ftGNAFoDLmaiGKV6IJZacw",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(bookmark)
}).then(r => r.json())
.then(result => console.log(result))
.finally((e) => location.reload())

  }
});

// modificar - delete
document.addEventListener("click", (e) => {
  const botonid = e.target.id;
  const botonrow = botonid.substring(1);
  if (botonid.substring(0, 1) == "M") {
    const msu = Date.now();
    const urlm = new URL(
      "https://api.sheetson.com/v2/sheets/bookmarker/" + botonrow + "?dummy=" + msu
    );
    Object.keys(params).forEach((key) =>
      urlm.searchParams.append(key, encodeURIComponent(params[key]))
    );
    fetch(urlm, { "Cache-Control": "no-cache" })
      .then((r) => r.json())
      .then((json) => {
        console.log(json);
        console.log(json.link);
        const $nombrem = document.getElementById("nombre");
        $nombrem.value = json.name;
        const $linkm = document.getElementById("link");
        $linkm.value = json.link;
        const $descm = document.getElementById("descripcion");
        $descm.value = json.desc;
        const $folderm = document.getElementById("folder");
        $folderm.value = json.folder;
        $agregar.textContent = "Modificar";
        $agregar.id = botonrow;
      })

  }

  if (botonid.substring(0, 1) == "D") {
    const resp = confirm("estas seguro?");
    console.log(resp);
    if (!resp) return;

    fetch(`https://api.sheetson.com/v2/sheets/bookmarker/${botonrow}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${APIKEY}`,
        "X-Spreadsheet-Id": "1q5PbYgCM4EUTxKq1RrUv-ftGNAFoDLmaiGKV6IJZacw",
      },
    })
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((e) => location.reload());
  }
  e.stopPropagation();
});
