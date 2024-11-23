// Función para registrar al nuevo alumno
async function registerStudent(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const studentCode = document.getElementById("student-code").value;
    const email = document.getElementById("email").value;
    const career = document.getElementById("career").value;
    const password = document.getElementById("password").value;

    // Validar que todos los campos estén llenos
    if (!name || !studentCode || !email || !career || !password) {
        showMessage("Todos los campos son obligatorios.", "error");
        return;
    }

    // Crear el objeto de datos para enviar
    const newStudent = {
        nombre: name,
        codigo: studentCode,
        correo: email,
        carrera: career,
        contraseña: password
    };

    try {
        // Hacer la solicitud POST a la API
        const response = await fetch("http://localhost:8080/api/estudiantes/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStudent)
        });

        if (response.ok) {
            const result = await response.json();
            showMessage("Registro exitoso. ¡Bienvenido!", "success");
            console.log("Estudiante registrado:", result);
        } else {
            const errorData = await response.json();
            showMessage(errorData.message || "Error al registrar al estudiante.", "error");
        }
    } catch (error) {
        showMessage("Hubo un problema al conectar con el servidor.", "error");
        console.error("Error de conexión:", error);
    }
}

// Función para mostrar mensajes dinámicos
function showMessage(message, type) {
    const messageElement = document.getElementById("message");
    messageElement.innerText = message;
    messageElement.className = `message ${type}`;
}
