# Complete Guide to Hosting Your Movie API on Render

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Prepare Your Project](#prepare-your-project)
3. [Create a Render Account](#create-a-render-account)
4. [Deploy Backend to Render](#deploy-backend-to-render)
5. [Create and Deploy Frontend](#create-and-deploy-frontend)
6. [Connect Frontend to Backend](#connect-frontend-to-backend)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, you'll need:
- A GitHub account (to connect your project to Render)
- Your project files (backend - already have it)
- A Render account (free tier available)
- Basic knowledge of Git

### What is Render?
Render is a modern cloud platform that makes hosting web applications simple. It handles:
- Server infrastructure
- SSL certificates (HTTPS)
- Domain management
- Automatic deployments from GitHub
- Environment variables management

---

## Prepare Your Project

### Step 1: Modify Your Backend for Production

Your `app.js` currently listens on a hardcoded port (3000). Render assigns a dynamic port via an environment variable. Update your code:

**Current code:**
```javascript
app.listen(3000, () => console.log("Server running on port 3000"));
```

**Update to:**
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Step 2: Add a Start Script to package.json

Update your `package.json` to include a start script:

```json
{
  "name": "movie-api",
  "version": "1.0.0",
  "description": "Movie API Backend",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

The `"start": "node app.js"` script is essential - Render looks for this to run your application.

### Step 3: Add .gitignore

Create a `.gitignore` file in your project root:

```
node_modules/
.env
.DS_Store
*.log
```

---

## Create a Render Account

1. Go to https://render.com
2. Click **"Sign Up"**
3. Choose "Sign up with GitHub" (easiest option)
4. Authorize Render to access your GitHub account
5. Complete your profile

---

## Deploy Backend to Render

### Step 1: Push Your Project to GitHub

1. Create a new repository on GitHub (e.g., `movie-api`)
2. Initialize git in your project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Connect to your GitHub repo and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/movie-api.git
   git push -u origin main
   ```

### Step 2: Create a New Web Service on Render

1. Log in to Render dashboard
2. Click **"New +"** button
3. Select **"Web Service"**
4. Choose **"Build and deploy from a Git repository"**
5. Connect your GitHub account if not already connected
6. Select your `movie-api` repository

### Step 3: Configure the Web Service

Fill in the configuration:

| Setting | Value |
|---------|-------|
| **Name** | `movie-api` (or your preferred name) |
| **Environment** | `Node` |
| **Region** | Choose closest to your location (e.g., `oregon`, `singapore`) |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### Step 4: Review and Deploy

1. Click **"Create Web Service"**
2. Render will start the deployment process
3. Watch the logs in the dashboard
4. Once it says "Live", your backend is deployed! 🎉

### What You'll Get

After deployment, you'll receive:
- **Public URL**: Something like `https://movie-api-xyz123.onrender.com`
- **Automatic HTTPS**: All requests are secure
- **Free tier includes**: 750 hours/month (always-on not possible, but fine for learning)

### Test Your Backend

Open your browser and test:
- `https://movie-api-xyz123.onrender.com/movies` - Should return an empty array `[]`
- POST a movie using Postman or curl:
  ```bash
  curl -X POST https://movie-api-xyz123.onrender.com/movies \
    -H "Content-Type: application/json" \
    -d '{"title": "Inception", "rating": 8.8}'
  ```

---

## Create and Deploy Frontend

### Option A: Simple HTML/CSS/JavaScript Frontend

Create a `public` folder in your project with these files:

**public/index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie API</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🎬 My Movie Collection</h1>
        
        <div class="form-section">
            <h2>Add New Movie</h2>
            <input type="text" id="title" placeholder="Movie Title">
            <input type="number" id="rating" placeholder="Rating (0-10)" min="0" max="10">
            <button onclick="addMovie()">Add Movie</button>
        </div>

        <div class="filter-section">
            <input type="number" id="filterRating" placeholder="Filter by rating">
            <button onclick="filterMovies()">Filter</button>
            <button onclick="getAllMovies()">Show All</button>
        </div>

        <div id="movies" class="movies-list"></div>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

**public/style.css**
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

h2 {
    color: #667eea;
    font-size: 1.2em;
    margin-bottom: 15px;
}

.form-section, .filter-section {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
}

input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
}

button {
    width: 100%;
    padding: 10px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    margin: 5px 0;
    transition: background 0.3s;
}

button:hover {
    background: #764ba2;
}

button.delete-btn {
    width: auto;
    padding: 5px 15px;
    background: #ff6b6b;
    margin-left: 10px;
}

button.delete-btn:hover {
    background: #ee5a52;
}

.movies-list {
    margin-top: 30px;
}

.movie-item {
    background: #f8f9fa;
    padding: 15px;
    margin-bottom: 15px;
    border-left: 4px solid #667eea;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.movie-info h3 {
    color: #333;
    margin-bottom: 5px;
}

.movie-info p {
    color: #666;
    font-size: 0.9em;
}

.movie-rating {
    background: #667eea;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
    margin-right: 10px;
}

.empty-message {
    text-align: center;
    color: #999;
    padding: 40px 20px;
    font-size: 1.1em;
}
```

**public/app.js**
```javascript
// Replace this with your actual backend URL after deployment
const API_URL = 'http://localhost:3000'; // Change this to your Render URL

async function getAllMovies() {
    try {
        const response = await fetch(`${API_URL}/movies`);
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        alert('Unable to connect to backend. Make sure it\'s running!');
    }
}

async function filterMovies() {
    const rating = document.getElementById('filterRating').value;
    if (!rating) {
        alert('Please enter a rating');
        return;
    }
    try {
        const response = await fetch(`${API_URL}/movies?rating=${rating}`);
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('Error filtering movies:', error);
    }
}

async function addMovie() {
    const title = document.getElementById('title').value.trim();
    const rating = document.getElementById('rating').value;

    if (!title || !rating) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, rating: parseFloat(rating) })
        });

        if (!response.ok) throw new Error('Failed to add movie');
        
        document.getElementById('title').value = '';
        document.getElementById('rating').value = '';
        getAllMovies();
    } catch (error) {
        console.error('Error adding movie:', error);
        alert('Failed to add movie');
    }
}

async function deleteMovie(id) {
    if (!confirm('Are you sure you want to delete this movie?')) return;

    try {
        const response = await fetch(`${API_URL}/movies/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete movie');
        getAllMovies();
    } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete movie');
    }
}

function displayMovies(movies) {
    const moviesDiv = document.getElementById('movies');
    
    if (movies.length === 0) {
        moviesDiv.innerHTML = '<div class="empty-message">No movies found. Add one to get started!</div>';
        return;
    }

    moviesDiv.innerHTML = movies.map(movie => `
        <div class="movie-item">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.rating}/10</p>
            </div>
            <div>
                <span class="movie-rating">${movie.rating}</span>
                <button class="delete-btn" onclick="deleteMovie(${movie.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Load movies when page loads
window.addEventListener('load', getAllMovies);
```

### Step 4: Serve Frontend from Backend

Update your `app.js` to serve the frontend:

```javascript
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve static files from public folder
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

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Step 5: Push Updated Code to GitHub

```bash
git add .
git commit -m "Add frontend and static file serving"
git push
```

Render will automatically detect the changes and redeploy!

---

## Connect Frontend to Backend

### Update Frontend URL

In `public/app.js`, change:
```javascript
const API_URL = 'http://localhost:3000'; // Local development
```

To:
```javascript
const API_URL = 'https://movie-api-xyz123.onrender.com'; // Your Render backend URL
```

Replace `movie-api-xyz123` with your actual Render service name.

### Important: CORS Configuration

If your frontend and backend will be on different Render services, update `app.js`:

```javascript
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: ['https://movie-frontend-abc123.onrender.com', 'http://localhost:3000'],
    credentials: true
}));

app.use(express.json());
// ... rest of your code
```

Install CORS:
```bash
npm install cors
```

---

## Troubleshooting

### Issue 1: "Service Failed to Start"
**Solution:**
- Check build logs in Render dashboard
- Ensure `"start"` script is in package.json
- Verify `app.js` uses `process.env.PORT`

### Issue 2: Frontend Can't Connect to Backend
**Solution:**
- Check browser console for CORS errors
- Verify backend URL in `public/app.js` is correct
- Ensure backend uses `app.use(cors())` if on different domain

### Issue 3: "Application crashed"
**Solution:**
- View logs in Render dashboard
- Check for unhandled errors in your code
- Verify all dependencies are in package.json

### Issue 4: Slow to Start
**Solutions:**
- Render free tier spins down after inactivity (15 minutes)
- First request will be slow (~30 seconds), subsequent requests are normal
- Upgrade to paid plan to keep service always-on

### Check Logs

In Render dashboard:
1. Select your service
2. Click **"Logs"** tab
3. View real-time logs of your application

---

## Next Steps

### Data Persistence
Your current setup stores data in memory (lost when server restarts). For persistence, add a database:
- **PostgreSQL** on Render (free tier available)
- Update code to save movies to database

### Environment Variables
Store sensitive information (API keys, database URLs):
1. In Render dashboard → Environment
2. Add variables like:
   ```
   DATABASE_URL=postgresql://...
   API_KEY=your_secret_key
   ```
3. Access in code: `process.env.DATABASE_URL`

### Custom Domain
1. In Render dashboard → Settings
2. Add your custom domain
3. Update DNS records at your domain provider
4. Get free SSL certificate automatically

### Monitoring
Render provides basic monitoring. For more:
- View CPU/Memory usage in dashboard
- Monitor logs for errors
- Set up email alerts for crashes

---

## Quick Reference: After Deployment

Your deployed services will be at:
- **Backend**: `https://movie-api-xyz123.onrender.com`
- **Frontend**: `https://movie-api-xyz123.onrender.com/` (served from same service)
- **API Endpoint**: `https://movie-api-xyz123.onrender.com/movies`

All requests use HTTPS (secure by default)!

---

## Summary

✅ Backend deployed and running  
✅ Frontend served from same backend  
✅ Both accessible via public HTTPS URL  
✅ Automatic deployments from GitHub  
✅ Ready for further customization  

Happy hosting! 🚀
