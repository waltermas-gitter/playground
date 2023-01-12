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


  //submit
  $botonSubmit = document.getElementById("boton-submit-ext");
  $botonSubmit.addEventListener("click", () => {
    //const faviconurl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${$link.value}`;
    faviconurl = $imagenlink.src
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
