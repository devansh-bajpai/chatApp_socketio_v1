const express = require('express');
const app = express();

const fs = require('fs');

const { createServer } = require('node:http');
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server);


const path = require('path');
const cookieParser = require('cookie-parser')

io.on('connection', (socket) => {
    console.log('a user connected!');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

    socket.on('chat message', (msg) => {
        // console.log('chat:', msg);
        socket.broadcast.emit('loadMessage', msg);

        fs.appendFile('./message_log/log.txt', msg + '\n', (err) => {
            if(err){
                console.log(err);
            }
        })


    })

})


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/', (req, res) => {
    fs.readFile('./message_log/log.txt', 'utf-8', (err, data) => {
        let messageArray = data.split('\n');
        messageArray.pop();
        // console.log(messageArray);
        res.render('index', {messages: messageArray});
    })
})


// app.post('/submit', (req, res) => {
//     console.log(req.body);
//     res.redirect('/');
// })


server.listen(3000, () => {
    console.log('App is listening on PORT 3000');
})