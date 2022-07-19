//initial state
function Game() {
	this.randomCard = function() {
		const colorIndex = Math.floor(Math.random()*4)
		const number = Math.ceil(Math.random()*12)
		return {
			color: Game.COLORS[colorIndex],
			number: number
		}
	}
	this.state = {
		hands: [
			[' ', ' '],
		],
		activePlayer: 'A',
		turn: 1,
		outcome: 'In Progress',
		direction: "L",
		topcard: this.randomCard()
	}
	this.playCard = function(player, card) {
		if(this.canPlay(player, card)) {
			this.state.topcard = card
		}
	}

	this.canPlay = function(player, card) {
		if(card.color === this.state.topcard.color) {
			return true
		}
		return false
	}
}
Game.COLORS = [
	'RED', 'YELLOW', 'BLUE', 'GREEN'
]

module.exports = Game
