// ============================================================================
// JOHNNY TEC AI BRAIN (Modularized)
// ============================================================================
function generateSmartResponse(userQuery) {
    const q = userQuery.toLowerCase().trim();

    // 1. Greetings (Short & Friendly)
    if (q === "hi" || q === "hey" || q === "hello" || q === "sup" || q === "good morning" || q === "good afternoon") {
        const replies = [
            "Hey there! Great to see you. How can I help you out today? 😊",
            "Hello! What's up? Ready to build something awesome or chat?",
            "Hey! Hope you're having a wonderful day. What's on your mind?"
        ];
        return replies[Math.floor(Math.random() * replies.length)];
    }

    // 2. Identity / Creator Questions
    if (q.includes("who is johnny") || q.includes("who are you") || q.includes("what is your name")) {
        return "I'm Johnny Tec AI, your personal digital companion and tech assistant built by Johnny Tec.Dev! I'm designed to help you write code, answer questions, brainstorm ideas, and keep our digital workflow super smooth and fast. ⚡";
    }

    // 3. Asking about specific names (like Sana or others)
    if (q.includes("sana")) {
        return "Sana! That's a lovely name. Though I don't have personal data on everyone in the real world unless you fill me in, if Sana is a friend, family member, or a project collaborator of yours, I bet they're pretty awesome! Would you like to tell me more about them?";
    }

    // 4. Coding / Technical Help (Detailed & Helpful)
    if (q.includes("code") || q.includes("html") || q.includes("javascript") || q.includes("css") || q.includes("program")) {
        return "I'd love to help you code! Whether you need HTML structures, CSS styling tricks, or JavaScript logic, just tell me what features you're trying to build, and I'll write clean, high-performance code for you right here.";
    }

    // 5. Jokes
    if (q.includes("joke") || q.includes("funny")) {
        return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂";
    }

    // 6. Capabilities / Services
    if (q.includes("services") || q.includes("what can u") || q.includes("what can you")) {
        return "I can help you with a bunch of things! Here are my main skills:\n• Writing & debugging code (HTML, CSS, JS)\n• Answering general knowledge questions\n• Brainstorming creative ideas and project names\n• Having friendly, human-like conversations\n\nWhat would you like to dive into?";
    }

    // 7. Fallback for general questions (Smart & Adaptive length)
    return `That's a really interesting question about "${userQuery}"! As your AI assistant, I'm continuously learning and exploring ideas with you. If you want to dive deeper into this topic, break it down into smaller parts or let me know what specific angle you're curious about!`;
        }
