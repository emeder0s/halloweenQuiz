//INICIALIZACION DE PRUEBA
function inicializar(){
    var usuario = {
    "nombreUsuario": "emederos",

    "partidas": [ 10, 5, 10, 5 ],
    "fechasPartidas": ["2022-10-16","2022-10-17","2022-10-20","2022-10-21"]
}

var usuario2 = {
    "nombreUsuario": "jcoronilla",
    "partidas": [10, 7],
    "fechasPartidas": ["2022-10-16", "2022-10-17"]
}

//INICIO DE VARIABLES Y VALORES POR DEFECTO
var usuariosArray = [usuario2, usuario];
localStorage.setItem("usuarios", JSON.stringify(usuariosArray))
sube('correcta', 5)
var tiempo = 10;
var audio = document.getElementsByTagName("audio")
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

//DA EFECTO CSS A LAS TRANSICIONES DE LA INTRO
function efectosCSSIntro() {
    document.getElementById("intro").classList.add('hint');
    var container = document.getElementById("container");
    var bienvenida = document.getElementById("bienvenida");
    container.appendChild(bienvenida);
    setTimeout(function () {
        document.getElementById("intro").style.display = "none";
    }, 150);
    setTimeout(function () {
        bienvenida.style.display = "block";
        bienvenida.classList.add('show');
    }, 200);
}


function cerrarEstadisticas(){
    document.getElementById("container-statistics").innerHTML="";
    document.getElementById("container-statistics").innerHTML='<h2 id="statictis-header">Your Statistics <span id="close" onclick="cerrarEstadisticas()">X</span></h2><canvas id="statistics-div"></canvas>'
    document.getElementById("container-statistics").style.display = "none";
}

function statistics() {
    var nombreUsuario = baja("usuarioActual");
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var encontrado = false;
    var key = 0;
    var labels = [];
    var values = [];
    while (!encontrado && key < usuarios.length) {
        if (usuarios[key].nombreUsuario == nombreUsuario) {
            for (let i in usuarios[key].partidas) {
                values.push(usuarios[key].partidas[i]);
            }
            for (let i in usuarios[key].fechasPartidas) {
                labels.push(usuarios[key].fechasPartidas[i]);
            }
            encontrado = true;
        }
        key++;
    }
    pintarGrafica(labels, values, "Score", "statistics-div");
    document.getElementById("container-statistics").style.display = "block";
    document.getElementById("container-statistics").classList.add('show');

}

//COMPRUEBA SI EL USUARIO YA ESTÁ REGISTRADO O NO 
function existeUsuario(nombreUsuario) {
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var existe = false;
    var key = 0;

    while (!existe && key < usuarios.length) {
        if (usuarios[key].nombreUsuario == nombreUsuario) {
            existe = true;
        }
        key++
    }
    return existe
}

//AÑADE UN USUARIO CUANDO NO ESTÁ EN EL LOCALSTORAGE
function addUsuario(nombreUsuario) {
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var usuario = {
        "nombreUsuario": nombreUsuario,
        "partidas": [],
        "fechasPartidas": []
    }
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function registrarUsuario() {
    inicializar();
    var nombreUsuario = document.getElementById("nombreUsuario").value;
    //var nombreUsuario ="emederos";
    if (nombreUsuario) {
        var cabecera = document.getElementById("cabecera2-bienvenida");
        efectosCSSIntro();
        if (!existeUsuario(nombreUsuario)) {
            addUsuario(nombreUsuario);
            var mensaje = `Bienvenid@, <span id="nombre">${nombreUsuario}</span>`;

        } else {
            var mensaje = `Bienvenid@ de nuevo, <span id="nombre">${nombreUsuario}</span>`;
            document.getElementById("navigation").style.display = "";
        }
        cabecera.innerHTML = mensaje;
        localStorage.setItem("usuarioActual", nombreUsuario);
    } else {
        var mensaje = document.createTextNode("El nombre de usuario no puede estar vacío");
        var parrafo = document.getElementById("mensaje");
        parrafo.appendChild(mensaje);
        parrafo.style.display = "";
    }
}

//SACA LAS PREGUNTAS DE LA API Y CAMBIA A question.html
function jugar() {
    var pregunta = document.getElementById('categorias').value;
    fetch(pregunta)
        .then(res => res.json())
        .then(datos => {
            cargaPreguntas(datos);
            window.location = "question.html";
        })
}

//FUNCION GENERAL QUE SUBE A LOCALSTORAGE
function sube(clave, valor) {
    localStorage.setItem(clave, valor);
}

//FUNCION GENERAL QUE BAJA DE LOCALSTORAGE
function baja(clave) {
    return localStorage.getItem(clave);
}

//CARGA LAS PREGUNTAS EN EL NAVEGADOR
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
    }
}

//CREA MENSAJES
function mensajes(mensaje) {
    var menDoc = document.getElementById('mensajes');
    menDoc.innerText = mensaje;
    menDoc.style.visibility = "visible";
    setTimeout(function () {
        menDoc.style.visibility = "hidden";
    }, 1500);
}

//EFECTO DE LOS RAYOS
function rayos() {
    var thunder1 = document.getElementById('thunder1').style.visibility;
    var thunder2 = document.getElementById('thunder2').style.visibility;
    thunder1 = "visible";
    thunder2 = "visible";
    audio[2].play();
    setTimeout(function () {
        thunder1 = "hidden";
        thunder2 = "hidden";
    }, 3000);

}

//IMPRIME LAS PREGUNTAS Y RESPUESTAS
function pintaPregunta(numPregunta) {
    tiempo = 10;
    numPregunta = parseInt(numPregunta);
    if (numPregunta <= 9) {
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
        reloj(10);
        //EN CASO DE NO HABER MÁS PREGUNTAS ENLAZA A RESULTS.HTML
    } else {
        mensajes('¡Final!');
        rayos();
        cargarPartida();
        setTimeout(function () {
            window.location = "results.html";
        }, 4000);
    }
}

//Cuenta atrás
function reloj() {
    document.getElementById('muerte').style.visibility = "visible";
    tiempo--;
    document.getElementById("reloj").innerHTML = String(tiempo);
    if (tiempo > 0 && baja('correcta') < 5) {
        setTimeout(reloj, 1000);
        audio[4].play();
    }
    if (tiempo < 1 && baja('correcta') < 5) {
        audio[3].play();
        document.getElementById('muerte').style.visibility = "hidden";
        comprobarRespuesta(5);
    }
};


//COMPRUEBA LA RESPUESTA DEL USUARIO
function comprobarRespuesta(respuesta) {

    var correcta = baja('correcta');
    if (correcta == parseInt(respuesta)) {
        let score = parseInt(baja('score'));
        sube('score', (score + 1));
        correcto(respuesta);
    } else {
        incorrecto(respuesta);
    }
    sube('correcta', 5)
}

//EFECTOS DE ACIERTOS Y ENLACE A SIGUIENTE PREGUNTA
function correcto(respuesta) {
    var id = `res${respuesta}`;
    document.getElementById(id).style.backgroundColor = "rgb(0, 131, 0)"
    audio[0].play();
    mensajes('Terrorífico!!');
    setTimeout(function () {
        numPregunta = baja('numPregunta');
        pintaPregunta(numPregunta);
    }, 5000);
}

//EFECTOS DE ERROR Y ENLACE A SIGUIENTE PREGUNTA
function incorrecto(respuesta) {
    if (respuesta < 5) {
        var id = `res${respuesta}`;
        document.getElementById(id).style.backgroundColor = "#f50813";
    }
    audio[1].play();
    mensajes('¡Uy! Qué miedito');
    var correcta = baja('correcta');
    var id = `res${correcta}`;
    document.getElementById(id).style.backgroundColor = "white"
    document.getElementById(id).style.color = "#636b82"
    setTimeout(function () {
        numPregunta = baja('numPregunta');
        document.getElementById(id).style.backgroundColor = "#383E4E"
        document.getElementById(id).style.color = "white"
        pintaPregunta(numPregunta);
    }, 5000);
}

function results() {
    document.querySelector('#mensajeFantasma p').innerHTML = "Score: " + baja('score');
    setTimeout(function () {
        document.getElementById('mensajeFantasma').style.visibility = "visible"
    }, 3500);
    setTimeout(function () {
        document.getElementById('mensajeFantasma').style.visibility = "hidden"
    }, 6000);
    var usuarios = JSON.parse(baja('usuarios'));
    var labels = [], valores = [];
    for (key in usuarios) {
        labels.push(usuarios[key].nombreUsuario);
        let sum = usuarios[key].partidas.reduce((previous, current) => current += previous);
        let avg = sum / usuarios[key].partidas.length;
        valores.push(avg)
    }

    setTimeout(function () {
        document.getElementById("stats").style.display="";
        pintarGrafica(labels, valores, "Ranking",'myChart');
        document.getElementById("jugar-otra").style.display="";
    }, 9000);
}

function cargarPartida() {
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var date = new Date();
    date = date.toISOString().split('T')[0];
    for (key in usuarios) {
        console.log(date);
        if (usuarios[key].nombreUsuario == baja("usuarioActual")) {
            usuarios[key].partidas.push(baja('score'));
            usuarios[key].fechasPartidas.push(date);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }
    }
}


function pintarGrafica (etiquetas, valores, titulo, id) {
    var myChart
      var data = {
        labels: etiquetas,
        datasets: [{
            label: titulo,
            backgroundColor: 'rgb(173, 193, 101)',
            borderColor: '#fff',
            color: '#fff',
            data: valores,
        }]

      };
    var options = {
        scales: {
          x: {
            ticks: {
              font: {
                size: 10,
              },
              backgroundColor: "red", // not working
              color: "white",　　// worked
            },
          },
          y: {
            min: 0,
            max: 10,
            ticks: {
            //   stepSize: 2,
              color: "white"
            },
          },
        },
      };
    var config = {
        type: 'bar',
        data: data,
        options: options
    }
      var myChart = new Chart(
        document.getElementById(id),
        config
    );
}










