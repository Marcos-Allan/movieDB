let inputCheck = document.querySelector('.divCheckbox')
let textCheck = document.querySelector('.labelfav')
let imgCheck = document.querySelector('.imgCheck')

const apikey = 'eecefa2bc71eb04e2ba72a057a45a27f'

const main = document.querySelector('main')

inputCheck.addEventListener('click', toggleTheme)
textCheck.addEventListener('click', toggleTheme)

function toggleTheme() {
    inputCheck.classList.toggle('check')
    
    if(imgCheck.style.display == 'block'){
        imgCheck.style.display = 'none'
    }else{
        imgCheck.style.display = 'block'
    }
}

const movies = [
    {
      image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
      title: 'Batman',
      rating: 9.2,
      year: 2022,
      description: 'Descrição do filme…',
      isFavorited: true,
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
      title: 'Avengers',
      rating: 9.2,
      year: 2019,
      description: 'Descrição do filme…',
      isFavorited: false
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
      title: 'Doctor Strange',
      rating: 9.2,
      year: 2022,
      description: 'Descrição do filme…',
      isFavorited: false
    },
  ]
function renderMovie(movie){

        let divCardFilm = document.createElement('section')
        divCardFilm.classList.add('cardFilm')
        
        let divImgFilm = document.createElement('div')
        divImgFilm.classList.add('divImg')
        let divAvaliationFilm = document.createElement('div')
        divAvaliationFilm.classList.add('divAvaliation')
        let divInfoFilm = document.createElement('div')
        divInfoFilm.classList.add('divInfos')
        
        
        let imgFilm = document.createElement('img')
        imgFilm.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        let titleFilm = document.createElement('h2')
        titleFilm.innerText = `${movie.original_title} (${movie.release_date})`
        let divAvaliationsFilms = document.createElement('div')
        divAvaliationsFilms.classList.add('avaliations')
        
        let divAvaliationSFilm = document.createElement('div')
        divAvaliationSFilm.classList.add('avaliation')

        let imgFav = document.createElement('img')
        imgFav.src = 'imgs/Vector (1).png'
        let favText = document.createElement('p')
        favText.innerText = movie.vote_average
        favText.classList.add('infoText')
        let imgLike = document.createElement('img')
        imgLike.src = 'imgs/Vector.png'
        let likeText = document.createElement('p')
        likeText.innerText = 'Favoritar'
        likeText.classList.add('infoText')
        let infoFilmText = document.createElement('p')
        infoFilmText.innerText = movie.overview

        divCardFilm.appendChild(divImgFilm)
        divCardFilm.appendChild(divAvaliationFilm)
        divCardFilm.appendChild(divInfoFilm)
        
        divImgFilm.appendChild(imgFilm)
        
        divAvaliationFilm.appendChild(titleFilm)
        divAvaliationFilm.appendChild(divAvaliationsFilms)
        //1 VEZ
        divAvaliationsFilms.appendChild(divAvaliationSFilm)
        divAvaliationSFilm.appendChild(imgFav)
        divAvaliationSFilm.appendChild(favText)
        
        //2 VEZ
        divAvaliationsFilms.appendChild(divAvaliationSFilm)
        divAvaliationSFilm.appendChild(imgLike)
        divAvaliationSFilm.appendChild(likeText)
        
        divInfoFilm.appendChild(infoFilmText)

        main.appendChild(divCardFilm)

}

// renderMovie(movies[0])
// renderMovie(movies[1])
// renderMovie(movies[2])

let url = 'https://api.themoviedb.org/3/movie/157336?api_key=27cbf9ed3bea8b3418b4bbc539dd7493 https://api.themoviedb.org/3/movie/157336/videos?api_key=27cbf9ed3bea8b3418b4bbc539dd7493'

const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=pt-br`)
.then(response => response.json())
.then(data => {
    console.log(data.results[0])
    renderMovie(data.results[1])
    renderMovie(data.results[2])
    renderMovie(data.results[3])
    renderMovie(data.results[4])
    renderMovie(data.results[5])
    renderMovie(data.results[6])
    renderMovie(data.results[7])
    renderMovie(data.results[8])
    renderMovie(data.results[9])
})
.catch(err => console.error(err));