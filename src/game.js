
module.exports = function Game() {
	this.state = {
		PlayerA: {
			health: 78,
			stamina: 78,
			ultBar: 78,
		},
		PlayerB : {
			health: 100,
			stamina: 100,
			ultBar: 100,
		},
		outcome: 'in progress'
	}
	const shieldToStamina = 5;
	const heal = 5;
	const lightAttack = 5;
	const heavyAttack = 20;
	const ult = 35;
	const ultChargeLightAttack = 20;
	const ultChargeHeavyAttack = 30;
	const ultShieldBlock = 10;

	const actions = {
		A: "",
		B: "",
	}


	function mechanics (player, opponent, myAction, theirAction) {
		if(theirAction == 'ult') {
			if(myAction == 'shield') {
				player.health = ult - ultShieldBlock
			}
		}
		if(myAction == 'shield') {
			player.stamina += shieldStamina
			return;
		}
		if(myAction == 'heal') {
			player.health += heal
		}
		if(theirAction == 'lightAttack') {
			player.health -= lightAttack
			opponent.ultBar += ultChargeLightAttack
		}
		else if(thierAction == 'heavyAttack') {
			player.health -= heavyAttack
			opponent.ultBar += ultChargeHeavyAttack
		}
	}

	this.action = function(player, action) {
		if(this.state.outcome !== 'in progress') {
			return
		}
		actions[player] = action
		if(actions.A !== "" && actions.B !== "") {
			mechanics(this.state.PlayerA, this.state.PlayerB, actions.A, actions.B)
			mechanics(this.state.PlayerB, this.state.PlayerA, actions.B, actions.A)
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
		}
	}
}

