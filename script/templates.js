//Template render basic Pokemon-Info
function basicTemplate(name, sprite, typeClass, type, typeSecond, height, weight, ability_1, ability_2, typeImg, typeImgSecond, stats, criesLatest, criesLegacy, id, index) {
    return `<div onclick="openOverlayCardInfo(${id-1})" class="card_pokemon_info">
        <div class="background_head_card ${typeClass}">
            <h2> #${id}  ${name.toUpperCase()}</h2>
        </div>
        <div class="background_img_card ${typeClass}">
            <img class="pkm_img_card" src="${sprite}" alt="${sprite}" />
        </div>
        <div class="card_lower_info_section">
            <div class="element_pair">
                <p>${type}</p>
                <img class="symbol_element_card" src="${typeImg}">
            </div>
            <div class="element_pair">
                ${typeSecond !== "" ? `<p>${typeSecond}</p>` : ""}
                ${typeSecond !== "" ? `<img class="symbol_element_card" src="${typeImgSecond}" alt="${typeSecond} type image" />` : ""}
            </div>
        </div>
    </div>`;
}

//Template Overlay Card Pokemon-Info
function templateCardOverlay(name, sprite, typeClass, type, typeSecond, height, weight, ability_1, ability_2, typeImg, typeImgSecond, stats, criesLatest, criesLegacy, index) {
    return `<div onclick="eventBubblingOverlayCardInfo(event)" class="card_pokemon_info_overlay">
    <div class="head_section_overlay">
        <h1> ${name.toUpperCase()}</h1>
        <img onclick="closeOverlayCardInfo()" class="close_button" src="./assets/imgs/close_button.jpg" alt="">
    </div>
    <div class="menu_overlay">
    <div class="menu_item">
        <span onclick="openInfoTab()" class="material-symbols-outlined">info</span>
        <span class="tooltiptext_menu_overlay">Info</span>
    </div>
    <div class="menu_item">
        <span onclick="openStatsTab()" class="material-symbols-outlined">monitoring</span>
        <span class="tooltiptext_menu_overlay">Statistics</span>
    </div>
    <div class="menu_item">
        <span onclick="openCriesTab()" class="material-symbols-outlined">volume_up</span>
        <span class="tooltiptext_menu_overlay">Cryes</span>
    </div>
</div>
    <div class="background_img_card_overlay ${typeClass}">
        <!-- Info Tab -->
        <div id="info_tab">
        <h2>Information</h2>
        <table>
            <tr>
                <td>Height:</td>
                <td>${(height / 10).toFixed(1)} m</td>
            </tr>
            <tr>
                <td>Weight:</td>
                <td>${(weight / 10).toFixed(1)} kg</td>
            </tr>
            <tr>
                <td>Abilities:</td>
                <td>${ability_1}, ${ability_2}</td>
            </tr>
            <tr>
                <td>Types:</td>
                <td>${type}${typeSecond && typeSecond !== "unknowen" ? `, ${typeSecond}` : ""}</td>
            </tr>
        </table>
        <div class="arrow_section_overlay">
            <img onclick="nextPokemonLeft(${index})" class="next_arrow_overlay" src="./assets/imgs/arrow_left.png" alt="next">
            <img class="pkm_img_card_overlay" src="${sprite}" alt="${sprite}" />
            <img onclick="nextPokemonRight(${index})" class="next_arrow_overlay" src="./assets/imgs/arrow_right.png" alt="next">
        </div>  
        </div>

        <!--Statistics Tab -->
        <div id="stats_tab" class="stats_tab_d_none">
            <div class="category_statistic">
                <p class="category_name_statistic">${stats[0].name.toUpperCase()}</p>
                <progress class="progress_bar_stats" id="myProgress" value="${stats[0].base_stat}" max="100"></progress>
                <p class="progress-value">${stats[0].base_stat} %</p>
            </div>
            <div class="category_statistic">
                <p class="category_name_statistic">${stats[1].name.toUpperCase()}</p>
                <progress class="progress_bar_stats" id="myProgress" value="${stats[1].base_stat}" max="100"></progress>
                <p class="progress-value">${stats[1].base_stat} %</p>
            </div>
            <div class="category_statistic">
                <p class="category_name_statistic">${stats[2].name.toUpperCase()}</p>
                <progress class="progress_bar_stats" id="myProgress" value="${stats[2].base_stat}" max="100"></progress>
                <p class="progress-value">${stats[2].base_stat} %</p>
            </div>
            <div class="category_statistic">
                <p class="category_name_statistic">${stats[3].name.toUpperCase()}</p>
                <progress class="progress_bar_stats" id="myProgress" value="${stats[3].base_stat}" max="100"></progress>
                <p class="progress-value">${stats[3].base_stat} %</p>
            </div>
            <div class="category_statistic">
                <p class="category_name_statistic">${stats[4].name.toUpperCase()}</p>
                <progress class="progress_bar_stats" id="myProgress" value="${stats[4].base_stat}" max="100"></progress>
                <p class="progress-value">${stats[4].base_stat} %</p>
            </div>
            <div class="category_statistic">
                <p class="category_name_statistic">${stats[5].name.toUpperCase()}</p>
                <progress class="progress_bar_stats" id="myProgress" value="${stats[5].base_stat}" max="100"></progress>
                <p class="progress-value">${stats[5].base_stat} %</p>
            </div>
        </div>

        <!--Cryes Tab -->
        <div id="cries_tab" class="cries_tab_d_none">
            <h2 class="h2_cries">Cries</h2>
            <div class="category_cries">
                <p>Latest Cry</p>
                <audio controls volume="0.1" preload="none" src="${criesLatest}"></audio>
                <p>Legacy Cry</p>
                <audio controls volume="0.1" preload="none" src="${criesLegacy}"></audio>
            </div>
        </div>

    </div>
    <div class="card_lower_info_section">
        <div class="card_lower_info_section">
            <div class="symbol_element_card_overlay_div">
                <img class="symbol_element_card_overlay" src="${typeImg}">
                <span class="tooltiptext_type_symbol">${type}</span>
            </div>
            <div class="symbol_element_card_overlay_div">
                ${typeSecond !== "" ? `<img class="symbol_element_card_overlay" src="${typeImgSecond}" alt="${typeSecond} type image"/>` : ""}
                <span class="tooltiptext_type_symbol">${typeSecond}</span>
            </div>
        </div>
    </div>
</div>`;
}

function alertInvalidInput(){
    return `
    <div>
        <p>Invalid Input, please enter at least 3 valid characters or an id number.</p>
    </div>
    `
}

function showNoResultsMessage(container) {
    container.innerHTML = `<p>Sorry, but we couldn't find any Pokémon with this value.</p>`;
}