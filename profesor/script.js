// Función para redirigir a la página de calificar profesor
function redirigirCalificar() {
    window.location.href = "../calificar-profesor/index.html";
}

// Función para cerrar sesión
function cerrarSesion() {
    window.location.href = "../login/index.html";
}

// Datos de calificación del profesor
const ratingsData = {
    claridad: 4.5,
    disponibilidad: 4.2,
    puntualidad: 4.0,
    general: 4.3,
};

// Crear el gráfico
document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("ratingsChart").getContext("2d");

    new Chart(ctx, {
        type: "radar", // Gráfico radar
        data: {
            labels: ["Claridad", "Disponibilidad", "Puntualidad", "General"],
            datasets: [
                {
                    label: "Calificación del Profesor",
                    data: [
                        ratingsData.claridad,
                        ratingsData.disponibilidad,
                        ratingsData.puntualidad,
                        ratingsData.general,
                    ],
                    backgroundColor: "rgba(211, 47, 47, 0.2)",
                    borderColor: "rgba(211, 47, 47, 1)",
                    borderWidth: 2,
                    pointBackgroundColor: "rgba(211, 47, 47, 1)",
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 5,
                    grid: { color: "#ddd" },
                    pointLabels: { color: "#333", font: { size: 14 } },
                },
            },
            plugins: {
                legend: { display: true, position: "top" },
            },
        },
    });
});
