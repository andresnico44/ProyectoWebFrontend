// Función para registrar al administrador
function registerAdmin(event) {
    event.preventDefault();  // Evita el envío del formulario

    // Obtener los valores de los campos
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    // Referencia al contenedor de mensajes
    const messageContainer = document.getElementById('message');

    // Verificar si el administrador ya está registrado
    const storedAdmin = localStorage.getItem('admin');

    if (storedAdmin) {
        // Si el administrador ya está registrado
        messageContainer.textContent = 'Ya existe un administrador registrado.';
        messageContainer.classList.remove('success');
        messageContainer.classList.add('error');
    } else {
        // Solo permitir el registro con usuario 'admin' y contraseña 'admin'
        if (username === 'admin' && password === 'admin') {
            // Guardar el administrador en el localStorage
            localStorage.setItem('admin', JSON.stringify({ username, password }));

            // Mostrar mensaje de éxito
            messageContainer.textContent = 'Registro exitoso como Administrador!';
            messageContainer.classList.remove('error');
            messageContainer.classList.add('success');
        } else {
            // Mostrar mensaje de error si las credenciales no son correctas
            messageContainer.textContent = 'Usuario o contraseña incorrectos. Por favor intente nuevamente.';
            messageContainer.classList.remove('success');
            messageContainer.classList.add('error');
        }
    }
}

// Limpiar el localStorage cuando el usuario abandone la página
window.addEventListener('beforeunload', function() {
    localStorage.removeItem('admin');
});
