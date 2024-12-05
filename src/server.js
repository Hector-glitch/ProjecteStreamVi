const { Server } = require("socket.io");
const express = require('express');

const app = express();

const videos = {
  video1: "https://www.youtube.com/embed/wIC18c1Qkcg",
  video2: "https://www.youtube.com/embed/QCw0L6FupQ0",
  video3: "https://www.youtube.com/embed/e1cWEKdTmuo",
};
let currentCode = null; // Código actual
let currentLink = null; // Enlace del video actual
let selectedVideo = null; // Guardar el video seleccionado
const io = new Server(3000, {
  cors: {
    origin: ["http://localhost:4200", "http://localhost:4300"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Manejar selección de video
  socket.on("selectVideo", (videoName) => {
    const linkVideo = videos[videoName];
    if (linkVideo) {
      currentCode = Math.random().toString(36).substring(2, 6).toUpperCase();
      selectedVideo = linkVideo; // Guarda el enlace del video seleccionado
      socket.emit("authCode", currentCode);
      console.log(`Código generado: ${currentCode} para el video: ${linkVideo}`);
    }
  });

  // Enviar lista de videos al cliente
  socket.emit("videoList", Object.keys(videos));

  // Validar código
  socket.on("validateCode", (code, callback) => {
    const isValid = code === currentCode;
    if (isValid) {
      callback(true);
      currentCode = null; // Limpia el código después de validarlo
      socket.emit("linkVideo", selectedVideo); // Enviar el enlace solo si está validado
    } else {
      callback(false);
    }
  });

  // Proveer selección almacenada
  socket.on("getSelectedVideo", (callback) => {
    callback(selectedVideo); // Devuelve el enlace almacenado si existe
  });

  // Estado de verificación
  socket.on("getVerificationStatus", (callback) => {
    callback(!!currentCode);
  });
});

const cors = require('cors');
app.use(cors());

console.log("Servidor ejecutándose en el puerto 3000");
