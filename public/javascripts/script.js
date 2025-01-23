const socket = io();

const form = document.querySelector('#chatForm');
const input = document.querySelector('#messageBoxInput');

const mainChatWindow = document.querySelector('#mainChatWindow');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        const sentMessageDiv = document.createElement('div');
        sentMessageDiv.className = 'sentMessageDiv';
        sentMessageDiv.innerHTML = `<div class='sentMessage'><p class='messageText'>${input.value}</p></div>`;

        input.value = '';

         mainChatWindow.appendChild(sentMessageDiv);
      }
});

socket.on('loadMessage', (msg) => {
  console.log(msg, 'ahafh')
        const receivedMessageDiv = document.createElement('div');
        receivedMessageDiv.className = 'receivedMessageDiv';
        receivedMessageDiv.innerHTML = `<div class='receivedMessage'><p class='messageText'>${msg}</p></div>`;

      mainChatWindow.appendChild(receivedMessageDiv);

})

// console.log(document.querySelector('.sentMessageDiv').innerHTML);