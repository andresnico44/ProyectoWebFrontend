document.addEventListener("DOMContentLoaded", function() {
    // Consulta de estudiante
    function consultarEstudiante() {
        const codigoEstudiante = document.getElementById("searchBar").value; // Código del estudiante
        const mensaje = document.getElementById("mensaje");
        const resultadoConsulta = document.getElementById("resultContainer");
        const materiasTabla = document.getElementById("materiasTabla");

        // Ocultar el formulario de matrícula si está visible
        document.getElementById("formMatricular").style.display = "none";

        // Validación de código vacío
        if (!codigoEstudiante) {
            mensaje.textContent = "Por favor ingresa un código de estudiante.";
            mensaje.style.color = "red";
            resultadoConsulta.style.display = "none";
            return;
        }

        // Consultar las materias del estudiante
        const materias = estudiantesMatriculados[codigoEstudiante];
        if (!materias) {
            mensaje.textContent = "Este estudiante no está matriculado en ninguna materia.";
            mensaje.style.color = "red";
            resultadoConsulta.style.display = "none";
            return;
        }

        // Limpiar la tabla anterior
        materiasTabla.innerHTML = `
            <tr>
                <th>Materia</th>
                <th>Profesor</th>
                <th>Correo del Profesor</th>
                <th>Eliminar</th>
            </tr>
        `;  // Limpiar la tabla

        // Mostrar las materias y profesores en la tabla
        materias.forEach((materia, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${materia.materia}</td>
                <td>${materia.profesor}</td>
                <td>${materia.correoProfesor}</td>
                <td><button class="btn-eliminar" onclick="eliminarMateria('${codigoEstudiante}', ${index})">Eliminar</button></td>
            `;
            materiasTabla.appendChild(tr);
        });

        // Mostrar el contenedor de resultados
        resultadoConsulta.style.display = "block";
    }

    // Eliminar materia
    function eliminarMateria(codigoEstudiante, index) {
        const mensaje = document.getElementById("mensaje");
        const materias = estudiantesMatriculados[codigoEstudiante];
        if (!materias || index < 0 || index >= materias.length) {
            mensaje.textContent = "Materia no encontrada.";
            mensaje.style.color = "red";
            return;
        }

        // Eliminar la materia
        materias.splice(index, 1);
        mensaje.textContent = "Materia eliminada con éxito.";
        mensaje.style.color = "green";

        // Actualizar la lista de materias
        consultarEstudiante();
    }

    // Función para mostrar el formulario de matrícula
    function mostrarMatricular() {
        // Obtener las materias disponibles desde el backend
        fetch("http://localhost:8080/api/materias/materias")
            .then(response => response.json())
            .then(materias => {
                const materiaSelect = document.getElementById("materiaSelect");
                materiaSelect.innerHTML = ""; // Limpiar opciones anteriores
                materias.forEach(materia => {
                    const option = document.createElement("option");
                    option.value = materia.nombre; // Guardamos el nombre de la materia, no el id
                    option.textContent = materia.nombre;
                    materiaSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Error al cargar las materias:", error);
            });

        document.getElementById("formMatricular").style.display = "block";
    }

    // Función para matricular al estudiante
    function matricularEstudiante() {
        const codigoEstudiante = document.getElementById("searchBar").value;  // Código del estudiante
        const materiaNombre = document.getElementById("materiaSelect").value;  // Nombre de la materia
        const mensaje = document.getElementById("mensaje");

        // Validación de campos vacíos
        if (!codigoEstudiante || !materiaNombre) {
            mensaje.textContent = "Todos los campos son obligatorios.";
            mensaje.style.color = "red";
            return;
        }

        // Obtener el código de la materia utilizando el nombre
        fetch(`http://localhost:8080/api/materias/buscar?nombre=${materiaNombre}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo encontrar la materia");
                }
                return response.json();
            })
            .then(materia => {
                // Asegurarnos de que se ha encontrado la materia y que contiene un ID
                if (!materia || !materia.id) {
                    mensaje.textContent = "Materia no encontrada.";
                    mensaje.style.color = "red";
                    return;
                }

                const materiaId = materia.id;  // Código de la materia

                // Matricular al estudiante con el código de la materia
                fetch(`http://localhost:8080/api/estudiantes/${codigoEstudiante}/materias/${materiaId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(response => response.json())
                .then(data => {
                    mensaje.textContent = `Estudiante matriculado en ${data.nombre}.`;
                    mensaje.style.color = "green";
                    consultarEstudiante();  // Actualizar la lista de materias
                })
                .catch(error => {
                    mensaje.textContent = "Error al matricular al estudiante.";
                    mensaje.style.color = "red";
                    console.error("Error al matricular estudiante:", error);
                });
            })
            .catch(error => {
                mensaje.textContent = "Error al buscar la materia.";
                mensaje.style.color = "red";
                console.error("Error al buscar la materia:", error);
            });
    }

    // Exponer funciones para el uso en el HTML
    window.consultarEstudiante = consultarEstudiante;
    window.matricularEstudiante = matricularEstudiante;
    window.mostrarMatricular = mostrarMatricular;
    window.eliminarMateria = eliminarMateria;
});
