const Game = require('./game')

const game = new Game()

game.state.topcard = { color: 'BLUE', number: 4 }
console.log(game)
game.playCard('A', { color: 'RED', number: 2})
console.log(game)
game.playCard('A', { color: game.state.topcard.color, number: 6})
console.log(game)
game.playCard('A', { color: 'BLUE', number: 6})
console.log(game)
game.playCard('A', { color: 'YELLOW', number: 6})
console.log(game)
game.playCard('A', { color: 'BLUE', number: 4})
console.log(game)
if(number===number)