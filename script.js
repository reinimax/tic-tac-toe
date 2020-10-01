//gameboard
const gameBoard = ( () => {
    let board = ["","","","","","","","",""];
    const displayElements = document.querySelectorAll(".gb-field");
    
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
            game.endGame();
        } else 
        //if one player got 3 in a row -> endgame with announcing winner
        //else ...
        {
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

    return {render, addListeners};
})();

//player
const Player = (name, sign) => {
    const active = false;
    return {name, sign, active};
}

//game
const game = ( () => {
    //create players
    const player1 = Player("player1", "X");
    const player2 = Player("player2", "O");
    
    //start game
    function startGame() {   
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
    function endGame() {
        console.log("Game ended (board full)");
    }

    return {startGame, changePlayer, getActivePlayerSign, endGame};
})();

//////////////
game.startGame();