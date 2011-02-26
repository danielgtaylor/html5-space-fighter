var gamejs = require('gamejs');

var AnimatedSprite = function () {
   AnimatedSprite.superConstructor.apply(this, arguments);
   
   this.rect = null;
   this.frames = [];
   this.currentFrame = 0;
   this.animationSpeed = 250;
   this.frameTimer = 0;
   
   this.updateAnimation = function (msDuration) {
      this.frameTimer -= msDuration;
      
      while (this.frameTimer <= 0) {
         this.currentFrame += 1;
         
         if (this.currentFrame >= this.frames.length) {
            this.currentFrame = 0;
         }
         
         this.frameTimer += this.animationSpeed;
      }
   };
   
   this.update = function (msDuration) {
      this.updateAnimation(msDuration);
   };
   
   this.draw = function (surface) {
      surface.blit(this.frames[this.currentFrame], this.rect);
   };
};
gamejs.utils.objects.extend(AnimatedSprite, gamejs.sprite.Sprite);

exports.AnimatedSprite = AnimatedSprite;

