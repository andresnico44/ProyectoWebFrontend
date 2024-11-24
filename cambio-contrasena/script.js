function cambiarContrasena() {
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const messageBox = document.getElementById("message");

    if (newPassword !== confirmPassword) {
        messageBox.textContent = "Las contraseñas no coinciden. Por favor, inténtelo de nuevo.";
        messageBox.className = "message error";
        messageBox.style.display = "block";
        return false; // Previene el envío del formulario
    }

    messageBox.textContent = "Contraseña cambiada con éxito.";
    messageBox.className = "message success";
    messageBox.style.display = "block";
    
    setTimeout(() => {
        window.location.href = "../login/index.html";
    }, 2000); // Redirige después de 2 segundos
    
    return false; // Previene el envío del formulario para permitir la redirección
}

function redirigirLogin() {
    window.location.href = "../login/index.html";
}
