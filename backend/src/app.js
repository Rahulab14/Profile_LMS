const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth', require('./auth/auth.controller'));
app.use('/profile', require('./profile/profile.controller'));
app.use('/chat', require('./chatbot/chatbot.controller'));

module.exports = { app, server };
