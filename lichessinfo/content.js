chrome.tabs.query({ active: true }, (tabs) => {
    const tab = tabs[0];
    // $nombre.value = tab.title;
    // $link.value = tab.url;
    // $imagenlink.src = tab.favIconUrl;
console.log(tab);

  });