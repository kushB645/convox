import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://convox01.vercel.app",
  },
});

const ROOM = "group";

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("joinRoom", async (userName) => {
    console.log(`${userName} is joining the group `);

    await socket.join(ROOM);

    // send to all
    // io.to(ROOM).emit('roomNotice', userName);

    // broadcast

    socket.to(ROOM).emit("roomNotice", userName);

    socket.on("chatMessage", (msg) => {
      socket.to(ROOM).emit("chatMessage", msg);
    });

    socket.on("typing", (userName) => {
      socket.to(ROOM).emit("typing", userName);
    });

    socket.on('stopTyping', (userName) => {
        socket.to(ROOM).emit('stopTyping', userName);
    });
    
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

const PORT = process.env.PORT || 4600;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
