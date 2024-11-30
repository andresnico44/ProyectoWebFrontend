// Función para verificar si el correo del profesor ya está registrado
async function verificarCorreo() {
    const emailProfesor = document.getElementById('emailProfesor').value;

    if (!emailProfesor.includes('@')) {
        mostrarMensaje('mensajeVerificacion', 'Por favor, ingrese un correo electrónico válido.');
        return;
    }

    try {
        // Llamada al backend para verificar el correo
        const response = await fetch(`http://localhost:8080/api/profesores/existe?correo=${encodeURIComponent(emailProfesor)}`);
        if (!response.ok) {
            throw new Error('Error al verificar el correo.');
        }

        const existe = await response.json();

        if (existe) {
            mostrarMensaje('mensajeVerificacion', 'El correo ya está registrado.');
            document.getElementById('formAgregarProfesor').style.display = 'none';
        } else {
            mostrarMensaje('mensajeVerificacion', 'El correo no está registrado. Ahora puede agregar el profesor.', 'green');
            document.getElementById('formAgregarProfesor').style.display = 'block';
        }
    } catch (error) {
        console.error(error);
        mostrarMensaje('mensajeVerificacion', 'Error al verificar el correo: ' + error.message);
    }
}

// Función para agregar un nuevo profesor
document.getElementById('formAgregarProfesor').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombreProfesor = document.getElementById('nombreProfesor').value;
    const emailProfesor = document.getElementById('emailProfesor').value;

    const nuevoProfesor = {
        nombre: nombreProfesor,
        correo: emailProfesor
    };

    try {
        // Llamar al backend para agregar el profesor
        const response = await fetch('http://localhost:8080/api/profesores/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProfesor)
        });

        if (!response.ok) {
            throw new Error('No se pudo crear el profesor. Por favor, inténtalo nuevamente.');
        }

        // Agregar a la tabla en el frontend
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
        mostrarMensaje('mensajeVerificacion', 'El profesor fue agregado correctamente.', 'green');

        // Resetear formulario
        document.getElementById('formAgregarProfesor').reset();
        document.getElementById('formAgregarProfesor').style.display = 'none';

    } catch (error) {
        console.error(error);
        mostrarMensaje('mensajeVerificacion', 'Error al agregar el profesor: ' + error.message);
    }
});

// Función para mostrar mensajes
function mostrarMensaje(elementId, message, color = 'red') {
    const element = document.getElementById(elementId);
    element.innerText = message;
    element.style.color = color;
}
