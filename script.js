const chat = document.getElementsByClassName("chat")[0]
const userInput = document.querySelector("input");
const sendBtn = document.getElementsByClassName("iconify send")[0];

const createChatBubble = (message) => {
    let chatBubble = '<div class="chat-bubble user">'+ message +'</div>'
    chat.innerHTML += chatBubble
}

const sendMessage = () => {
    let message = userInput.value;
    if (!message) alert("Please type something before hitting the send button!");
    else {
        createChatBubble(message);
        userInput.value = "";
    }
}


sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') sendMessage();s
})