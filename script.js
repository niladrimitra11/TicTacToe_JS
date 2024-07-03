let allBoxes = document.querySelectorAll(".box");
let resButton = document.querySelectorAll(".res")[1];
let newButton = document.querySelectorAll(".res")[0];
let winnerBox = document.querySelector(".winner");
let winnerText = document.querySelector("#winText");
let novelDiv = document.querySelector(".novel");

let xturn = true;
winnerBox.classList.add("vanishMode");

const winPattern = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

const showWinner = (win, i) => {
    winnerBox.classList.remove("vanishMode");
    let direction = i > -1 && i < 3 ? "Horizontally" : i > 2 && i < 6 ? "Vertically" : "Diagonally";
    winnerText.innerText = `Congratulations - Player ${win} won ${direction}`;
    novelDiv.classList.add("vanishMode");
};

const showDraw = () => {
    winnerBox.classList.remove("vanishMode");
    winnerText.innerText = "Draw!";
    novelDiv.classList.add("vanishMode");
};

const checkWinner = () => {
    let i = -1, isEmpty = false;
    for(patt of winPattern) {
        let ele1 = allBoxes[patt[0]-1].innerText, ele2 = allBoxes[patt[1]-1].innerText, ele3 = allBoxes[patt[2]-1].innerText;
        i++;
        if(ele1 != "" && ele2 != "" && ele3 != "") {
            if(ele1 === ele2 && ele2 === ele3) {
                showWinner(ele1, i);
            }
        }
        else
            isEmpty = true;
    }
    if(i=== 7 && !isEmpty)
        showDraw();
};

allBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
        if(xturn)
        {
            xturn = false;
            box.innerText = "X";
        }
        else
        {
            xturn = true;
            box.innerText = "O";
        }
        box.disabled = true;

        checkWinner();
    });
});

const refreshGame = () => {
    allBoxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    xturn = true;
};

resButton.addEventListener("click", () => {
    refreshGame();
});

newButton.addEventListener("click", () => {
    refreshGame();
    winnerBox.classList.add("vanishMode");
    novelDiv.classList.remove("vanishMode");
});