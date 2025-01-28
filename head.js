const phoneInputField = document.getElementById("phone");
const iti = window.intlTelInput(phoneInputField, {
  initialCountry: "auto", // Detecta el país automáticamente
  geoIpLookup: function (callback) {
    fetch("https://ipinfo.io/json?token=your_api_token") // Puedes usar un token gratuito de ipinfo.io
      .then((response) => response.json())
      .then((data) => callback(data.country))
      .catch(() => callback("us")); // Fallback en caso de error
  },
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Utilidades
});
// Selecciona el formulario por su ID
const form = document.getElementById("form");

// Escucha el evento "submit" del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevenir el comportamiento predeterminado de recargar la página

  // Captura los valores de cada campo del formulario
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const service = document.getElementById("service").value;
  const job = document.getElementById("job").value;
  const message = document.getElementById("message").value;
  const agreement = document.getElementById("agreement").checked;
  // Obtener el número de teléfono completo (incluyendo el código del país)

  const countryCode = iti.getSelectedCountryData().dialCode; // Código del país

  // Muestra los valores en la consola
  console.log("form:", form);
  console.log("Name:", name);
  console.log("Country Code:", countryCode + " " + phone);
  console.log("Email:", email);
  console.log("Address:", address);
  console.log("Service:", service);
  console.log("Looking for a Job:", job);
  console.log("Message:", message);
  console.log("Agreement:", agreement);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", countryCode + " " + phone);
  formData.append("email", email);
  formData.append("address", address);
  formData.append("service", service);
  formData.append("job", job);
  formData.append("message", message);
  formData.append("agreement", agreement);

  fetch("enviarCorreo.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      // Mostrar una confirmación o redirigir al usuario
      alert("Mensaje enviado correctamente");
      form.reset(); // Limpiar el formulario
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
      alert("Hubo un problema al enviar el mensaje. Inténtalo de nuevo.");
    });
});

function openModal(img) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");
  var caption = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = img.src;
  caption.innerHTML = img.alt; // Muestra el alt de la imagen como pie de foto
}

// Función para cerrar el modal
function closeModal() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

// Enviar los datos a un servidor usando fetch
//   try {
//     const response = await fetch('https://example.com/api/form-submit', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     });

//     if (response.ok) {
//       const result = await response.json();
//       console.log('Datos enviados exitosamente:', result);
//       alert('Formulario enviado correctamente.');
//     } else {
//       console.error('Error al enviar el formulario:', response.status);
//       alert('Hubo un error al enviar el formulario.');
//     }
//   } catch (error) {
//     console.error('Error en la solicitud:', error);
//     alert('No se pudo enviar el formulario. Intenta nuevamente.');
//   }

const placeId = "02188262684588453855";
const apiKey = "AIzaSyDvUv6t5st-c3MdZsZtPvZWjgHJXQD2Ry0";
async function fetchReviews() {
  try {
    // Log para verificar si la función se está ejecutando
    console.log("Fetching reviews...");

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      console.error("Error al obtener los datos:", response.statusText);
      return;
    }

    const data = await response.json();

    // Verificar la respuesta obtenida
    console.log("Datos obtenidos de la API:", data);

    // Verificar si existen reseñas
    if (data.result && data.result.reviews) {
      const reviewsContainer = document.getElementById("reviews-container");

      // Verificar que se haya encontrado el contenedor
      if (!reviewsContainer) {
        console.error("Contenedor de reseñas no encontrado.");
        return;
      }

      // Mostrar las reseñas en el contenedor
      reviewsContainer.innerHTML = data.result.reviews
        .map(
          (review) => `
            <div class="review">
              <h3>${review.author_name}</h3>
              <p>Rating: ${review.rating} ⭐</p>
              <p>${review.text}</p>
              <small>${review.relative_time_description}</small>
            </div>
          `
        )
        .join("");

      console.log("Reseñas cargadas con éxito");
    } else {
      console.error("No se encontraron reseñas en los datos.");
    }
  } catch (error) {
    console.error("Hubo un error al obtener las reseñas:", error);
  }
}

fetchReviews();
