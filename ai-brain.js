// ============================================================================
// JOHNNY TEC AI BRAIN - LIVE WEB & DYNAMIC ENGINE
// ============================================================================

async function generateSmartResponse(userQuery) {
    const rawQuery = userQuery.trim();
    const q = rawQuery.toLowerCase();

    // 1. LIVE NEWS FETCHING (Fetches real-time tech news from the web!)
    if (q.includes("news") || q.includes("headlines") || q.includes("latest")) {
        try {
            const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
            const storyIds = await response.json();
            
            // Fetch top 3 live stories
            let newsHtml = "📰 **Here are the latest live tech headlines:**\n\n";
            for (let i = 0; i < 3; i++) {
                const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`);
                const item = await itemRes.json();
                if (item && item.title && item.url) {
                    newsHtml += `• [${item.title}](${item.url})\n`;
                }
            }
            newsHtml += "\n*Fetched live from the web! What else would you like to check? 🚀*";
            return newsHtml;
        } catch (error) {
            return "I tried fetching the latest live news from the web, but ran into a network connection issue. Check your connection and try again! 🌐";
        }
    }

    // 2. EMOJI EMOTION RECOGNITION
    if (rawQuery.includes("🥺") || rawQuery.includes("😭") || q.includes("sad") || q.includes("help")) {
        return "I see those emojis 🥺. Don't stress—we've got this. \n\n" +
               "**How should we proceed?**\n" +
               "1. Tell me what's giving you a hard time.\n" +
               "2. We'll break it down into simple steps.\n" +
               "3. I'll write the solution for you.";
    }

    if (rawQuery.includes("😂") || rawQuery.includes("🤣") || q.includes("haha") || q.includes("lol")) {
        return "Haha! 😂 Love the energy. \n\n" +
               "> *Why do programmers prefer dark mode? Because light attracts bugs! 🐛*\n\n" +
               "Want to build something cool or look at some live news?";
    }

    // 3. CODE & UI REQUESTS
    if (q.includes("code") || q.includes("ui") || q.includes("html") || q.includes("css") || q.includes("javascript") || q.includes("website")) {
        return "Here is a clean, modern, and production-ready code template for you 🫧:\n\n" +
               "```html\n" +
               "<!DOCTYPE html>\n" +
               "<html lang='en'>\n" +
               "<head>\n" +
               "    <meta charset='UTF-8'>\n" +
               "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n" +
               "    <title>Johnny Tec App</title>\n" +
               "    <style>\n" +
               "        body { font-family: sans-serif; background: #0b0f19; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n" +
               "        .box { background: #1e293b; padding: 30px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); text-align: center; }\n" +
               "        h2 { color: #38bdf8; margin-top: 0; }\n" +
               "        button { background: #38bdf8; border: none; padding: 10px 20px; color: #0b0f19; font-weight: bold; border-radius: 6px; cursor: pointer; margin-top: 10px; }\n" +
               "    </style>\n" +
               "</head>\n" +
               "<body>\n" +
               "    <div class='box'>\n" +
               "        <h2>Clean UI Ready</h2>\n" +
               "        <p>Fully organized and responsive.</p>\n" +
               "        <button onclick=\"alert('Works perfectly!')\">Test Button</button>\n" +
               "    </div>\n" +
               "</body>\n" +
               "</html>\n" +
               "```\n\n" +
               "**Next steps:** Let me know if you want to add styles, JavaScript logic, or extra components!";
    }

    // 4. GENERAL DYNAMIC CONVERSATION (Handles any spelling or questions organically)
    return `I processed your question: "${rawQuery}". As Johnny Tec AI, I'm here to adapt to whatever you throw at me.\n\n` +
           `• If you want **live news**, just type: *"Give me tech news"* 📰\n` +
           `• If you want **code**, just tell me what to build 💻\n\n` +
           `How would you like to take this forward?`;
}
