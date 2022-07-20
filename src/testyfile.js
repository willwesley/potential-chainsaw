const Game = require('./checkers')
const game = new Game()

console.table(game.state.board)
// game.place('R', [2,2], [3,3])
// game.place('B', [5,0], [4,1])
// game.place('R', [2,2], [1,3])
// game.place('R', [2,1], [3,2])
// game.place('R', [3,2], [4,3])
// game.place('B', [5,2], [3,4])
// game.place('B', [6,1], [4,3])
game.place('B', [5,2], [4,3])

console.table(game.state.board)
