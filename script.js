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
        if (event.type === "click") {
            //if the function is called via a click-event from the player
            board[event.target.id] = game.getActivePlayerSign();
            displayElements[event.target.id].removeEventListener("click", update);
        } else {
            //if the function is called via the AI. In this case, event = a randomly chosen number
            board[event] = game.getActivePlayerSign();
            displayElements[event].removeEventListener("click", update);
        }
        render();
        checkGameState();
    }

    function render() {
        for (let i = 0; i < board.length; i++) {
            displayElements[i].textContent = board[i];
        }  
    }

    function checkGameState() {
        if (checkForWin()) {
            game.endGame(game.getActivePlayerSign());
        } else if (board.every(hasValue)) {
            game.endGame("T");
        } else {
            game.changePlayer();
            if (game.isAIActive() && game.getActivePlayerSign() === "O") weakAIMove();
        }
    }

    function generateRandomNum() {
        return Math.floor(Math.random()*9);
    }
    
    function weakAIMove() { 
        do {
            var aiChoice = generateRandomNum();
        } while (board[aiChoice] !== "")
        update(aiChoice);
    }

    function hasValue(boardElement) {
        //check if an element in the board-array is empty
        return boardElement !== "";
    }

    function testCombos(sub) {
        return board[sub] === game.getActivePlayerSign();
    }

    function handSubArray(subArray) {
        return (subArray.every(testCombos));
    }

    function checkForWin() {
        return (winningCombos.some(handSubArray));
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
    let gameRunning = false;
    //create players
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    
    function init() {
        chacheDom();
        addListeners();
        checkforAI(); //this ensures that player 2 field stays disabled when AI is checked even when page is reloaded
    }

    function chacheDom() {
        this.newGameBtn = document.querySelector("#newgame");
        this.startBtn = document.querySelector("#startgame");
        this.playerPanel = document.querySelector(".chooseplayers");
        this.announceWinner = document.querySelector("#announce-winner");
        this.player1NameField = document.querySelector("#player1");
        this.player2NameField = document.querySelector("#player2");
        this.aiCheckBox = document.querySelector("#ai");
    }

    function addListeners() {
        newGameBtn.addEventListener("click", function() {
            playerPanel.classList.add("visible");
            if (gameRunning) endGame("C");
        });
        startBtn.addEventListener("click", startGame);
        aiCheckBox.addEventListener("click", checkforAI);
    }

    function checkforAI() {
        player2NameField.disabled = (aiCheckBox.checked) ? true : false;
    }

    function isAIActive() {
        return aiCheckBox.checked;
    }

    //start game
    function startGame() {   
        gameRunning = true;
        setPlayerNames()
        //clear field that announces winner from previous game
        announceWinner.textContent = "";
        //collapse form for entering players
        playerPanel.classList.remove("visible");
        //add listeners to gameboard and render gameboard
        gameBoard.addListeners();
        gameBoard.render();

        //change player to player1 (player one starts)
        player1.active = true;
    }
    
    function setPlayerNames() {
        player1.name = (player1NameField.value) ? player1NameField.value : "Player 1";
        player2.name = (player2NameField.disabled) ? "The mighty AI" :
                (player2NameField.value) ? player2NameField.value : "Player 2";
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
                (winCode === "O") ? `${player2.name} won.` :
                (winCode === "C") ? `Game was cancelled!` : "Something terrible happened ...";
        //reset board
        gameBoard.resetBoard();
        //remove listeners
        gameBoard.removeListeners();
        gameRunning = false;
    }

    return {init, startGame, changePlayer, getActivePlayerSign, isAIActive, endGame};
})();

//////////////
game.init();