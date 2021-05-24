const createAutoComplete = ({root,renderOption,onOptionSelect,inputValue,fetchData}) => {

    
    root.innerHTML = `
    <label for=""><b>Search</b></label>
    <input type="text" class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
                
            </div>
        </div>
    </div>

    `;
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');


    // first run timeoutId is falsy, setTimeout is ran returning a timeoutId, if there is another input event before 1000s, fetchData() is not run, rather and the process starts again until there is a 1s pause by the user, then fetchData runs. This is called Debouncing an Input. It means waiting for some time to pass after the last event to actually do something.

    const onInput = async event => {
        const items = await fetchData(event.target.value);
        if(!items.length){
            dropdown.classList.remove('is-active');
            return;
        }
    
        dropdown.classList.add('is-active');

        resultsWrapper.innerHTML = ''; // everytime a fetch is done remove existing records  
        
        
        for(let item of items){

            
            const option = document.createElement('a'); // an anchor tag
            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item);
            option.addEventListener('click',() => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item.imdbID);
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