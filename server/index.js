import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);

  socket.on("join-room", (roomId, userId) => {
    console.log(`a new user ${userId} joined room ${roomId  }`);
    socket.join(roomId)
    socket.broadcast.to(roomId).emit("user-connected", userId)
  })
});
