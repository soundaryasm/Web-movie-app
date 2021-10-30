const API_KEY=('9d3cf40fc2e5d40dadcb7053ca8f2add');
const IMAGE_URL='https://image.tmdb.org/t/p/w500';
const url='https://api.themoviedb.org/3/search/movie?api_key=9d3cf40fc2e5d40dadcb7053ca8f2add';


const main = document.getElementById('main');
const form =  document.getElementById('form');
const buttonElement=document.querySelector('#button');
const inputElement=document.querySelector('#search');


buttonElement.onclick=function(event){
    event.preventDefault();
    const value=inputElement.value;
    const path='/search/movie';
    const newurl=generateurl(path)+ '&query=' + value;
    let data = {};
    let ajaxRequestParams = {};
    ajaxRequestParams.method = "GET";
    ajaxRequestParams.url =  generateurl(path) + '&query=' + value;
    ajaxRequest(ajaxRequestParams,data,onSuccessfulResponse,onErrorResponse)
}

function generateurl(path){
    const url=`https://api.themoviedb.org/3${path}?api_key=9d3cf40fc2e5d40dadcb7053ca8f2add`;
    return url;
}

function ajaxRequest(requestParams,_data,successCallback,errorCallback){
    $.ajax({
        method: (requestParams.method) ? requestParams.method : "POST",
        url:requestParams.url,
        data:_data,
        success: function (response) {
            successCallback(response);
    
        },
        error: function (response) {
                errorCallback(response);
            }

    });
}

function onSuccessfulResponse(response){
    showMovies(response.results);
}

function onErrorResponse(response){
    alert("Error");
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        let completePoster = IMAGE_URL+poster_path;
        console.log(completePoster);
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${completePoster}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        
        `

        main.appendChild(movieElement);
    })
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}