const express = require('express');

const db = require('./data/db-config.js');

const server = express();

server.use(express.json());

server.get('/api/projects', (req, res) => {
    db('projects')
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

module.exports = server;