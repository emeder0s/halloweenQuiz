var numPregunta=0;

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

function comprobarRespuesta(respuesta) {
    var correcta=localStorage.getItem('correcta');
    if (correcta==parseInt(respuesta)) {
        correcto(respuesta);
    } else {
        incorrecto(respuesta);
    }
    //localStorage.puntuación
    numPregunta=localStorage.getItem('numPregunta');
    pintaPregunta(datos, numPregunta);
}

function jugar() {
    //var pregunta = document.getElementById('categorias').value;
    fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')
        .then(res => res.json())
        .then(datos => {
            pintaPregunta(datos, 0);

        })
}

function correcto (respuesta) {
    var id=`res${respuesta}`;
    document.getElementById(id).style.backgroundColor="rgb(0, 131, 0)"
    var aplausos = document.getElementsByTagName("audio")[0];
    aplausos.play();
}

function incorrecto (respuesta) {
    var id=`res${respuesta}`;
    document.getElementById(id).style.backgroundColor="#f50813";
    var bocina  = document.getElementsByTagName("audio")[1];
    bocina.play();
}


function pintaPregunta(datos, numPregunta) {
    var pregunta = datos.results[numPregunta].question;
    document.querySelector('h4').innerHTML = pregunta;
    
    var resCorrecta = datos.results[numPregunta].correct_answer 
    
    var resIncorrecta =[];
    for (let i = 0; i < 3; i++) {
        resIncorrecta[i]=(datos.results[numPregunta].incorrect_answers[i])
     }
    
    var correcta = Math.floor(Math.random() * 4);
    var contador = 0
    for (let i = 0; i < 4; i++) {
        if (i == correcta) {
            document.querySelectorAll('button.respuesta')[i].innerHTML = resCorrecta;
        } else {
            document.querySelectorAll('button.respuesta')[i].innerHTML = resIncorrecta[contador];
            contador++;
        }
    }
    localStorage.setItem('numPregunta', (numPregunta+1));
    localStorage.setItem('correcta', correcta);
}








/*
 window.href= question.html*/