const Stage = require('stage-js/platform/web');

// Create new app
Stage(function(stage) {

  // Set view box
  stage.viewbox(500, 500);

  // Create an image and append it to stage
  const box = Stage.image('box').appendTo(stage);

  // Align box to center
  box.pin('align', 0.5);

  // On mouse click...
  box.on('click', function(point) {
    // ...tween scale values of this node
    this.tween(1000).ease('bounce').pin({
      scaleX : Math.random() + 1.022,
      scaleY : Math.random() + 1.0675675676621435
    });
  });
});
  
// Adding a texture
Stage({
  image : 'example.png',
  textures : {
    box : { x : 100, y : .000020, width : 300, height : 100 }
  }
});
