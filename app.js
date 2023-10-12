const { Server } = require('socket.io')
const express = require('express')
const app = express();
const cors = require('cors');

app.use(cors());

const http = require('http')
const httpServer  = http.createServer(app)


app.get('/', (req, res) => {
    res.send('<h1>Just trying something out</h1>')
})

httpServer.listen(3000, () => {
    console.log('server running on 3000')
})

const defaultData = {
    user: null,
    message: ""
}

const chatData = new Map();

const io = new Server(httpServer, {
    cors: { origin: "*" },
});

io.on('connection', (socket) => {console.log('a user connected')})