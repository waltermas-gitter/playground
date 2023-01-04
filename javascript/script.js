// document.write("<p>holis</p>");
// localStorage.setItem("prueba", "holis");
function cargarls() {
$ls = document.getElementById("ls")
$ls.innerHTML = ""
$fragment = document.createDocumentFragment()
for (var i = 0; i < localStorage.length; i++){
    // $('body').append(localStorage.getItem(localStorage.key(i)));
    const $li = document.createElement("li");
        let llave = localStorage.key(i);
        let valor = localStorage.getItem(localStorage.key(i));

$li.innerHTML = `${llave}: ${valor}`
    $fragment.appendChild($li)
}
$ls.appendChild($fragment)
}


function guardar() {
    $data = document.getElementById("inputext")
    console.log($data.value)
    $key = document.getElementById("llave")
    localStorage.setItem($key.value, $data.value)
    $key.value = ""
    $data.value = ""
    cargarls()
}

cargarls()
console.log("**************")
console.log(process.env.APIKEY)