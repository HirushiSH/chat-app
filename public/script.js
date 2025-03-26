const socket = io();
let username = prompt("Enter your name:");
let currentChat = "General";  // Default chat

// Send message
function sendMessage() {
    const input = document.getElementById('messageInput');
    if (input.value.trim()) {
        socket.emit('chat message', { user: username, text: input.value, room: currentChat });
        input.value = '';
    }
}

// Receive messages
socket.on('chat message', (msg) => {
    if (msg.room === currentChat) {  // Show messages for the selected chat
        displayMessage(msg);
    }
});

function displayMessage(msg) {
    const li = document.createElement('li');
    li.classList.add(msg.user === username ? 'sent' : 'received');
    li.innerHTML = `<strong>${msg.user}:</strong> ${msg.text} 
                    <button class="delete-btn" onclick="deleteMessage(this)">🗑️</button>`;
    document.getElementById('messages').appendChild(li);
}

// Delete messages
function deleteMessage(btn) {
    btn.parentElement.remove();
}

// Switch chat rooms
function switchChat(chatName) {
    currentChat = chatName;
    document.getElementById("currentChat").textContent = chatName;
    document.getElementById("messages").innerHTML = ""; // Clear old messages
    socket.emit("join room", chatName); // Notify server to switch room
}

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");

function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
}

function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
}

if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});
