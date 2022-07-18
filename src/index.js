const Stage = require('stage-js/platform/web');

// Create new app
Stage(function(stage) {

  // Set view box
  stage.viewbox(1000, 1000);

  // Create an image and append it to stage
  const red = Stage.image('red').appendTo(stage);
  const circle = Stage.image('circle').appendTo(stage);
  const box = Stage.image('box').appendTo(stage)

  // Align box to center
  red.pin('align', 0.5);
  box.pin('align', 0.5);
  circle.pin('align', 0.5)

  // On mouse click...
  box.on(Stage.Mouse.MOVE, function(point) {
    // ...tween scale values of this node
    this.tween().ease('bounce').pin({
      scaleX : Math.random() + 0.5,
      scaleY : Math.random() + 0.5,
      alignX: Math.random() + 0.00001,
      alignY: Math.random() + 0.00001
    });
  });
  circle.on(Stage.Mouse.MOVE, function(point) {
    // ...tween scale values of this node
    this.tween().ease('bounce').pin({
      scaleX : Math.random() + 0.5,
      scaleY : Math.random() + 0.5,
      alignX: Math.random() + 0.00001,
      alignY: Math.random() + 0.00001
    });
  });
  red.on(Stage.Mouse.MOVE, function(point) {
    // ...tween scale values of this node
    this.tween().ease('bounce').pin({
      scaleX : Math.random() + 0.5,
      scaleY : Math.random() + 0.5,
      alignX: Math.random() + 0.00001,
      alignY: Math.random() + 0.00001
    });
  });
});


// Adding a texture
Stage({
  image : 'example.png',
  textures : {
    red : { x : 0, y : 10, width : 80, height : 80},
    circle : { x : 66, y : 129, width : 100, height : 100},
    box : { x : 0, y : 129, width : 67, height : 67}

  }
});




