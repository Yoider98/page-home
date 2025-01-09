<?php
// Check if the data was sent
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $address = isset($_POST['address']) ? $_POST['address'] : '';
    $service = isset($_POST['service']) ? $_POST['service'] : '';
    $job = isset($_POST['job']) ? $_POST['job'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';
    $agreement = isset($_POST['agreement']) ? $_POST['agreement'] : '';

    // Recipient and subject configuration
    $recipient = 'yoideryancy@gmail.com';  // Change this to your email address
    $subject = 'New message from the contact page';

    // Create the body of the message
    $body = "Name: $name\n";
    $body .= "Phone: $phone\n";
    $body .= "Email: $email\n";
    $body .= "Address: $address\n";
    $body .= "Service: $service\n";
    $body .= "Looking for a job: $job\n";
    $body .= "Message: $message\n";
    $body .= "Agreement acceptance: " . ($agreement ? "Yes" : "No") . "\n";

    // Email headers
    $headers = "From: $email\n";
    $headers .= "Reply-To: $email\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\n";

    // Send the email
    if (mail($recipient, $subject, $body, $headers)) {
        echo "Email sent successfully.";
    } else {
        echo "There was an issue sending the email.";
    }
} else {
    echo "No form data received.";
}
?>
