// Textures
const Stage = require('stage-js/platform/web');
const ratio = 20;

module.exports = {
  image: 'example.png',
  textures : {
    'reset': { x: 144, y: 144, width: 120, height: 35 },
    'bg' : Stage.canvas(function(ctx) {
      this.size(30, 30, ratio);
      ctx.scale(ratio, ratio);
      ctx.moveTo(10, 1);
      ctx.lineTo(10, 29);
      ctx.moveTo(20, 1);
      ctx.lineTo(20, 29);
      ctx.moveTo(1, 10);
      ctx.lineTo(29, 10);
      ctx.moveTo(1, 20);
      ctx.lineTo(29, 20);
      ctx.lineWidth = 0.3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#999';
      ctx.stroke();
    }),
    'x' : Stage.canvas(function(ctx) {
      this.size(10, 10, ratio);
      ctx.scale(ratio, ratio);
      ctx.moveTo(2, 2);
      ctx.lineTo(8, 8);
      ctx.moveTo(2, 8);
      ctx.lineTo(8, 2);
      ctx.lineWidth = 0.5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
      ctx.stroke();
    }),
    'o' : Stage.canvas(function(ctx) {
      this.size(10, 10, ratio);
      ctx.scale(ratio, ratio);
      ctx.arc(5, 5, 2.4, 0, 2 * Math.PI);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#000';
      ctx.stroke();
    }),
    '-' : Stage.canvas(function(ctx) {
      this.size(10, 10, ratio);
    }),
  }
}