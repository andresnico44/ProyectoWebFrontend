document.getElementById('formProfesores').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita recargar la página
    const nombreProfesor = document.getElementById('nombreProfesor').value;
    const emailProfesor = document.getElementById('emailProfesor').value;

    // Crear tarjeta de profesor
    const lista = document.getElementById('listaProfesores');
    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('professor-card');
    nuevaTarjeta.innerHTML = `
        <h3>${nombreProfesor}</h3>
        <p>${emailProfesor}</p>
        <button class="btn-calificar" onclick="eliminarProfesor(this)">Eliminar</button>
    `;
    lista.appendChild(nuevaTarjeta);

    // Limpiar el formulario
    document.getElementById('formProfesores').reset();
});

function eliminarProfesor(boton) {
    boton.parentElement.remove();
}
