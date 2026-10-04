/**
 * In-Browser Embedded AI Assistant Engine
 * 100% Free & Zero Server Costs
 */

const PORTFOLIO_KNOWLEDGE = [
  {
    keywords: ['skill', 'stack', 'technology', 'technologies', 'code', 'programming', 'language', 'framework'],
    response: "I specialize in modern Web Development & AI integration! My tech stack includes:\n• Frontend: JavaScript (ES6+), React/Vite, HTML5, Modern CSS (Glassmorphism & tokens)\n• AI Tech: In-Browser Transformers.js, Groq & Gemini APIs, Prompt Engineering\n• Hosting & Tools: GitHub Pages ($0 free hosting), Git, Figma, and Vite."
  },
  {
    keywords: ['project', 'work', 'portfolio', 'built', 'app', 'demo'],
    response: "Here are some highlight projects featured on this site:\n1. 🤖 **Zero-Cost Portfolio AI**: An embedded in-browser chatbot running with zero server fees on GitHub Pages.\n2. 💻 **Glassmorphism UI System**: A high-performance dark/light responsive web system.\n3. 📦 **GitHub Pages Deploy Kit**: Vite static deployment setup for free web hosting."
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'message', 'touch', 'linkedin', 'github'],
    response: "You can reach out anytime!\n• 📧 Email: your.email@example.com\n• 🐙 GitHub: github.com/your-username\n• 💼 LinkedIn: linkedin.com/in/your-profile\n\nOr scroll down to the Contact Form below to send a message directly!"
  },
  {
    keywords: ['cost', 'free', 'money', 'price', 'ai', 'host', 'hosting', 'github pages'],
    response: "Good news! **This website and embedded AI are 100% FREE!** 🚀\n\n• **Website Hosting**: Free forever using **GitHub Pages**.\n• **AI Chatbot**: Runs directly in your browser or calls free tier API endpoints (like Groq or HuggingFace).\n• **Zero monthly bills** and zero server maintenance required!"
  },
  {
    keywords: ['experience', 'job', 'background', 'bio', 'who are you', 'about'],
    response: "I'm a Full-Stack Developer & AI Enthusiast! I build responsive web apps, intuitive UI/UX designs, and smart embedded AI experiences that cost nothing to host."
  }
];

export class AIAssistant {
  constructor(chatBodyEl, inputFormEl, inputFieldEl) {
    this.chatBody = chatBodyEl;
    this.form = inputFormEl;
    this.input = inputFieldEl;
    this.initEvents();
  }

  initEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.input.value.trim();
      if (text) {
        this.handleUserQuery(text);
        this.input.value = '';
      }
    });

    // Delegated click for quick prompt pills
    this.chatBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('prompt-pill')) {
        const promptText = e.target.getAttribute('data-prompt');
        if (promptText) {
          this.handleUserQuery(promptText);
        }
      }
    });
  }

  handleUserQuery(queryText) {
    // 1. Render User Message Bubble
    this.appendMessage(queryText, 'user');

    // 2. Hide quick prompt pills if active
    const quickPrompts = document.getElementById('quick-prompts');
    if (quickPrompts) {
      quickPrompts.style.display = 'none';
    }

    // 3. Render Typing Indicator
    const typingBubble = this.appendTypingIndicator();

    // 4. Generate Response after brief natural delay
    setTimeout(() => {
      typingBubble.remove();
      const responseText = this.generateResponse(queryText);
      this.streamAssistantMessage(responseText);
    }, 600);
  }

  generateResponse(queryText) {
    const lower = queryText.toLowerCase();

    for (const item of PORTFOLIO_KNOWLEDGE) {
      if (item.keywords.some(kw => lower.includes(kw))) {
        return item.response;
      }
    }

    return `Thanks for asking! I'm your embedded portfolio assistant. You can ask me about my **skills**, **projects**, **how to contact me**, or **how this AI is 100% free**! What would you like to explore?`;
  }

  appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}-message`;
    
    const avatar = sender === 'user' ? 'fa-user' : 'fa-robot';
    
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid ${avatar}"></i></div>
      <div class="msg-bubble">${this.formatText(text)}</div>
    `;

    this.chatBody.appendChild(msgDiv);
    this.scrollToBottom();
    return msgDiv;
  }

  appendTypingIndicator() {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message assistant-message typing-indicator';
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-bubble"><i class="fa-solid fa-ellipsis fa-beat-fade"></i> AI is thinking...</div>
    `;
    this.chatBody.appendChild(msgDiv);
    this.scrollToBottom();
    return msgDiv;
  }

  streamAssistantMessage(fullText) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message assistant-message';
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-bubble"></div>
    `;
    this.chatBody.appendChild(msgDiv);

    const bubble = msgDiv.querySelector('.msg-bubble');
    let index = 0;

    const interval = setInterval(() => {
      index += 3;
      if (index >= fullText.length) {
        bubble.innerHTML = this.formatText(fullText);
        clearInterval(interval);
        this.scrollToBottom();
      } else {
        bubble.innerHTML = this.formatText(fullText.substring(0, index));
        this.scrollToBottom();
      }
    }, 20);
  }

  formatText(text) {
    // Basic Markdown Formatting
    return text
      .replace(/\n/g, '<br/>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/• (.*?)(<br\/>|$)/g, '• $1$2');
  }

  scrollToBottom() {
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }
}
