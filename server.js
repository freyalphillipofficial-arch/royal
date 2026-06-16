const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to understand text data sent from your website
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Temporary memory to save posts before you connect a permanent database
let databasePosts = [
    { text: "Welcome to the grand opening of Royal.", meta: "System • Just Now" }
];

// 1. Route to serve your luxury front-end (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. Route to get all active posts from your feed
app.get('/api/posts', (req, res) => {
    res.json(databasePosts);
});

// 3. Route to receive and process a new post from "Talk to the World"
app.post('/api/posts', (req, res) => {
    const userText = req.body.text;
    
    if (!userText) {
        return res.status(400).json({ error: "Post cannot be empty" });
    }

    const newPost = {
        text: userText,
        meta: "Verified Member • Just Now"
    };

    // Save the post into temporary server memory
    databasePosts.unshift(newPost); 
    res.status(201).json(newPost);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Royal Engine running securely on port ${PORT}`);
});
