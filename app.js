const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve static files from public folder (frontend)
app.use(express.static(path.join(__dirname, 'public')));

let movies = [];
let id = 1;

app.get('/movies', (req, res) => {
    const { rating } = req.query;
    if (rating) {
        return res.json(movies.filter(m => m.rating == rating));
    }
    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);
    if (!movie) return res.status(404).json({ message: "Not found" });
    res.json(movie);
});

app.post('/movies', (req, res) => {
    const movie = { id: id++, ...req.body };
    movies.push(movie);
    res.status(201).json(movie);
});

app.patch('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);
    if (!movie) return res.status(404).json({ message: "Not found" });
    Object.assign(movie, req.body);
    res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
    movies = movies.filter(m => m.id != req.params.id);
    res.json({ message: "Deleted" });
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));