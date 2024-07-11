<?php
include 'db_config.php'; // Include the database configuration file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $service = $_POST['service'];
    $date = $_POST['date'];
    $time = $_POST['time'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO bookings (name, email, phone, service, date, time) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $email, $phone, $service, $date, $time);

    // Execute the statement
    if ($stmt->execute()) {
        // Send email notification
        $to = "markmote12@gmail.com"; // Replace with your email address
        $subject = "New Booking Request";
        $message = "A new booking has been made:\n\n"
                 . "Name: $name\n"
                 . "Email: $email\n"
                 . "Phone: $phone\n"
                 . "Service: $service\n"
                 . "Date: $date\n"
                 . "Time: $time\n";
        $headers = "From: markmote12@gmail.com"; // Replace with your preferred "From" email address

        if (mail($to, $subject, $message, $headers)) {
            echo "New booking created successfully and email sent.";
        } else {
            echo "New booking created successfully but email sending failed.";
        }
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
