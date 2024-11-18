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

        // Enviar la solicitud POST al backend para verificar las credenciales
        fetch('http://localhost:8080/api/usuarios/inicio-sesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || "Error desconocido");
                    });
                }
                return response.json(); // Si la respuesta es correcta, parsear como JSON
            })
            .then(data => {
                if (data.id) {  // Si el id está presente, es que el usuario existe y las credenciales son correctas
                    // Redirigir al usuario a la página principal
                    window.location.href = "../principal/index.html";
                }
            })
            .catch(error => {
                console.error("Error en la conexión: ", error);
                alert("Hubo un problema al verificar las credenciales: " + error.message);
            });
    } else {
        form.reportValidity();
    }
}