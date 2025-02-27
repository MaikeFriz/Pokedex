function openOverlayCardInfo(index) {
    togglSpinner(true);
    let cardOverlay = document.getElementById('overlay_card_info');
    let pokemon = allPokemons[index];
    cardOverlay.classList.remove("d_none");
    document.body.classList.add('no-scroll');
    cardOverlay.innerHTML = templateCardOverlay(
        pokemon.name, pokemon.sprites, pokemon.typeClass, 
        pokemon.types, pokemon.height, 
        pokemon.weight, pokemon.ability_1, pokemon.ability_2, 
        pokemon.typeImgs, pokemon.stats,
        pokemon.criesLatest, pokemon.criesLegacy, index,
    );
    togglSpinner(false);
}

function closeOverlayCardInfo() {
    let cardOverlay = document.getElementById('overlay_card_info');
    cardOverlay.classList.add("d_none");
    document.body.classList.remove('no-scroll');
}

function eventBubblingOverlayCardInfo(event) {
    event.stopPropagation();
}

function nextPokemonRight(index) {
    index = (index + 1) % allPokemons.length;
    openOverlayCardInfo(index);
}

function nextPokemonLeft(index) {
    index = (index - 1 + allPokemons.length) % allPokemons.length;
    openOverlayCardInfo(index);
}