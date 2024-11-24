const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

if (!token) {
    alert("El enlace no es válido.");
    window.location.href = "http://127.0.0.1:4455"; // Redirige al login u otra página
}

async function enviarCambioContrasena(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
        document.getElementById("message").innerText = "Las contraseñas no coinciden.";
        return;
    }

    try {
        // Verificar si el token pertenece a un estudiante
        console.log("Verificando si el token pertenece a un estudiante...");
        const estudianteResponse = await fetch(
            `http://localhost:8080/api/estudiantes/verificar-estudiante?token=${token}`
        );

        if (estudianteResponse.ok) {
            const estudianteData = await estudianteResponse.json();
            console.log("Token verificado como estudiante:", estudianteData);
            await cambiarContrasena(
                "http://localhost:8080/api/estudiantes/actualizar-contrasena",
                newPassword
            );
            return;
        }

        // Verificar si el token pertenece a un administrador
        console.log("Verificando si el token pertenece a un administrador...");
        const administradorResponse = await fetch(
            `http://localhost:8080/api/administradores/verificar-administrador?token=${token}`
        );

        if (administradorResponse.ok) {
            const administradorData = await administradorResponse.json();
            console.log("Token verificado como administrador:", administradorData);
            await cambiarContrasena(
                "http://localhost:8080/api/administradores/actualizar-contrasena",
                newPassword
            );
            return;
        }

        // Si no pertenece a ninguno, muestra un mensaje de error
        document.getElementById("message").innerText =
            "El token no corresponde a ningún usuario válido.";
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        document.getElementById("message").innerText =
            "Hubo un problema al verificar el token.";
    }
}

async function cambiarContrasena(urlApi, newPassword) {
    const data = {
        token: token,
        nuevaContrasena: newPassword, // Asegúrate de que esta clave sea la correcta según tu backend
    };

    try {
        const response = await fetch(urlApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            document.getElementById("message").innerText =
                "Contraseña cambiada con éxito.";
            setTimeout(() => {
                //window.location.href = "http://127.0.0.1:4455/login.html";
            }, 2000);
        } else {
            const errorData = await response.json();
            document.getElementById("message").innerText =
                errorData.message || "Error al cambiar la contraseña.";
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        document.getElementById("message").innerText =
            "Hubo un problema al conectar con el servidor.";
    }
}

// Asociar el evento al formulario
document
    .getElementById("cambio-contrasena-form")
    .addEventListener("submit", enviarCambioContrasena);

function redirigirLogin() {
    window.location.href = "http://127.0.0.1:4455"; // Redirigir al login
}
