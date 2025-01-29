<?php
// Establecer el lugar y la clave de la API
$placeId = 'ChIJzyN0_iD3tUwRcvrALOdnCpo'; // ID del lugar
$apiKey = 'AIzaSyBJncZhjlipkAcvXWSjTWLll_tR5rJwm4M'; // Tu API Key

// URL de la API de Google
$apiUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJzyN0_iD3tUwRcvrALOdnCpo&fields=name,rating,reviews&key=AIzaSyBJncZhjlipkAcvXWSjTWLll_tR5rJwm4M";

// Inicializar cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Retornar la respuesta como string
$response = curl_exec($ch);

// Verificar si hay errores en la solicitud
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    // Devolver la respuesta JSON al frontend
    echo $response;
}

// Cerrar la conexión cURL
curl_close($ch);
?>
