let BASE_URL = "https://pokeapi.co/api/v2/";
let offset = 0;
let limit = 20;
let allPokemons = [];
let foundPokemonsBySearch = [];
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

// Load Page --------------------------------------------------------------------------------
function togglSpinner(show) {
    let spinner = document.getElementById('loading_spinner');
    if (spinner) {
        spinner.style.display = show ? "flex" : "none";
    }
}

// Load and show infos Pokemons --------------------------------------------------------------------------------
async function fetchPokemons() {
    togglSpinner(true);
    try {
        let responseToJson = await fetchPokemonList();
        allPokemons = allPokemons.concat(await fetchPokemonDetails(responseToJson.results, allPokemons.length));
        renderPokemons();
    } catch (error) {
        console.error("Error fetching Pokemons:", error);
    } finally {
        togglSpinner(false);
    }
}

async function fetchPokemonList() {
    let response = await fetch(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return response.json();
}

async function fetchSinglePokemonDetails(pokemon) {
    let response = await fetch(pokemon.url);
    if (!response.ok) return null;
    return response.json();
}

function processPokemonDetails(details, index) {
    let types = details.types.map(type => type.type.name);
    let abilities = details.abilities || [];
    return {
        sprites: details.sprites.other["official-artwork"].front_default,
        name: details.name,
        types: types,
        typeClass: `type-${types[0]}`,
        typeImgs: types.map(type => typeImages[type]),
        height: details.height || "",
        weight: details.weight || "",
        ability_1: abilities[0]?.ability.name || "",
        ability_2: abilities[1]?.ability.name || "",
        stats: details.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat,
        })),
        criesLatest: details.cries?.latest || "",
        criesLegacy: details.cries?.legacy || "",
        id: details.id,
        index: index
    };
}

async function fetchPokemonDetails(pokemonList, start_index) {
    let detailedPokemons = [];
    for (let index = 0; index < pokemonList.length; index++) {
        let pokemon = pokemonList[index];
        let details = await fetchSinglePokemonDetails(pokemon);
        if (details) {
            detailedPokemons.push(processPokemonDetails(details, start_index + index));
        }
    }
    return detailedPokemons;
}

function renderPokemons() {
    let displayPokemonsRef = document.getElementById('display_pokemons_container');
    displayPokemonsRef.innerHTML = ""; 
        for (let index = 0; index < allPokemons.length; index++) {
            let pokemon = allPokemons[index];
            displayPokemonsRef.innerHTML += basicTemplate(
                pokemon.name, pokemon.sprites, pokemon.typeClass,
                pokemon.types, pokemon.height, 
                pokemon.weight, pokemon.ability_1, pokemon.ability_2,
                pokemon.typeImgs, pokemon.stats,
                pokemon.criesLatest, pokemon.criesLegacy, pokemon.id, pokemon.index
            );
        }  
}

function loadMorePkm() {
        offset += limit; 
        fetchPokemons();
        
}

// Search for Pokemon --------------------------------------------------------------------------------
function checkValidInput() {
    let inputPoke = document.getElementById('pokemon_input').value.trim().toLowerCase();
    let displayPokemonsRef = document.getElementById('display_pokemons_container');
    if (isNaN(inputPoke) && inputPoke.length < 3) { 
        displayPokemonsRef.innerHTML = alertInvalidInput();
        document.getElementById('button_div_search').classList.remove('d_none_reset_search_button');
        document.getElementById('button_div_main').style.display = 'none';
        return;
    }
    searchForInput(inputPoke);
}

function searchForInput(inputPoke) {
    foundPokemonsBySearch = allPokemons.filter(poke =>
        poke.name.toLowerCase().includes(inputPoke) ||
        poke.types.join(", ").toLowerCase().includes(inputPoke) ||
        poke.ability_1.toLowerCase().includes(inputPoke) ||
        poke.ability_2.toLowerCase().includes(inputPoke) ||
        poke.id === parseInt(inputPoke)
    );
    foundPokemonsBySearch = foundPokemonsBySearch.slice(0, 10);
    renderFoundPokemons();
}

function toggleSearchButtons() {
    document.getElementById('button_div_search').classList.remove('d_none_reset_search_button');
    document.getElementById('button_div_main').style.display = "none";
}

function renderFoundPokemons() {
    let displayFoundPokemon = document.getElementById('display_pokemons_container');
    displayFoundPokemon.innerHTML = "";
    if (foundPokemonsBySearch.length === 0) {
        showNoResultsMessage(displayFoundPokemon);
        return;
    }
    toggleSearchButtons();
    foundPokemonsBySearch.forEach((pokemon, index) => {
        displayFoundPokemon.innerHTML += basicTemplate(
            pokemon.name, pokemon.sprites, pokemon.typeClass, pokemon.types, pokemon.height, pokemon.weight, pokemon.ability_1,
            pokemon.ability_2, pokemon.typeImgs,
            pokemon.stats, pokemon.criesLatest, pokemon.criesLegacy, pokemon.id, pokemon.index
        );
    });
}

function resetSearch() {
    fetchPokemons();
    document.getElementById('pokemon_input').value = "";
    document.getElementById('display_pokemons_container').innerHTML = "";
    document.getElementById('display_pokemons_container').classList.remove('flex_display_pokemon_container')
    document.getElementById('button_div_main').style.display = "flex";
    document.getElementById('button_div_search').classList.add('d_none_reset_search_button');
}

// Switch Tabs Overlay --------------------------------------------------------------------------------
function openStatsTab() {
    document.getElementById('stats_tab').classList.remove('stats_tab_d_none');
    document.getElementById('info_tab').classList.add('info_tab_d_none');
    document.getElementById('cries_tab').classList.add('cries_tab_d_none');
}

function openInfoTab() {
    document.getElementById('stats_tab').classList.add('stats_tab_d_none');
    document.getElementById('info_tab').classList.remove('info_tab_d_none');
    document.getElementById('cries_tab').classList.add('cries_tab_d_none');
}

function openCriesTab() {
    document.getElementById('stats_tab').classList.add('stats_tab_d_none');
    document.getElementById('info_tab').classList.add('info_tab_d_none');
    document.getElementById('cries_tab').classList.remove('cries_tab_d_none');
}