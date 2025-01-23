const socket = io();

const form = document.querySelector('#chatForm');
const input = document.querySelector('#messageBoxInput');

const mainChatWindow = document.querySelector('#mainChatWindow');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';

      }
})