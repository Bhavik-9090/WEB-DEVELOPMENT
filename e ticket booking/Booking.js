// Get data from localStorage
let seats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
let movie = localStorage.getItem("selectedMovie") || "Avenger Returns";

let pricePerTicket = 200;

// Show data
document.getElementById("seatList").innerText = seats.join(", ");
document.getElementById("ticketCount").innerText = seats.length;
document.getElementById("movieName").innerText = movie;
document.getElementById("totalPrice").innerText = seats.length * pricePerTicket;

function confirmBooking() {
    alert("Booking Confirmed 🎉");
    window.location.href = "payment.html";
}