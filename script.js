//gameboard
const gameBoard = ( () => {
    let board = ["X","O","X","O","X","O","X","O","X"];

    function render() {
        const display = document.querySelector("#gameboard");
        for (let i = 0; i < board.length; i++) {
            display.childNodes[i].textContent = board[i];
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