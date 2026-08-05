// ============================================================================
// JOHNNY TEC AI BRAIN - RESILIENT HYBRID ENGINE (Render + Smart Fallback)
// ============================================================================

const RENDER_BACKEND_URL = "https://johnny-tec-backend.onrender.com";

async function generateSmartResponse(userQuery) {
    const rawQuery = userQuery.trim();
    const q = rawQuery.toLowerCase();

    // 1. TRY LIVE RENDER BACKEND (25s Timeout for Gemini)
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 seconds limit

        const response = await fetch(`${RENDER_BACKEND_URL}/chat`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                message: rawQuery,
                prompt: rawQuery 
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            const replyText = data.reply || data.response || data.message || data.result || data.text;
            if (replyText) return replyText;
        } else {
            console.warn(`Render API returned status code ${response.status}`);
        }
    } catch (error) {
        console.warn("Backend connection skipped/failed, using smart local engine:", error);
    }

    // 2. DYNAMIC SMART FALLBACK (Runs automatically if Render is slow, missing CORS, or offline)
    
    // Emotion recognition
    if (rawQuery.includes("🥺") || rawQuery.includes("😭") || q.includes("sad") || q.includes("help")) {
        return "Don't stress 🥺! Take a deep breath—I'm right here with you.\n\n" +
               "1. Tell me what issue you're running into.\n" +
               "2. We will break it down together step-by-step.\n" +
               "3. We'll fix it cleanly! 💡";
    }

    if (rawQuery.includes("😂") || rawQuery.includes("🤣") || q.includes("haha") || q.includes("lol")) {
        return "Haha! 😂 Gotta love it.\n\n> *Why do programmers prefer dark mode? Because light attracts bugs! 🐛*\n\nWhat are we building next?";
    }

    // Slang & Greetings
    if (/(bro|yo|sup|hey|hi|he|ho|greetings)/i.test(q)) {
        return "Yo! 👊 I'm right here. How can I help you out today?";
    }

    // Code Requests
    if (/(code|ui|html|css|javascript|website|design)/i.test(q)) {
        return "Here is a clean code structure for you 🫧:\n\n" +
               "```html\n" +
               "<!DOCTYPE html>\n" +
               "<html lang='en'>\n" +
               "<head>\n" +
               "    <meta charset='UTF-8'>\n" +
               "    <style>\n" +
               "        body { font-family: sans-serif; background: #0b0f19; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n" +
               "        .card { background: #1e293b; padding: 25px; border-radius: 12px; border: 1px solid #38bdf8; text-align: center; }\n" +
               "        button { background: #38bdf8; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; cursor: pointer; }\n" +
               "    </style>\n" +
               "</head>\n" +
               "<body>\n" +
               "    <div class='card'>\n" +
               "        <h2>Johnny Tec UI</h2>\n" +
               "        <button onclick=\"alert('Running clean code!')\">Test Button</button>\n" +
               "    </div>\n" +
               "</body>\n" +
               "</html>\n" +
               "```\n\n" +
               "Tell me what features or styles you'd like to adjust!";
    }

    // Default friendly response
    return `Got it! I processed your message: "${rawQuery}". Let's keep going—what step should we take next? 🚀`;
            }
