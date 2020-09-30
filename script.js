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