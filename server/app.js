const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const reportRoutes = require('./routes/report.routes');
app.use('/reports', reportRoutes);

module.exports = app;
