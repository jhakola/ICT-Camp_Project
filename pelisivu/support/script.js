// JavaScript-tiedosto (script.js)
document.addEventListener("DOMContentLoaded", function() {
    var contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Estä lomakkeen oletustoiminto (lähettäminen)

        var formData = new FormData(contactForm);

        // Lähetä lomakkeen tiedot Fetch API:lla
        fetch("/send_email", {
            method: "POST",
            body: formData
        })
        .then(function(response) {
            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset(); // Tyhjennä lomake
            } else {
                alert("Message sending failed.");
                submitButton.style.backgroundColor = "red"; // Vaihda napin väri punaiseksi
            }
        })
        .catch(function(error) {
            console.error("Virhe:", error);
            alert("Viestin lähetys epäonnistui.");
        });
    });
});