window.addEventListener('load', () => {
    document.querySelector('#searchForm').addEventListener('submit', e => {
        
        getMovie();

        e.preventDefault();
    });
});

function getMovie() {
    movieDatabase()
    .then(response => {
        console.log(response);

        let movies = response.Search;
        
        let output = '';

        movies.forEach(movie => {
            output += `
                <div class="col-md-3">
                    <div class="card border-primary mb-3 p-1 text-center">
                        <img src="${movie.Poster}">
                        <h5 class="my-4">${movie.Title}</h5>
                        <a onclick="movieSelected(${movie.imdbID})" class="btn btn-primary" href="#">Movie Details</a>
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

async function movieDatabase() {
    let searchText = document.querySelector('#searchText').value;

    // api search with ?s flag for "some" information
    const apiUrl = `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?s=${searchText}&apikey=e63a508`;

    let response = await fetch(apiUrl);
    let data = await response.json();
    
    return data;

}


