/**
 * CONSTANT VARIABLES
 */
 const API_KEY = '7c472c0bc17cd2978d3aaa6fa8ea2dbf'
 
 /**
  * QUERY SELECTORS VARIABLES
  */
 const movieGrid = document.querySelector("#movie-grid")
 const form = document.querySelector("#form")
 const input = document.querySelector("#input")
 const search = document.querySelector("#search")


 /**
  * GLOBAL VARIABLES
  */
 var val = ""
 var pages = 0
 var numMovies = 0
 var trending = true;
 
 /*Event Listeners*/
 form.addEventListener('submit', (event) => {
    event.preventDefault()

    if(input.value == "") {
        return
    }

    trending = false;
    movieGrid.innerHTML = ``
    pages = 1
    val = input.value
    getResults(val)
    showMore()
 })

 reset.addEventListener('click', (event) => {
    form.reset()
    trending = true;
    movieGrid.innerHTML = ``;
    pages = 1
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c472c0bc17cd2978d3aaa6fa8ea2dbf&language=en-US&page=${pages}`).then(r=>r.json()).then(res=>res.results).then(data => {
        pages = 1
        populateGrid(data)
        showMore()
    })
 })

 morebutton.addEventListener('click', (event) => {
    pages += 1

    if (trending == true) {
        getTrending()
    } else {
        getResults(val)
    }
})

/*Load More Button Toggle*/
function hideMore() {
    morebutton.classList.toggle("hidden", true)
}

function showMore() {
    morebutton.classList.toggle("hidden", false)
}

/*API Fetchers*/
async function getTrending() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c472c0bc17cd2978d3aaa6fa8ea2dbf&language=en-US&page=${pages}`).then(r=>r.json()).then(res=>res.results).then(data => {
        populateGrid(data)
    })
}

async function getResults(val) {
     try {
         var keywords = val
         const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${keywords}&page=${pages}&include_adult=false`)
         const result = await response.json()
         console.log(result.results)
         populateGrid(result.results)

     } catch(err) {
         console.error(err)
     }
 }

 /*Grid Populator*/
 function populateGrid(results) {
    results.forEach((movie, index) => {
        let posterPath = movie.poster_path
        let title = movie.title
        let overview = movie.overview
        let votes = movie.vote_average
        let year = movie.release_date.substring(0,4)
        let numVotes = movie.vote_count

        if (posterPath == null || title == null) {
        }

        else {
            let movieBox = document.createElement("div")
            movieBox.setAttribute("id", "movie-box")
            movieBox.innerHTML += `
                <img id="movie-poster" src="https://image.tmdb.org/t/p/w300${posterPath}" alt="${title}" title="${title}"/>
                <h2>${title} <br> 🌟${votes}</h2>

                <div id="modal" >
                    <div id="modal-content">
                        <span id="close">close</span>
                        <h3>${title}</h3>
                        <div id="release-date-section"><p id="release-date">${year}</p></div>
                        <p id="overview">${overview}</p>
                        <p id="country"> Country: United States <br> Vote Count: ${numVotes} <p>
                    </div>
                </div> 
            `
            movieGrid.appendChild(movieBox)

            let modal = movieBox.children[2]
            let moviePoster = movieBox.children[0]
            let close = modal.children[0].children[0]
            let watchButton = modal.children[0].children[5].children[0]

            moviePoster.onclick = function () {
                modal.style.display = "block"
            } 

            close.onclick = function() {
                modal.style.display = "none";
            }
        }
    })
  }

  /*Window Onload*/
  window.onload = () => {
    pages = 1
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c472c0bc17cd2978d3aaa6fa8ea2dbf&language=en-US&page=${pages}`).then(r=>r.json()).then(res=>res.results).then(data => {
        pages = 1
        populateGrid(data)
        showMore()
    })
} 


  
 