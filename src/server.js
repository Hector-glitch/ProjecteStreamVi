const { Server } = require("socket.io");

// Defineix una llista de vídeos disponibles al servidor
const videos = ["video1", "video2", "video3"];


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
    let linkVideo = "";
    if (videoName === "video1"){
      linkVideo = "https://www.youtube.com/watch?v=wIC18c1Qkcg";
    }
    if (videoName === "video2"){
      linkVideo = "https://www.youtube.com/watch?v=QCw0L6FupQ0";
    }
    if (videoName === "video3"){
      linkVideo = "https://www.youtube.com/watch?v=e1cWEKdTmuo";
    }

    // Genera un codi aleatori de 4 lletres
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Envia el codi d'autenticació al client
    socket.emit("authCode", code);

    //Envia el link del video
    socket.emit("linkVideo", linkVideo);

  });
});

console.log("Server running on port 3000");
