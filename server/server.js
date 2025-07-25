require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const { initSocket } = require('./sockets/report.socket');

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

initSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
