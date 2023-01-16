const APIKEY = atob(
  "ZDJhdjVrcWRnaEo1MVQ4bFVfNkRvYUlhVHZRbzN6ZTlnbzc3RlNMLVdobVItUi1PbS1nMGVTcVo5ZFE="
);
const $newfolder = document.getElementById("folderName");

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
    $select = document.getElementById("selectFolder");
    const carpetas = new Set();
    json.results.forEach((el) => {
      carpetas.add(el.folder);
    });
    carpetas.forEach((el) => {
      // tambien lleno el select
      const $opcionSelect = document.createElement("option");
      $opcionSelect.textContent = el;
      $select.appendChild($opcionSelect);
      const $carpeta = document.createElement("div");
      $carpeta.classList.add("row");
      $carpeta.classList.add("border");
      $carpeta.classList.add("rounded");
      $carpeta.classList.add("m-1");

      const $carpetaParrafo = document.createElement("div");
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
          $ima.setAttribute("wrow", elresults.rowIndex);

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
      // console.log("eliminar");
      rowvalue = e.target.attributes.wrow.nodeValue;
      fetch(`https://api.sheetson.com/v2/sheets/bookmarker/${rowvalue}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${APIKEY}`,
          "X-Spreadsheet-Id": "1q5PbYgCM4EUTxKq1RrUv-ftGNAFoDLmaiGKV6IJZacw",
        },
      })
        .then((r) => r.json())
        .then((result) => {})
        .catch((err) => {
          console.log(err);
        })
        .finally((e) => location.reload());

      e.preventDefault();
      e.stopPropagation();
    } else {
      close();
    }
  }
  // submit
  if (e.target.id == "add") {
    console.log("add");
    const $nombre = document.getElementById("title");
    const $folder = document.getElementById("selectFolder");
    let foldervalue;
    if ($folder.value == "New folder") {
      foldervalue = $newfolder.value;
    } else {
      foldervalue =$folder.value;
    }
    const $favicon = document.getElementById("imaNueva");
    const bookmark = {
      name: $nombre.value,
      link: $favicon.getAttribute("wlink"),
      desc: "",
      folder: foldervalue,
      favicon: $favicon.src,
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
  }
});

// change folder
document.getElementById("selectFolder").addEventListener("change", (e) => {
  if (e.target.value == "New folder") {
    $newfolder.style.display = "Inline";
  } else {
    $newfolder.style.display = "None";
  }
});

const $title = document.getElementById("title");
const $imaNueva = document.getElementById("imaNueva");
$title.value = "holis";
chrome.tabs.query({ active: true }, (tabs) => {
  const tab = tabs[0];
  // $nombre.value = tab.title;
  // $link.value = tab.url;
  // $imagenlink.src = tab.favIconUrl;
  $title.value = tab.title;
  $imaNueva.src = tab.favIconUrl;
  $imaNueva.setAttribute("wlink", tab.url);
});
