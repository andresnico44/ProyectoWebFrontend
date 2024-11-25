// Función para registrar al administrador
async function registerAdmin(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los valores de los campos
    const username = document.getElementById('admin-username').value;
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    // Referencia al contenedor de mensajes
    const messageContainer = document.getElementById('message');

    // Verificar que los campos no estén vacíos
    if (!username || !email || !password) {
        messageContainer.textContent = "Todos los campos son obligatorios.";
        messageContainer.classList.remove('success');
        messageContainer.classList.add('error');
        return;
    }

    // Crear el objeto para enviar al backend
    const newAdmin = {
        usuario: username,
        correo: email,
        contraseña: password
    };

    try {
        // Hacer la solicitud POST al backend
        const response = await fetch("http://localhost:8080/api/administradores/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAdmin), // Convertir objeto a JSON
        });

        if (response.ok) {
            const result = await response.json();
            // Mostrar mensaje de éxito
            messageContainer.textContent = 'Registro exitoso como Administrador!';
            messageContainer.classList.remove('error');
            messageContainer.classList.add('success');
            console.log("Administrador registrado:", result);
        } else {
            const errorData = await response.json();
            messageContainer.textContent = errorData.message || "Error al registrar al administrador.";
            messageContainer.classList.remove('success');
            messageContainer.classList.add('error');
        }
    } catch (error) {
        messageContainer.textContent = "Error al conectar con el servidor.";
        messageContainer.classList.remove('success');
        messageContainer.classList.add('error');
        console.error("Error de conexión:", error);
    }
}

// Limpiar el localStorage cuando el usuario abandone la página
window.addEventListener('beforeunload', function() {
    localStorage.removeItem('admin');
});

// Asignar el evento al formulario
document.getElementById('register-form').addEventListener('submit', registerAdmin);