
const APIKEY = atob(
  "ZDJhdjVrcWRnaEo1MVQ4bFVfNkRvYUlhVHZRbzN6ZTlnbzc3RlNMLVdobVItUi1PbS1nMGVTcVo5ZFE="
);
//cargo valores
const $nombre = document.getElementById("nombre-ext");
const $link = document.getElementById("link-ext");
const $desc = document.getElementById("descripcion-ext");
const $folder = document.getElementById("folder-ext");
const $imagenlink = document.getElementById("imagen-link");

chrome.tabs.query({ active: true }, (tabs) => {
  const tab = tabs[0];
  $nombre.value = tab.title;
  $link.value = tab.url;
  $imagenlink.src = tab.favIconUrl;
});

//folders
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
    // const $carpetas = document.getElementById("folder-dropdown"),
    const $carpetas = document.getElementById("row");
    console.log($carpetas);
      $fragmentc = document.createDocumentFragment();
    //                <li><a class="dropdown-item" href="#">Action</a></li>

    json.results.forEach((el) => {
      carpetas.add(el.folder);
    });
    console.log(carpetas);

    carpetas.forEach((el) => {
      // const $licarpeta = document.createElement("li");
      // $licarpeta.className = "dropdown-item";
      // $licarpeta.textContent = el;
      // $fragmentc.appendChild($licarpeta);
      const $pcarpeta = document.createElement("p");
      $pcarpeta.textContent = el;
      $fragmentc.appendChild($pcarpeta);
    });
    $carpetas.appendChild($fragmentc);
  });

//submit
$botonSubmit = document.getElementById("boton-submit-ext");
$botonSubmit.addEventListener("click", () => {
  //const faviconurl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${$link.value}`;
  faviconurl = $imagenlink.src;
  const bookmark = {
    name: $nombre.value,
    link: $link.value,
    desc: $desc.value,
    folder: $folder.value,
    favicon: faviconurl,
  };

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
      //location.reload();
      close();
    });
});

document.addEventListener("click", (e) => {
  //   console.log("click en ", e.target);
  //   console.log(window.event.ctrlKey);
  //   console.log(window.event.altKey);
  //   e.preventDefault();
  // e.stopPropagation();
  // if (e.target.matches(".h3")) {
  //   alert("h3");
  // }
  if (e.target.id == "boldicon") {
    if (window.event.ctrlKey) {
      console.log("eliminar");
      e.preventDefault();
      e.stopPropagation();
    } else {
      close();
    }
  }
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
