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

//DA EFECTO CSS A LAS TRANSICIONES DE LA INTRO
function efectosCSSIntro(){
    document.getElementById("intro").classList.add('hint');
    var container = document.getElementById("container");
    var bienvenida = document.getElementById("bienvenida");
    container.appendChild(bienvenida);
    // document.getElementById("spider-web-right").style.display="";
    // document.getElementById("spider-web-left").style.display="";
    setTimeout(function(){
        document.getElementById("intro").style.display="none";
    }, 150);
    setTimeout(function(){
        bienvenida.style.display="block";
        bienvenida.classList.add('show');
    }, 200);
}

function jugar() {
    var pregunta = document.getElementById('categorias').value;
    fetch(pregunta)
        .then(res => res.json())
        .then(datos => {
            cargaPreguntas(datos);
            window.location = "question.html";
        })
}
function sube(clave, valor) {
    localStorage.setItem(clave, valor);
}
function baja(clave) {
    return localStorage.getItem(clave);
}
function cargaPreguntas(datos) {
    var pregunta, resCorrecta, resIncorrecta = [];
    for (let i = 0; i < 10; i++) {
        pregunta = datos.results[i].question;
        resCorrecta = datos.results[i].correct_answer
        for (let j = 0; j < 3; j++) {
            resIncorrecta[j] = (datos.results[i].incorrect_answers[j])
        }
        sube(`Pregunta${i}`, pregunta);
        sube(`resCorrecta${i}`, resCorrecta);
        sube(`resIncorrecta${i}`, JSON.stringify(resIncorrecta));
        sube('numPregunta', 0);
        sube('score', 0);
        //Falta poner el nombre de usuario---
    }
}

function mensajes(mensaje) {
    document.getElementById('mensajes').innerText = mensaje;
    document.getElementById('mensajes').style.visibility = "visible";
    setTimeout(function () {
        document.getElementById('mensajes').style.visibility = "hidden";
    }, 3000);
}

function rayos() {
    document.getElementById('thunder1').style.visibility = "visible";
    document.getElementById('thunder2').style.visibility = "visible";
    var thunder = document.getElementsByTagName("audio")[2];
    thunder.play();
    setTimeout(function () {
        document.getElementById('thunder1').style.visibility = "hidden";
        document.getElementById('thunder2').style.visibility = "hidden";
    }, 3000);

}

function pintaPregunta(numPregunta) {
    numPregunta = parseInt(numPregunta);
    if (numPregunta <= 9 || numPregunta == 0) {
        var pregunta = baja(`Pregunta${(numPregunta)}`);
        var numMensaje = (numPregunta + 1);
        mensajes(`Pregunta ${(numMensaje)}`);
        rayos();
        document.querySelector('h4').innerHTML = pregunta;
        var correcta = Math.floor(Math.random() * 4);
        var contador = 0;
        var resCorrecta = baja(`resCorrecta${numPregunta}`);
        var resIncorrecta = JSON.parse(baja(`resIncorrecta${numPregunta}`));
        for (let i = 0; i < 4; i++) {
            if (i == correcta) {
                document.querySelectorAll('button.respuesta')[i].innerHTML = resCorrecta;
                document.querySelectorAll('button.respuesta')[i].style.backgroundColor = "#383E4E"
            } else {
                document.querySelectorAll('button.respuesta')[i].innerHTML = resIncorrecta[contador];
                document.querySelectorAll('button.respuesta')[i].style.backgroundColor = "#383E4E"
                contador++;
            }
        }
        document.querySelectorAll('h3')[1].innerText = "Score: " + baja('score');
        document.querySelectorAll('h3')[0].innerText = "Player: " + baja('usuarioActual');
        sube('numPregunta', (numPregunta + 1));
        sube('correcta', correcta);
    } else {
        mensajes('¡Final!');
        rayos();
        setTimeout(function () {
            window.location = "results.html";
        }, 7000);
    }
}

function comprobarRespuesta(respuesta) {
    var correcta = baja('correcta');
    if (correcta == parseInt(respuesta)) {
        let score = parseInt(baja('score'));
        sube('score', (score + 1));
        correcto(respuesta);
    } else {
        incorrecto(respuesta);
    }
}

function correcto(respuesta) {
    var id = `res${respuesta}`;
    document.getElementById(id).style.backgroundColor = "rgb(0, 131, 0)"
    var risa = document.getElementsByTagName("audio")[0];
    risa.play();
    mensajes('Terrorífico!!');
    setTimeout(function () {
        numPregunta = baja('numPregunta');
        pintaPregunta(numPregunta);
    }, 5000);
}

function incorrecto(respuesta) {
    var id = `res${respuesta}`;
    document.getElementById(id).style.backgroundColor = "#f50813";
    var grito = document.getElementsByTagName("audio")[1];
    grito.play();
    mensajes('¡Uy! Qué miedito');
    setTimeout(function () {
        numPregunta = baja('numPregunta');
        pintaPregunta(numPregunta);
    }, 5000);
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
    //var nombreUsuario ="emederos";
    if(nombreUsuario) {
        var cabecera = document.getElementById("cabecera2-bienvenida");
        efectosCSSIntro();
        if (!existeUsuario(nombreUsuario)){
            addUsuario(nombreUsuario);
            var mensaje = `Bienvenid@, <span id="nombre">${nombreUsuario}</span>`;
            // var mensaje = `Bienvenid<img src="images/pumpkin_scalated60.png">, ${nombreUsuario}`;

        }else{
            var mensaje = `Bienvenid@ de nuevo, <span id="nombre">${nombreUsuario}</span>`;
            // var mensaje = `Bienvenid<img src="images/pumpkin_scalated60.png"> de nuevo, ${nombreUsuario}`;
        }
        cabecera.innerHTML=mensaje;
        localStorage.setItem("usuarioActual", nombreUsuario);
    }else{
        var mensaje = document.createTextNode("El nombre de usuario no puede estar vacío");
        var parrafo = document.getElementById("mensaje");
        parrafo.appendChild(mensaje);
        parrafo.style.display="";
    }
}

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