const chat = document.getElementsByClassName("chat")[0]
const userInput = document.querySelector("input");
const sendBtn = document.getElementsByClassName("send")[0];
let lastMessages = ["what do you do?", "Hello, I’m TsunderAI-chan. You can ask me some questions, but I don’t have much time. Be quick! 😤"]

const decryptKey = () => {
    let secret = "tl.OUPOE:rTGcdxbBWWK8X[U4CmclGKyZtWNs7f7K{3gVxkS:94";
    let decrypt = "";
    for (let i = 0; i < secret.length; i++) {
        decrypt += String.fromCharCode(secret.charCodeAt(i)-1);
    }
    
    return decrypt;
}

const createChatBubble = (message, type) => {
    let chatBubble = document.createElement("div");
    chatBubble.classList.add("chat-bubble");
    if (type === "user") chatBubble.classList.add("user");
    else chatBubble.classList.add("tsundere");
    chatBubble.innerText = message;
    chat.appendChild(chatBubble)
}

const getPrompt = () => {
    let prompt = "Answer me as a tsundere character would:\n";
    prompt += `q: ${lastMessages[0]}\n`;
    prompt += `a: ${lastMessages[1]}\n`;
    prompt += `q: ${lastMessages[2]}\n`;
    prompt += `a: `;
    return prompt;
}

const getResponse = async (message) => {
    if (lastMessages.length == 3) lastMessages.shift();
    lastMessages.push(message);

    const header = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+decryptKey()
    });
    const url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
    const response = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify({"prompt": getPrompt(), "max_tokens": 64})
    });
    
    const answer = await response.json();
    const data = answer.choices[0].text.trim();
    createChatBubble(data, "tsundere");
    lastMessages.shift();
    lastMessages.push(data);
}

const sendMessage = () => {
    let message = userInput.value;
    if (!message) {
        alert("Please type something before sending the message!");
    }
    else {
        createChatBubble(message, "user");
        getResponse(message);
        userInput.value = "";
    }
}


sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') sendMessage();
})