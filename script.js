var usuario = {
    "nombreUsuario": [
        { "partidas": [{ "Peliculas": "10" }, { "Todas las caterias": "5" }] }
    ]
}

//var usuarios = [...usuario];

//Comprueba si el usuario ya está registrado. 
function existeUsuario() {

}

function registrarUsuario() {

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






/*
 window.href= question.html*/