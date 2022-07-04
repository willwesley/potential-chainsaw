const Stage = require('stage-js/platform/web');

const Textures = require('./textures');
Stage(Textures);

Stage(function(stage) {

  stage.viewbox(50,50).pin('handle', -0.5);
  Stage.image('bg').pin('handle', 0.5).appendTo(stage);

});
