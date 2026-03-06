// Button click alert
function thankYou() {
    alert("Thank you for visiting!");
}

// Contact form submission handling
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("confirmation").classList.remove("hidden");
    this.reset();
});
function showSection(sectionId) {
    // Hide all sections
    let sections = document.getElementsByClassName("content");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Show selected section
    document.getElementById(sectionId).style.display = "block";
}