let chats = JSON.parse(localStorage.getItem("johnny_chats")) || [];
let currentChatId = localStorage.getItem("johnny_current_chat_id") || null;
let pinnedMessages = JSON.parse(localStorage.getItem("johnny_pinned")) || [];

const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");

// Start loading animation and chat setup on load
document.addEventListener("DOMContentLoaded", () => {
    runSplashAnimation();

    if (chats.length === 0) {
        createNewChat();
    } else {
        if (!currentChatId || !chats.find(c => c.id === currentChatId)) {
            currentChatId = chats[0].id;
        }
        renderActiveChat();
    }
    renderHistoryList();

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});

// Smooth Progress Animation
function runSplashAnimation() {
    let progress = 0;
    const fill = document.getElementById("progress-fill");
    const percent = document.getElementById("progress-percent");
    const loader = document.getElementById("loading-screen");

    const interval = setInterval(() => {
        if (progress < 70) {
            progress += Math.floor(Math.random() * 6) + 4;
        } else if (progress < 100) {
            progress += Math.floor(Math.random() * 4) + 2;
        }

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            percent.innerText = "100%";
            fill.style.width = "100%";

            setTimeout(() => {
                loader.classList.add("fade-out");
                setTimeout(() => {
                    loader.style.display = "none";
                }, 600);
            }, 350);
        } else {
            percent.innerText = progress + "%";
            fill.style.width = progress + "%";
        }
    }, 35);
}

function saveState() {
    localStorage.setItem("johnny_chats", JSON.stringify(chats));
    localStorage.setItem("johnny_current_chat_id", currentChatId);
    localStorage.setItem("johnny_pinned", JSON.stringify(pinnedMessages));
}

function getCurrentChat() {
    return chats.find(c => c.id === currentChatId);
}

function createNewChat() {
    const newId = "chat_" + Date.now();
    const newChat = {
        id: newId,
        title: "New Chat",
        messages: [
            { sender: "ai", text: "Hello! Welcome to Johnny Tec AI. How can I assist you today?" }
        ]
    };
    chats.unshift(newChat);
    currentChatId = newId;
    saveState();
    renderActiveChat();
    renderHistoryList();
    closeAllOverlays();
}

function renderActiveChat() {
    chatContainer.innerHTML = "";
    const activeChat = getCurrentChat();
    if (!activeChat) return;

    activeChat.messages.forEach((msg) => {
        appendBubbleToUI(msg.sender, msg.text);
    });

    if (activeChat.messages.length <= 1) {
        renderPromptChips();
    }

    scrollToBottom();
}

function appendBubbleToUI(sender, text) {
    const row = document.createElement("div");
    row.className = `message-row ${sender}`;

    const label = document.createElement("div");
    label.className = "sender-name";
    label.innerText = sender === "user" ? "You" : "Johnny Tec";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerText = text;

    if (sender === "ai") {
        const actions = document.createElement("div");
        actions.className = "bubble-actions";
        actions.innerHTML = `
            <span class="action-link" onclick="pinMessage('${encodeURIComponent(text)}')">📌 Pin</span>
            <span class="action-link" onclick="copyText('${encodeURIComponent(text)}')">📋 Copy</span>
        `;
        bubble.appendChild(actions);
    }

    row.appendChild(label);
    row.appendChild(bubble);
    chatContainer.appendChild(row);
    scrollToBottom();
}

function renderPromptChips() {
    const group = document.createElement("div");
    group.className = "suggestions-group";
    group.innerHTML = `
        <div class="chip" onclick="sendQuickPrompt('What services do you offer?')">💻 Development Services</div>
        <div class="chip" onclick="sendQuickPrompt('Tell me about Johnny Tec.Dev')">🚀 About Johnny Tec</div>
        <div class="chip" onclick="sendQuickPrompt('How fast is your performance?')">⚡ High Performance</div>
    `;
    chatContainer.appendChild(group);
}

function sendQuickPrompt(text) {
    userInput.value = text;
    sendMessage();
}

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    const activeChat = getCurrentChat();

    const chips = chatContainer.querySelector(".suggestions-group");
    if (chips) chips.remove();

    activeChat.messages.push({ sender: "user", text: text });
    if (activeChat.title === "New Chat") {
        activeChat.title = text.slice(0, 20) + "...";
        renderHistoryList();
    }

    appendBubbleToUI("user", text);
    userInput.value = "";
    saveState();

    // Simulated Smart AI Response
    setTimeout(() => {
        let aiResponse = "Thank you for reaching out! Johnny Tec.Dev delivers clean, fast, and high-performance digital solutions.";
        
        if (text.toLowerCase().includes("about") || text.toLowerCase().includes("johnny")) {
            aiResponse = "Johnny Tec.Dev builds cutting-edge web applications, clean code architectures, and high-performance user experiences.";
        } else if (text.toLowerCase().includes("services") || text.toLowerCase().includes("offer")) {
            aiResponse = "We specialize in full-stack web development, frontend UI/UX design, mobile responsiveness, and cloud integrations.";
        }

        activeChat.messages.push({ sender: "ai", text: aiResponse });
        appendBubbleToUI("ai", aiResponse);
        saveState();
    }, 600);
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/* UI Overlay Handlers */
function toggleDrawer() {
    closeRightMenu();
    const drawer = document.getElementById("left-drawer");
    const backdrop = document.getElementById("backdrop");
    drawer.classList.toggle("open");
    backdrop.classList.toggle("show", drawer.classList.contains("open"));
}

function toggleRightMenu() {
    closeDrawer();
    document.getElementById("right-menu").classList.toggle("show");
}

function closeDrawer() {
    document.getElementById("left-drawer").classList.remove("open");
    document.getElementById("backdrop").classList.remove("show");
}

function closeRightMenu() {
    document.getElementById("right-menu").classList.remove("show");
}

function closeAllOverlays() {
    closeDrawer();
    closeRightMenu();
    document.getElementById("pinned-modal").classList.remove("show");
    document.getElementById("backdrop").classList.remove("show");
}

function renderHistoryList() {
    const container = document.getElementById("history-list");
    container.innerHTML = "";

    chats.forEach(chat => {
        const item = document.createElement("div");
        item.className = `history-item ${chat.id === currentChatId ? 'active' : ''}`;
        item.innerText = chat.title;
        item.onclick = () => {
            currentChatId = chat.id;
            saveState();
            renderActiveChat();
            renderHistoryList();
            closeAllOverlays();
        };
        container.appendChild(item);
    });
}

function deleteCurrentChat() {
    closeRightMenu();
    chats = chats.filter(c => c.id !== currentChatId);
    if (chats.length === 0) {
        createNewChat();
    } else {
        currentChatId = chats[0].id;
        saveState();
        renderActiveChat();
        renderHistoryList();
    }
    showToast("Chat cleared!");
}

function pinMessage(encodedText) {
    const text = decodeURIComponent(encodedText);
    if (!pinnedMessages.includes(text)) {
        pinnedMessages.push(text);
        saveState();
        showToast("Pinned! 📌");
    }
}

function openPinnedModal() {
    closeRightMenu();
    const content = document.getElementById("pinned-content");
    content.innerHTML = pinnedMessages.length === 0 ? "<p style='color: var(--text-muted); font-size: 0.85rem;'>No pinned messages yet.</p>" : pinnedMessages.map(m => `
        <div style="background: var(--card-bg); padding: 10px; border-radius: 8px; margin-bottom: 8px; font-size: 0.85rem;">${m}</div>
    `).join("");
    document.getElementById("pinned-modal").classList.add("show");
    document.getElementById("backdrop").classList.add("show");
}

function shareConversation() {
    closeRightMenu();
    showToast("Transcript ready to share!");
}

function copyText(encodedText) {
    navigator.clipboard.writeText(decodeURIComponent(encodedText));
    showToast("Copied to clipboard!");
}

function showToast(msg) {
    const toast = document.getElementById("toast-msg");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
        }
        
