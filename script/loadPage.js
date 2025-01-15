function togglSpinner(show){
    let spinner = document.getElementById('loading_spinner');
    if (spinner){
        spinner.style.display = show ? "flex" : "none";
    }
}

function loadMorePkm(){
    offset += limit;
    fetchPokemons();
}