// Array para almacenar las tareas
var tareas = [];

// Elementos del DOM
var input = document.getElementById("nueva-tarea");
var btnAgregar = document.getElementById("agregar");
var lista = document.getElementById("lista-tareas");

// Función para renderizar la lista
function renderizarTareas() {
    lista.innerHTML = ""; // limpiar lista
    for (var i = 0; i < tareas.length; i++) {
        var tarea = tareas[i];
        var li = document.createElement("li");
        li.textContent = tarea.texto;

        // marcar completada
        if (tarea.completada) {
            li.classList.add("completada");
        }

        // botón completar
        var btnCompletar = document.createElement("button");
        if (tarea.completada) {
            btnCompletar.textContent = "Deshacer";
        } else {
            btnCompletar.textContent = "Completar";
        }
        btnCompletar.addEventListener("click", crearHandlerCompletar(i));

        // botón eliminar
        var btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", crearHandlerEliminar(i));

        li.appendChild(btnCompletar);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    }
}

// Handlers auxiliares
function crearHandlerCompletar(indice) {
    return function () {
        tareas[indice].completada = !tareas[indice].completada;
        renderizarTareas();
    };
}

function crearHandlerEliminar(indice) {
    return function () {
        tareas.splice(indice, 1);
        renderizarTareas();
    };
}

// Evento para agregar tarea
btnAgregar.addEventListener("click", function () {
    var texto = input.value.trim();
    if (texto !== "") {
        tareas.push({ texto: texto, completada: false });
        input.value = "";
        renderizarTareas();
    }
});

// 🚀 Render inicial
renderizarTareas();
