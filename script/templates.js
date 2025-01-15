//Template render basic Pokemon-Info
function basicTemplate(name, sprite, typeClass, type, typeSecond, height, weight, ability_1, ability_2, typeImg, typeImgSecond, index){
    return `<div onclick="openOverlayCardInfo(${index})" class="card_pokemon_info">
        <div class="background_head_card">
            <h2> #${index + 1}  ${name}</h2>
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
                ${typeSecond !== "unknown" ? `<p>${typeSecond}</p>` : ""}
                ${typeSecond !== "unknown" ? `<img class="symbol_element_card" src="${typeImgSecond}" alt="${typeSecond} type image" />` : ""}
            </div>
        </div>
    </div>`;
}

//Template Overlay Card Pokemon-Info
function templateCardOverlay(name, sprite, typeClass, type, typeSecond, height, weight, ability_1, ability_2, typeImg, typeImgSecond){
    return `<div onclick="eventBubblingOverlayCardInfo(event)" class="card_pokemon_info_overlay">
    <div class="head_section_overlay">
        <h1> ${name}</h1>
        <img onclick="closeOverlayCardInfo()" class="close_button" src="./assets/imgs/close_button.jpg" alt="">
    </div>
    <div class="menu_overlay">
        <span class="material-symbols-outlined">info</span>
        <span class="material-symbols-outlined">monitoring</span>
        <span class="material-symbols-outlined">volume_up</span>
    </div>
    <div class="background_img_card_overlay ${typeClass}">
        <!-- Info Tab -->
        <h2>Information</h2>
        <table>
            <tr>
                <td>Height:</td>
                <td>${(height/ 10).toFixed(1)} m</td>
            </tr>
            <tr>
                <td>Weight:</td>
                <td>${(weight/ 10).toFixed(1)} kg</td>
            </tr>
            <tr>
                <td>Abilities:</td>
                <td>${ability_1}, ${ability_2}</td>
            </tr>
            <tr>
                <td>Types:</td>
                <td>${type}, ${typeSecond}</td>
            </tr>
        </table>
        <div class="arrow_section_overlay">
            <img onclick="nextPokemonLeft()" class="next_arrow_overlay" src="./assets/imgs/arrow_left.png" alt="next">
            <img class="pkm_img_card_overlay" src="${sprite}" alt="${sprite}" />
            <img onclick="nextPokemonRight()" class="next_arrow_overlay" src="./assets/imgs/arrow_right.png" alt="next">
        </div>    
    </div>
    <div class="card_lower_info_section">
    <img class="symbol_element_card_overlay" src="${typeImg}">
    ${typeSecond !== "unknown" ? `<img class="symbol_element_card_overlay" src="${typeImgSecond}" alt="${typeSecond} type image"/>` : ""}
    </div>
</div>`;
}