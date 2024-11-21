function authenticateUser(event) {
    event.preventDefault();
    const form = document.getElementById("login-form");

    if (form.checkValidity()) {
        const code = document.getElementById("student-code").value.trim();
        const password = document.getElementById("password").value.trim();

        // Crear un objeto con las credenciales del usuario
        const credentials = {
            codigo: code,
            contraseña: password
        };
    }
}