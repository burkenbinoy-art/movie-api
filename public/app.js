// Replace this with your Render backend URL after deployment
// For local development: 'http://localhost:3000'
// For production: 'https://movie-api-xyz123.onrender.com'
const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : window.location.origin;

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
