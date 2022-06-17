/**
 * CONSTANT VARIABLES GO HERE
 */
 const API_KEY = '7c472c0bc17cd2978d3aaa6fa8ea2dbf'
 
 /**
  * QUERY SELECTORS VARIABLES GO HERE
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
 
 /*Add Event Listeners*/
 form.addEventListener('submit', (event) => {
    event.preventDefault()
    trending = false;
    movieGrid.innerHTML = ``
    pages = 1
    val = input.value
    getResults(val)
    showMore()

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

/*Fetch From API*/
async function getTrending() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c472c0bc17cd2978d3aaa6fa8ea2dbf&language=en-US&page=${pages}`).then(r=>r.json()).then(res=>res.results).then(data => {
        populateGrid(data)
    })
}

async function getResults(val) {
     try {
        console.log(val)
         var keywords = val
         const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${keywords}&page=${pages}&include_adult=false`)
         const result = await response.json()
         console.log(result.results)
         populateGrid(result.results)

     } catch(err) {
         console.error(err)
     }
 }

 /*async function getVideo(id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
        const result = await response.json()
        let key = result.results[0].key
        let url = "https://www.youtube.com/embed/" + CSS.escape(key)
        return url
    } catch(err) {
        console.error(err)
    }
 } */


 function populateGrid(results) {
    results.forEach((movie, index) => {
        let posterPath = movie.poster_path
        let title = movie.title
        let overview = movie.overview
        let id = movie.id

        if (posterPath == null || title == null) {
        }

        else {
            let movieBox = document.createElement("div")
            movieBox.setAttribute("id", "movie-box")
            movieBox.innerHTML += `
                <h2 id="movie-title">${title}</h2>
                <img id="movie-poster" src="https://image.tmdb.org/t/p/w300${posterPath}" alt="${title}" title="${title}"/>

                <div id="modal" >
                    <div id="modal-content">
                        <span id="close">x</span>
                        <h3 id="overview-title">Overview: </h3>
                        <p id="overview">${overview}</p>
                    </div>
                </div> 
            `
            movieGrid.appendChild(movieBox)

            let modal = movieBox.children[2]
            let moviePoster = movieBox.children[1]
            let close = modal.children[0].children[0]

            moviePoster.onclick = function () {
                /* let videoUrl = getVideo(id)
                modal.children[0].innerHTML += `
                    <iframe width="420" height="315" src="${videoUrl}"></iframe>
                `*/

                modal.style.display = "block"
            } 

            close.onclick = function() {
                modal.style.display = "none";
            }
        }
    })
  }

  window.onload = () => {
    pages = 1
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c472c0bc17cd2978d3aaa6fa8ea2dbf&language=en-US&page=${pages}`).then(r=>r.json()).then(res=>res.results).then(data => {
        pages = 1
        populateGrid(data)
        showMore()
    })
 } 


  
 