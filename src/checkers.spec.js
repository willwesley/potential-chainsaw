const Game = require('./checkers')

describe("Game", function(){
	// it('has empty 8x8 board', function(){
	// 	const game = new Game();

	// 	expect(game.state.board.length).toBe(8);
	// 	expect(game.state.board[0].length).toBe(8);
	// 	expect(game.state.board[1].length).toBe(8);
	// 	expect(game.state.board[2].length).toBe(8);
	// 	expect(game.state.board[3].length).toBe(8);
	// 	expect(game.state.board[4].length).toBe(8);
	// 	expect(game.state.board[5].length).toBe(8);
	// 	expect(game.state.board[6].length).toBe(8);
	// 	expect(game.state.board[7].length).toBe(8);
	// 	for(let row of game.state.board){
	// 		for(let cell of row) {
	// 			expect(cell).toBe('')
	// 		}
	// 	}
	// 	expect(game.state.activePlayer).toBe('B')
	// 	expect(game.state.turn).toBe(1)
	// 	expect(game.state.outcome).toBe('In Progress')

	// });
	// it('lets black place first', function() {
	// 	const game = new Game();
	// 	const player = 'B'
	// 	const x = 0,y= 0

	// 	game.place(player, x, y)

	// 	espect(game.state.board[0][0]).toBe('X')

	// })
	
	// it('no let red place first', function() {
	// 	const game = new Game()
	// 	const player = 'R'
	// 	const x = 0, y = 0

	// 	game.place(player, x, y)

	// 	expect(game.state.board[0][0]).toBe('')
	// })
	
	// if('lets red place second', function() {
	// 	const game = new  Game();
	// 	game.place('B', 0, 0)

	// 	game.place('R', 0, 1)

	// 	expect(game.state.board[0][1]).toBe('R')

	// // })
})
