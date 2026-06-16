const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to understand text data sent from your website
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Temporary memory to save posts
let databasePosts = [
    { text: "Welcome to the grand opening of Royal.", meta: "System • Just Now" }
];

// 1. ROUTE FOR YOUR HOME PAGE (Handles both / and /index.html)
app.get(['/', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. ROUTE FOR YOUR FRIENDS PAGE
app.get('/friends', (req, res) => {
    res.sendFile(path.join(__dirname, 'friends.html'));
});

// 3. Route to get all active posts from your feed
app.get('/api/posts', (req, res) => {
    res.json(databasePosts);
});

// 4. Route to receive a new post from "Talk to the World"
app.post('/api/posts', (req, res) => {
    const userText = req.body.text;
    if (!userText) {
        return res.status(400).json({ error: "Post cannot be empty" });
    }
    const newPost = {
        text: userText,
        meta: "Verified Member • Just Now"
    };
    databasePosts.unshift(newPost); 
    res.status(201).json(newPost);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Royal Engine running securely on port ${PORT}`);
});
