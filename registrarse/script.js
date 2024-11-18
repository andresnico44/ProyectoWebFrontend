function registerUser(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const name = document.getElementById('name').value;
    const studentCode = document.getElementById('student-code').value;
    const password = document.getElementById('password').value;
    const career = document.getElementById('career').value;

    // Crear el objeto con los datos a enviar (incluyendo id y rol)
    const userData = {
        id: 0, // Esto probablemente se generará automáticamente
        nombre: name,
        correo: "", // Si el correo es obligatorio, debes añadir un campo de correo en el formulario
        codigo: studentCode,
        contraseña: password,
        carrera: career,
        rol: 0 // Si el backend lo espera, pero si no, lo puedes omitir
    };

    // Enviar la solicitud POST al backend
    fetch('http://localhost:8080/api/usuarios/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            alert("Registro exitoso");
            window.location.href = "../login/index.html"; // Redirige al login
        } else {
            return response.json().then(data => {
                alert("Error: " + (data.message || 'No se pudo completar el registro'));
            });
        }
    })
    .catch(error => {
        alert("Error en la conexión: " + error.message);
    });
}