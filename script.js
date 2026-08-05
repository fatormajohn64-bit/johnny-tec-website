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

    showTypingIndicator();

    const thinkingTime = Math.min(Math.max(text.length * 20, 1000), 2200);

    // Added 'async' here and 'await' below so it waits for the Promise to resolve!
    setTimeout(async () => {
        removeTypingIndicator();

        try {
            const aiResponse = await generateSmartResponse(text);
            activeChat.messages.push({ sender: "ai", text: aiResponse });
            appendBubbleToUI("ai", aiResponse);
        } catch (err) {
            const errorMsg = "Something went wrong processing your request. Please try again! ⚠️";
            activeChat.messages.push({ sender: "ai", text: errorMsg });
            appendBubbleToUI("ai", errorMsg);
        }
        
        saveState();
    }, thinkingTime);
}
