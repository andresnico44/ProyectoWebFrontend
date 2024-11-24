// Función para redirigir al perfil del profesor
function redirigirPerfil() {
    window.location.href = "../profesor/index.html";
}

// Función para redirigir a la página de calificar profesor
function calificarProfesor(nombre, materia, correo) {
    const url = `../calificar-profesor/index.html?nombre=${encodeURIComponent(nombre)}&materia=${encodeURIComponent(materia)}&correo=${encodeURIComponent(correo)}`;
    window.location.href = url;
}

// Función para cerrar sesión
function cerrarSesion() {
    window.location.href = "../login/index.html";
}

// Implementación de la barra de búsqueda
document.getElementById('searchBar').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let professorCards = document.getElementsByClassName('professor-card');

    Array.from(professorCards).forEach(function(card) {
        let name = card.getElementsByTagName('h3')[0].textContent.toLowerCase();
        let subject = card.getElementsByTagName('p')[0].textContent.toLowerCase();

        if (name.includes(filter) || subject.includes(filter)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});

/*
document.addEventListener('DOMContentLoaded', function() {
    const profesorCards = document.querySelectorAll('.professor-card');

    profesorCards.forEach(card => {
        const nombre = card.getAttribute('data-profesor');
        if (localStorage.getItem(nombre)) {
            card.classList.add('calificado');
        }
    });
});*/
