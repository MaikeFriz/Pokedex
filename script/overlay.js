let currentIndex = [];

function openOverlayCardInfo(index) {
    let cardOverlay = document.getElementById('overlay_card_info');
    let pokemon = allPokemons[index];

    cardOverlay.classList.remove("d_none");
    cardOverlay.innerHTML = templateCardOverlay(
        allPokemons[index].name, 
        allPokemons[index].sprites, 
        allPokemons[index].typeClass, 
        allPokemons[index].type, 
        allPokemons[index].typeSecond, 
        allPokemons[index].height, 
        allPokemons[index].weight, 
        allPokemons[index].ability_1, 
        allPokemons[index].ability_2, 
        allPokemons[index].typeImg, 
        allPokemons[index].typeImgSecond,
        allPokemons[index].stats);
}

function closeOverlayCardInfo() {
    let cardOverlay = document.getElementById('overlay_card_info');
    cardOverlay.classList.add("d_none");
}

function eventBubblingOverlayCardInfo(event) {
    event.stopPropagation();
}

function nextPokemonRight() {
    currentIndex = (currentIndex + 1) % allPokemons.length;
    openOverlayCardInfo(currentIndex);
}

function nextPokemonLeft() {
    currentIndex = (currentIndex - 1 + allPokemons.length) % allPokemons.length;
    openOverlayCardInfo(currentIndex);
}