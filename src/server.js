const { Server } = require("socket.io");

// Define una lista de vídeos disponibles en el servidor
const videos = ["video1", "video2", "video3"];
const activeCodes = new Map(); // Mapa para almacenar códigos válidos

const io = new Server(3000, {
  cors: {
    origin: ["http://localhost:4200", "http://localhost:4300"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Enviar la lista de vídeos al cliente al conectarse
  socket.emit("videoList", videos);

  // Escuchar cuando el cliente selecciona un vídeo
  socket.on("selectVideo", (videoName) => {
    console.log("Video selected by client:", videoName);

    let linkVideo = "";
    if (videoName === "video1") {
      linkVideo = "https://www.youtube.com/watch?v=wIC18c1Qkcg";
    }
    if (videoName === "video2") {
      linkVideo = "https://www.youtube.com/watch?v=QCw0L6FupQ0";
    }
    if (videoName === "video3") {
      linkVideo = "https://www.youtube.com/watch?v=e1cWEKdTmuo";
    }

    // Generar un código aleatorio de 4 letras
    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    activeCodes.set(code, linkVideo); // Almacena el código junto con el enlace del vídeo

    // Enviar el código de autenticación al cliente
    socket.emit("authCode", code);
    console.log(`Generated auth code: ${code} for video: ${linkVideo}`);
  });

  // Validar el código ingresado por el cliente
  socket.on("validateCode", (code, callback) => {
    if (activeCodes.has(code)) {
      callback(true); // Código válido
      console.log(`Code validated: ${code}`);
      activeCodes.delete(code); // Borra el código una vez usado
    } else {
      callback(false); // Código inválido
      console.log(`Invalid code attempt: ${code}`);
    }
  });
});

console.log("Server running on port 3000");
