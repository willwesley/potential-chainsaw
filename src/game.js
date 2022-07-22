//initial state
function Game() {
	this.randomCard = function() {
		const colorIndex = Math.floor(Math.random()*4)
		const number = Math.ceil(Math.random()*14)
		return {
			color: Game.COLORS[colorIndex],
			number: number
		}
	}
	this.playCard = function(player, card) {
		if(this.canPlay(player, card)) {
			this.state.topcard = card
			const idx = this.state.hands[player].findIndex(function(c) {
				if(card.number >= 13) {
					return c.number === card.number
				}
				return card.color == c.color && card.number == c.number
			})
			if(idx >= 0) {
				this.state.hands[player].splice(idx, 1)
			} else {
				console.log(this.state.hands[player], card)
			}
			if(this.state.hands[player].length === 0) {
				this.state.outcome = 'Player ' + (player + 1) + ' won'
			}
			if(card.number === 10) {
				this.nextPlayer() 
			}
			if(card.number === 11) {
				if(this.state.direction === 'L') {
				    this.state.direction = 'R'
				} else {
				    this.state.direction = 'L'
				}
			}
			if(card.number === 12) {
				this.nextPlayer()
				this.state.hands[this.state.activePlayer].push(this.randomCard())
				this.state.hands[this.state.activePlayer].push(this.randomCard())
		    }
		    if(card.number === 14) {
				this.nextPlayer()
				this.state.hands[this.state.activePlayer].push(this.randomCard())
				this.state.hands[this.state.activePlayer].push(this.randomCard())
				this.state.hands[this.state.activePlayer].push(this.randomCard())
				this.state.hands[this.state.activePlayer].push(this.randomCard())
		    }

			this.nextPlayer()
		}
	}

	this.drawCard = function() {
		if(this.state.outcome === 'In Progress') {
			this.state.hands[this.state.activePlayer].push(this.randomCard())
			this.nextPlayer()
		}
	}

	this.canPlay = function(player, card) {
		if(this.state.outcome !== 'In Progress') {
			return false
		}
		if(this.state.activePlayer !== player) {
			return false
		}
		if(card.color === this.state.topcard.color) {
			return true
		}
		if(card.number === this.state.topcard.number) {
			return true
		}
		if (card.number >= 13) {
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

	this.state = {
		hands: [ [], [], [], [], ],
		activePlayer: 0,
		turn: 1,
		outcome: 'In Progress',
		direction: "L",
		topcard: this.randomCard()
	}
	for(let i = 0; i < 28; i++) {
		this.drawCard()
	}

}
Game.COLORS = [
	'RED', 'YELLOW', 'GREEN', 'BLUE'
]

module.exports = Game
