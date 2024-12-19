const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const responses = {
    "hello": {
        message: "Hi there! How can I assist you today?",
        options: ["Learn about services", "Contact support", "Provide feedback"]
    },
    "learn about services": {
        message: "We offer services in freelancing, startups, and tech solutions. Choose one:",
        options: ["Freelancing", "Startup support", "Other services"]
    },
    "freelancing": {
        message: "As a freelancer, you can ask about:<br>1. Managing projects.<br>2. Finding clients.<br>3. Pricing strategies.",
        options: ["Managing projects", "Finding clients", "Pricing strategies"]
    },
    "managing projects": {
        message: "Managing projects effectively involves:<br>- Defining clear goals.<br>- Using project management tools.<br>- Effective communication with clients.",
        options: []
    },
    "finding clients": {
        message: "Finding clients can be done via:<br>- Networking.<br>- Platforms like Upwork or Fiverr.<br>- Building a strong portfolio.",
        options: []
    },
    "pricing strategies": {
        message: "Pricing strategies include:<br>- Hourly rates.<br>- Fixed pricing.<br>- Value-based pricing.",
        options: []
    },
    "contact support": {
        message: "Our dedicated team is here to help! Please describe your concern.",
        options: []
    },
    "provide feedback": {
        message: "We value your feedback! Please type your suggestions below.",
        options: []
    },
    "default": {
        message: "I'm sorry, I didn't catch that. Could you clarify or choose an option?",
        options: []
    }
};

function appendMessage(message, isBot, options = []) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', isBot ? 'bot-message' : 'user-message');
    messageElement.innerHTML = message;
    chatBody.appendChild(messageElement);

    if (isBot && options.length > 0) {
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-button');
            button.textContent = option;
            button.addEventListener('click', () => handleOptionClick(option));
            optionsContainer.appendChild(button);
        });
        chatBody.appendChild(optionsContainer);
    }

    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
}

function handleOptionClick(option) {
    appendMessage(option, false);
    simulateResponse(option.toLowerCase());
}

function simulateResponse(userMessage) {
    const response = responses[userMessage] || responses['default'];
    setTimeout(() => {
        appendMessage(response.message, true, response.options);
    }, 1000);
}

sendBtn.addEventListener('click', () => {
    const userMessage = userInput.value.trim().toLowerCase();
    if (userMessage) {
        appendMessage(userMessage, false);
        userInput.value = '';
        simulateResponse(userMessage);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
