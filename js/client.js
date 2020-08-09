const socket = io('http://localhost:8000');
const form = document.getElementById('formId');
const msgbody = document.querySelector(".chat-body");
const chat = document.querySelector("#chat")

const addChat = (message, position) => {
    const div = document.createElement("div");
    div.innerText = message;
    div.classList.add('message');
    div.classList.add(position)
    msgbody.appendChild(div);
}

const name = prompt("Enter the username");
socket.emit('user-joined', name);

socket.on('new-user-joined', name => {
    addChat(name + ' has joined the chat', 'right')
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    addChat(chat.value, 'right');
    socket.emit('sent', chat.value);
    chat.value = '';
})

socket.on('receive', data => {
    addChat(data.name + " : " + data.message, 'left');
})


socket.on('end', user => {
    addChat(user + " has disconnected", 'left')
})