// var usuario = {
//     "nombreUsuario": [
//         {"partidas": [{"Peliculas": "10"},{"Todas las caterias": "5"}]}
//     ]
// }

// var usuarios = [...usuario];

// //Comprueba si el usuario ya está registrado. 
// function existeUsuario(){

// }

function registrarUsuario(){
    //var user = document.getElementById("nombreUsuario").value;
    var user = "emederos"
    if(user) {
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

// window.href= question.html
//CÓDIGO PARA CREAR EL EFECTO SMOKE
const filter = document.querySelector("#turbulence")
let frames = 1
let rad = Math.PI / 180
let bfx, bfy

function freqAnimation() {
    frames += .2

    bfx = 0.03
    bfy = 0.03

    bfx += 0.005 * Math.cos(frames * rad)
    bfy += 0.005 * Math.sin(frames * rad)

    bf = `${String(bfx)} ${String(bfy)}`
    filter.setAttributeNS(null, "baseFrequency", bf)

    requestAnimationFrame(freqAnimation)
}

requestAnimationFrame(freqAnimation);

onload => {

}
