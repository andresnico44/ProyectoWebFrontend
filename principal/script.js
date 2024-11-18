function calificarProfesor(nombre, materia, correo) {
    const url = `../calificar-profesor/index.html?nombre=${encodeURIComponent(nombre)}&materia=${encodeURIComponent(materia)}&correo=${encodeURIComponent(correo)}`;
    window.location.href = url;
}

function cerrarSesion() {
    window.location.href = "../login/index.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const profesorCards = document.querySelectorAll('.professor-card');

    profesorCards.forEach(card => {
        const nombre = card.getAttribute('data-profesor');
        if (localStorage.getItem(nombre)) {
            card.classList.add('calificado');
        }
    });
});
