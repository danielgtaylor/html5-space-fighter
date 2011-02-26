var gamejs = require('gamejs');
var animate = require('./animate');
var weapons = require('./weapons');

/*
   Powerups for the player.
*/
var Powerup = function(rect, speed) {
   Powerup.superConstructor.apply(this, arguments);
   
   this.type = [
      'weapon-upgrade',
      'speed-upgrade',
      'health-upgrade',
   ][Math.floor(Math.random() * 3)];
   this.image = gamejs.image.load('images/' + this.type + '.png');
   this.rect = new gamejs.Rect([rect[0], rect[1], this.image.getSize()[0], this.image.getSize()[1]]);
   this.speed = speed ? speed : 100;
   
   this.update = function (msDuration) {
      this.rect.top += this.speed * (msDuration / 1000);
   };
   
   this.engage = function (ship) {
      switch (this.type) {
         case 'weapon-upgrade':
            ship.upgradeWeapon();
            break;
         case 'speed-upgrade':
            ship.upgradeSpeed();
            break;
         case 'health-upgrade':
            ship.upgradeHealth();
            break;
      }
   };
   
   return this;
};
gamejs.utils.objects.extend(Powerup, gamejs.sprite.Sprite);

/*
   The player's ship.
*/
var Ship = function(rect, size, enemies) {
   // call superconstructor
   Ship.superConstructor.apply(this, arguments);
   this.health = 100;
   this.speed = 300;
   this.angle = null;
   this.firing = false;
   this.frames = [
      gamejs.image.load('images/ship_1.png'),
      gamejs.image.load('images/ship_2.png')
   ];
   this.animationSpeed = 100;
   this.rect = new gamejs.Rect(rect);
   this.size = size;
   this.enemies = enemies;
   this.weapons = new gamejs.sprite.Group();
   this.weaponClasses = [
      {
         'type': weapons.Laser,
         'fireRate': 250,
         'nextFire': 0
      }
   ];
   this.weaponStage = 0;
   this.damaged = 0;
   
   this.clipMotion = function () {
      if (this.rect.top > this.size[1] - this.rect.height) {
         this.rect.top = this.size[1] - this.rect.height;
      } else if (this.rect.top < 0) {
         this.rect.top = 0;
      }
      if (this.rect.left < 0) {
         this.rect.left = 0;
      } else if (this.rect.left > this.size[0] - this.rect.width) {
         this.rect.left = this.size[0] - this.rect.width;
      }
   };
   
   this.upgradeWeapon = function () {
      this.weaponStage += 1;
      if (this.weaponStage == 1) {
         this.weaponClasses = [
            {
               'type': weapons.HeavyLaser,
               'fireRate': 175,
               'nextFire': 0
            }
         ];
      } else if (this.weaponStage == 2) {
         this.weaponClasses = [
            {
               'type': weapons.HeavyLaser,
               'fireRate': 150,
               'nextFire': 0
            },
            {
               'type': weapons.Missile,
               'fireRate': 650,
               'nextFire': 0
            }
         ];
      } else if (this.weaponStage == 3) {
         this.weaponClasses = [
            {
               'type': weapons.HeavyLaser,
               'fireRate': 150,
               'nextFire': 0
            },
            {
               'type': weapons.Missile,
               'fireRate': 650,
               'nextFire': 0
            },
            {
               'type': weapons.HomingMissile,
               'fireRate': 500,
               'nextFire': 0
            }
         ];
      }
   };
   
   this.upgradeSpeed = function () {
      if (this.speed < 500) {
         this.speed += 50;
      }
   }
   
   this.upgradeHealth = function () {
      if (this.health < 300) {
         this.health += 50;
      }
   }
   
   this.update = function(msDuration) {
      this.updateAnimation(msDuration);
      
      // moveIp = move in place
      if (this.angle !== null)
         this.rect.moveIp(Math.cos(this.angle) * this.speed * (msDuration / 1000), Math.sin(this.angle) * this.speed * (msDuration / 1000));
      
      if (this.firing) {
         var weapons = this.weapons;
         var rect = this.rect;
         var enemies = this.enemies;
         
         this.weaponClasses.forEach(function (weaponInfo) {
            weaponInfo.nextFire -= msDuration;
            while (weaponInfo.nextFire <= 0) {
               weaponInfo.nextFire += weaponInfo.fireRate;
               weapons.add(new weaponInfo.type([rect.left + (rect.width / 2), rect.top], enemies));
            }
         });
      }
      
      this.weapons.forEach(function (weapon) {
         if (!weapon.update(msDuration)) {
            weapon.kill();
         }
      })
   };
   
   this.damage = function (amount) {
      this.health -= amount;
      
      this.damaged = 150;
      
      if (this.health <= 0) {
         this.kill();
         console.debug("You are dead.");
      }
   };
   
   return this;
};
gamejs.utils.objects.extend(Ship, animate.AnimatedSprite);

exports.Powerup = Powerup;
exports.Ship = Ship;

