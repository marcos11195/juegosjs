const tipo = document.getElementById("tipo");
const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const resultado = document.getElementById("resultado");

// Cambiar opciones según el tipo elegido
tipo.addEventListener("change", () => {
    if (tipo.value === "temp") {
        origen.options[0].text = "Celsius"; origen.options[1].text = "Fahrenheit";
        origen.options[0].value = "C"; origen.options[1].value = "F";
        destino.options[0].text = "Fahrenheit"; destino.options[1].text = "Celsius";
        destino.options[0].value = "F"; destino.options[1].value = "C";

    } else {
        origen.options[0].text = "Euros"; origen.options[1].text = "Dólares";
        origen.options[0].value = "EUR"; origen.options[1].value = "USD";
        destino.options[0].text = "Dólares"; destino.options[1].text = "Euros";
        destino.options[0].value = "USD"; destino.options[1].value = "EUR";
    }
});

// Función de conversión
function convertir() {
    if (isNaN(parseFloat(document.getElementById("valor").value))) {
        resultado.innerText = "Por favor, ingrese un valor numérico válido.";
        return;
    }
    if (origen.value===destino.value) {
        resultado.innerText = "Elija diferentes unidades de origen y destino.";
        return;
    }
    if (tipo.value === "temp") {
        if (origen.value === "C" && destino.value === "F") {
            resultado.innerText = document.getElementById("valor").value+" Cº son "+(parseFloat(document.getElementById("valor").value) * 9 / 5 + 32).toFixed(2) + " °F";
        } else if (origen.value === "F" && destino.value === "C") {
            resultado.innerText = document.getElementById("valor").value+" ºF son "+((parseFloat(document.getElementById("valor").value) - 32) * 5 / 9).toFixed(2) + " °C";
        } 

    }
    if (tipo.value === "moneda") {
        if (origen.value === "EUR" && destino.value === "USD") {
            resultado.innerText = document.getElementById("valor").value+" € son "+(parseFloat(document.getElementById("valor").value) * 1.1).toFixed(2) + " $";
        } else if (origen.value === "USD" && destino.value === "EUR") {
            resultado.innerText = document.getElementById("valor").value+" $ son "+(parseFloat(document.getElementById("valor").value) / 1.1).toFixed(2) + " €";
        }
    }

}