let BASE_URL = "https://pokeapi.co/api/v2/";
let offset = 0;
let limit = 20;
let allPokemons = [];
let arraySearchedPokemon = [];
let typeImages = {
    bug: "./assets/imgs/bug.png",
    dark: "./assets/imgs/dark.png",
    dragon: "./assets/imgs/dragon.png",
    electric: "./assets/imgs/electric.png",
    fairy: "./assets/imgs/fairy.png",
    fighting: "./assets/imgs/fighting.png",
    fire: "./assets/imgs/fire.png",
    flying: "./assets/imgs/flying.png",
    ghost: "./assets/imgs/ghost.png",
    grass: "./assets/imgs/grass.png",
    ground: "./assets/imgs/ground.png",
    ice: "./assets/imgs/ice.png",
    normal: "./assets/imgs/normal.png",
    poison: "./assets/imgs/poison.png",
    psychic: "./assets/imgs/psycic.png",
    rock: "./assets/imgs/rock.png",
    steel: "./assets/imgs/steel.png",
    water: "./assets/imgs/water.png",
}

function init() {
    fetchPokemons();
}

// Load and show infos Pokemons --------------------------------------------------------------------------------
async function fetchPokemons() {
    togglSpinner(true);
    try {
        let response = await fetch(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let responseToJson = await response.json();
        allPokemons = await fetchPokemonDetails(responseToJson.results); // Fetch Details für jedes Pokémon
        console.log(allPokemons);
        renderPokemons();
    } catch (error) {
        console.error("Error fetching Pokemons:", error);
    } finally {
        togglSpinner(false); // Hide the spinner after fetching is complete
    }
}

async function fetchPokemonDetails(pokemonList) { //pokemonList ist ein Array das von responseToJson.results uebergeben wird.
    let detailedPokemons = []; //leeres Array in das die detailierten Pokemon-Daten gespeichert werden
    for (let pokemon of pokemonList) { //Schleife durch jedes Pokemon in Pokemonlist
        // fuer jedes Pokemon wird eine fetch-Anfrage an die URL des Pokemon (pokemon.url) geschickt
        let response = await fetch(pokemon.url); //url des pokemon aufrufen
        if (response.ok) {
            let details = await response.json();
            let type = details.types && details.types[0] ? details.types[0].type.name : "unknown";
            let typeSecond = details.types && details.types[1] ? details.types[1].type.name : "unknown";
            let typeImg = typeImages[type];
            let typeImgSecond = typeImages[typeSecond];
            let height = details.height ? details.height : "unknown";
            let weight = details.weight ? details.weight : "unknown";
            let abilities = details.abilities || []; // Sichere Abfrage
            let ability_1 = abilities[0] ? abilities[0].ability.name : "unknown";
            let ability_2 = abilities[1] ? abilities[1].ability.name : "unknown";
            let typeClass = `type-${type}`;
            detailedPokemons.push({
                sprites: details.sprites.front_default,
                name: details.name,
                type: type,
                typeClass: typeClass,
                typeSecond: typeSecond,
                typeImg: typeImg,
                typeImgSecond: typeImgSecond,
                height: height,
                weight: weight,
                ability_1: ability_1,
                ability_2: ability_2,
            });
        }
    }
    return detailedPokemons;
}

async function renderPokemons() {
    if (!allPokemons || allPokemons.length === 0) {
        return;
    }
    let displayPokemonsRef = document.getElementById('display_pokemons_container');
    let cardOverlay = document.getElementById('overlay_card_info');
    for (let index = 0; index < allPokemons.length; index++) {
        displayPokemonsRef.innerHTML += basicTemplate(
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
            index);
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
            allPokemons[index].typeImgSecond);
    }
}

// Search for Pokemon --------------------------------------------------------------------------------
function searchPokemon() {
    let input = document.getElementById('pokemonName_input').value.trim().toLowerCase();
    let displayPokemonsRef = document.getElementById('display_pokemons_container');
    let filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input));

    if (input.length < 3 || filteredPokemons.length === 0) {
        displayPokemonsRef.innerHTML = alertInvalidInput();
        document.getElementById('button_div_main').classList.add('d_none'); //Funktioniert noch nicht
        return;
    } else {
        renderSearchedPokemon(filteredPokemons);
        document.getElementById('button_div_main').classList.add('d_none'); //Funktioniert noch nicht
        return;
    }
}

function renderSearchedPokemon(filteredPokemons) {
    let displayPokemonsRef = document.getElementById('display_pokemons_container');
    displayPokemonsRef.innerHTML = "";

    for (let index = 0; index < filteredPokemons.length; index++) {
        displayPokemonsRef.innerHTML += basicTemplate(
            filteredPokemons[index].name,
            filteredPokemons[index].sprites,
            filteredPokemons[index].typeClass,
            filteredPokemons[index].type,
            filteredPokemons[index].typeSecond,
            filteredPokemons[index].height,
            filteredPokemons[index].weight,
            filteredPokemons[index].ability_1,
            filteredPokemons[index].ability_2,
            filteredPokemons[index].typeImg,
            filteredPokemons[index].typeImgSecond,
            index
        );
    }
}

function resetSearch() {
    fetchPokemons();
    document.getElementById('pokemonName_input').value = "";
    document.getElementById('display_pokemons_container').innerHTML = "";
}



