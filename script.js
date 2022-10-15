//INICIALIZACION DE PRUEBA
var usuario = {
    "nombreUsuario": "emederos",
    "partidas": {"Peliculas": "10","TodasCategorías": "5"}
}

var usuario2 = {
    "nombreUsuario": "jcoronilla",
    "partidas": {"Peliculas": "10","TodasCategorías": "5"}
}
var usuariosArray =[usuario2, usuario];
localStorage.setItem("usuarios",JSON.stringify(usuariosArray))

//CÓDIGO PARA CREAR EL EFECTO SMOKE
const filter = document.querySelector("#turbulence");
let frames = 1;
let rad = Math.PI / 180;
let bfx, bfy;

function freqAnimation() {
    frames += .2;

    bfx = 0.03;
    bfy = 0.03;

    bfx += 0.005 * Math.cos(frames * rad);
    bfy += 0.005 * Math.sin(frames * rad);

    bf = `${String(bfx)} ${String(bfy)}`;
    filter.setAttributeNS(null, "baseFrequency", bf);

    requestAnimationFrame(freqAnimation);
}

requestAnimationFrame(freqAnimation);

//DA EFECTO CSS A LAS TRANSICIONES DE LA INTRO
function efectosCSSIntro(){
    document.getElementById("intro").classList.add('hint');
    var container = document.getElementById("container");
    var bienvenida = document.getElementById("bienvenida");
    container.appendChild(bienvenida);
    setTimeout(function(){
        document.getElementById("intro").style.display="none";
    }, 150);
    setTimeout(function(){
        bienvenida.style.display="block";
        bienvenida.classList.add('show');
    }, 200);
}

//COMPRUEBA SI EL USUARIO YA ESTÁ REGISTRADO O NO 
function existeUsuario(nombreUsuario){
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var existe=false;
    //¿HAY ALGUNA FORMA DE HACERLO SIN RECORRER TODO EL ARRAY DE USUARIOS? - QUIZAS CON UN WHILE, COMO SERÍA?
    for (key in usuarios){
        if (usuarios[key].nombreUsuario == nombreUsuario){
            existe= true;
        }
    }
    return existe
}

//AÑADE UN USUARIO CUANDO NO ESTÁ EN EL LOCALSTORAGE
function addUsuario(nombreUsuario){
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var usuario = {
        "nombreUsuario" : nombreUsuario,
        "partidas": {}
    }
    usuarios.push(usuario);
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
}

function registrarUsuario(){
    var nombreUsuario = document.getElementById("nombreUsuario").value;
    if(nombreUsuario) {
        efectosCSSIntro();
        var cabecera = document.getElementById("cabecera-bienvenida");
        if (!existeUsuario(nombreUsuario)){
            addUsuario(nombreUsuario);
            var mensaje = document.createTextNode(`Bienvenido, ${nombreUsuario}`);
        }else{
            var mensaje = document.createTextNode(`Bienvenido de nuevo, ${nombreUsuario}`);
        }
        cabecera.appendChild(mensaje);
        localStorage.setItem("usuariorActual", nombreUsuario);
    }else{
        var mensaje = document.createTextNode("El nombre de usuario no puede estar vacío");
        var parrafo = document.getElementById("mensaje");
        parrafo.appendChild(mensaje);
        parrafo.style.display="";
    }
}

function comprobarRespuesta(respuesta){

}

function jugar(){

}
