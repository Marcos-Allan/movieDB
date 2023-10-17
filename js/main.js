let inputCheck = document.querySelector('.divCheckbox')
let textCheck = document.querySelector('.labelfav')
let imgCheck = document.querySelector('.imgCheck')

let filmsFavsMark = []
let filmsFavsMarked = []
let isFV = true
let isFocus = false
let dadosLocalsorage = undefined

const form = document.querySelector('form')
const inputText = document.querySelector('#isearch')

form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    busca(inputText.value)
})

function busca(title){
    inputText.value = ''
    inputText.blur()

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}&language=pt-br`)
    .then(response => response.json())
    .then(data => {
        
        if(data.results.length >= 1){
            main.innerHTML = '<h2>Resultados: </h2>'
            for(let i = 0; i < data.results.length; i++){
                renderMovie(data.results[i], false)
            }
            
            favoritar(false)
            
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
inputText.addEventListener('blur', () => {
    isFocus = false
})

window.addEventListener('keypress', (evt) => {
    if(isFocus == false){
        if(evt.key == 'm'){
           toggleTheme() 
        }
    }
})
inputText.addEventListener('focus', () => {
    isFocus = true
})

function toggleTheme() {
    
    dadosLocalsorage = localStorage.getItem('filmsFavsMarked')
    if(dadosLocalsorage != undefined){
        // PEGAR FILMES SALVOS COMO FAVORITO NO LOCALSTORAGE
        dadosLocalsorage = dadosLocalsorage.split('[')[1]
        dadosLocalsorage = dadosLocalsorage.split(']')[0]
        dadosLocalsorage = dadosLocalsorage.split('},')
        console.log(dadosLocalsorage)
        // filmsFavsMarked.length = 0)
        
        // let posterPath = 
        // console.log(posterPath)

        let otherFilm = []
        dadosLocalsorage.map((el) => {
            el = el.split('"')
            console.log(filmsFavsMarked)
            let poster_path = el[3]
            let title = el[7]
            let release_date = el[11]
            let overview = el[15]
            let vote_average = Number(el[18].split(':')[1].split(',')[0])
            let isFV = Boolean(el[20].split(':')[1].split('}')[0])

            let mvFV = {poster_path, title, release_date, overview, vote_average, isFV}
            otherFilm.push(mvFV)
        })

        filmsFavsMarked.length = 0
        for(let i = 0; i < otherFilm.length; i++){
            filmsFavsMarked[i] = otherFilm[i]
        }
    }
    inputCheck.classList.toggle('check')
    
    if(imgCheck.style.display == 'block'){
        imgCheck.style.display = 'none'
        main.innerHTML = ''
        getDados()
    }else{
        imgCheck.style.display = 'block'
        if(filmsFavsMarked.length > 0){
            main.innerHTML = ''
            
            filmsFavsMarked.map((film) => {
                renderMovie(film, true)
            })
            
            favoritar(true)

        }else{
            main.innerHTML = '<p class="msgError">Você não marcou nenhum filme como favorito</p>'
        }
    }
}

function renderMovie(movie, isFavoritado = false){

    if(filmsFavsMarked.length > 0){
        filmsFavsMarked.map((film) => {
            if(movie.title == film.title){
                isFavoritado = true
            }
        })
    }
    if(movie){
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
        titleFilm.innerHTML = `${movie.title}<span>(${dataFormatada})</span>`
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
        imgLike.classList.add('imgLike')
        let likeText = document.createElement('p')
        likeText.classList.add('infoText')
        likeText.classList.add('infoTextLike')
        let infoFilmText = document.createElement('p')
        infoFilmText.innerText = movie.overview
        
        if(isFavoritado == true){
            imgLike.src = 'imgs/Vector(M).png'
            likeText.innerText = 'Desfavoritar'
        }else{
            imgLike.src = 'imgs/Vector.png'
            likeText.innerText = 'Favoritar'
        }
        
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
        divAvaliationSFilm2.classList.add('divLike')
        divAvaliationSFilm2.appendChild(likeText)
        divAvaliationsFilms.appendChild(divAvaliationSFilm2)
        
        divInfoFilm.appendChild(infoFilmText)
        
        main.appendChild(divCardFilm)
    }

}

function favoritar(isFv){
    let divFavs = [...document.querySelectorAll('.divLike')]
    let iconsFavs = [...document.querySelectorAll('.imgLike')]
    let textsFavs = [...document.querySelectorAll('.infoTextLike')]

    divFavs.map((dv, i) => {
        dv.addEventListener('click', () => {
            
            // ACESSA A DIV DO CARD
            const dvFilmFV = dv.parentNode.parentNode.parentNode
            
            let poster_path = dvFilmFV.children[0].children[0].src.split('w500')[1]
            
            let title = dvFilmFV.children[1].children[0].innerText.split('(')[0]
            
            let release_date = dvFilmFV.children[1].children[0].innerText.split('(')[1].split(')')[0].split('-')
            release_date = `${release_date[2]}-${release_date[1]}-${release_date[0]}`
            
            let overview = dvFilmFV.children[2].children[0].innerText

            let vote_average = Number(dvFilmFV.children[1].children[1].children[0].children[1].innerText)

            let mvFV = {poster_path, title, release_date, overview, vote_average, isFV}

            filmsFavsMark.push(mvFV)
            
            isFv = !isFv
            if(isFv == true){
                iconsFavs[i].src = 'imgs/Vector(M).png'
                textsFavs[i].innerText = 'Desfavoritar'
                filmsFavsMarked.push(mvFV)

                // SALVAR FILME NO LOCALSTOEAGE
                localStorage.setItem('filmsFavsMarked', JSON.stringify(filmsFavsMarked))
                dadosLocalsorage = localStorage.getItem('filmsFavsMarked')
                // dadosLocalsorage = dadosLocalsorage.split('[')[1]
                // dadosLocalsorage = dadosLocalsorage.split(']')[0]
                // dadosLocalsorage = dadosLocalsorage.split('},')
                // console.log(dadosLocalsorage)

                let rep = 0
                for (let i = 0; i < filmsFavsMarked.length; i++) {
                    if(title == filmsFavsMarked[i].title){
                        rep++
                        if(rep == 2){
                            filmsFavsMarked.pop()
                            return
                        }
                    }
                }
                
                
            }else{
                iconsFavs[i].src = 'imgs/Vector.png'
                textsFavs[i].innerText = 'Favoritar'
                let filmRmv = title
                filmsFavsMark = filmsFavsMarked.filter((film) => film.title != filmRmv);
            }

            filmsFavsMarked.length = 0
            for(let i = 0;i < filmsFavsMark.length; i++){
                filmsFavsMarked[i] = filmsFavsMark[i]
            }
            if(inputCheck.classList.contains('check')){
                main.innerHTML = ''
                // FUNÇÃO ORIGINAL (DA CERTO)
                filmsFavsMarked.map((film) => {
                    renderMovie(film, true)
                })
                favoritar(true)

                if(filmsFavsMarked.length == 0){
                    main.innerHTML = '<p class="msgError">Você não marcou nenhum filme como favorito</p>'
                }
            }
        })
    })
}

function getDados(){

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=pt-br`)
    .then(response => response.json())
    .then(data => {
        
        for(let i = 0;i < data.results.length; i++){
            renderMovie(data.results[i], false)
        }
        favoritar(false)

    })
    .catch(err => console.error(err));
}

getDados()