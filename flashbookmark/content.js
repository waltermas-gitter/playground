const APIKEY = atob(
  "ZDJhdjVrcWRnaEo1MVQ4bFVfNkRvYUlhVHZRbzN6ZTlnbzc3RlNMLVdobVItUi1PbS1nMGVTcVo5ZFE="
);

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
    const $containerCarpetas = document.getElementById("container-folders");
    console.log($containerCarpetas);
    $fragment = document.createDocumentFragment();

    const carpetas = new Set();
    json.results.forEach((el) => {
      carpetas.add(el.folder);
    });
    console.log(carpetas);
    carpetas.forEach((el) => {
      const $carpeta = document.createElement("div");
      $carpeta.classList.add("row");
      $carpeta.classList.add("border");
      $carpeta.classList.add("rounded");
      $carpeta.classList.add("m-1");

      const $carpetaParrafo = document.createElement("p");
      $carpetaParrafo.textContent = el;
      $carpeta.appendChild($carpetaParrafo);

      const $fragmenticons = document.createDocumentFragment();
      json.results.forEach((elresults) => {
        if (elresults.folder == el) {
          const $parrafoIcon = document.createElement("div");
          $parrafoIcon.classList.add("col-1");
          const $ima = document.createElement("img");
          const $linkIcon = document.createElement("a");
          $ima.setAttribute("src", elresults.favicon);
          $ima.setAttribute("width", 18);
          $ima.setAttribute("height", 18);
          $ima.classList.add("linkIcon");

          $linkIcon.setAttribute("href", elresults.link);
          $linkIcon.setAttribute("target", "_blank");
          $linkIcon.setAttribute("data-bs-toggle", "tooltip");
          // $linkIcon.setAttribute("data-bs-placement", "top");
          $linkIcon.setAttribute("data-bs-container", "body");
          $linkIcon.setAttribute("data-bs-title", elresults.name);
          $linkIcon.appendChild($ima);

          // $parrafoIcon.textContent = elresults.link;
          $parrafoIcon.appendChild($linkIcon);
          $fragmenticons.append($parrafoIcon);
          // $fragmenticons.appendChild($linkIcon);
        }
      });
      // $carpeta.innerHTML = `
      //   <div class="row border border rounded m-1">
      //   <p>${el}</p>
      // </div>
      //   `;
      $carpeta.appendChild($fragmenticons);
      $fragment.appendChild($carpeta);
    });
    $containerCarpetas.appendChild($fragment);
    // inicializar tooltips
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  });


  document.addEventListener("click", (e) => {
    if (e.target.className == "linkIcon") {
      if (window.event.ctrlKey) {
        console.log("eliminar");
        e.preventDefault();
        e.stopPropagation();
      } else {
        close();
      }
    }
  });