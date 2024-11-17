function sendRecoveryLink(event) {
    event.preventDefault();
    const studentCode = document.getElementById("student-code").value.trim();
    const email = document.getElementById("email").value.trim();

    if (studentCode && email) {
        const message = "Se ha enviado un correo electrónico de recuperación a " + email;
        showAlert(message);

        document.getElementById("student-code").value = "";
        document.getElementById("email").value = "";
    } else {
        showAlert("Por favor, rellene todos los campos antes de enviar.");
    }
}

function showAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert-box");
    alertBox.innerHTML = `
        <div class="alert-content">
            <p>${message}</p>
            <button onclick="closeAlert()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(alertBox);
}

function closeAlert() {
    const alertBox = document.querySelector(".alert-box");
    if (alertBox) {
        alertBox.remove();
    }
}

function cancelRecovery() {
    window.location.href = "../login/index.html";
}

document.getElementById("recovery-form").addEventListener("submit", sendRecoveryLink);
