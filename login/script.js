const validCredentials = {
    code: "usuario123",
    password: "password123"
};

function authenticateUser(event) {
    event.preventDefault();
    const form = document.getElementById("login-form");

    if (form.checkValidity()) {
        const code = document.getElementById("student-code").value.trim();
        const password = document.getElementById("password").value.trim();

        if (code === validCredentials.code && password === validCredentials.password) {
            window.location.href = "../principal/index.html";
        } else {
            alert("Código o contraseña incorrectos. Por favor, intente nuevamente.");
        }
    } else {
        form.reportValidity();
    }
}
