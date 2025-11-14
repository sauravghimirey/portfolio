// Initialize EmailJS
(function () {
    emailjs.init("bmccZbRIQbApzGJvm");
})();

// Custom alert function
function showContactAlert(message, success = true) {
    const alertBox = document.getElementById("contactAlert");
    const alertText = document.getElementById("alertText");

    alertText.textContent = message;

    alertBox.style.background = success ? "#4caf50" : "#e74c3c";
    alertBox.classList.remove("hidden");

    // Small delay for animation
    setTimeout(() => {
        alertBox.classList.add("show");
    }, 10);

    // Hide after 3 seconds
    setTimeout(() => {
        alertBox.classList.remove("show");
        setTimeout(() => alertBox.classList.add("hidden"), 300);
    }, 3000);
}

// Handle form submit
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_uehln1s", "template_uloq6dl", params)
        .then(function () {
            showContactAlert("Message sent successfully!", true);
            document.getElementById("contactForm").reset();
        })
        .catch(function () {
            showContactAlert("Failed to send message. Try again.", false);
        });
});
