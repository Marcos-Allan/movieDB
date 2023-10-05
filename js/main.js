let inputCheck = document.querySelector('.divCheckbox')
let textCheck = document.querySelector('.labelfav')
let imgCheck = document.querySelector('.imgCheck')

const form = document.querySelector('form')
const inputText = document.querySelector('#isearch')

form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    busca(inputText.value)
})

function busca(title){
    inputText.value = ''
    inputText.blur()

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}&language=en-US&page=1`)
    // fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=pt-br`)
    .then(response => response.json())
    .then(data => {
        console.log(data.results)
        if(data.results.length >= 1){
            main.innerHTML = '<h2>Resultados: </h2>'
            for(let i = 0; i < data.results.length; i++){
                renderMovie(data.results[i])
            }
        }else{
            main.innerHTML = '<h2>Filme não encontrado verifique se escreveu corretamente</h2>'
        }
    })
    .catch((err) => console.log(err))
}

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

function renderMovie(movie){
        let dataFormatada = movie.release_date.split('-')
        dataFormatada = `${dataFormatada[2]}-${dataFormatada[1]}-${dataFormatada[0]}`

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
        titleFilm.innerHTML = `${movie.title} <br> (${dataFormatada})`
        let divAvaliationsFilms = document.createElement('div')
        divAvaliationsFilms.classList.add('avaliations')
        
        let divAvaliationSFilm1 = document.createElement('div')
        divAvaliationSFilm1.classList.add('avaliation')
        
        let divAvaliationSFilm2 = document.createElement('div')
        divAvaliationSFilm2.classList.add('avaliation')

        let imgFav = document.createElement('img')
        imgFav.src = 'imgs/Vector (1).png'
        let favText = document.createElement('p')
        favText.innerText = movie.vote_average.toFixed(1)
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
        divAvaliationSFilm1.appendChild(imgFav)
        divAvaliationSFilm1.appendChild(favText)
        divAvaliationsFilms.appendChild(divAvaliationSFilm1)
        
        //2 VEZ
        divAvaliationSFilm2.appendChild(imgLike)
        divAvaliationSFilm2.appendChild(likeText)
        divAvaliationsFilms.appendChild(divAvaliationSFilm2)
        
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
    
    for(let i = 0; i < data.results.length; i++){
      renderMovie(data.results[i])
    }
})
.catch(err => console.error(err));

