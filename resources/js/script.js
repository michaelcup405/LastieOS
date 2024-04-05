function openChat() {
    let chat = document.createElement('iframe');
    chat.src = 'https://onlinesequencer.net/chat'
    document.body.appendChild(chat);
}