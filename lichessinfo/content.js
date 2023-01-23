fetch("https://lichess.org/api/user/waltermas/current-game", {
  headers: {
    // accept: "application/x-ndjson",
    accept: "application/json",
  },
})
  .then((res) => (res.ok ? res.json() : Promise.reject(res)))
  .then((json) => {
    const white = json.players.white.user.name;
    const black = json.players.black.user.name;
    console.log(white);
    console.log(black);
    let oponente;
    if (white == "waltermas") {
      oponente = black;
    }
    if (black == "waltermas") {
      oponente = white;
    }
    console.log(oponente);
    fetch(`https://lichess.org/api/user/${oponente}/perf/rapid`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        oponentebest = json.stat.highest.int;
        fetch(`https:lichess.org/api/crosstable/waltermas/${oponente}`)
          .then((res) => (res.ok ? res.json() : Promise.reject(res)))
          .then((json) => {
            puntajewaltermas = json.users.waltermas;
            puntajeoponente = json.users[oponente.toLowerCase()];
            console.log(json.users);
            $oponentebest = document.getElementById("oponentebest");
            $crosstable = document.getElementById("crosstable");
            $oponentebest.textContent = `best ${oponentebest}`;
            $crosstable.textContent = `waltermas ${puntajewaltermas} - ${oponente} ${puntajeoponente}`;
          });
      });
  });
