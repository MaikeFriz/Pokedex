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

function loadMorePkm() {
    offset += limit;
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
        allPokemons = await fetchPokemonDetails(responseToJson.results);
        console.log(allPokemons);
        renderPokemons();
    } catch (error) {
        console.error("Error fetching Pokemons:", error);
    } finally {
        togglSpinner(false);
    }
}

async function fetchPokemonDetails(pokemonList) { 
    let detailedPokemons = []; 
    for (let pokemon of pokemonList) {
        let response = await fetch(pokemon.url); 
        if (response.ok) {
            let details = await response.json();
            let type = details.types && details.types[0] ? details.types[0].type.name : "";
            let typeSecond = details.types && details.types[1] ? details.types[1].type.name : "";
            let typeImg = typeImages[type];
            let typeImgSecond = typeImages[typeSecond];
            let height = details.height ? details.height : "";
            let weight = details.weight ? details.weight : "";
            let abilities = details.abilities || [];
            let ability_1 = abilities[0] ? abilities[0].ability.name : "";
            let ability_2 = abilities[1] ? abilities[1].ability.name : "";
            let typeClass = `type-${type}`;
            let stats = details.stats.map(statObj => ({
                name: statObj.stat.name,
                base_stat: statObj.base_stat,
            }));
            let criesLatest = details.cries.latest;
            let criesLegacy = details.cries.legacy;
            let id = details.id;
            detailedPokemons.push({
                sprites: details.sprites.other["official-artwork"].front_default,
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
                stats: stats,
                criesLatest: criesLatest,
                criesLegacy: criesLegacy,
                id: id,
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
            allPokemons[index].stats,
            allPokemons[index].criesLatest,
            allPokemons[index].criesLegacy,
            allPokemons[index].id,
            index);
    }
}

// Search for Pokemon --------------------------------------------------------------------------------

// function checkValidInput(){
//     let inputPoke = document.getElementById('pokemonName_input').value.trim().toLowerCase();
//     let displayPokemonsRef = document.getElementById('display_pokemons_container');
//     if (inputPoke.length < 3){
//         displayPokemonsRef.innerHTML = alertInvalidInput();
//         document.getElementById('button_div_search').classList.remove('d_none_reset_search_button');
//         document.getElementById('button_div_main').style.display = 'none';
//         return;
//     } else {
//         getDataForSearchedPokemon(inputPoke);
//     }
// }

// async function getDataForSearchedPokemon(inputPoke) {
//     togglSpinner(true);
//     try {
//         let responseForSearchedPoke = await fetch(`${BASE_URL}pokemon?limit=1306&offset=0`);
        
//         if (!responseForSearchedPoke.ok) {
//             document.getElementById('button_div_search').classList.remove('d_none_reset_search_button');
//             throw new Error(`Fehler beim Laden der Pokémon: ${responseForSearchedPoke.status}`);
//         }
        
//         let dataSearchedPoke = await responseForSearchedPoke.json();
//         let pokemonsForSearch = dataSearchedPoke.results; // Liste der Pokémon mit Namen und URL

//         searchInLoadedDataForPokes(pokemonsForSearch, inputPoke);
//     } catch (error) {
//         console.error("Fehler beim Laden der Pokémon:", error);
//     }
//     togglSpinner(false);
// }

// async function searchAndFilterPokemons(inputPoke, pokemonsForSearch) {
//     foundPokemonsBySearch = pokemonsForSearch.filter(poke => 
//         poke.name.toLowerCase.includes(inputPoke) ||
//         poke.
//     )

// }

// async function searchInLoadedDataForPokes(pokemonsForSearch, inputPoke) {
//     let foundPokemons = pokemonsForSearch.filter(pokemon => 
//         pokemon.name.toLowerCase().includes(inputPoke)
//     );
//     if (foundPokemons.length > 0) {
//         let detailedPokemons = await Promise.all(
//             foundPokemons.map(async (pokemon) => {
//                 let response = await fetch(pokemon.url);
//                 return await response.json();  
//             })
//         );
//         renderSearchedPokemon(detailedPokemons); 
//         document.getElementById('button_div_main').style.display = 'none';
//     } else {
//         document.getElementById('display_pokemons_container').innerHTML = 
//             `<p>Sorry, the name "${inputPoke}" was not found.</p>`;
//         document.getElementById('button_div_main').style.display = 'none';
//         document.getElementById('button_div_search').classList.remove('d_none_reset_search_button');
//     }
// }

// async function renderSearchedPokemon(detailedPokemons) {
//     let displayPokemonsRef = document.getElementById('display_pokemons_container');
//     displayPokemonsRef.innerHTML = "";
//     document.getElementById('button_div_search').classList.remove('d_none_reset_search_button');
    
//     for (let index = 0; index < detailedPokemons.length; index++) {
//         let pkm = detailedPokemons[index];  
//         let sprites = pkm.sprites.other["official-artwork"].front_default;
//         let type = pkm.types?.[0]?.type.name || "";
//         let typeSecond = pkm.types?.[1]?.type.name || "";
//         let typeImg = typeImages[type] || "";
//         let typeImgSecond = typeImages[typeSecond] || "";
//         let height = pkm.height || "";
//         let weight = pkm.weight || "";
//         let abilities = pkm.abilities || [];
//         let ability_1 = abilities[0]?.ability.name || "";
//         let ability_2 = abilities[1]?.ability.name || "";
//         let typeClass = `type-${type}`;
//         let id = pkm.id;
//         let stats = pkm.stats ? pkm.stats.map(statObj => ({
//             name: statObj.stat.name,
//             base_stat: statObj.base_stat,
//         })) : [];

//         displayPokemonsRef.innerHTML += basicTemplate(
//             pkm.name,
//             sprites,
//             typeClass,
//             type,
//             typeSecond,
//             height,
//             weight,
//             ability_1,
//             ability_2,
//             typeImg,
//             typeImgSecond,
//             stats,
//             pkm.cries?.latest || "",  
//             pkm.cries?.legacy || "",
//             id,
//             index,
//         );
//     }
// }


function resetSearch() {
    fetchPokemons();
    document.getElementById('pokemonName_input').value = "";
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


