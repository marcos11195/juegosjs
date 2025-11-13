// ======================
// Datos del trivial
// ======================
const preguntas = [
  {
    texto: "¿Cuál es la capital de Francia?",
    opciones: ["París", "Lyon", "Marsella", "Toulouse"],
    correcta: "París"
  },
  {
    texto: "¿Cuál es el planeta más cercano al Sol?",
    opciones: ["Venus", "Mercurio", "Marte", "Júpiter"],
    correcta: "Mercurio"
  },
  {
    texto: "¿Quién pintó la Mona Lisa?",
    opciones: ["Leonardo da Vinci", "Picasso", "Van Gogh", "Miguel Ángel"],
    correcta: "Leonardo da Vinci"
  },
  {
    texto: "¿Cuál es el océano más grande del mundo?",
    opciones: ["Atlántico", "Índico", "Pacífico", "Ártico"],
    correcta: "Pacífico"
  },
  {
    texto: "¿Qué número romano representa el 10?",
    opciones: ["X", "V", "L", "C"],
    correcta: "X"
  }
];

// ======================
// Estado del juego
// ======================
let indicePregunta = 0;
let seleccionada = null;
let puntos = 0;

// ======================
// Elementos del DOM
// ======================
const tituloPregunta = document.getElementById("titulo-pregunta");
const opcionesElem = document.querySelector(".opciones");
const feedbackElem = document.getElementById("feedback");
const comprobarBtn = document.getElementById("comprobar");
const siguienteBtn = document.getElementById("siguiente");
const puntosElem = document.getElementById("puntos");
const contadorElem = document.querySelector(".contador");
const progresoBarra = document.querySelector(".progreso-barra");

// ======================
// Funciones auxiliares
// ======================

// Renderiza la pregunta actual
function cargarPregunta() {
  const pregunta = preguntas[indicePregunta];
  tituloPregunta.textContent = pregunta.texto;

  // limpiar opciones previas
  opcionesElem.innerHTML = "";
  pregunta.opciones.forEach(opcionTexto => {
    const li = crearOpcion(opcionTexto);
    opcionesElem.appendChild(li);
  });

  resetUI();
  actualizarEstado();
}

// Crea un elemento <li> para una opción
function crearOpcion(opcionTexto) {
  const li = document.createElement("li");
  li.className = "opcion";
  li.textContent = opcionTexto;
  li.setAttribute("tabindex", "0");
  li.setAttribute("role", "option");
  li.setAttribute("aria-selected", "false");

  li.addEventListener("click", () => seleccionarOpcion(li, opcionTexto));
  return li;
}

// Maneja la selección de una opción
function seleccionarOpcion(li, opcionTexto) {
  document.querySelectorAll(".opcion").forEach(o => {
    o.classList.remove("seleccionada");
    o.setAttribute("aria-selected", "false");
  });
  li.classList.add("seleccionada");
  li.setAttribute("aria-selected", "true");
  seleccionada = opcionTexto;
}

// Reinicia feedback y botones
function resetUI() {
  feedbackElem.textContent = "";
  feedbackElem.className = "feedback";
  comprobarBtn.disabled = false;
  siguienteBtn.disabled = true;
}

// Actualiza contador y barra de progreso
function actualizarEstado() {
  contadorElem.textContent = `Pregunta ${indicePregunta + 1} de ${preguntas.length}`;
  progresoBarra.style.width = `${((indicePregunta + 1) / preguntas.length) * 100}%`;
}

// Comprueba la respuesta seleccionada
function comprobarRespuesta() {
  if (!seleccionada) {
    mostrarFeedback("Por favor, selecciona una opción.", "error");
    return;
  }

  comprobarBtn.disabled = true;
  const pregunta = preguntas[indicePregunta];
  const opciones = document.querySelectorAll(".opcion");

  if (seleccionada === pregunta.correcta) {
    mostrarFeedback("¡Correcto! 🎉", "ok");
    document.querySelector(".seleccionada").classList.add("correcta");
    puntos++;
    puntosElem.textContent = puntos;
  } else {
    mostrarFeedback("Incorrecto ❌", "error");
    document.querySelector(".seleccionada").classList.add("incorrecta");

    opciones.forEach(o => {
      if (o.textContent.trim() === pregunta.correcta) {
        o.classList.add("correcta");
      }
    });
  }

  opciones.forEach(o => o.style.pointerEvents = "none");
  siguienteBtn.disabled = false;
}

// Muestra feedback con estilo
function mostrarFeedback(texto, tipo) {
  feedbackElem.textContent = texto;
  feedbackElem.className = `feedback ${tipo}`;
}

// Avanza a la siguiente pregunta o finaliza
function siguientePregunta() {
  indicePregunta++;
  seleccionada = null;

  if (indicePregunta < preguntas.length) {
    cargarPregunta();
  } else {
    finalizarTrivial();
  }
}

// Finaliza el trivial
function finalizarTrivial() {
  tituloPregunta.textContent = "🎉 ¡Has terminado el trivial!";
  opcionesElem.innerHTML = "";
  mostrarFeedback(`Puntuación final: ${puntos} / ${preguntas.length}`, "ok");
  comprobarBtn.disabled = true;
  siguienteBtn.disabled = true;
}

// ======================
// Eventos
// ======================
comprobarBtn.addEventListener("click", comprobarRespuesta);
siguienteBtn.addEventListener("click", siguientePregunta);

// 🚀 Iniciar trivial
cargarPregunta();
