// https://lichess.org/api/crosstable/{user1}/{user2}
fetch("https:lichess.org/api/crosstable/waltermas/bjornarm")
  .then((res) => (res.ok ? res.json() : Promise.reject(res)))
  .then((json) => {
    console.log(json);
    console.log(json.users);
    console.log(json.users.waltermas);
  })
  .catch((err) => {
    console.log(err);
  });

fetch("https://lichess.org/api/user/jostago")
  .then((res) => (res.ok ? res.json() : Promise.reject(res)))
  .then((json) => {
    console.log(json);
    console.log(json.playing); //devuelve https://lichess.org/2VfoesjI/black
    //   console.log(json.users);
    //   console.log(json.users.waltermas);
  })
  .catch((err) => {
    console.log(err);
  });

// fetch("https://lichess.org/api/user/bjornarm/perf/rapid")
// .then((res) => res.ok ? res.json() : Promise.reject(res))
// .then((json) => {
//   console.log(json);
//   console.log(json.stat.highest.int);
// //   console.log(json.users.waltermas);
// })
// .catch((err) => {
//     console.log(err);
// })

// fetch("https://lichess.org/api/user/waltermas/activity")
// .then((res) => res.ok ? res.json() : Promise.reject(res))
// .then((json) => {
//   console.log(json);
// //   console.log(json.users.waltermas);
// })
// .catch((err) => {
//     console.log(err);
// })

// https://lichess.org/api/users/status?ids=elfugitivo&withGameIds=true

fetch("https://lichess.org/api/user/dantoro55/current-game", {
  headers: {
    // accept: "application/x-ndjson",
    accept: "application/json",

  },
})
.then((res) => res.ok ? res.json() : Promise.reject(res))
.then((json) => {
  console.log(json);
//   console.log(json.users.waltermas);
})
.catch((err) => {
    console.log(err);
})