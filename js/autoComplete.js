const createAutoComplete = (config) => {

    const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label for=""><b>Search For a Movie</b></label>
<input type="text" class="input">
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results">
            
        </div>
    </div>
</div>

`;
const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


// first run timeoutId is falsy, setTimeout is ran returning a timeoutId, if there is another input event before 1000s, fetchData() is not run, rather and the process starts again until there is a 1s pause by the user, then fetchData runs. This is called Debouncing an Input. It means waiting for some time to pass after the last event to actually do something.

const onInput = async event => {
    const movies = await fetchData(event.target.value);
    if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
    }
   
    dropdown.classList.add('is-active');

    resultsWrapper.innerHTML = ''; // everytime a fetch is done remove existing records  
      
    
    for(let movie of movies){

        const imgSrc = movie.Poster === 'N/A' ? ' ' : movie.Poster;
        const option = document.createElement('a'); // an anchor tag
        option.classList.add('dropdown-item')
        option.innerHTML = `
        <img src="${imgSrc}"/>
        ${movie.Title}
        `;
        option.addEventListener('click',() => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie.imdbID);
        })
        resultsWrapper.appendChild(option);
    }
}
input.addEventListener('input',debounce(onInput));

document.addEventListener('click',event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});

};