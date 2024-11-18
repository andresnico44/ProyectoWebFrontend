async function registerUser(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const studentCode = document.getElementById('student-code').value;
    const password = document.getElementById('password').value;
    const career = document.getElementById('career').value;

    // Crear un objeto con los datos del usuario
    const userData = {
        name,
        studentCode,
        password,
        career
    };

    try {
        // Enviar los datos al backend
        const response = await fetch('http://localhost:8080/api/users/register', { // URL de tu backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Tipo de contenido JSON
            },
            body: JSON.stringify(userData) // Convertir el objeto a JSON
        });

        // Manejar la respuesta del servidor
        if (response.ok) {
            const data = await response.json();
            alert('Usuario registrado exitosamente.');
            console.log('User registered:', data);
            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = '../login/index.html';
        } else {
            // Manejar errores específicos del backend
            const error = await response.text();
            alert('Error al registrar usuario: ' + error);
        }
    } catch (err) {
        console.error('Error de conexión:', err);
        alert('Error al conectar con el servidor.');
    }
}
