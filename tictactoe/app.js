let boxes = document.querySelectorAll(".box");
let mesCon = document.querySelector(".mescon"); 
let winnerMessage = document.querySelector("#mes"); 
let newGameButton = document.querySelector("#newbt");
let resetButton = document.querySelector(".reset-button");

let turno = true; 
let gameActive = true;

const winningArrays = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!gameActive || box.innerText !== "") return; // Prevent clicks after game ends or on filled boxes

        box.innerText = turno ? "O" : "X";
        turno = !turno;

        box.style.pointerEvents = "none"; 
        checkWinner();
    });
});

const checkWinner = () => {
    for (let winCombo of winningArrays) {
        let [a, b, c] = winCombo;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            gameActive = false;
            winnerMessage.innerText = `Congratulations, Winner is ${val1}`;
            mesCon.classList.add("show");
            return;
        }
    }

    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "") && gameActive) {
        winnerMessage.innerText = `It's a Draw!`;
        mesCon.classList.add("show");
        gameActive = false;
    }
};

// New game logic
newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);

function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
    });
    mesCon.classList.remove("show");
    turno = true;
    gameActive = true;
}
