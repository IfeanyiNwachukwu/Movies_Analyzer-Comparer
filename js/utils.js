// Debounce function to delay fetch requests
const debounce = (func) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
       timeoutId = setTimeout(()=> {
            func.apply(null,args);// take the array of args and pass them as single arguments
        },350);
    }               
   
}