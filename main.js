const DEFAULT_COLOR = "#000";
const DEFAULT_MODE = "color";
const DEFAULT_GRID_SIZE = 16;

let currentColor = "";
let currentMode = "";
let currentGridSize = -1;

const gridSize = document.getElementById("gridSize");
const gridSlider = document.getElementById("gridSlider");
const colorButton = document.getElementById("colorButton");
const colorPicker = document.getElementById("colorPicker");
const rainbowButton = document.getElementById("rainbowButton");
const eraserButton = document.getElementById("eraserButton");
const clearButton = document.getElementById("clearButton");
const grid = document.getElementById("grid");

gridSlider.onchange = (e) => updateSize(e.target.value);
colorPicker.onchange = (e) => currentColor = e.target.value;
colorButton.addEventListener("click", function() {
    currentMode = "color";
});

rainbowButton.addEventListener("click", function() {
    currentMode = "rainbow";
});
eraserButton.addEventListener("click", function() {
    currentMode = "eraser";
});
clearButton.addEventListener("click", clearGrid);

function initValues() {
    currentColor = DEFAULT_COLOR;
    currentMode = DEFAULT_MODE;
    currentGridSize = DEFAULT_GRID_SIZE;
}

function loadGrid(size) {
    clearGrid
    for (let i = 0; i < (size * size); i++) {
        const gridTile = document.createElement("div");
        gridTile.addEventListener("mouseover", updateColor);
        grid.appendChild(gridTile);
    }

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

function updateColor(e) {
    switch (currentMode) {
        case "color":
            e.target.style.backgroundColor = currentColor;
            break;
        case "rainbow":
            const R_VALUE = Math.floor(Math.random() * 256);
            const G_VALUE = Math.floor(Math.random() * 256);
            const B_VALUE = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${R_VALUE}, ${G_VALUE},${B_VALUE})`;
            break;
        case "eraser":
            e.target.style.backgroundColor = "#fff";
            break;
    }
}

function updateSize(size) {
    gridSize.innerHTML = `Grid Size: ${size} x ${size}`;
    clearGrid();
    loadGrid(size);
}

function clearGrid() {
    grid.innerHTML = "";
    loadGrid(currentGridSize);
}

window.onload = function() {
    initValues();
    updateSize(currentGridSize);
    loadGrid(currentGridSize);
}