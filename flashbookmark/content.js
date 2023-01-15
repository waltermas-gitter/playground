const APIKEY = atob(
  "ZDJhdjVrcWRnaEo1MVQ4bFVfNkRvYUlhVHZRbzN6ZTlnbzc3RlNMLVdobVItUi1PbS1nMGVTcVo5ZFE="
);
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
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
        console.log(el);
        const $carpeta = document.createElement("div");
        $carpeta.innerHTML=`
        <div class="row border border rounded m-1">
        <p>${el}</p>
      </div>
        `
        $fragment.appendChild($carpeta);


    });
    $containerCarpetas.appendChild($fragment);

  });
