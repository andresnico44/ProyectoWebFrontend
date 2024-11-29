document.addEventListener('DOMContentLoaded', function() {
    cargarTablaMaterias();
    llenarSelectProfesores();
});

// Lista de profesores genéricos y sus correos
const profesoresCorreos = {
    "Profesor 1": "profesor1@ejemplo.com",
    "Profesor 2": "profesor2@ejemplo.com",
    "Profesor 3": "profesor3@ejemplo.com"
};

const profesores = Object.keys(profesoresCorreos); // Obtener los nombres de los profesores

function llenarSelectProfesores() {
    const profesorSelect = document.getElementById('profesorSelect');
    profesorSelect.innerHTML = '<option value="">Seleccione un profesor</option>';
    
    profesores.forEach(profesor => {
        const option = document.createElement('option');
        option.value = profesor;  // El valor de la opción será el nombre del profesor
        option.textContent = profesor;  // El texto que se muestra en la opción será el nombre del profesor
        profesorSelect.appendChild(option);
    });
}

// Función para consultar si una materia ya está registrada
function consultarMateria() {
    const nombreMateria = document.getElementById('nombreMateriaConsulta').value.trim();
    if (!nombreMateria) {
        mostrarMensaje('mensajeVerificacion', 'Por favor, ingrese un nombre de materia válido.');
        return;
    }

    const lista = document.getElementById('listaMaterias').children;
    let existe = false;

    for (let i = 0; i < lista.length; i++) {
        const materia = lista[i].children[1].innerText;
        if (materia === nombreMateria) {
            existe = true;
            break;
        }
    }

    if (existe) {
        mostrarMensaje('mensajeVerificacion', 'La materia ya está registrada.');
        document.querySelector('.tabla-container').style.display = 'block';
    } else {
        mostrarMensaje('mensajeVerificacion', 'La materia no está registrada.');
        document.getElementById('formMaterias').style.display = 'none';
        document.getElementById('modalConfirmacion').style.display = 'block';
        materiaParaRegistrar = nombreMateria;
    }
}

// Registrar materia al confirmar el modal
document.getElementById('btnRegistrar').addEventListener('click', function () {
    registrarMateria(materiaParaRegistrar);
    document.getElementById('modalConfirmacion').style.display = 'none';
});

// Función para registrar una nueva materia
function registrarMateria(nombreMateria) {
    const lista = document.getElementById('listaMaterias');
    const nuevaFila = document.createElement('tr');
    const materias = JSON.parse(localStorage.getItem('materias')) || [];
    
    // Obtener el siguiente ID secuencial, siempre comenzando desde 0001
    const id = obtenerSiguienteId();

    const correoProfesor = document.getElementById('correoProfesor').value.trim();
    const nombreProfesor = document.getElementById('profesorSelect').value || '';  // Puede ser vacío si no se selecciona un profesor

    nuevaFila.innerHTML = `
        <td>${id}</td>
        <td>${nombreMateria}</td>
        <td>
            <select class="select-profesor" disabled>
                <option value="">Seleccione un profesor</option>
                ${profesores.map(profesor => `<option value="${profesor}">${profesor}</option>`).join('')}
            </select>
        </td>  <!-- Cinta desplegable para elegir profesor -->
        <td>${correoProfesor}</td>
        <td>
            <button class="btn-eliminar" onclick="eliminarMateria(this)">Eliminar</button>
            <button class="btn-listar" onclick="listarEstudiantes('${nombreMateria}')">Listar Estudiantes</button>
            <button class="btn-aceptar" onclick="aceptarProfesor(this)">Aceptar</button>
            <button class="btn-editar" onclick="editarProfesor(this)">Editar</button>
        </td>
    `;
    lista.appendChild(nuevaFila);

    // Guardar la materia en localStorage
    guardarMateriaEnLocalStorage(nombreMateria, id, nombreProfesor, correoProfesor);
    document.querySelector('.tabla-container').style.display = 'block';
    mostrarMensaje('mensajeVerificacion', '');
    mostrarMensaje('mensajeConfirmacion', 'La materia fue agregada.', 'green');
}

// Función para obtener el siguiente ID secuencial que siempre empieza desde 0001
function obtenerSiguienteId() {
    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    
    // Si no hay materias, el primer ID será 0001
    if (materias.length === 0) {
        return "0001";
    }
    
    // Obtener el ID más bajo que esté disponible, comenzando desde 0001
    let idsExistentes = materias.map(materia => parseInt(materia.id));
    let nuevoId = 1; // Empezamos con el primer ID posible (1)
    
    // Buscamos el primer ID disponible que no esté en la lista de IDs existentes
    while (idsExistentes.includes(nuevoId)) {
        nuevoId++;
    }
    
    // Guardamos el nuevo ID en el localStorage para el siguiente uso
    return nuevoId.toString().padStart(4, '0');
}

// Función para aceptar el profesor seleccionado
function aceptarProfesor(boton) {
    const fila = boton.parentElement.parentElement;
    const selectProfesor = fila.querySelector('.select-profesor');
    const correoProfesor = profesoresCorreos[selectProfesor.value] || '';  // Obtener el correo asociado al profesor

    // Deshabilitar el select
    selectProfesor.disabled = true;
    
    // Actualizar el correo del profesor
    fila.children[3].textContent = correoProfesor;
    
    // Cambiar el estilo del botón de Aceptar (si quieres cambiar el texto o deshabilitarlo)
    boton.disabled = true;
}

// Función para editar el profesor
function editarProfesor(boton) {
    const fila = boton.parentElement.parentElement;
    const selectProfesor = fila.querySelector('.select-profesor');
    
    // Habilitar el select
    selectProfesor.disabled = false;

    // Cambiar el estilo del botón de Editar (si quieres cambiar el texto o deshabilitarlo)
    boton.disabled = true;
    
    // Rehabilitar el botón de Aceptar
    const botonAceptar = fila.querySelector('.btn-aceptar');
    botonAceptar.disabled = false;
}

// Función para eliminar una materia
function eliminarMateria(boton) {
    const fila = boton.parentElement.parentElement;
    const idMateria = fila.children[0].innerText;

    // Eliminar la fila de la tabla
    fila.remove();

    // Eliminar la materia de localStorage
    eliminarMateriaDeLocalStorage(idMateria);

    // Si no hay más materias, ocultamos la tabla
    if (document.getElementById('listaMaterias').children.length === 0) {
        document.querySelector('.tabla-container').style.display = 'none';
    }
}

// Función para listar los estudiantes de una materia (ejemplo simplificado)
function listarEstudiantes(nombreMateria) {
    alert(`Listado de estudiantes para la materia: ${nombreMateria}`);
}

// Función para guardar una materia en localStorage
function guardarMateriaEnLocalStorage(nombreMateria, idMateria, nombreProfesor, correoProfesor) {
    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    const nuevaMateria = { id: idMateria, nombre: nombreMateria, profesor: nombreProfesor, correo: correoProfesor };
    materias.push(nuevaMateria);
    localStorage.setItem('materias', JSON.stringify(materias));
}

// Función para eliminar una materia de localStorage
function eliminarMateriaDeLocalStorage(idMateria) {
    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    materias = materias.filter(materia => materia.id !== idMateria); // Filtrar la materia eliminada
    localStorage.setItem('materias', JSON.stringify(materias)); // Guardar los cambios en localStorage
}

// Función para cargar las materias desde localStorage al cargar la página
function cargarTablaMaterias() {
    const materias = JSON.parse(localStorage.getItem('materias')) || [];
    const listaMaterias = document.getElementById('listaMaterias');
    listaMaterias.innerHTML = '';

    materias.forEach(materia => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${materia.id}</td>
            <td>${materia.nombre}</td>
            <td>
                <select class="select-profesor" disabled>
                    <option value="">Seleccione un profesor</option>
                    ${profesores.map(profesor => `<option value="${profesor}" ${profesor === materia.profesor ? 'selected' : ''}>${profesor}</option>`).join('')}
                </select>
            </td>
            <td>${materia.correo}</td>
            <td>
                <button class="btn-eliminar" onclick="eliminarMateria(this)">Eliminar</button>
                <button class="btn-listar" onclick="listarEstudiantes('${materia.nombre}')">Listar Estudiantes</button>
                <button class="btn-aceptar" onclick="aceptarProfesor(this)">Aceptar</button>
                <button class="btn-editar" onclick="editarProfesor(this)">Editar</button>
            </td>
        `;
        listaMaterias.appendChild(fila);
    });

    if (materias.length > 0) {
        document.querySelector('.tabla-container').style.display = 'block';
    }
}

function mostrarMensaje(elementId, message, color = 'red') {
    const element = document.getElementById(elementId);
    element.innerText = message;
    element.style.color = color;
}
