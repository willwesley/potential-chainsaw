const Stage = require('stage-js/platform/web');

// Create new app
Stage(function(stage) {

  // Set view box
  stage.viewbox(1000, 1000);

 
  const jotaro = Stage.image('jotaro').appendTo(stage),
  const dio = Stage.image('dio').appendTo(stage),
  const ult = Stage.image('ult').appendTo(stage),
  const lightAttack = Stage.image('lightAttack').appendTo(stage),
  const heavyAttack = Stage.image('heavyAttack').appendTo(stage),
  const shield = Stage.image('shield').appendTo(stage),
  const heal = Stage.image('heal').appendTo(stage),
  const background = Stage.image('background').appendTo(stage),
  const starPlatinum = Stage.image('starPlatinum').appendTo(stage),
  const theWorld = Stage.image('theWorld').appendTo(stage),

  jotaro.pin('align', 0.5),
  dio.pin('align', 0.5),
  ult.pin('align', 0.5),
  lightAttack.pin('align', 0.5),
  heavyAttack.pin('align', 0.5),
  shield.pin('align', 0.5),
  heal.pin('align', 0.5),
  ult.pin('align', 0.5),
  background.pin('align', 0.5),
  theWorld.pin('align', 0.5),
  starPlatinum.pin('align', 0.5),












module.exports = function Game() {
	this.state = {
		PlayerA: {
			health = 100,
			stamina = 100,
			ultBar = 100,
		},
		PlayerB : {
			health = 100,
			stamina = 100,
			ultBar = 100,
		},
		outcome: 'in progress'
	}
	const shield,
	const shieldToStamina = 5,
	const heal = 5,
	const lightAttack = 5,
	const heavyAttack = 20,
	const ult = 35,
	const ultChargeLightAttack = 20,
	const ultChargeHeavyAttack = 30,
	const ultShieldBlock = 10,

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

