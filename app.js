// const { Server } = require('socket.io')
const express = require('express')
const app = express();
const cors = require('cors');

app.use(cors());

const http = require('http');
const httpServer  = http.createServer(app)


app.get('/', (req, res) => {
    res.send('<h1>Just trying something out</h1>')
})



// const defaultData = {
//     user: null,
//     message: ""
// }

// const chatData = new Map();

const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});


let roomid = ''

io.on('connection', (socket) => {
io.emit('chat-message', {name: 'global', msg: `${socket.id} has joined`})
let chatHistory = []
const users = []
    socket.on('create-room', (ackFunction) => {
        roomid = socket.id        
        ackFunction(roomid)
    })
    socket.on("chat-message", (msg, room) => {
        io.to(room).emit('chat-message', msg)
        chatHistory.push(msg)
    })
    socket.on("chat-history", (args) => {
        console.log(args)
    })
    socket.on('chat-delete', (ackFunction) => {
        chatHistory = [];
        ackFunction()
    })
    socket.on('join-room', (ackFunction) => {
        socket.join(roomid)
        ackFunction(roomid)
    })
    socket.emit('chat-history', chatHistory)

    socket.on('user-add', (user, ackFunction) => {
        users.push(user)
        ackFunction(user)
    })
})



module.exports = {httpServer}