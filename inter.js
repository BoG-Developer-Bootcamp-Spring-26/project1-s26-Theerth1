const leftClick = document.getElementById("leftClick");
const rightClick = document.getElementById("rightClick");
const infoButton = document.getElementById("info");
const movesButton = document.getElementById("moves");
const title = document.getElementById("title");
const details = document.getElementById("details");

let picture;
let typePicture;
let height;
let weight;
let hp;
let attack;
let defense;
let sa;
let sd;
let speed;
let moves = [];

const colorMatch = {
    Normal: A8A77A,
    Fire: EE8130,
    Water: 6390F0,
    Electric: F7D02C,
    Grass: 7AC74C,
    Ice: 96D9D6,
    
}


let currId = 1;

async function retrieveData(id) {

}