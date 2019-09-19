window.addEventListener('DOMContentLoaded', () => {
    console.log(window.location);
    document.querySelector('#searchForm').addEventListener('submit', e => {
        
        getMovies();

        e.preventDefault();
    });
});

function getMovies() {
    searchMovieDatabase()
    .then(response => {
        console.log(response);

        let movies = response.Search;
        
        let output = '';

        movies.forEach(movie => {
            output += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                    <div class="card border-primary mb-3 p-2 text-center">
                        <img src="${movie.Poster}">
                        <h5 class="my-4">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            `;
        });

        let moviesElem = document.querySelector('#movies');
        moviesElem.innerHTML = output;
    })
    .catch(err => {
        console.log(err);
    });
}

async function searchMovieDatabase() {
    let searchText = document.querySelector('#searchText').value;

    // api search with ?s flag for "some" information
    const apiUrl = `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=${searchText}&apikey=e63a508`;

    let response = await fetch(apiUrl);
    let data = await response.json();
    
    return data;
}

function movieSelected(id) {
    // storing on session storage (clears on browser (or tab ?!) close)
    sessionStorage.setItem('movieId', id);

    // to change the page
    window.location = 'movie.html';
    
    return false;
}

function getMovie() {
    searchMovieById()
    .then(response => {
        console.log(response);
        // let movie = response.
        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${response.Poster}" class="thumbnail" />
                </div>
                <div class="col-md-8">
                    <h3 class="m-3">${response.Title}</h3>
                    <ul class="list-group">
                        <li class="list-group-item"><strong class="text-info">Genre:</strong> ${response.Genre}</li>
                        <li class="list-group-item"><strong class="text-info">Released:</strong> ${response.Released}</li>
                        <li class="list-group-item"><strong class="text-info">Rated:</strong> ${response.Rated}</li>
                        <li class="list-group-item"><strong class="text-info">IMDB Rating:</strong> ${response.imdbRating}</li>
                        <li class="list-group-item"><strong class="text-info">Director:</strong> ${response.Director}</li>
                        <li class="list-group-item"><strong class="text-info">Writer:</strong> ${response.Writer}</li>
                        <li class="list-group-item"><strong class="text-info">Actors:</strong> ${response.Actors}</li>
                    </ul>
                </div>

                <div class="row p-3">
                    <div class="col-md-12">
                        <h3>Plot</h3>
                        ${response.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${response.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-secondary">Back to Search</a>
                    </div>
                </div>
            </div>
        `;

        let movieElem = document.querySelector('#movie');
        movieElem.innerHTML = output;

    })
    .catch(err => {
        console.log(err);
    });
}

async function searchMovieById() {
    let movieId = sessionStorage.getItem('movieId');

    const apiUrl = `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?i=${movieId}&apikey=e63a508`;

    let response = await fetch(apiUrl);
    let data = await response.json();
    
    return data;
}