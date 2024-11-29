// Función para obtener el correo desde los parámetros de la URL
function obtenerCorreoDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('correo');  // Obtener el correo de la URL
}

// Función para obtener los profesores al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const correo = obtenerCorreoDesdeURL();  // Obtener correo desde la URL
    console.log("Correo obtenido desde la URL:", correo);  // Depuración

    if (correo) {
        obtenerCodigoPorCorreo(correo);  // Primero obtenemos el código usando el correo
    } else {
        // Solo muestra un mensaje en consola, no redirige
        console.log("No hay correo en la URL, usuario no autenticado");
    }
});

// Función para obtener el código del estudiante a partir del correo
function obtenerCodigoPorCorreo(correo) {
    console.log('Obteniendo código para el correo:', correo);  // Depuración para verificar que el correo sea correcto
    fetch(`http://localhost:8080/api/estudiantes/codigoPorCorreo/${correo}`)  // Endpoint para obtener el código
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el código. Respuesta del servidor no exitosa.');
            }
            return response.json();  // Parsear la respuesta JSON
        })
        .then(data => {
            console.log('Respuesta del backend:', data);  // Mostrar la respuesta del backend
            if (data) {
                const codigo = data;  // El código es directamente el valor devuelto
                if (codigo) {
                    // Si se obtuvo un código válido, obtener los profesores
                    obtenerProfesores(codigo);
                } else {
                    alert('Código no encontrado para el correo proporcionado.');
                    console.error('No se encontró un código para el correo:', correo);
                }
            } else {
                alert('No se pudo obtener el código. Respuesta vacía.');
            }
        })
        .catch(error => {
            console.error('Error al obtener el código:', error);
            alert('Error al obtener el código. Intenta nuevamente.');
        });
}

// Función para obtener los profesores asociados al usuario
function obtenerProfesores(codigo) {
    console.log('Obteniendo profesores para el código:', codigo);  // Depuración para verificar que el código sea correcto
    fetch(`http://localhost:8080/api/estudiantes/profesores/${codigo}`)  // Endpoint para obtener los profesores del estudiante
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los profesores. Respuesta del servidor no exitosa.');
            }
            return response.json();  // Parsear la respuesta JSON
        })
        .then(data => {
            console.log('Respuesta de los profesores:', data);  // Mostrar la respuesta de los profesores
            if (data && data.length > 0) {
                mostrarProfesores(data);  // Mostrar los profesores solo si hay datos
            } else {
                alert('No se encontraron profesores para este estudiante.');
                console.log('No se encontraron profesores para el código:', codigo);
            }
        })
        .catch(error => {
            console.error('Error al obtener los profesores:', error);
            alert('Error al obtener los profesores. Intenta nuevamente.');
        });
}

// Función para mostrar los profesores en la página
function mostrarProfesores(profesores) {
    const profesoresContainer = document.getElementById('profesores-container');  // Obtener el contenedor de los profesores

    // Limpiar el contenedor antes de agregar nuevos profesores
    profesoresContainer.innerHTML = '';

    // Iterar sobre la lista de profesores y crear las tarjetas
    profesores.forEach(profesor => {
        // Obtener las materias del profesor usando su correo
        obtenerMateriasPorCorreo(profesor.correo).then(materias => {
            if (materias.length > 0) {
                // Crear una tarjeta para cada materia del profesor
                materias.forEach(materia => {
                    const card = document.createElement('div');
                    card.classList.add('professor-card');
                    
                    // Crear contenido de la tarjeta con la materia específica
                    card.innerHTML = `
                        <img src="../img/profeflork.jpg" alt="${profesor.nombre}" class="professor-photo">
                        <div class="professor-info">
                            <h3>${profesor.nombre}</h3>
                            <p>Materia: ${materia}</p>  <!-- Mostrar la materia específica -->
                            <p>Correo: ${profesor.correo}</p>
                            <button class="btn-calificar" 
                                onclick="event.stopPropagation(); calificarProfesor('${profesor.nombre}', '${materia}', '${profesor.correo}')">
                                Calificar
                            </button>
                            <div class="calificado-mensaje">✔️ Calificado</div>
                        </div>
                    `;

                    // Agregar la tarjeta al contenedor
                    profesoresContainer.appendChild(card);
                });
            } else {
                console.log(`El profesor ${profesor.nombre} no tiene materias asignadas.`);
            }
        }).catch(error => {
            console.error('Error al obtener las materias:', error);
            alert('Error al obtener las materias del profesor.');
        });
    });
}

// Función para redirigir a la página de calificación con los parámetros
function calificarProfesor(nombreProfesor, materia, correoProfesor) {
    // Redirige a la página de calificación y pasa los parámetros en la URL
    window.location.href = `../calificar-profesor/index.html?nombre=${encodeURIComponent(nombreProfesor)}&materia=${encodeURIComponent(materia)}&correo=${encodeURIComponent(correoProfesor)}`;
}

// Función para obtener las materias de un profesor mediante su correo
function obtenerMateriasPorCorreo(correo) {
    return fetch(`http://localhost:8080/api/profesores/profesor/${correo}/materias`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudieron obtener las materias del profesor.');
            }
            return response.json();  // Parsear la respuesta JSON
        })
        .then(data => {
            if (data && Array.isArray(data)) {
                return data.map(materia => materia.nombre);  // Asumimos que el objeto "materia" tiene una propiedad "nombre"
            } else {
                throw new Error('Datos de materias inválidos.');
            }
        })
        .catch(error => {
            console.error('Error al obtener las materias:', error);
            return [];  // Si ocurre un error, devolvemos un array vacío para que no rompa la interfaz
        });
}

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar datos de la sesión (si los tienes en localStorage o sessionStorage)
    localStorage.removeItem('usuario');  // Esto elimina cualquier dato almacenado bajo la clave 'usuario'
    sessionStorage.removeItem('usuario');  // Esto elimina cualquier dato almacenado en sessionStorage

    // Redirigir al login
    window.location.href = '../login/index.html';  // Redirige a la página de login
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