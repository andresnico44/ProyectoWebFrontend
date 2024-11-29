// Simulaciones de datos para materias y profesores
const estudiantesMatriculados = {
    "estudiante1@mail.com": [
        { materia: "Matemática", profesor: "Profesor 1", correoProfesor: "profesor1@mail.com" },
        { materia: "Física", profesor: "Profesor 2", correoProfesor: "profesor2@mail.com" }
    ],
    "estudiante2@mail.com": [
        { materia: "Química", profesor: "Profesor 3", correoProfesor: "profesor3@mail.com" }
    ]
};

// Espera que el DOM esté completamente cargado antes de ejecutar cualquier código
document.addEventListener("DOMContentLoaded", function() {
    // Consulta de estudiante
    function consultarEstudiante() {
        const correo = document.getElementById("searchBar").value; // Correo del estudiante
        const mensaje = document.getElementById("mensaje");
        const resultadoConsulta = document.getElementById("resultContainer");
        const materiasTabla = document.getElementById("materiasTabla");
        
        // Ocultar el formulario de matrícula si está visible
        document.getElementById("formMatricular").style.display = "none";

        // Validación de correo vacío
        if (!correo) {
            mensaje.textContent = "Por favor ingresa un correo.";
            mensaje.style.color = "red";
            resultadoConsulta.style.display = "none";
            return;
        }

        // Consultar las materias del estudiante
        const materias = estudiantesMatriculados[correo];
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
                <td><button class="btn-eliminar" onclick="eliminarMateria('${correo}', ${index})">Eliminar</button></td>
            `;
            materiasTabla.appendChild(tr);
        });

        // Mostrar el contenedor de resultados
        resultadoConsulta.style.display = "block";
    }

    // Eliminar materia
    function eliminarMateria(correo, index) {
        const mensaje = document.getElementById("mensaje");
        const materias = estudiantesMatriculados[correo];
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
        document.getElementById("formMatricular").style.display = "block";
    }

    // Función para matricular al estudiante
    function matricularEstudiante() {
        const correo = document.getElementById("searchBar").value;
        const materia = document.getElementById("materiaSelect").value;
        const profesor = document.getElementById("profesorSelect").value;
        const correoProfesor = profesor === "prof1" ? "profesor1@mail.com" :
                                profesor === "prof2" ? "profesor2@mail.com" : "profesor3@mail.com";
        const mensaje = document.getElementById("mensaje");

        // Validación de campos vacíos
        if (!correo || !materia || !profesor) {
            mensaje.textContent = "Todos los campos son obligatorios.";
            mensaje.style.color = "red";
            return;
        }

        // Matricular al estudiante (simulado)
        if (!estudiantesMatriculados[correo]) {
            estudiantesMatriculados[correo] = [];
        }

        estudiantesMatriculados[correo].push({ materia, profesor, correoProfesor });

        mensaje.textContent = `Estudiante matriculado en ${materia} con ${profesor}.`;
        mensaje.style.color = "green";

        // Limpiar el formulario
        document.getElementById("materiaSelect").value = "";
        document.getElementById("profesorSelect").value = "";

        // Ocultar el formulario de matrícula
        document.getElementById("formMatricular").style.display = "none";

        // Actualizar la lista de materias
        consultarEstudiante();
    }

    // Exponer funciones para el uso en el HTML
    window.consultarEstudiante = consultarEstudiante;
    window.matricularEstudiante = matricularEstudiante;
    window.mostrarMatricular = mostrarMatricular;
    window.eliminarMateria = eliminarMateria;
});
