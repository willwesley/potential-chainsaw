module.exports = function Game() {

	const shield;
	const shieldStamina = 5;
	const heal = 5;
	const lightAttack = Math.random();
	const heavyAttack = 20;
	const ult = 35;
	const ultChargeLightAttack = 20;
	const ultChargeHeavyAttack = 30;
	const ultShieldBlock = 10


	const PlayerA = {
		health = 100;
		stamina = 100;
		ultBar = 100;
	}
	const PlayerB = {
		health = 100;
		stamina = 100;
		ultBar = 100;
	}



	function mechanics (player, opponent, myAction, theirAction) {
		if(theirAction == 'shield') {
			player.ult -= ultShieldBlock
		}
		if(myAction == 'shield') {
			player.stamina += shieldStamina
			return;
		}
		if (myAction == 'heal') {
			player.health += heal
		}
		if (theirAction == 'lightAttack') {
			player.health -= lightAttack
			opponent.ultBar += ultChargeLightAttack
		}
		else if (thierAction == 'heavyAttack') {
			player.health -= heavyAttack
			opponent.ultBar += ultChargeHeavyAttack
		}
	}
}

mechanics(PlayerA, PlayerB, ActionA, ActionB);
mechanics(PlayerB, PlayerA, ActionB, ActionA);