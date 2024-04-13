<?php
// Validate and sanitize the URL (you can add more robust validation)
if (isset($_GET['url'])) {
    $imageUrl = filter_var($_GET['url'], FILTER_SANITIZE_URL);

    // Fetch image content
    $image = @file_get_contents($imageUrl); // Suppress warnings

    if ($image !== false) {
        // Determine MIME type
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_buffer($finfo, $image);

        // Encode image data
        $data = base64_encode($image);

        // Create data URI
        $dataUri = "data:$mime;base64,$data";

        // Display the image
        echo "<img src='$dataUri' alt='Image from URL'>";
    } else {
        echo "Error fetching image from the provided URL.";
    }
} else {
    echo "Please provide a valid image URL.";
}
?>
