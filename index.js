const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.use(express.static('./static'))

room = 'main_room'

io.on("connection", (socket) => {
    socket.join(room)
    console.log(socket.id)
    socket.on("get_msg", (name, text, color) => {
        socket.emit("print_msg", name, text, color)
        socket.to(room).emit("print_msg", name, text, color)
    });
});


httpServer.listen(3000);
