// ============================================================================
// JOHNNY TEC AI BRAIN - ASYNC RENDER & LIVE WEB ENGINE
// ============================================================================

const RENDER_BACKEND_URL = "https://johnny-tec-backend.onrender.com";

async function generateSmartResponse(userQuery) {
    const rawQuery = userQuery.trim();
    const q = rawQuery.toLowerCase();

    // 1. Try sending to Render Backend first if online
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 sec timeout

        const response = await fetch(`${RENDER_BACKEND_URL}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: rawQuery }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            return data.reply || data.response || data.message;
        }
    } catch (e) {
        console.warn("Render server offline or taking too long, switching to local brain...");
    }

    // 2. Local Fallback Brain (Executes immediately if Render is sleeping)
    if (q.includes("hi") || q.includes("he") || q.includes("ho") || q.includes("hey") || q.includes("bro")) {
        return "Yo! 👊 Great to see you. How can I help you out today?";
    }

    if (q.includes("joke") || q.includes("funny")) {
        return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂";
    }

    if (q.includes("code") || q.includes("ui")) {
        return "I can help you build clean HTML, CSS, and JS code! Tell me what component you want to create. 💻";
    }

    return `Got it! I processed your input: "${rawQuery}". What would you like to build or discuss next? 🚀`;
}
