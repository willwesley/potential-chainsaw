const { COLORS } = require('./game')

const cardTextures = {}
for(let color in COLORS) {
    cardTextures[COLORS[color] + '0'] = { x: 0, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '1'] = { x: 85, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '2'] = { x: 170, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '3'] = { x: 256, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '4'] = { x: 341, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '5'] = { x: 427, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '6'] = { x: 512, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '7'] = { x: 597, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '8'] = { x: 682, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '9'] = { x: 768, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '10'] = { x: 853, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '11'] = { x: 938, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '12'] = { x: 1024, width: 86, y: color * 128, height: 128 }
    cardTextures[COLORS[color] + '13'] = { x: 85, width: 86, y: 511 + color * 128, height: 128 }
    cardTextures[COLORS[color] + '14'] = { x: 170, width: 86, y: 511 + color * 128, height: 128 }
}
cardTextures.wild = { x: 1109, width: 86, y: 128, height: 128 }
cardTextures.plus4 = { x: 1109, width: 86, y: 511, height: 128 }
cardTextures.cardback = { x: 0, width: 86, y: 511, height: 128 }
cardTextures.winner = {
  'P': { x: 280, width: 27, y: 528, height: 40 },
  'l': { x: 316, width: 15, y: 528, height: 40 },
  'a': { x: 339, width: 25, y: 528, height: 40 },
  'y': { x: 373, width: 25, y: 528, height: 40 },
  'e': { x: 408, width: 27, y: 528, height: 40 },
  'r': { x: 444, width: 27, y: 528, height: 40 },
  '1': { x: 498, width: 27, y: 528, height: 40 },
  '2': { x: 533, width: 27, y: 528, height: 40 },
  '3': { x: 569, width: 27, y: 528, height: 40 },
  '4': { x: 603, width: 27, y: 528, height: 40 },
  'w': { x: 664, width: 35, y: 528, height: 40 },
  'o': { x: 708, width: 27, y: 528, height: 40 },
  'n': { x: 745, width: 27, y: 528, height: 40 },
  ' ': { x: 772, width: 27, y: 528, height: 40 },
}

module.exports = {
  image : 'uno_cards.png',
  textures : cardTextures
}
