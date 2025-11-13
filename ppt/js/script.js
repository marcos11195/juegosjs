const sel = ["piedra", "papel", "tijera"];
const IMG_PATH = "img/";
const imagenes = {
  piedra: IMG_PATH + "piedra.jpg",
  papel: IMG_PATH + "papel.jpg",
  tijera: IMG_PATH + "tijeras.jpg"
};

let cicloJugador;
let cicloPC;
let selpc;
let victoriasJugador = 0;
let victoriasPC = 0;

// 🔄 Ciclar imágenes en el recuadro del jugador
function iniciarCicloJugador() {
  clearInterval(cicloJugador); // limpiar antes
  const manoJugador = document.getElementById("mano-jugador");
  cicloJugador = setInterval(() => {
    const aleatorio = sel[Math.floor(Math.random() * sel.length)];
    manoJugador.style.backgroundImage = `url(${imagenes[aleatorio]})`;
  }, 200);
}

// 🔄 Ciclar imágenes en el recuadro de la máquina
function iniciarCicloPC() {
  clearInterval(cicloPC); // limpiar antes
  const manoPC = document.getElementById("mano-pc");
  cicloPC = setInterval(() => {
    const aleatorio = sel[Math.floor(Math.random() * sel.length)];
    manoPC.style.backgroundImage = `url(${imagenes[aleatorio]})`;
  }, 200);
}

// 🎰 Ruleta rápida con frenado progresivo para la máquina
function ruletaPC(callback) {
  clearInterval(cicloPC); // detener ciclo continuo

  const manoPC = document.getElementById("mano-pc");
  let delay = 50;
  let pasos = 10;
  let paso = 0;

  const spin = () => {
    const aleatorio = sel[Math.floor(Math.random() * sel.length)];
    manoPC.style.backgroundImage = `url(${imagenes[aleatorio]})`;

    paso++;
    if (paso >= pasos) {
      selpc = sel[Math.floor(Math.random() * sel.length)];
      manoPC.style.backgroundImage = `url(${imagenes[selpc]})`;
      callback(selpc);

      // ⏱️ Reiniciar ciclo después de 2 segundos
      setTimeout(() => iniciarCicloPC(), 2000);
      return;
    }
    delay += 30;
    setTimeout(spin, delay);
  };

  spin();
}

// 🚫 Bloquear/activar botones
function bloquearBotones(bloquear) {
  document.querySelectorAll(".btn").forEach(boton => {
    boton.disabled = bloquear;
  });
}

function jugar(eleccionUsuario) {
  bloquearBotones(true); // bloquear al empezar

  clearInterval(cicloJugador);
  clearInterval(cicloPC);

  // Fijar la imagen del jugador en su elección
  document.getElementById("mano-jugador").style.backgroundImage =
    `url(${imagenes[eleccionUsuario]})`;

  // Inicia ruleta de la máquina
  ruletaPC(() => {
    mostrarResultado(eleccionUsuario, selpc);

    // ⏱️ Reiniciar ciclos después de 2 segundos
    setTimeout(() => {
      iniciarCicloJugador();
      iniciarCicloPC();
      bloquearBotones(false); // desbloquear después
    }, 2000);
  });
}

function mostrarResultado(eleccionUsuario, selpc) {
  document.getElementById("vs").innerText = `${eleccionUsuario} vs ${selpc}`;
  const resultadoElem = document.getElementById("resultado");
  const mensaje = ganador(eleccionUsuario, selpc);

  resultadoElem.innerText = mensaje;
  resultadoElem.className = "";

  if (mensaje.includes("Ganaste")) {
    resultadoElem.classList.add("ganaste");
    victoriasJugador++;
    document.getElementById("victorias-jugador").innerText = victoriasJugador;
  } else if (mensaje.includes("Perdiste")) {
    resultadoElem.classList.add("perdiste");
    victoriasPC++;
    document.getElementById("victorias-pc").innerText = victoriasPC;
  } else {
    resultadoElem.classList.add("empate");
  }
}

function ganador(eleccionUsuario, selpc) {
  if (selpc === eleccionUsuario) return "Empate!";
  if (
    (eleccionUsuario === "piedra" && selpc === "tijera") ||
    (eleccionUsuario === "papel" && selpc === "piedra") ||
    (eleccionUsuario === "tijera" && selpc === "papel")
  ) {
    return "¡Ganaste!";
  }
  return "Perdiste!";
}

// Eventos
document.querySelectorAll(".btn").forEach(boton => {
  boton.addEventListener("click", () => jugar(boton.id));
});

// 🚀 Iniciar ciclos al cargar
iniciarCicloJugador();
iniciarCicloPC();
