document.getElementById("recovery-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const codeOrUser = document.getElementById("student-code").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validar campos
    if (!codeOrUser || !email) {
        showMessage("Por favor, complete todos los campos.", "error");
        return;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage("El correo electrónico no es válido.", "error");
        return;
    }

    const isStudent = !isNaN(codeOrUser); // Diferenciar entre estudiantes y administradores
    const recoveryData = { email: email };
    let endpoint;

    if (isStudent) {
        endpoint = "http://localhost:8080/api/estudiantes/recuperar-contrasena";
        recoveryData.codigo = codeOrUser;
    } else {
        endpoint = "http://localhost:8080/api/administradores/recuperar-contrasena";
        recoveryData.usuario = codeOrUser;
    }

    //const submitButton = document.querySelector("#submit-button");
    //submitButton.disabled = true; // Deshabilitar botón

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
        } else {
            const errorData = await response.json();
            showMessage(errorData.message || "No se pudo procesar la solicitud.", "error");
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        showMessage("Hubo un problema al conectar con el servidor.", "error");
    } finally {
        submitButton.disabled = false; // Rehabilitar botón
    }
});