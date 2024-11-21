<<<<<<< HEAD
function registerUser(event) {
    event.preventDefault();
    alert("Registro exitoso");
    window.location.href = "../login/index.html";
}
=======
document.addEventListener("DOMContentLoaded", () => {
    const roleSelect = document.getElementById("role");
    const adminFields = document.getElementById("admin-fields");
    const form = document.getElementById("register-form");

    // Función para mostrar los campos según el rol seleccionado
    function showFieldsBasedOnRole() {
        const selectedRole = roleSelect.value;

        if (selectedRole === "admin") {
            adminFields.style.display = "block"; // Mostrar campos de Administrador
        } else {
            adminFields.style.display = "none"; // Ocultar campos de Administrador
        }
    }

    // Función para manejar el registro
    function registerUser(event) {
        event.preventDefault(); // Prevenir el envío por defecto del formulario

        const selectedRole = roleSelect.value;

        if (selectedRole === "admin") {
            const username = document.getElementById("admin-user").value.trim();
            const password = document.getElementById("admin-password").value.trim();

            // Validación de los campos de Administrador
            if (username && password) {
                alert("¡Registro exitoso como Administrador!"); // Alerta de éxito
            } else {
                alert("Por favor, complete todos los campos de Administrador."); // Alerta de error
            }
        } else {
            // En caso de que el rol sea 'estudiante', podemos agregar más lógica más adelante.
            alert("Por favor, complete los campos del rol de Estudiante (si es necesario).");
        }
    }

    // Escuchar el evento 'submit' del formulario para manejar el registro
    form.addEventListener("submit", registerUser);

    // Escuchar cambios en el select de rol
    roleSelect.addEventListener("change", showFieldsBasedOnRole);
});
>>>>>>> e05eefb (Mejoras en el login, registro (incluyendo la separación entre registro de alumno y administrador))
