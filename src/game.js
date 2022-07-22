
module.exports = function Game() {
	this.state = {
		PlayerA: {
			health: 100,
			stamina: 100,
			ultBar: 0,
		},
		PlayerB : {
			health: 100,
			stamina: 100,
			ultBar: 0,
		},
		outcome: 'in progress',
		lastActions: { A: '', B: ''}
	}
	const shieldToStamina = 5;
	const heal = 5;
	const lightAttack = 10;
	const heavyAttack = 20;
	const ult = 30;
	const ultChargeLightAttack = 20;
	const ultChargeHeavyAttack = 30;
	const ultShieldBlock = 10;
	const lightAttackStamina = 10
	const heavyAttackStamina = 20

	const actions = {
		A: "",
		B: "",
	}


	function mechanics (player, opponent, myAction, theirAction) {
		if(opponent.ultBar == 100 && theirAction == 'ult') {
			player.health -= ult
			opponent.ultBar = 0
			if(myAction == 'shield') {
				player.health += ultShieldBlock
			}
		}
			
		if(myAction == 'shield') {
			player.stamina += shieldToStamina
			if(player.stamina < 0) {
				player.stamina = 0
			}
			if(player.stamina > 100) {
				player.stamina = 100
			}
			return;
		}
		if(myAction == 'heal') {
			player.health += heal
		}
		if (opponent.stamina >= 10 && theirAction == 'lightAttack') {
			player.health -= lightAttack
			opponent.ultBar += ultChargeLightAttack
			opponent.stamina -= lightAttackStamina
		}
		
		if(opponent.stamina >= 20 && theirAction == 'heavyAttack') {
			player.health -= heavyAttack
			opponent.ultBar += ultChargeHeavyAttack
			opponent.stamina -= heavyAttackStamina
		}
		if(player.health < 0) {
			player.health = 0
		}
		if(player.health > 100) {
			player.health = 100
		}
		if(opponent.stamina < 0) {
			opponent.stamina = 0
		}
		if(opponent.stamina > 100) {
			opponent.stamina = 100
		}
		if(opponent.ultBar > 100) {
			opponent.ultBar = 100
		}

	}

	this.action = function(player, action) {
		if(this.state.outcome !== 'in progress') {
			return
		}
		actions[player] = action
		console.log(player, action, actions)
		if(actions.A !== "" && actions.B !== "") {
			mechanics(this.state.PlayerA, this.state.PlayerB, actions.A, actions.B)
			mechanics(this.state.PlayerB, this.state.PlayerA, actions.B, actions.A)
			this.state.lastActions = {...actions}
			actions.A = ""
			actions.B = ""
			if(this.state.PlayerA.health <= 0 && this.state.PlayerB.health <= 0) {
				this.state.outcome = 'Draw'
			}
			else if(this.state.PlayerA.health <= 0) {
				this.state.outcome = 'PlayerB won'
			}
			else if(this.state.PlayerB.health <= 0) {
				this.state.outcome = 'PlayerA won'
			}
			if(this.onTurnEnd) {
				this.onTurnEnd()
			}
		}
	}
}

