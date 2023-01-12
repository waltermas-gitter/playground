const APIKEY = atob(
  "ZDJhdjVrcWRnaEo1MVQ4bFVfNkRvYUlhVHZRbzN6ZTlnbzc3RlNMLVdobVItUi1PbS1nMGVTcVo5ZFE="
);

//submit
$botonSubmit = document.getElementById("boton-submit-ext");
$botonSubmit.addEventListener("click", () => {
  const $titulo = document.title;
  const $url = document.URL;
  console.log($titulo);
  const faviconurl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${$url}`;

  const bookmark = {
    name: $titulo,
    link: $url,
    desc: "desc",
    folder: "folder",
    favicon: faviconurl,
  };
  console.log(bookmark);

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
      alert(result)
    });
});
