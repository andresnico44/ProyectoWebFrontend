// Función para registrar al nuevo alumno
function registerStudent(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const studentCode = document.getElementById("student-code").value;
    const email = document.getElementById("email").value;
    const career = document.getElementById("career").value;
    const password = document.getElementById("password").value;

    // Validar que todos los campos estén llenos
    if (!name || !studentCode || !email || !career || !password) {
        showMessage("Todos los campos son obligatorios.", "error");
        return;
    }

    // Obtener los estudiantes previamente registrados
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Verificar si el código del estudiante ya está registrado
    if (students.some(student => student.studentCode === studentCode)) {
        showMessage("Este código de alumno ya está registrado.", "error");
        return;
    }

    if(students.some(student => student.email === email)){
        showMessage("Este correo electrónico ya está registrado.", "error");
        return;
    }

    // Crear el nuevo alumno
    const newStudent = {
        name: name,
        studentCode: studentCode,
        email: email,
        career: career,
        password: password
    };
/*
    // Guardar al nuevo alumno en localStorage
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));

    // Mostrar mensaje de éxito
    showMessage("Registro exitoso. ¡Bienvenido!", "success");
}
*/
// Función para mostrar mensajes dinámicos
function showMessage(message, type) {
    const messageElement = document.getElementById("message");
    messageElement.innerText = message;
    messageElement.className = `message ${type}`;
}
}
