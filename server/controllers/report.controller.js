const db = require('../db');
let ioInstance;

function setSocket(io) {
  ioInstance = io;
}

exports.getReports = async (req, res) => {
  const result = await db.query('SELECT * FROM reports');
  res.json(result.rows);
};

exports.getReportById = async (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id)
  const result = await db.query('SELECT news, link FROM reports WHERE id = $1', [id]);
  res.json(result.rows[0]);
};

exports.createReport = async (req, res) => {
  const { lat, lng, news, link } = req.body;
  const result = await db.query(
    'INSERT INTO reports (lat, lng, news, link) VALUES ($1, $2, $3, $4) RETURNING *',
    [lat, lng, news, link]
  );
  const newReport = result.rows[0];
  if (ioInstance) ioInstance.emit('newReport', newReport);
  res.status(201).json({ status: 'ok' });
};

exports.updateReport = async (req, res) =>  {
  const id = parseInt(req.params.id);
  const { news, link } = req.body;
  await db.query(
    'UPDATE reports SET news = $1, link = $2 WHERE id = $3',
    [news, link, id]
  )
  // console.log(req.body)

  if (ioInstance) ioInstance.emit('updateReport', id);
  res.status(200).json({ status: 'updated' });
};

exports.deleteReport = async (req, res) => {
  const id = parseInt(req.params.id);
  await db.query('DELETE FROM reports WHERE id = $1', [id]);
  if (ioInstance) ioInstance.emit('deleteReport', id);
  res.status(200).json({ status: 'deleted' });
};

exports.setSocket = setSocket;
