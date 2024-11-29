const urlParams = new URLSearchParams(window.location.search);
const nombre = urlParams.get('nombre');
const materia = urlParams.get('materia');
const correo = urlParams.get('correo');
const codigoEstudiante = urlParams.get('codigo');  // Obtener el código del estudiante desde la URL

document.getElementById('professor-name').innerText = `Profesor: ${nombre} - ${materia}`;
document.getElementById('professor-email').innerText = `Correo: ${correo}`;

function actualizarValor(inputId, valorSpanId) {
    const input = document.getElementById(inputId);
    const valorSpan = document.getElementById(valorSpanId);

    input.addEventListener('input', function() {
        valorSpan.textContent = this.value;
    });
}

actualizarValor('calificacion', 'calificacion-value');
actualizarValor('claridad', 'claridad-value');
actualizarValor('disponibilidad', 'disponibilidad-value');
actualizarValor('puntualidad', 'puntualidad-value');

// Evento de cancelar
document.getElementById('cancelBtn').addEventListener('click', function() {
    window.location.href = "../principal/index.html";
});

// Evento de enviar la encuesta
document.getElementById('sendBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const calificacion = document.getElementById('calificacion').value;
    const claridad = document.getElementById('claridad').value;
    const disponibilidad = document.getElementById('disponibilidad').value;
    const puntualidad = document.getElementById('puntualidad').value;
    const observacionesPositivas = document.getElementById('observaciones-positivas').value;
    const observacionesNegativas = document.getElementById('observaciones-negativas').value;

    // Crear el objeto de la encuesta con las respuestas
    const respuestaEncuesta = {
        estudiante: codigoEstudiante,  // Ahora usamos el código del estudiante en lugar del correo
        profesor: nombre,
        nombreMateria: materia,
        respuestas: [calificacion, claridad, disponibilidad, puntualidad],
        textoPositivo: observacionesPositivas,
        textoNegativo: observacionesNegativas
    };

    // Mostrar los valores en la consola (para depuración)
    console.log("Calificación General:", calificacion);
    console.log("Claridad en las Explicaciones:", claridad);
    console.log("Disponibilidad para Ayuda:", disponibilidad);
    console.log("Puntualidad:", puntualidad);
    console.log("Observaciones Positivas:", observacionesPositivas);
    console.log("Observaciones Negativas:", observacionesNegativas);

    // Realizar la solicitud POST al backend con los datos de la encuesta
    fetch('http://localhost:8080/api/encuestas/aplicar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(respuestaEncuesta)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            // Enviar el estado al localStorage
            localStorage.setItem(nombre, 'calificado');
            alert("Calificación enviada con éxito");
            window.location.href = "../principal/index.html";
        } else {
            alert("Hubo un error al enviar la calificación. Inténtalo nuevamente.");
        }
    })
    .catch(error => {
        console.error("Error al enviar la encuesta:", error);
        alert("Error al enviar la encuesta. Por favor, intenta de nuevo.");
    });
});
