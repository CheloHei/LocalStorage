const lista = document.querySelector('#tuits');

eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    lista.addEventListener('click', borrarTweet);


    document.addEventListener('DOMContentLoaded', localStorageList);

}
//Añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
    //Leyendo el valor del text area
    const tweet = document.querySelector('#tweet').value;
//Creando boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'text-danger';
    botonBorrar.innerText = 'X';

//console.log(tweet);
//Crear elemento y añadir a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
//Añadiendo bton borrar
    li.appendChild(botonBorrar);
    lista.appendChild(li);
   
            agregarLocalStorage(tweet);
}

function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'text-danger') {
        e.target.parentElement.remove();
        //alert('Se ha eliminado el tweet');
        
        borrarTweetLocal(e.target.parentElement.innerText);
    }
}

function localStorageList() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet) {
//Creando boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'text-danger';
        botonBorrar.innerText = 'X';

//console.log(tweet);
//Crear elemento y añadir a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
//Añadiendo bton borrar
        li.appendChild(botonBorrar);
        lista.appendChild(li);
    });
}




function agregarLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.push(tweet);
    //Convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets));


//agregar al local storage
    //localStorage.setItem('tweets',tweet);
}


//Comprueba si existen elementos en localStorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}


//Muestra los datos del localStorage 

function borrarTweetLocal(tweet){
    let tweets, tweetBorrar;
    //Elimina una porcion de texto
    tweetBorrar = tweet.substring(0,tweet.length - 1);
    
    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(function(tweet, index){
        if (tweetBorrar === tweet) {
            tweets.splice(index,1);
        } 
    });
    localStorage.setItem('tweets',JSON.stringify(tweets));
}