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
    apiInfo["moves"] = data.moves.map(m => m.move.name).slice(0, 20);

    nameBox.textContent = apiInfo["name"];
    nameBox.style.textAlign = "center";
    nameBox.style.fontStyle = "Inter";
    nameBox.style.fontSize = "30px";
    pictureBox.style.backgroundImage = "url('" + apiInfo["picture"] + "')";

    for (const type of apiInfo["types"]) {
        const typeTag = document.createElement("span");
        typeTag.textContent = type;
        typeTag.style.backgroundColor = colorMatch[type.charAt(0).toUpperCase() + type.substring(1)];
        typeTag.style.padding = "8px 16px";
        typeTag.style.borderRadius = "5px";
        typeTag.style.fontSize = "14px";
        typeBox.appendChild(typeTag);
    }
    if (info) {
        details.innerHTML = "";

        for (let [key, val] of Object.entries(apiInfo["displayInfo"])) {
            const valueItem = document.createElement("span");

            if (key === "height") {
                // Divide by 10 to convert 0.1m to meters
                valueItem.innerHTML = `${key}: ${val / 10}m`;
            } else if (key === "weight") {
                // Divide by 10 to convert 0.1kg to kg
                valueItem.innerHTML = `${key}: ${val / 10}kg`;
            } else {
                valueItem.innerHTML = `${key}: ${val}`;
            }
            
            details.append(valueItem);
        }
    } else if (moves) {
        details.innerHTML = "";

        for (let move of apiInfo["moves"]) {
            const valueItem = document.createElement("span");
            valueItem.innerHTML = move;
            details.append(valueItem);
        }
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
        retrieveDisplayData(currId);
    }
})

movesButton.addEventListener('click', () => {
    if (info) {
        info = false;
        moves = true;
        movesButton.style.backgroundColor = "#7CFF79";
        infoButton.style.backgroundColor = "";
        title.innerHTML = "Moves";
        retrieveDisplayData(currId);
    }
})