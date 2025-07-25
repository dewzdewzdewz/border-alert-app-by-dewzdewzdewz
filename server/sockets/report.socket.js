const reportController = require('../controllers/report.controller');

exports.initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('📡 Client connected');
  });

  reportController.setSocket(io);
};
