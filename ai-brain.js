// ============================================================================
// JOHNNY TEC AI BRAIN (Upgraded for Natural Chat, Slang, & Casual Flow)
// ============================================================================
function generateSmartResponse(userQuery) {
    const q = userQuery.toLowerCase().trim();

    // 1. Slang & Casual Greetings ("Bro", "Yo", "Sup", "Hey")
    if (q.includes("bro") || q.includes("yo") || q.includes("sup") || q.includes("whats up") || q.includes("what's up")) {
        const replies = [
            "Yo! What's up man? How can I help you out today? 👊",
            "Hey bro! What are we working on or chatting about?",
            "Yo! I'm right here. What's on your mind?"
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    if (q === "hi" || q === "hey" || q === "hello" || q === "greetings" || q === "good morning" || q === "good afternoon") {
        const replies = [
            "Hey there! Great to see you. How can I help you out today? 😊",
            "Hello! What's up? Ready to build something awesome or just chat?",
            "Hey! Hope you're having a wonderful day. What's on your mind?"
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // 2. Reactions to Jokes / Humor ("Haha", "Lol", "Nice joke")
    if (q.includes("haha") || q.includes("lol") || q.includes("lmao") || q.includes("nice joke") || q.includes("funny")) {
        const replies = [
            "Haha, glad you liked it! 😂 Got any other requests or want to code something?",
            "Haha right? Gotta love tech humor. What's next on your mind?",
            "Haha! 😂 Glad I could make you smile. What can I do for you now?"
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // 3. Identity / Creator Questions
    if (q.includes("who is johnny") || q.includes("who are you") || q.includes("what is your name")) {
        return "I'm Johnny Tec AI, your personal digital companion and tech assistant built by Johnny Tec.Dev! I'm here to chat, write code, and help you build cool stuff. ⚡";
    }

    // 4. Asking about specific names (like Sana)
    if (q.includes("sana")) {
        return "Sana is a cool name! If Sana is a friend or teammate of yours, I bet they're awesome. Do you want to write some code or build a page for them?";
    }

    // 5. Coding & UI Requests ("Write a code", "simple ui", "html", etc.)
    if (q.includes("code") || q.includes("ui") || q.includes("html") || q.includes("javascript") || q.includes("css") || q.includes("program") || q.includes("website")) {
        return "I got you! Here is a clean, simple, and responsive UI template you can use right away:\n\n```html\n<!DOCTYPE html>\n<html lang='en'>\n<head>\n    <meta charset='UTF-8'>\n    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n    <title>Simple UI</title>\n    <style>\n        body { font-family: sans-serif; background: #0f172a; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n        .card { background: #1e293b; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); text-align: center; }\n        h1 { color: #38bdf8; margin-bottom: 10px; }\n        button { background: #38bdf8; border: none; padding: 10px 20px; color: #0f172a; font-weight: bold; border-radius: 6px; cursor: pointer; }\n    </style>\n</head>\n<body>\n    <div class='card'>\n        <h1>Hello World</h1>\n        <p>This is a clean and simple UI template!</p>\n        <button onclick=\"alert('Clicked!')\">Click Me</button>\n    </div>\n</body>\n</html>\n```\nLet me know if you want to customize the style or add more features!";
    }

    // 6. Compliments / General positive feedback
    if (q.includes("cool") || q.includes("awesome") || q.includes("thanks") || q.includes("thank you")) {
        return "Anytime! Let me know if you need anything else. I'm always here to help you out! 🚀";
    }

    // 7. Natural Conversational Fallback (Friendly & Human, no robotic quotes)
    const fallbacks = [
        "I hear you! Tell me a bit more about what you mean so I can help you out better.",
        "That's cool! What would you like to do next with that?",
        "Got it! Want me to write some code for it or brainstorm some ideas?",
        "I'm listening! Tell me more or let me know how you want to proceed."
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}
