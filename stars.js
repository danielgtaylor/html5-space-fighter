var gamejs = require('gamejs');

/*
   A simple moving star map with a given number of stars and default speed.
*/
exports.StarMap = function (size) {
   this.count = 20;
   this.speed = 50;
   this.speed_variance = 150;
   this.stars = [];
   this.size = size
   
   /*
      Seed the star map with randomly placed stars. This should be called
      before the first time you call draw()!
   */
   this.seed = function () {
      for (var x = 0; x < this.count; x++) {
         this.stars.push([Math.random() * this.size[0], Math.random() * this.size[1], (Math.random() * this.speed_variance) + this.speed]);
      }
   };
   
   /*
      Update the stars, i.e. move them.
   */
   this.update = function (msDuration) {
      var speed = this.speed;
      var speed_variance = this.speed_variance;
      var size = this.size;
      
      this.stars.forEach(function (star) {
         star[1] += star[2] * (msDuration / 1000);
         
         if (star[1] > size[1]) {
            // Star is off the screen, make a new one
            star[0] = Math.random() * size[0]
            star[1] = 0;
            star[2] = (Math.random() * speed_variance) + speed;
         }
      });
   };
   
   /*
      Draw the stars. Each one is a single white pixel.
   */
   this.draw = function(surface) {
      this.stars.forEach(function (star) {
         gamejs.draw.circle(surface, '#ffffff', [star[0], star[1]], 1, 0);
      });
   };
   
   return this;
};

