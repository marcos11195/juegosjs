let numeroSecreto;
let intentosRestantes;
const MAX_INTENTOS = 10;
let historialIntentos = [];

function iniciarJuego() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  intentosRestantes = MAX_INTENTOS;
  historialIntentos = [];
  document.getElementById("mensaje").textContent = "";
  document.getElementById("intentos").textContent = `Intentos restantes: ${intentosRestantes}`;
  document.getElementById("entrada").value = "";
  document.getElementById("entrada").disabled = false;
  document.getElementById("boton").disabled = false;
  document.getElementById("reiniciar").style.display = "none";
  document.getElementById("historial").textContent = "";
  actualizarBarra();
}

function comprobarNumero() {
  const entrada = document.getElementById("entrada");
  const valor = parseInt(entrada.value);

  if ( valor < 1 || valor > 100 || isNaN(valor)) {
    document.getElementById("mensaje").textContent = "⚠️ Introduce un número válido entre 1 y 100.";
    return;
  }

  intentosRestantes--;
  historialIntentos.push(valor);
  mostrarHistorial();

  if (valor === numeroSecreto) {
    document.getElementById("mensaje").textContent = `🎉 ¡Correcto! El número era ${numeroSecreto}.`;
    finalizarJuego();
  } else if (intentosRestantes > 0) {
    if (valor < numeroSecreto) {
      document.getElementById("mensaje").textContent = "El número secreto es mayor.";
    } else {
      document.getElementById("mensaje").textContent = "El número secreto es menor.";
    }
    document.getElementById("intentos").textContent = `Intentos restantes: ${intentosRestantes}`;
  } else {
    document.getElementById("mensaje").textContent = `❌ Se acabaron los intentos. El número era ${numeroSecreto}.`;
    finalizarJuego();
  }

  actualizarBarra();
}

function mostrarHistorial() {
  document.getElementById("historial").textContent = "Intentos: " + historialIntentos.join(", ");
}

function finalizarJuego() {
  document.getElementById("entrada").disabled = true;
  document.getElementById("boton").disabled = true;
  document.getElementById("reiniciar").style.display = "inline-block";
}

function actualizarBarra() {
  const porcentaje = (intentosRestantes / MAX_INTENTOS) * 100;
  const barra = document.getElementById("barra");
  barra.style.width = porcentaje + "%";

  if (intentosRestantes > 3) {
    barra.style.background = "#4caf50";
  } else if (intentosRestantes > 1) {
    barra.style.background = "#ff9800";
  } else {
    barra.style.background = "#e74c3c";
  }
}

document.getElementById("boton").addEventListener("click", comprobarNumero);
document.getElementById("reiniciar").addEventListener("click", iniciarJuego);

// ✅ Permitir Enter en el input
document.getElementById("entrada").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    comprobarNumero();
  }
});

// Inicializar al cargar
iniciarJuego();
