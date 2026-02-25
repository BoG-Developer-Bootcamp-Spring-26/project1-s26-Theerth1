const leftClick = document.getElementById("leftClick");
const rightClick = document.getElementById("rightClick");
const infoButton = document.getElementById("info");
const movesButton = document.getElementById("moves");
const title = document.getElementById("title");
const details = document.getElementById("details");
const nameBox = document.getElementById("nameBox");
const typeBox = document.getElementById("typeBox");
const pictureBox = document.getElementById("pictureBox");

const apiInfo = {};


const colorMatch = {
    "Normal": "#A8A77A",
    "Fire": "#EE8130",
    "Water": "#6390F0",
    "Electric": "#F7D02C",
    "Grass": "#7AC74C",
    "Ice": "#96D9D6",
    "Fighting": "#C22E28",
    "Poison": "#A33EA1",
    "Ground": "#E2BF65",
    "Flying": "#A98FF3",
    "Psychic": "#F95587",
    "Bug": "#A6B91A",
    "Rock": "#B6A136",
    "Ghost": "#735797",
    "Dragon": "#6F35FC",
    "Dark": "#705746",
    "Steel": "#B7B7CE",
    "Fairy": "#D685AD"
}


let currId = 1;
let info = true;
let moves = false;
let initial = true;

async function retrieveDisplayData(id) {
    typeBox.innerHTML = "Types: "
    r = await fetch("https://pokeapi.co/api/v2/pokemon/" + id + "/");
    data = await r.json();
    apiInfo["name"] = data.name;
    apiInfo["picture"] = data.sprites.other['official-artwork'].front_default;
    apiInfo["types"] = data.types.map(t => t.type.name);
    apiInfo["displayInfo"] = {
        "height": data.height,
        "weight": data.weight,
        "hp": data.stats[0].base_stat,
        "attack": data.stats[1].base_stat,
        "defense": data.stats[2].base_stat,
        "special-attack": data.stats[3].base_stat,
        "special-defense": data.stats[4].base_stat,
        "speed": data.stats[5].base_stat
    }
    apiInfo["moves"] = data.moves.map(m => m.move.name)

    nameBox.textContent = apiInfo["name"];
    nameBox.style.textAlign = "center";
    nameBox.style.fontStyle = "Inter";
    nameBox.style.fontSize = "30px";
    pictureBox.style.backgroundImage = "url('" + apiInfo["picture"] + "')";

    for (const type of apiInfo["types"]) {
        const typeTag = document.createElement("span");
        typeTag.textContent = type.charAt(0).toUpperCase() + type.substring(1);
        typeTag.style.backgroundColor = colorMatch[type.charAt(0).toUpperCase() + type.substring(1)];
        typeTag.style.padding = "8px 16px";
        typeTag.style.borderRadius = "5px";
        typeTag.style.fontSize = "14px";
        typeBox.appendChild(typeTag);
    }
    if (info) {
        for (let value of apiInfo["displayInfo"].entries()) {
            const valueItem = document.createElement("span");
            
        }
    } else if (moves) {
        // display moves
    }
}

if (initial) {
    retrieveDisplayData(currId);
    initial = false;
}

leftClick.addEventListener('click', () => {
    if (currId > 1) {
        currId -= 1;
        retrieveDisplayData(currId);
    }
})

rightClick.addEventListener('click', () => {
    if (currId < 1302) {
        currId += 1;
        retrieveDisplayData(currId);
    }
})

infoButton.addEventListener('click', () => {
    if (moves) {
        info = true;
        moves = false;
        infoButton.style.backgroundColor = "#7CFF79";
        movesButton.style.backgroundColor = "";
        title.innerHTML = "Info";
        // need to change title to info and replace the display info
    }
})

movesButton.addEventListener('click', () => {
    if (info) {
        info = false;
        moves = true;
        movesButton.style.backgroundColor = "#7CFF79";
        infoButton.style.backgroundColor = "";
        title.innerHTML = "Moves";
        // need to change title to moves and replace the display info
    }
})