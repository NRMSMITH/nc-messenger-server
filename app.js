// const { Server } = require('socket.io')
const express = require('express')
const app = express();
const cors = require('cors');

app.use(cors());

const http = require('http')
const httpServer  = http.createServer(app)


app.get('/', (req, res) => {
    res.send('<h1>Just trying something out</h1>')
})



// const defaultData = {
//     user: null,
//     message: ""
// }

const chatData = new Map();

const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
io.emit('chat-message', {name: 'global', msg: `${socket.id} has joined`})

    socket.on("chat-message", (args) => {
        io.emit('chat-message', args)
    })
})

//Thinking about storing messages
//in memory data - array of messages
//push new message to array
//

module.exports = {httpServer}