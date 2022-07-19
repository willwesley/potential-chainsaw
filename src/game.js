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
		hands: [ [], [], [], [], ],
		activePlayer: 0,
		turn: 1,
		outcome: 'In Progress',
		direction: "L",
		topcard: this.randomCard()
	}
	this.drawCard = function(player, hands) {
		this.nextplayer(let(hands = 0 hands < 8))

		this.playCard = function(player, card) {
		if(this.canPlay(player, card)) {
			this.state.topcard = card
			this.nextPlayer()
		}
	}
}


	this.drawCard = function(player, hands) {
		this.state.hands[this.state.activePlayer].push(this.randomCard())
		this.nextPlayer()

	}

	this.canPlay = function(player, card) {
		if(this.state.activePlayer !== player) {
			return false
		}
		if(card.color === this.state.topcard.color) {
			return true
		}
		if(card.number === this.state.topcard.number) {
			return true
		}
		return false
	}

	this.nextPlayer = function() {
		if(this.state.direction === 'L') {
			this.state.activePlayer++
			if(this.state.activePlayer >= this.state.hands.length) {
				this.state.activePlayer = 0
			}
		} else {
			this.state.activePlayer--
			if(this.state.activePlayer < 0) {
				this.state.activePlayer = this.state.hands.length - 1
			}
		}
	}
}
Game.COLORS = [
	'RED', 'YELLOW', 'BLUE', 'GREEN'
]

module.exports = Game
