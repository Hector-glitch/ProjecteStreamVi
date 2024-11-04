const { Server } = require("socket.io");

// Defineix una llista de vídeos disponibles al servidor
const videos = ["video1.mp4", "video2.mp4", "video3.mp4"];

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Envia la llista de vídeos al client quan es connecta
  socket.emit("videoList", videos);

  // Escolta quan el client selecciona un vídeo
  socket.on("selectVideo", (videoName) => {
    console.log("Video selected by client:", videoName);

    // Genera un codi aleatori de 4 lletres
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Envia el codi d'autenticació al client
    socket.emit("authCode", code);
  });
});

console.log("Server running on port 3000");
