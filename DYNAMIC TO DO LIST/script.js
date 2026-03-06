const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("priority");
const daySelect = document.getElementById("daySelect");
const customDate = document.getElementById("customDate");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const pendingSpan = document.getElementById("pending");
const completedSpan = document.getElementById("completed");

// Show custom date if selected
daySelect.addEventListener("change", () => {
    customDate.style.display = daySelect.value === "custom" ? "block" : "none";
});

function updateCounter() {
    const tasks = document.querySelectorAll("#taskList li");
    const completedTasks = document.querySelectorAll(".completed");
    pendingSpan.textContent = "Pending: " + (tasks.length - completedTasks.length);
    completedSpan.textContent = "Completed: " + completedTasks.length;
}

function getDeadline() {
    const now = new Date();
    let selectedDate;

    if (daySelect.value === "today") {
        selectedDate = new Date(now.toDateString());
    } 
    else if (daySelect.value === "tomorrow") {
        selectedDate = new Date(now);
        selectedDate.setDate(now.getDate() + 1);
    } 
    else {
        selectedDate = new Date(customDate.value);
    }

    const timeParts = timeInput.value.split(":");
    selectedDate.setHours(timeParts[0]);
    selectedDate.setMinutes(timeParts[1]);
    selectedDate.setSeconds(0);

    return selectedDate;
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "" || timeInput.value === "") {
        alert("Please fill all fields!");
        return;
    }

    const deadline = getDeadline();
    const priority = prioritySelect.value;

    const li = document.createElement("li");
    li.classList.add(priority);

    const span = document.createElement("span");
    span.textContent = text;

    const timeInfo = document.createElement("div");
    timeInfo.classList.add("time-info");

    function updateTime() {
        const now = new Date();
        const diff = deadline - now;

        if (diff <= 0) {
            timeInfo.textContent = "⚠ Overdue!";
            li.classList.add("overdue");
            clearInterval(timer);
        } else {
            const days = Math.floor(diff / (1000*60*60*24));
            const hours = Math.floor((diff / (1000*60*60)) % 24);
            const minutes = Math.floor((diff / (1000*60)) % 60);
            timeInfo.textContent = 
                `Due: ${deadline.toLocaleString()} | Remaining: ${days}d ${hours}h ${minutes}m`;
        }
    }

    const timer = setInterval(updateTime, 60000);
    updateTime();

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = () => {
        span.classList.toggle("completed");
        updateCounter();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
        const newText = prompt("Edit task:", span.textContent);
        if (newText && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        li.remove();
        clearInterval(timer);
        updateCounter();
    };

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("task-actions");
    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    li.prepend(checkbox);
    li.appendChild(span);
    li.appendChild(timeInfo);
    li.appendChild(actionDiv);

    taskList.appendChild(li);

    taskInput.value = "";
    updateCounter();
}
function sendEmailReminder(taskText, deadlineTime) {

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        task: taskText,
        time: deadlineTime,
        to_email: "your_email@gmail.com"
    })
    .then(function(response) {
        console.log("Email sent!", response.status);
    }, function(error) {
        console.log("Failed...", error);
    });

}

addBtn.addEventListener("click", addTask);