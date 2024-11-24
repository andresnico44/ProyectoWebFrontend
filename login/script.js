async function authenticateUser(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario
    const form = document.getElementById("login-form");

    // Validar el formulario antes de proceder
    if (form.checkValidity()) {
        const code = document.getElementById("student-code").value.trim();
        const password = document.getElementById("password").value.trim();

        // Verificar si el código es numérico para decidir el tipo de login
        const isStudentLogin = !isNaN(code); // Si el código es numérico, es estudiante

        // Crear el objeto con las credenciales del usuario
        const credentials = {
            codigo: code,
            contraseña: password
        };

        let loginUrl;
        if (isStudentLogin) {
            // Si es estudiante, usamos el endpoint de estudiante
            loginUrl = "http://localhost:8080/api/estudiantes/inicio-sesion";
        } else {
            // Si no es numérico, lo tratamos como administrador
            credentials.usuario = code; // Usamos el código como usuario para el administrador
            loginUrl = "http://localhost:8080/api/administradores/inicio-sesion";
        }

        try {
            // Realizar la solicitud POST con las credenciales
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            // Manejar la respuesta del servidor
            if (response.ok) {
                const result = await response.json();
                console.log("Login exitoso:", result);
                window.location.href = "/principal/index.html";
            } else {
                const errorData = await response.json();
                console.error("Error de login:", errorData.message || "Credenciales incorrectas");
                // Mostrar mensaje de error
                showMessage("Credenciales incorrectas", "error");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            showMessage("Hubo un problema al conectar con el servidor.", "error");
        }
    } else {
        // Si el formulario no es válido, mostrar mensaje de error
        showMessage("Por favor, complete todos los campos correctamente.", "error");
    }
}

// Función para mostrar mensajes dinámicos
function showMessage(message, type) {
    const messageElement = document.getElementById("message");
    messageElement.innerText = message;
    messageElement.className = `message ${type}`;
}
