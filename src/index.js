const Stage = require('stage-js/platform/web');

// Create new app
Stage(function(stage) {

  // Set view box
  stage.viewbox(100, 100);

  const jotaro = Stage.image('jotaro').appendTo(stage);
  const dio = Stage.image('dio').appendTo(stage);
  const ult = Stage.image('ult').appendTo(stage);
  const lightAttack = Stage.image('lightAttack').appendTo(stage);
  const heavyAttack = Stage.image('heavyAttack').appendTo(stage);
  const shield = Stage.image('shield').appendTo(stage);
  const heal = Stage.image('heal').appendTo(stage);
  const background = Stage.image('background').appendTo(stage);
  const starPlatinum = Stage.image('starPlatinum').appendTo(stage);
  const theWorld = Stage.image('theWorld').appendTo(stage);

  jotaro.pin('align', 0.5);
  ult.pin('align', 0.5);
  lightAttack.pin('align', 0.5);
  heavyAttack.pin('align', 0.5);
  shield.pin('align', 0.5);
  heal.pin('align', 0.5);
  ult.pin('align', 0.5);
  background.pin('align', 0.5);
  starPlatinum.pin('align', 0.5);


  dio.pin('align', 0.1);
  theWorld.pin('align', 0.8);



});


// Adding a texture
// Stage({
//   image : 'example.png',
//   textures : {
//     jotaro : { x : 0, y : 129, width : 67, height : 67},
//     dio : { x : 0, y : 129, width : 67, height : 67},
//     ult : { x : 0, y : 129, width : 67, height : 67},
//     lightAttack : { x : 0, y : 129, width : 67, height : 67},
//     heavyAttack : { x : 0, y : 129, width : 67, height : 67},
//     shield : { x : 0, y : 129, width : 67, height : 67},
//     heal : { x : 0, y : 129, width : 67, height : 67},
//     background : { x : 0, y : 129, width : 67, height : 67},
//     starPlatinum : { x : 0, y : 129, width : 67, height : 67},
//     theWorld : { x : 0, y : 129, width : 67, height : 67},

//   }
// });

// Adding a texture
Stage({
  image : 'example.png',
  textures : {
    jotaro : { x : 0, y : 129, width : 67, height : 67},
    starPlatinum : { x : 0, y : 129, width : 67, height : 67},
  }
});

// Adding a texture
Stage({
  image : 'dio.png',
  textures : {
    dio : { x : 0, y : 0, width : 34, height : 63},
    theWorld : { x : 51, y : 18, width : 49, height : 69},
  }
});






