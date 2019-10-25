const express = require("express");
const app = express();
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on("connection", client => {

    client.on("join-room", data=> {
        debugger
        client.join(data.pin)
    })
    
    client.on("signup", data=> {
        client.join(data.pin)
        io.to(data.pin).emit("player-joined", {username: data.username})
    })
    
    client.on("start-game", (data)=>{
        io.to(data.pin).emit("game-started")
    })

})

io.of("/questions").on("connection", client => {
    
    client.on("join-room", data => {
        debugger
        client.join(data.pin)
    })

    client.on("answer-question", data => {
        debugger
        io.of("/questions").to(data.pin).emit("question-answered", data);
    })
})

server.listen(3000);

