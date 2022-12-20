//IMPORTS
const exp = require("constants");
const express=require("express");
const http =require("http");
const mongoose =require("mongoose");

mongoose.set('strictQuery', false);

//create a server
const app =express();
const port= process.env.PORT || 3000;
var server =http.createServer(app);
const Room=require('./models/room');
var io=require('socket.io').listen(server);

// var io=require('socket.io')(server);

//middle ware
app.use(express.json());

//connect to mongodb
const DB="mongodb+srv://santosh:tictactoequantum@cluster0.bkai3ed.mongodb.net/?retryWrites=true&w=majority";


// //listening to socket io events from the client or flutter code
io.on("connection", (socket) => {
console.log('connected!!');
socket.on('createRoom',async ({nickname})=>{
    console.log(nickname);
try{
//room is created 
        let room=new Room();
        let player={
            socketId:socket.id,
            nickname,
            playerType:"X",
        };
        room.player.push(player);
        room.turn=player;
        room=await room.save();
        console.log(room);
        const roomId=room._id.toString();
        socket.join(roomId);
        //io -> send data to everyone 
        // socket -> sending data to yourself
        //tell our clinet room have been created got to nwxt page
        io.to(roomId).emit("createRoomSuccess",room);
    }catch(e){
       console.log(e); 
    }
});
});

mongoose.connect(DB).then(()=>{
    console.log("Connection Successful!!")
}).catch((e)=>{
    console.log(e);
});

//Listen to server

server.listen(port, "0.0.0.0",()=>{
    console.log(`server started and running on port ${port}`)
});