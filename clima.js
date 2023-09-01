const ciudadInput = document.getElementById("ciudadInput");
const buscarBoton = document.getElementById("buscarBoton");
const infoClima = document.getElementById("infoClima");
const iconoElement = document.querySelector(".icono"); // Obtener el elemento icono por su clase
const API_KEY = "88ef9fd50c7ac8999e33e20d26cf50eb";
const lang = "es";

// Mapeo de condiciones en inglés a español
const condicionesEnEspanol = {
  "clear sky": "cielo despejado",
  "few clouds": "pocas nubes",
  "scattered clouds": "nubes dispersas",
  // ... Agrega aquí el resto de las condiciones
};

buscarBoton.addEventListener("click", () => {
  const ciudad = ciudadInput.value;
  if (ciudad === "") return;

 // ...

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&lang=${lang}`
)
  .then((response) => response.json())
  .then((data) => {
    const condicionEnIngles = data.weather[0].description.toLowerCase();
    const condicionEnEspanol =
      condicionesEnEspanol[condicionEnIngles] || condicionEnIngles;

   

    // Resto del código para mostrar la información del clima
    const tempK = data.main.temp;
    const tempC = tempK - 273.15;
    const humedad = data.main.humidity;

    infoClima.innerHTML = `
      <h2>Clima en ${ciudad}</h2>
      <p>Temperatura: ${tempC.toFixed(1)}°C</p>
      <p>Condición: ${condicionEnEspanol}</p>
      <p>Humedad: ${humedad}% </p>
    `;
  })
  .catch((error) => {
    console.error("Error al obtener datos del clima", error);
    infoClima.innerHTML = "<p>No se pueden obtener datos del clima.</p>";
  });
});



