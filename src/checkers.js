module.exports = function Game(){ 
	this.state = {
		board: [
		],
		activePlayer: 'X',
		turn: 1,
		outcome: 'In Progress'
	}

	for(let i = 0; i < 8; i++) {
		this.state.board[i] = []
		for(let j = 0; j< 8; j++) {
			if(i <=2) {
				this.state.board[i][j] = 'R'
			} else if(i >= 5) {
				this.state.board[i][j] = 'B'
			} else {
				this.state.board[i][j] = ''
			}
			if(([0,2,6].indexOf(i) !== -1
				&& j % 2 === 0)
				|| [1,5,7].indexOf(i) !== -1
				&& j % 2 === 1) {
				this.state.board[i][j] = ''
			}
		}
	}

	this.place = function(player, B, R) {
		if(this.canPlace(player,x,y)) {
			this.state.board[x][y] = player
			this.state.turn++
			if(this.checkWin()){
				this.state.outcome = this.state
			} else{
				this.switchPlayer()
			}
		}
	}
}