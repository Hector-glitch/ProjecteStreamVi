const { Server } = require("socket.io");

const videos = {
  video1: "https://www.youtube.com/watch?v=wIC18c1Qkcg",
  video2: "https://www.youtube.com/watch?v=QCw0L6FupQ0",
  video3: "https://www.youtube.com/watch?v=e1cWEKdTmuo",
};
let currentCode = null; // Código actual
let currentLink = null; // Enlace del video actual

const io = new Server(3000, {
  cors: {
    origin: ["http://localhost:4200", "http://localhost:4300"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Enviar lista de videos al cliente
  socket.emit("videoList", Object.keys(videos));

  // Manejar selección de video
  socket.on("selectVideo", (videoName) => {
    const linkVideo = videos[videoName];
    if (linkVideo) {
      currentCode = Math.random().toString(36).substring(2, 6).toUpperCase();
      currentLink = linkVideo;
      socket.emit("authCode", currentCode);
      console.log(`Código generado: ${currentCode} para el video: ${linkVideo}`);
    }
  });

  // Validar código
  socket.on("validateCode", (code, callback) => {
    const isValid = code === currentCode;
    if (isValid) {
      callback(true);
      socket.emit("linkVideo", currentLink);
    } else {
      callback(false);
    }
  });

  // Estado de verificación
  socket.on("getVerificationStatus", (callback) => {
    callback(!!currentCode);
  });
});

console.log("Servidor ejecutándose en el puerto 3000");
