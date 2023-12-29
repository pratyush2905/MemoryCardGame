const tilesContainer = document.querySelector(".tiles");
const colors = ["aquamarine", "coral", "fuchsia", "gold", "greenyellow", "indigo", "orchid", "plum"];
const colorPick = [...colors, ...colors];
const tileCount = colorPick.length;

///Game State
let revealedCount = 0;
let activeTile = null;
let EndMove = false;
let turns=0;

function buildTiles(col) {
    const element = document.createElement("div");

    element.classList.add("tile");

    element.setAttribute("data-color", col);
    element.setAttribute("data-revelaed", false);

    element.addEventListener("click", () => {
        const reveal = element.getAttribute("data-revealed");

        if (EndMove || reveal === "true" || element===activeTile) {
            return;
        }

        element.style.backgroundColor = col;

        if (!activeTile) {
            activeTile = element;
            return;
        }

        const colorToMatch = activeTile.getAttribute("data-color");

        if (colorToMatch === col) {

            activeTile.setAttribute("data-revealed", true);
            element.setAttribute("data-revealed", true);

            EndMove = false;
            activeTile = null;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                alert("You Took "+turns+" Turns!!");
            }
            return;
        }
        EndMove = true;
        setTimeout(() => {
            turns++;
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            EndMove = false;
            activeTile = null;

        }, 700);

    });

    return element;
}

for (let i = 0; i < tileCount; i++) {
    const randomInd = Math.floor(Math.random() * colorPick.length);
    const col = colorPick[randomInd];

    colorPick.splice(randomInd, 1);

    const tile = buildTiles(col);

    tilesContainer.appendChild(tile);
}