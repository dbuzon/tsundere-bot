const chat = document.getElementsByClassName("chat")[0]
const userInput = document.querySelector("input");
const sendBtn = document.getElementsByClassName("send")[0];
let lastMessages = ["Hello, I’m TsunderAI-chan. You can ask me some questions, but I don’t have much time. Be quick! 😤"]

const createChatBubble = (message, type) => {
    let chatBubble = document.createElement("div");
    chatBubble.classList.add("chat-bubble");
    if (type === "user") chatBubble.classList.add("user");
    else chatBubble.classList.add("tsundere");
    chatBubble.innerText = message;
    chat.appendChild(chatBubble)
}

const getResponse = async (message) => {
    if (lastMessages.length == 3) lastMessages.shift();
    lastMessages.push(message);
    const response = await setTimeout(() => {return "ok";}, 2000)
    createChatBubble(response, "tsundere");
    lastMessages.push(response);
}

const sendMessage = () => {
    let message = userInput.value;
    if (!message) {
        alert("Please type something before hitting the send button!");
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