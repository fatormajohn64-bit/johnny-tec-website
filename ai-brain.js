// ai-brain.js — Johnny Tec AI Frontend Brain

// 👉 Replace with your actual live Render URL, e.g.:
// "https://johnny-tec-database.onrender.com/chat"
const BACKEND_URL = "https://YOUR-RENDER-APP-NAME.onrender.com/chat";

// Give this browser a stable session id so the backend can keep track
// of the conversation and Johnny Tec remembers what you talked about.
function getSessionId() {
  let sessionId = localStorage.getItem("johnny_tec_session");
  if (!sessionId) {
    sessionId = "session-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);
    localStorage.setItem("johnny_tec_session", sessionId);
  }
  return sessionId;
}

async function generateSmartResponse(userMessage) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMessage,
        sessionId: getSessionId()
      })
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.reply) {
      throw new Error("No reply field in backend response.");
    }

    return data.reply;

  } catch (error) {
    console.error("AI Brain Error:", error);
    return "Hmm, I couldn't reach my brain on the server 🧠⚡ — give it a sec (Render free tier can take ~30s to wake up) and try again!";
  }
}
