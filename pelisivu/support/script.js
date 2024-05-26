// JavaScript file (script.js)
document.addEventListener("DOMContentLoaded", function() {
    var contactForm = document.getElementById("contactForm");

    // Add event listener for form submission
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        var formData = new FormData(contactForm);

        // Send form data using Fetch API
        fetch("/send_email", {
            method: "POST",
            body: formData
        })
        .then(function(response) {
            // Check if the response is successful
            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset(); // Reset the form
            } else {
                alert("Message sending failed.");
                submitButton.style.backgroundColor = "red"; // Change button color to red
            }
        })
        .catch(function(error) {
            console.error("Error:", error);
            alert("Failed to send the message.");
        });
    });
});
