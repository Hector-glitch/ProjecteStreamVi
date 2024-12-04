const { Server } = require("socket.io");

const videos = {
  video1: "https://www.youtube.com/watch?v=wIC18c1Qkcg",
  video2: "https://www.youtube.com/watch?v=QCw0L6FupQ0",
  video3: "https://www.youtube.com/watch?v=e1cWEKdTmuo",
};
const activeCodes = new Map();

const io = new Server(3000, {
  cors: {
    origin: ["http://localhost:4200", "http://localhost:4300"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("videoList", Object.keys(videos));

  socket.on("selectVideo", (videoName) => {
    const linkVideo = videos[videoName];
    if (linkVideo) {
      const code = Math.random().toString(36).substring(2, 6).toUpperCase();
      activeCodes.set(code, linkVideo);
      socket.emit("authCode", code);
      console.log(`Generated auth code: ${code} for video: ${linkVideo}`);
    }
  });

  socket.on("validateCode", (code, callback) => {
    if (activeCodes.has(code)) {
      const linkVideo = activeCodes.get(code);
      callback(true);
      socket.emit("linkVideo", linkVideo);
      activeCodes.delete(code);
    } else {
      callback(false);
    }
  });
});

console.log("Server running on port 3000");
