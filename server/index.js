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

  socket.on("user-toggle-audio", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
  })
  socket.on("user-toggle-video", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-toggle-video", userId);
  })

  socket.on("user-leave", (userId, roomId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-leave", userId);
  });
});
