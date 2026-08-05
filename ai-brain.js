// ============================================================================
// JOHNNY TEC AI BRAIN - ADVANCED SMART ENGINE
// ============================================================================
function generateSmartResponse(userQuery) {
    const rawQuery = userQuery.trim();
    const q = rawQuery.toLowerCase();

    // 1. EMOJI EMOTION DETECTION
    if (rawQuery.includes("🥺") || rawQuery.includes("😭") || q.includes("sad") || q.includes("help me") || q.includes("stress")) {
        return "I notice you're feeling a bit down or stressed 🥺. Take a deep breath—I'm right here with you. \n\n" +
               "**Let's take it step-by-step:**\n" +
               "1. Tell me what's bothering you or what project is frustrating you.\n" +
               "2. We will break it down into tiny, easy pieces.\n" +
               "3. I'll handle the heavy lifting for you.\n\n" +
               "What would you like to tackle first? 💡";
    }

    if (rawQuery.includes("😂") || rawQuery.includes("🤣") || q.includes("haha") || q.includes("lol") || q.includes("fun")) {
        return "Haha, love that energy! 😂 Life's too short not to smile.\n\n" +
               "Here is a quick tech joke for you:\n" +
               "> *Why do programmers prefer dark mode? Because light attracts bugs! 🐛*\n\n" +
               "**What's next on your mind?**\n" +
               "• Want me to write a clean code snippet? 💻\n" +
               "• Want to brainstorm a cool idea? 🚀";
    }

    // 2. TYPO-TOLERANT GREETINGS & SLANG (Bro, Yo, Sup, Hi)
    if (/(bro|yo|sup|hey|hi|hello|greeet|morning)/i.test(q)) {
        return "Yo! Great to see you 👊. I'm locked in and ready to help.\n\n" +
               "**Here are a few things we can do right now:**\n" +
               "1. Write clean frontend code (HTML/CSS/JS)\n" +
               "2. Build a simple and clean UI layout\n" +
               "3. Answer any questions or debug code\n\n" +
               "What are we building today? 🚀";
    }

    // 3. TYPO-TOLERANT CODING & UI REQUESTS (cod, code, ui, website, html, css, js)
    if (/(cod|progrm|deve|websit|ui|design|html|css|javas|script)/i.test(q)) {
        return "I got you! Let's write some clean, high-performance code step-by-step 🫧.\n\n" +
               "Here is a clean, modern, and responsive UI template:\n\n" +
               "```html\n" +
               "<!DOCTYPE html>\n" +
               "<html lang='en'>\n" +
               "<head>\n" +
               "    <meta charset='UTF-8'>\n" +
               "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n" +
               "    <title>Johnny Tec Clean UI</title>\n" +
               "    <style>\n" +
               "        body { font-family: system-ui, sans-serif; background: #0b0f19; color: #f8fafc; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n" +
               "        .card { background: #1e293b; padding: 32px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.4); text-align: client; width: 320px; border: 1px solid rgba(255,255,255,0.05); }\n" +
               "        h2 { color: #38bdf8; margin-top: 0; }\n" +
               "        button { background: linear-gradient(135deg, #38bdf8, #818cf8); border: none; padding: 12px 20px; color: #0b0f19; font-weight: bold; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 15px; transition: opacity 0.2s; }\n" +
               "        button:hover { opacity: 0.9; }\n" +
               "    </style>\n" +
               "</head>\n" +
               "<body>\n" +
               "    <div class='card'>\n" +
               "        <h2>Clean UI</h2>\n" +
               "        <p>Built with clean structure and high performance.</p>\n" +
               "        <button onclick=\"alert('Action executed successfully!')\">Click Me</button>\n" +
               "    </div>\n" +
               "</body>\n" +
               "</html>\n" +
               "```\n\n" +
               "**Suggested next steps:**\n" +
               "• Do you want me to add dark/light mode toggle?\n" +
               "• Do you want JavaScript interaction logic added to this?\n" +
               "• Tell me what specific feature you want to add next!";
    }

    // 4. IDENTITY / CREATOR
    if (/(who.*johnny|who.*you|your name)/i.test(q)) {
        return "I'm **Johnny Tec AI**, your high-performance personal digital assistant built by Johnny Tec.Dev! ⚡\n\n" +
               "I'm designed to help you code cleanly, organize your workflow, and chat smoothly like a professional platform.\n\n" +
               "**How would you like to proceed?**\n" +
               "• Ask me a technical question\n" +
               "• Request a custom code template\n" +
               "• Share what you're working on";
    }

    // 5. SPECIFIC NAMES (Like Sana)
    if (/(sana)/i.test(q)) {
        return "Sana is a wonderful name! ✨ If Sana is someone special or a collaborator on your project, I'm sure they bring great energy.\n\n" +
               "**Would you like to:**\n" +
               "• Create a custom profile card or website page for Sana?\n" +
               "• Write a nice message or code snippet?";
    }

    // 6. INTELLIGENT STEP-BY-STEP FALLBACK FOR ANY MISSPELLED OR COMPLEX QUESTION
    return `I understand you're asking about "${rawQuery}". Let's break this down step-by-step to get you the exact result you need:\n\n` +
           `1. **Analyze:** We look at what you want to achieve.\n` +
           `2. **Draft:** I format the solution clearly with organized text or clean code.\n` +
           `3. **Refine:** You tell me what to tweak.\n\n` +
           `Could you give me a little more detail or specify if you need code, an explanation, or creative ideas? 💡`;
}
