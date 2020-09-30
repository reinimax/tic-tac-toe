//gameboard
const gameBoard = ( () => {
    let board = ["","","","","","","","",""];
    const displayElements = document.querySelectorAll(".gb-field");
    displayElements.forEach(function(element) {
        element.addEventListener("click", function(event) {
            update(event);
        });
    });

    function update(event) {
        console.log(event.target.id);
        board[event.target.id] = "X";
        render();
    }

    function render() {
        for (let i = 0; i < board.length; i++) {
            displayElements[i].textContent = board[i];
        }  
    }

    return {render};
})();

//player
const Player = (name, sign) => {
    return {name, sign};
}

//game
const game = ( () => {
    //start game
    function startGame() {
        //create players
        const player1 = Player("player1", "X");
        const player2 = Player("player2", "O");

        //render game board
        gameBoard.render();

        //change player to player1 (player one starts)
    }
    //change player

    //end game

    return {startGame};
})();

//////////////
game.startGame();