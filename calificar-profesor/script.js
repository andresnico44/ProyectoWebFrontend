const urlParams = new URLSearchParams(window.location.search);
const nombre = urlParams.get('nombre');
const materia = urlParams.get('materia');
const correo = urlParams.get('correo');

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

document.getElementById('cancelBtn').addEventListener('click', function() {
    window.location.href = "../principal/index.html";
});

document.getElementById('sendBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const calificacion = document.getElementById('calificacion').value;
    const claridad = document.getElementById('claridad').value;
    const disponibilidad = document.getElementById('disponibilidad').value;
    const puntualidad = document.getElementById('puntualidad').value;
    const observacionesPositivas = document.getElementById('observaciones-positivas').value;
    const observacionesNegativas = document.getElementById('observaciones-negativas').value;

    console.log("Calificación General:", calificacion);
    console.log("Claridad en las Explicaciones:", claridad);
    console.log("Disponibilidad para Ayuda:", disponibilidad);
    console.log("Puntualidad:", puntualidad);
    console.log("Observaciones Positivas:", observacionesPositivas);
    console.log("Observaciones Negativas:", observacionesNegativas);

    localStorage.setItem(nombre, 'calificado');

    alert("Calificación enviada con éxito");
    window.location.href = "../principal/index.html";
});
