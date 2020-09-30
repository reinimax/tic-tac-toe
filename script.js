//gameboard
const gameBoard = ( () => {
    let board = ["X","O","X","O","X","O","X","O","X"];

    function render() {
        const displayElements = document.querySelectorAll(".gb-field");
        
        for (let i = 0; i < board.length; i++) {
            displayElements[i].textContent = board[i];
        }
        
    }

    return {render};
})();

//player
const Player = (name) => {
    return {name};
}

//game
const game = ( () => {
    //controls the game-flow

    return {};
})();

//////////////
gameBoard.render();