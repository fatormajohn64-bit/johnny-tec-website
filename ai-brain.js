// ============================================================================
// JOHNNY TEC AI BRAIN - RENDER BACKEND & SQLITE CONNECTOR
// ============================================================================

const RENDER_BACKEND_URL = "https://johnny-tec-backend.onrender.com";

async function generateSmartResponse(userQuery) {
    try {
        // 1. Send message to your live Render Backend & SQLite database
        const response = await fetch(`${RENDER_BACKEND_URL}/chat`, { // adjust endpoint (/api/chat or /chat) if needed
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userQuery,
                prompt: userQuery
            })
        });

        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();

        // 2. Return the Gemini response saved by your backend
        return data.reply || data.response || data.message || "Message received and saved to database!";

    } catch (error) {
        console.error("Backend Error:", error);
        
        // Render Free Tier takes ~50 seconds to wake up if it was sleeping
        return "⚠️ **Connecting to Render Backend...**\n\n" +
               "Render free tier servers go to sleep after 15 minutes. " +
               "Please wait about 30 seconds for the server to wake up, then try sending your message again!";
    }
}
