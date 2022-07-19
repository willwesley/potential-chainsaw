const Game = require('./game')

const game = new Game()

game.state.topcard = { color: 'BLUE', number: 4 }
// console.log(game.state)
// game.drawCard(0)
console.log(game.state.hands)
