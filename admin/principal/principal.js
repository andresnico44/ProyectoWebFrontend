function redirigir(opcion) {
    switch (opcion) {
        case 'materias':
            window.location.href = "../materias/materias.html";
            break;
        case 'profesores':
            window.location.href = "../profesores/profesores.html";
            break;
        case 'estudiantes':
            window.location.href = "../estudiantes/estudiantes.html";
            break;
        default:
            console.error("Opción no válida");
    }
}

function cerrarSesion() {
    window.location.href = "/login/index.html";
}
