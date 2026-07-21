// ========================================
// CHAT WIDGET
// ========================================

(function() {
    'use strict';

    let isChatOpen = false;

    window.toggleChat = function() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            isChatOpen = !isChatOpen;
            chatWindow.classList.toggle('open', isChatOpen);
        }
    };

    window.sendChatMessage = function() {
        const input = document.getElementById('chatInput');
        const messages = document.getElementById('chatMessages');
        const text = input?.value.trim();
        
        if (!text) return;

        // User message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg chat-msg-user';
        userMsg.innerHTML = `<div class="chat-msg-content">${text}</div>`;
        messages.appendChild(userMsg);
        messages.scrollTop = messages.scrollHeight;
        input.value = '';

        // Auto-reply
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-msg chat-msg-bot';
            const responses = [
                'Thank you for your message! Our team will get back to you shortly. 📧',
                'Great question! Let me connect you with our support team. 👨‍💻',
                'I appreciate your interest in School OS! Let me help you with that. 🚀',
                'We\'re here to help! What specific information are you looking for? 💡'
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            botMsg.innerHTML = `<div class="chat-msg-content">${response}</div>`;
            messages.appendChild(botMsg);
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
    };

    // Enter key support
    document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.sendChatMessage();
        }
    });

})();