document.getElementById("recovery-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    // Validar campo de correo
    if (!email) {
        showMessage("Por favor, ingrese su correo electrónico.", "error");
        return;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage("El correo electrónico no es válido.", "error");
        return;
    }

    const recoveryData = { correo: email }; // Ajuste: usar la clave `correo` para el backend
    const endpoint = "http://localhost:8080/api/usuarios/recuperar-contrasena";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recoveryData),
        });

        if (response.ok) {
            showMessage("Se ha enviado un correo con el enlace de recuperación.", "success");
            setTimeout(() => {
                location.href = '../login/index.html'; // Redirigir al login tras éxito
            }, 3000);
        } else {
            const errorData = await response.json();
            showMessage(errorData.message || "No se pudo procesar la solicitud.", "error");
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        showMessage("Hubo un problema al conectar con el servidor.", "error");
    }
});

// Función para mostrar mensajes de éxito o error
function showMessage(message, type) {
    const messageContainer = document.getElementById("message"); // Contenedor de mensajes en HTML
    messageContainer.innerHTML = message;

    // Establecer el color o clase según el tipo de mensaje (error o éxito)
    if (type === "success") {
        messageContainer.style.color = "green"; // Color de éxito
    } else if (type === "error") {
        messageContainer.style.color = "red"; // Color de error
    }

    // Mostrar el mensaje
    messageContainer.style.display = "block";
}
