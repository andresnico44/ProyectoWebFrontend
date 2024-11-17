const validCredentials = {
    code: "usuario123",
    password: "password123"
};

function authenticateUser(event) {
    event.preventDefault();  // Evita el envío del formulario de forma predeterminada
    const form = document.getElementById("login-form");

    if (form.checkValidity()) {
        const code = document.getElementById("student-code").value.trim();
        const password = document.getElementById("password").value.trim();

        if (code === validCredentials.code && password === validCredentials.password) {
            alert("¡Bienvenido!");
            window.location.href = "../principal/index.html";
        } else {
            alert("Código o contraseña incorrectos. Por favor, intente nuevamente.");
        }
    } else {
        // Permitir que el navegador muestre los mensajes de los campos requeridos
        form.reportValidity();
    }
}
