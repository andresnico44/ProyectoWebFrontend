async function authenticateUser(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario
    const form = document.getElementById("login-form");

    // Validar el formulario antes de proceder
    if (form.checkValidity()) {
        const email = document.getElementById("student-code").value.trim();  // Cambiado 'codigo' a 'email'
        const password = document.getElementById("password").value.trim();

        // Crear el objeto con las credenciales del usuario
        const credentials = {
            correo: email,  // Usar 'correo' en lugar de 'codigo'
            contraseña: password
        };

        const loginUrl = "http://localhost:8080/api/usuarios/inicio-sesion"; // Endpoint común para todos los usuarios

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
