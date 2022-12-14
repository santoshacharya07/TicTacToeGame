//importing modules
const { Socket } = require("dgram");
const express =require("express");
const http=require("http");
const { mongo, default: mongoose, isObjectIdOrHexString } = require("mongoose");
mongoose.set("strictQuery", false);

const app=express();
const port = process.env.PORT || 3000;
const server=http.createServer(app);
var io=require("socket.io")(server);
//middle ware 
app.use(express.json());

//  DB="mongodb+srv://cntoz:quantum99x@cluster0.xdovnso.mongodb.net/test";

// mangoose
// .connect(DB)
// .then(() => {
//     console.log("Connection successful!");
// }).catch((e)=>{
//     console.log(e);
// });
uri="mongodb+srv://cntoz:quantum99x@cluster0.xdovnso.mongodb.net/?retryWrites=true&w=majority";

io.on("connection", (socket)=>{
    console.log("connected!!");
});


async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connection successsfull!!");
    }catch(error){console.error(error);}
}
connect();
server.listen(port,"0.0.0.0",()=>{
    console.log(`Server started and running on port ${port}`);
});

