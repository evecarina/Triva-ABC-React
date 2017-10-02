'use strict'
const app = {
    juego: [{
            pregunta: "¿Cual es el animal mas venenoso del mundo?",
            opciones: ['Medusa de mar', 'Avispa de mar', 'Serpiente de cobra '],
            srcImg: 'assets/img/mono.png',
            rptaCorrecta: 'Medusa de mar',
            turespuesta: undefined
        },
        {
            pregunta: "¿Cual es el animal conocido en el refranero por ser victima de curiosidad? ",
            opciones: [
                'Gato',
                'Perro',
                'León',
            ],
            srcImg: 'assets/img/murcielago.png',
            rptaCorrecta: 'Gato',
            turespuesta: undefined
        },
        {
            pregunta: "¿Que animal tiene 3 corazones?",
            opciones: [
                'Pulpo',
                'Elefante',
                'Leopardo'
            ],
            srcImg: 'assets/img/pajaro.png',
            rptaCorrecta: 'Pulpo',
            turespuesta: undefined
        },
        {
            pregunta: "¿Que animal le pesa la lengua 2500 kg ?",
            opciones: [
                'Ballena azul',
                'Oso hormiguero',
                'elefante'

            ],
            srcImg: 'assets/img/jaguar.png',
            rptaCorrecta: 'Ballena azul',
            turespuesta: undefined
        },
        {
            pregunta: "Que animal tiene las 5 vocales en su nombre",
            opciones: [
                'Murcielago',
                'Elefante',
                'Ballena'
            ],
            srcImg: 'assets/img/pulpo.png',
            rptaCorrecta: 'Murcielago',
            turespuesta: undefined
        }
    ],
    contPorcentaje: 0,
    preguntaInicio: 0,
    rptasCorrectas: 0,
    iniciaQuiz: () => {
        app.limpiarCuestionario();
        app.preguntasHTML();
        app.configuracion();
    },
    configuracion: () => {
        $('.btn-opciones').click(app.siguientePregunta);
        $('#resolver').click(app.comprobarRespuestas);
        $('#jugar').click(app.iniciaQuiz);
    },
    siguientePregunta: (event) => {
        let respuesta = event.target.textContent;
        app.guardarDatos(respuesta)
        app.preguntaInicio++;
        app.limpiarCuestionario();
        if (app.preguntaInicio >= app.juego.length) {
            app.preguntaInicio = 0;
            app.respuestasHTML();
            app.configuracion();
        } else {
            app.iniciaQuiz();

        }
    },
    guardarDatos: (respuesta) => {
        sessionStorage.setItem(app.juego[app.preguntaInicio].pregunta, respuesta);
    },
    preguntasHTML: () => {
        $('#imagen').append(`<img src='${app.juego[app.preguntaInicio].srcImg}' class='img-fluid'>`);
        $('#progresos').append(`<div class="progreso">\
                <div class="progress-bar" role="progressbar" style="width: ${app.contPorcentaje}%; height: 7px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>\
            </div>`);
        $('#titulos').append(`<div class="row justify-content-xl-center ">\
                <div class="col-lg-12 col-xl-12 col-sm-12"><h2>${app.juego[app.preguntaInicio].pregunta}</h2></div>\
            </div>`)
        $('#opciones').append(
            `<div class="row  ">
                <div class="col-lg-4 col-xl-5 col-sm-5 btn-opciones">${app.juego[app.preguntaInicio].opciones[0]}</div>\
                <div class="col-lg-4 col-xl-5 col-sm-5 btn-opciones">${app.juego[app.preguntaInicio].opciones[1]}</div>\
                <div class="col-lg-3  col-xl-5 col-sm-5 btn-opciones">${app.juego[app.preguntaInicio].opciones[2]}</div>\

            </div>\
            </div>`
        );
        app.contPorcentaje += 20;
    },
    limpiarCuestionario: () => {
        $('#progresos').empty();
        $('#titulos').empty();
        $('#opciones').empty();
        $('#enviar').empty();
        $('#imagen').empty();
    },
    respuestasHTML: () => {
        console.log(app.contPorcentaje)
        $('#imagen').append(`<img src='assets/img/vaca.png' class='img-fluid'>`);
        $('#progresos').append(`<div class="progress">\
            <div class="progress-bar" role="progressbar" style="width: ${app.contPorcentaje}%; height: 7px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>\
            </div>`);
        $('#titulos').append(`<h2>Tus Respuestas son: </h2>`);
        app.preguntaRespuesta();
        $('#enviar').append(`<div><button id='resolver'>Enviar</button></div>`);
    },
    preguntaRespuesta: () => {
        for (var i = 0; i < sessionStorage.length; i++) {
            let pregunta = sessionStorage.key(i);
            let respuesta = sessionStorage.getItem(pregunta);
            $("#opciones").append(`<div><p>${i+1}. ${pregunta}:</p><p class='parrafoRespuesta'><strong> ${respuesta}</strong></p></div>`);
        }
    },
    // Respueta del usuario con las respuestas almacendas en el array
    comprobarRespuestas: () => {

      // comparando las respuestasCorrectas
      app.limpiarCuestionario();
        $('#imagen').append(`<img src='assets/img/vaca.png' class='img-fluid'>`);
        for (var i = 0; i < sessionStorage.length; i++) {
            let pregunta = sessionStorage.key(i);
            let respuesta = sessionStorage.getItem(pregunta);
            let indice;
            app.juego.filter((index, s) => {
                if (pregunta == index.pregunta) {
                    return indice = s;
                }
            });
            if (respuesta == app.juego[indice].rptaCorrecta) {
                $("#opciones").append(`<div class="alert-correcto" role="alert"><p>${i+1}. ${pregunta}: </p><p class='parrafoRespuesta'> <strong> ${respuesta}</strong></p></div>`);
                app.rptasCorrectas += 1;
            } else {
                $("#opciones").append(`<div class="alert-incorrecto" role="alert"><p>${i+1}. ${pregunta}: </p><p class='parrafoRespuesta'> <strong><del>${respuesta} </del></strong>${app.juego[indice].rptaCorrecta}</p></div>`);

            }
        }
        $('#enviar').append(`<div><button id='jugar'>Iniciar</button></div>`);
        $('#progresos').append(`<div class="progress">\
        <div class="progress-bar" role="progressbar" style="width: ${app.contPorcentaje}%; height: 7px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>\
        </div>`);
        $('#titulos').append(`<h2>${app.rptasCorrectas} correcta(s) de ${app.juego.length} preguntas</h2>`)
        app.incrementoPorcentaje = 0;
        app.configuracion();
    },
    respuestasCorrectas: () => {}
}
$(document).ready(app.iniciaQuiz)
