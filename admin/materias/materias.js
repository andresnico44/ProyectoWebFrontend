const crearMateriaApi = "http://localhost:8080/api/materias/crear-materia";
const consultarProfesoresApi = "http://localhost:8080/api/profesores/profesores";
const obtenerProfesorPorCorreoApi = "http://localhost:8080/api/profesores/por-correo";  // Nuevo endpoint para obtener profesor por correo

// Al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    llenarSelectProfesores();
});

// Función para llenar el select de profesores
async function llenarSelectProfesores() {
    const profesorSelect = document.getElementById("profesorSelect");
    profesorSelect.innerHTML = '<option value="">Seleccione un profesor</option>';

    try {
        const response = await fetch(consultarProfesoresApi);
        if (!response.ok) throw new Error("Error al consultar los profesores.");
        const profesores = await response.json();

        profesores.forEach(profesor => {
            const option = document.createElement("option");
            option.value = profesor.id; // Se asume que cada profesor tiene un ID
            option.textContent = `${profesor.nombre} (${profesor.correo})`;
            profesorSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar los profesores:", error);
        mostrarMensaje("mensajeVerificacion", "No se pudieron cargar los profesores.");
    }
}

// Función para consultar si una materia ya está registrada
function consultarMateria() {
    const nombreMateria = document.getElementById("nombreMateriaConsulta").value.trim();
    if (!nombreMateria) {
        mostrarMensaje("mensajeVerificacion", "Por favor, ingrese un nombre de materia válido.");
        return;
    }

    const lista = document.getElementById("listaMaterias").children;
    let existe = false;

    for (let i = 0; i < lista.length; i++) {
        const materia = lista[i].children[1].innerText;
        if (materia === nombreMateria) {
            existe = true;
            break;
        }
    }

    if (existe) {
        mostrarMensaje("mensajeVerificacion", "La materia ya está registrada.");
        document.querySelector(".tabla-container").style.display = "block";
    } else {
        mostrarMensaje("mensajeVerificacion", "");
        agregarMateriaATabla(nombreMateria); // Agregar directamente a la tabla
    }
}

// Función para agregar una nueva materia a la tabla
function agregarMateriaATabla(nombreMateria) {
    const lista = document.getElementById("listaMaterias");
    const nuevaFila = document.createElement("tr");

    const codigoMateria = generarCodigo();
    nuevaFila.innerHTML = `
        <td><input type="text" class="input-codigo" value="${codigoMateria}" disabled></td>
        <td><input type="text" class="input-nombre" value="${nombreMateria}"></td>
        <td>
            <select class="select-profesor">
                <option value="">Seleccione un profesor</option>
            </select>
        </td>
        <td><span class="correo-profesor"></span></td>
        <td>
            <button class="btn-aceptar" onclick="registrarMateria(this)">Aceptar</button>
            <button class="btn-editar" onclick="habilitarEdicion(this)">Editar</button>
        </td>
    `;
    lista.appendChild(nuevaFila);

    llenarSelectProfesoresFila(nuevaFila); // Llenar select de profesores
    document.querySelector(".tabla-container").style.display = "block";
}

// Función para llenar el select de profesores en una fila específica
async function llenarSelectProfesoresFila(fila) {
    try {
        const response = await fetch(consultarProfesoresApi);
        if (!response.ok) throw new Error("Error al consultar los profesores.");
        const profesores = await response.json();

        const selectProfesor = fila.querySelector(".select-profesor");
        profesores.forEach(profesor => {
            const option = document.createElement("option");
            option.value = profesor.id;
            option.textContent = `${profesor.nombre} (${profesor.correo})`;
            selectProfesor.appendChild(option);
        });

        // Evento para actualizar el correo del profesor al seleccionarlo
        selectProfesor.addEventListener("change", function () {
            const correoSpan = fila.querySelector(".correo-profesor");
            const profesorSeleccionado = profesores.find(p => p.id == selectProfesor.value);
            correoSpan.textContent = profesorSeleccionado ? profesorSeleccionado.correo : "";
        });
    } catch (error) {
        console.error("Error al cargar los profesores:", error);
    }
}

// Función para habilitar la edición de una fila
function habilitarEdicion(boton) {
    const fila = boton.parentElement.parentElement;
    fila.querySelector(".input-codigo").disabled = false;
    fila.querySelector(".input-nombre").disabled = false;
    fila.querySelector(".select-profesor").disabled = false;
}

// Función para obtener el nombre del profesor por correo
async function obtenerProfesorPorCorreo(correo) {
    try {
        const response = await fetch(`${obtenerProfesorPorCorreoApi}?correo=${correo}`);
        if (!response.ok) throw new Error("Profesor no encontrado.");
        const profesor = await response.json();
        return profesor.nombre;  // Retorna el nombre del profesor
    } catch (error) {
        console.error("Error al obtener el profesor:", error);
        return null;
    }
}

// Función para registrar la materia
async function registrarMateria(boton) {
    const fila = boton.parentElement.parentElement;
    const nombreMateria = fila.querySelector(".input-nombre").value.trim();

    // Obtener el correo del profesor desde el select de la fila
    const profesorSelect = fila.querySelector(".select-profesor");
    const correoProfesor = profesorSelect.options[profesorSelect.selectedIndex].text.split('(')[1].slice(0, -1);  // Extraer el correo

    // Obtener el nombre del profesor usando su correo
    const nombreProfesor = await obtenerProfesorPorCorreo(correoProfesor);

    if (!nombreProfesor) {
        mostrarMensaje("mensajeVerificacion", "Profesor no encontrado.");
        return;
    }

    // Obtener el código de la materia
    const codigo = fila.querySelector(".input-codigo").value.trim();

    // Ahora, enviamos los datos al servidor para registrar la materia
    fetch(crearMateriaApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombreMateria,
            codigo: codigo,
            nombreProfesor: nombreProfesor // Aquí se envía el nombre del profesor
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar la materia');
        }
        return response.json();
    })
    .then(data => {
        console.log('Materia registrada:', data);
        mostrarMensaje('mensajeConfirmacion', 'La materia fue agregada con éxito.', 'green');
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('mensajeConfirmacion', 'Hubo un error al registrar la materia.', 'red');
    });

    // Mostrar la tabla de materias
    document.querySelector('.tabla-container').style.display = 'block';
    mostrarMensaje('mensajeVerificacion', '');
    mostrarMensaje('mensajeConfirmacion', 'La materia fue agregada.', 'green');
}

// Función para generar un código aleatorio para la materia
function generarCodigo() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    return letras.charAt(Math.floor(Math.random() * letras.length)) +
        letras.charAt(Math.floor(Math.random() * letras.length)) +
        numeros.charAt(Math.floor(Math.random() * numeros.length)) +
        numeros.charAt(Math.floor(Math.random() * numeros.length));
}

// Función para mostrar mensajes
function mostrarMensaje(id, mensaje, color = "red") {
    const elemento = document.getElementById(id);
    elemento.textContent = mensaje;
    elemento.style.color = color;
}
