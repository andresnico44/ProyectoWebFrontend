document.getElementById('formMaterias').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita recargar la página
    const nombreMateria = document.getElementById('nombreMateria').value;

    // Agregar la materia a la tabla
    const lista = document.getElementById('listaMaterias');
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${Math.floor(Math.random() * 1000)}</td>
        <td>${nombreMateria}</td>
        <td><button class="btn-calificar" onclick="eliminarFila(this)">Eliminar</button></td>
    `;
    lista.appendChild(nuevaFila);

    // Limpiar el formulario
    document.getElementById('formMaterias').reset();
});

function eliminarFila(boton) {
    boton.parentElement.parentElement.remove();
}
