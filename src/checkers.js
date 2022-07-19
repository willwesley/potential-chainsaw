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

	this.place = function(player, from, to) {
		if(this.canPlace(player, from, to)) {
			this.state.board[from[0]][from[1]] = ''
			this.state.board[to[0]][to[1]] = player
		}
	}

	this.canPlace = function(player, from, to) {
		if(from[0] >= to[0]){
			return false
		}
		if (from[1] - 1 !== to[1]&&from[1] + 1 !== to[1]){
			return false
		}
		if (this.state.board[to[0]][to[1]] !== '') {
			return false
		}
		if(this.state.board[from[0]][from[1]] !== player){
			return false
		}
		return true 
		
	}
}
