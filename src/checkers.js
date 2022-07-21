module.exports = function Game(){ 
	this.state = {
		board: [
		],
		activePlayer: 'B',
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
				this.state.board[i][j] = ' '
			}
			if(([0,2,6].indexOf(i) !== -1
				&& j % 2 === 0)
				|| [1,5,7].indexOf(i) !== -1
				&& j % 2 === 1) {
				this.state.board[i][j] = ' '
			}
		}
	}

	this.place = function(player, from, to) {
		if(this.canPlace(player, from, to)) {
			this.state.board[to[0]][to[1]] = this.state.board[from[0]][from[1]]
			this.state.board[from[0]][from[1]] = ' '
			if(player == 'B' && to[0] < 1 || player == 'R' && to[0] > 6) {
				this.state.board[to[0]][to[1]] = player + 'K'
			}
			this.changePlayers()
		}
	}

	this.canPlace = function(player, from, to) {
		console.log(this.state.board[from[0]][from[1]])
		let jumping = false
		// red no go backward
		if(player == 'R' && from[0] >= to[0] && this.state.board[from[0]][from[1]] !== 'RK'){
			return false
		}
		// black no go backward
		if(player == 'B' && from[0] <= to[0] && this.state.board[from[0]][from[1]] !== 'BK'){
			return false
		}
		// moving more than one diagonal
		if (from[1] - 1 !== to[1]&&from[1] + 1 !== to[1]){
			// is a jump
			if(Math.abs(from[1] - to[1]) === 2 && Math.abs(from[0] - to[0]) === 2) {
				const inbetween = getInBetween(from, to)
				// no piece between
				if(this.state.board[inbetween[0]][inbetween[1]] === ' ') {
					return false
				}
				// own player's piece between
				if(this.state.board[inbetween[0]][inbetween[1]] === this.state.activePlayer) {
					return false
				}
				// remove jumped piece
				jumping = true
			} else { // some other random unlawful move
				return false
			}
		}
		if(Math.abs(from[0] - to[0]) !== Math.abs(from[1] - to[1])){
			return false
		}
		// destination not empty
		if (this.state.board[to[0]][to[1]] !== ' ') {
			return false
		}
		// source doesn't have piece owned by player
		if(this.state.board[from[0]][from[1]][0] !== player){
			return false
		}
		if(jumping) {
			const inbetween = getInBetween(from, to)
			this.state.board[inbetween[0]][inbetween[1]] = ' '
		}
		return true 
		
	}

	function getInBetween(from, to){
		dx = (from[0] - to[0])/2
		dy = (from[1] - to[1])/2
		return [
			from[0] - dx,
			from[1] - dy
		]
	}

	this.changePlayers = function () {
		if(this.state.activePlayer === 'B'){
			this.state.activePlayer = 'R'
		} else{
			this.state.activePlayer = 'B'
		}
	}
}
