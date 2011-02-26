var gamejs = require('gamejs');
var animate = require('./animate');

var MISSILE_FRAMES = null;

/*
   A basic laser weapon.
*/
var Laser = function (rect, enemies) {
   Laser.superConstructor.apply(this, arguments);
   
   this.strength = 10;
   this.rect = new gamejs.Rect([rect[0], rect[1] - 10, 3, 10]);
   
   /*
      Update the laser beam position and check for collisions.
   */
   this.update = function (msDuration) {
      this.rect.top -= 650 * (msDuration / 1000);
      
      if (this.rect.top < -this.rect.height) {
         return false;
      }
      
      return true;
   }
   
   /*
      Draw the laser beam.
   */
   this.draw = function (surface) {
      gamejs.draw.line(surface, '#ffeeaa', [this.rect.left, this.rect.top], [this.rect.left, this.rect.top + 10], 3);
   }
   
   return this;
};
gamejs.utils.objects.extend(Laser, gamejs.sprite.Sprite);

/*
   A heavier laser weapon.
*/
var HeavyLaser = function(rect, enemies) {
   HeavyLaser.superConstructor.apply(this, arguments);
   
   this.strength = 15;
   this.rect = new gamejs.Rect([rect[0] - 5, rect[1] - 10, 10, 10]);
   
   /*
      Update the laser beam position and check for collisions.
   */
   this.update = function (msDuration) {
      this.rect.top -= 750 * (msDuration / 1000);
      
      if (this.rect.top < -this.rect.height) {
         return false;
      }
      
      return true;
   }
   
   /*
      Draw the laser beam.
   */
   this.draw = function (surface) {
      gamejs.draw.line(surface, '#aaeeff', [this.rect.left, this.rect.top], [this.rect.left, this.rect.top + 10], 3);
      gamejs.draw.line(surface, '#aaeeff', [this.rect.left + 10, this.rect.top], [this.rect.left + 10, this.rect.top + 10], 3);
   }
   
   return this;
};
gamejs.utils.objects.extend(HeavyLaser, gamejs.sprite.Sprite);

/*
   A basic missile weapon.
*/
var Missile = function (rect, enemies) {
   Missile.superConstructor.apply(this, arguments);
   
   this.strength = 30;
   
   if (MISSILE_FRAMES === null) {
      MISSILE_FRAMES = [
         gamejs.image.load('images/missile1_1.png'),
         gamejs.image.load('images/missile1_2.png')
      ];
   }
   
   this.frames = MISSILE_FRAMES;
   this.animationSpeed = 150;
   this.rect = new gamejs.Rect([rect[0] - 3, rect[1] - 4, 7, 28]);
   this.speed = 300;
   
   /*
      Update the laser beam position and check for collisions.
   */
   this.update = function (msDuration) {
      this.updateAnimation(msDuration);
      
      this.rect.top -= this.speed * (msDuration / 1000);
      
      if (this.rect.top < -this.rect.height) {
         return false;
      }
      
      return true;
   }
   
   return this;
};
gamejs.utils.objects.extend(Missile, animate.AnimatedSprite);

/*
   A basic homing missle weapon.
*/
var HomingMissile = function (rect, enemies) {
   HomingMissile.superConstructor.apply(this, arguments);
   
   this.strength = 5;
   this.rect = new gamejs.Rect([rect[0] - 1, rect[1] - 1, 3, 3]);
   this.enemies = enemies;
   this.angle = Math.PI * 0.5;
   this.speed = 300;
   this.fuel = 3000;
   this.target = null;
   
   /*
      Update the laser beam position and check for collisions.
   */
   this.update = function (msDuration) {
      if ((!this.target || this.target.isDead()) && this.enemies.length) {
         var group = this.enemies[Math.floor(Math.random() * this.enemies.length)];
         if (group.sprites().length) {
            this.target = group.sprites()[Math.floor(Math.random() * group.sprites().length)];
         } else {
            this.target = null;
         }
      }
      
      if (this.target) {
         this.angle = Math.atan2((this.target.rect.left + (this.target.rect.width / 2)) - this.rect.left, (this.target.rect.top + (this.target.rect.height / 2)) - this.rect.top) - (Math.PI / 2);
      }
      
      this.rect.left += Math.cos(this.angle) * this.speed * (msDuration / 1000);
      this.rect.top -= Math.sin(this.angle) * this.speed * (msDuration / 1000);
      
      this.fuel -= msDuration;
      if (this.fuel < 0) {
         return false;
      }
      
      return true;
   }
   
   this.draw = function (surface) {
      gamejs.draw.circle(surface, "#aef", [this.rect.left, this.rect.top], 3, 2);
   };
   
   return this;
};
gamejs.utils.objects.extend(HomingMissile, gamejs.sprite.Sprite);

exports.Laser = Laser;
exports.HeavyLaser = HeavyLaser;
exports.Missile = Missile;
exports.HomingMissile = HomingMissile;

