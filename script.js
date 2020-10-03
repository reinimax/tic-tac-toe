//gameboard
const gameBoard = ( () => {
    let board = ["","","","","","","","",""];
    const displayElements = document.querySelectorAll(".gb-field");
    
    const winningCombos = [
        [0,1,2],[3,4,5],[6,7,8], //horizontal
        [0,3,6],[1,4,7],[2,5,8], //veritcal
        [0,4,8],[2,4,6]          //diagonal
    ];

    function addListeners() {
        displayElements.forEach(function(element) {
            element.addEventListener("click", update);
        });
    }
    
    function update(event) {
        console.log(event.target.id);
        board[event.target.id] = game.getActivePlayerSign();
        //remove eventlistener
        displayElements[event.target.id].removeEventListener("click", update);
        render();
        //check if game is over (THIS DESERVES ITS OWN FUNCTION)
        if (board.every(hasValue)) {
            game.endGame("T");
        } else if (checkGameState()) {
            game.endGame(game.getActivePlayerSign());
        } else {
            //tell the game to change active player
            game.changePlayer();
        }
        
    }

    function render() {
        for (let i = 0; i < board.length; i++) {
            displayElements[i].textContent = board[i];
        }  
    }

    function hasValue(boardElement) {
        //check if an element in the board-array is empty
        return boardElement !== "";
    }
    
/* Like this the nesting of some() and every() works...
const twoDimArray = [
    ["1","2"],["3","4"],["5","6"]
]

function test(sub) {
    console.log("Sub: " + sub);
    return (sub > 3);
}

function handSubArray(subArray) {
    console.log("SubArray: " + subArray);
    return (subArray.every(test));
}

console.log(twoDimArray.some(handSubArray));
*/


    function testCombos(sub) {
        return board[sub] === game.getActivePlayerSign();
    }

    function handSubArray(subArray) {
        return (subArray.every(testCombos));
    }

    function checkGameState() {
        return (winningCombos.some(handSubArray));
        /*for (let i = 0; i < winningCombos.length; i++) {
            if(winningCombos[i].every(testCombos) === true) return true;
        }*/
    }

    function removeListeners() {
        displayElements.forEach(function(element) {
            element.removeEventListener("click", update);
        });
    }

    function resetBoard() {
        board.fill("");
    }

    return {render, addListeners, removeListeners, resetBoard};
})();

//player
const Player = (name, sign) => {
    const active = false;
    return {name, sign, active};
}

//game
const game = ( () => {
    //create players
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    
    function init() {
        chacheDom();
        addListeners();
    }

    function chacheDom() {
        this.newGameBtn = document.querySelector("#newgame");
        this.startBtn = document.querySelector("#startgame");
        this.playerPanel = document.querySelector(".chooseplayers");
        this.announceWinner = document.querySelector("#announce-winner");
    }

    function addListeners() {
        newGameBtn.addEventListener("click", function() {
            playerPanel.classList.add("visible");
        });
        startBtn.addEventListener("click", startGame);
    }

    //start game
    function startGame() {   
        announceWinner.textContent = "";
        //collapse form for entering players
        playerPanel.classList.remove("visible");
        //add listeners and render game board
        gameBoard.addListeners();
        gameBoard.render();

        //change player to player1 (player one starts)
        player1.active = true;
    }
    
    //change player
    function changePlayer() {
        player1.active = (player1.active) ? false : true;
        player2.active = (player2.active) ? false : true;
    }

    function getActivePlayerSign() {
        return (player1.active) ? player1.sign : player2.sign;
    }

    //end game
    function endGame(winCode) {
        announceWinner.textContent = (winCode === "T") ? `It's a tie!` : 
                (winCode === "X") ? `${player1.name} won.` : 
                (winCode === "O") ? `${player2.name} won.` : "Something terrible happened ...";
        //reset board
        gameBoard.resetBoard();
        //remove listeners
        gameBoard.removeListeners();
    }

    return {init, startGame, changePlayer, getActivePlayerSign, endGame};
})();

//////////////
game.init();