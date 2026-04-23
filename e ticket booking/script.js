const seats = document.querySelectorAll(".seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");

const ticketPrice = 200;

seats.forEach(seat => {
    seat.addEventListener("click", () => {
        seat.classList.toggle("selected");
        updateCount();
    });
});

function updateCount() {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}
function proceedToBooking() {
    const selectedSeats = Array.from(document.querySelectorAll(".seat.selected"))
        .map(seat => seat.innerText);

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("selectedMovie", "Avenger Returns");

    window.location.href = "booking.html";
}