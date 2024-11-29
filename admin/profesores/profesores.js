// Función para verificar si el correo del profesor ya está registrado
function verificarCorreo() {
    const emailProfesor = document.getElementById('emailProfesor').value;

    if (!emailProfesor.includes('@')) {
        mostrarMensaje('mensajeVerificacion', 'Por favor, ingrese un correo electrónico válido.');
        return;
    }

    const lista = document.getElementById('listaProfesores').children;
    let existe = false;

    for (let i = 0; i < lista.length; i++) {
        const correo = lista[i].children[1].innerText;
        if (correo === emailProfesor) {
            existe = true;
            break;
        }
    }

    if (existe) {
        mostrarMensaje('mensajeVerificacion', 'El correo ya existe.');
        document.querySelector('.tabla-container').style.display = 'block';
    } else {
        mostrarMensaje('mensajeVerificacion', 'El correo no está registrado.');
        document.getElementById('formAgregarProfesor').style.display = 'block';
    }
}

// Función para agregar un nuevo profesor
document.getElementById('formAgregarProfesor').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombreProfesor = document.getElementById('nombreProfesor').value;
    const emailProfesor = document.getElementById('emailProfesor').value;

    const lista = document.getElementById('listaProfesores');
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td>${nombreProfesor}</td>
        <td>${emailProfesor}</td>
        <td>Sin materias</td>
        <td><button class="btn-eliminar" onclick="eliminarProfesor(this)">Eliminar</button></td>
    `;
    lista.appendChild(nuevaFila);

    document.querySelector('.tabla-container').style.display = 'block';
    mostrarMensaje('mensajeVerificacion', 'El profesor fue agregado.', 'green');

    document.getElementById('formAgregarProfesor').reset();
    document.getElementById('formAgregarProfesor').style.display = 'none';

    guardarProfesorEnLocalStorage(nombreProfesor, emailProfesor);
});

// Función para eliminar un profesor
function eliminarProfesor(boton) {
    const fila = boton.parentElement.parentElement;
    const emailProfesor = fila.children[1].innerText;

    fila.remove();

    if (document.getElementById('listaProfesores').children.length === 0) {
        document.querySelector('.tabla-container').style.display = 'none';
    }

    eliminarProfesorDelLocalStorage(emailProfesor);
}

// Función para guardar un profesor en el localStorage
function guardarProfesorEnLocalStorage(nombreProfesor, emailProfesor) {
    let profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    profesores.push({
        nombre: nombreProfesor,
        email: emailProfesor,
        materias: []
    });
    localStorage.setItem('profesores', JSON.stringify(profesores));
}

// Función para eliminar un profesor del localStorage
function eliminarProfesorDelLocalStorage(emailProfesor) {
    let profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    profesores = profesores.filter(profesor => profesor.email !== emailProfesor);
    localStorage.setItem('profesores', JSON.stringify(profesores));
}

// Función para cargar los profesores desde el localStorage en la tabla
function cargarProfesoresEnProfesores() {
    const profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    const listaProfesores = document.getElementById('listaProfesores');
    listaProfesores.innerHTML = '';

    profesores.forEach(profesor => {
        const nuevaFila = document.createElement('tr');
        const materiasAsignadas = profesor.materias.length > 0 ? profesor.materias.join(', ') : 'Sin materias';

        nuevaFila.innerHTML = `
            <td>${profesor.nombre}</td>
            <td>${profesor.email}</td>
            <td>${materiasAsignadas}</td>
            <td><button class="btn-eliminar" onclick="eliminarProfesor(this)">Eliminar</button></td>
        `;
        listaProfesores.appendChild(nuevaFila);
    });

    if (profesores.length > 0) {
        document.querySelector('.tabla-container').style.display = 'block';
    }
}

function mostrarMensaje(elementId, message, color = 'red') {
    const element = document.getElementById(elementId);
    element.innerText = message;
    element.style.color = color;
}

// Cargar profesores al abrir la página de profesores
document.addEventListener('DOMContentLoaded', cargarProfesoresEnProfesores);
