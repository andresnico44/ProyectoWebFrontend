async function authenticateUser(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario
    const form = document.getElementById("login-form");

    // Validar el formulario antes de proceder
    if (form.checkValidity()) {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Crear el objeto con las credenciales del usuario
        const credentials = {
            correo: email, // Usar 'correo' para el campo de correo electrónico
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

                // Obtener el rol del usuario (1 para admin, 2 para estudiante)
                const role = result.rol; // Asumiendo que 'rol' es devuelto como un número (1 o 2)

                // Redirigir según el rol
                if (role === 1) {
                    // Si el rol es 1 (administrador)
                    window.location.href = `/admin/principal/principal.html?correo=${encodeURIComponent(email)}`;
                } else if (role === 2) {
                    // Si el rol es 2 (estudiante)
                    window.location.href = `/principal/index.html?correo=${encodeURIComponent(email)}`;
                } else {
                    showMessage("Rol desconocido", "error");
                }
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
