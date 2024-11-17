function sendRecoveryLink() {
    const confirmation = confirm(
        "¿Está seguro de que desea enviar el enlace de recuperación de contraseña?"
    );

    if (confirmation) {
        alert("El enlace de recuperación de contraseña ha sido enviado.");
    } else {
        alert("La operación ha sido cancelada.");
    }

    window.location.href = "../login/index.html";
}

function cancelRecovery() {
    window.location.href = "../login/index.html";
}

