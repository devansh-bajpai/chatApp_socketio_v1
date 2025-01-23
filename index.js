const express = require('express');
const app = express();

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
        console.log('chat:', msg);
    })
})


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.render('index');
})


// app.post('/submit', (req, res) => {
//     console.log(req.body);
//     res.redirect('/');
// })


server.listen(3000, () => {
    console.log('App is listening on PORT 3000');
})