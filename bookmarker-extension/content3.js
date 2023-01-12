console.log("content 3");
const APIKEY = atob(
  "ZDJhdjVrcWRnaEo1MVQ4bFVfNkRvYUlhVHZRbzN6ZTlnbzc3RlNMLVdobVItUi1PbS1nMGVTcVo5ZFE="
);
//cargo valores
const $nombre = document.getElementById("nombre-ext");
const $link = document.getElementById("link-ext");
const $desc = document.getElementById("descripcion-ext");
const $folder = document.getElementById("folder-ext");
// const $titulo = document.title;
// const $url = document.URL;
// $nombre.value = $titulo;
// $link.value = $url;

/* chrome.tabs.query(
  {active:true},
  tabs=>{
             const tab=tabs[0];
             console.log(tabs);
             console.log(tab);
             console.log("URL:", tab.url)
             url = tab.url;
             title = tab.title;
             favicon = tab.favIconUrl;
             }
              ) */

chrome.tabs.query({ active: true }, (tabs) => {
  const tab = tabs[0];
  console.log(tabs);
  console.log(tab);
  console.log("URL:", tab.url);
  favicon = tab.favIconUrl;   // cambiar a favicon
  $nombre.value = tab.title;
  $link.value = tab.url;

}); // cierro query

  //submit
  $botonSubmit = document.getElementById("boton-submit-ext");
  $botonSubmit.addEventListener("click", () => {
    const faviconurl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${$link.value}`;
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
