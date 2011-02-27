var gamejs = require('gamejs');

var Pulse = function (pos, speed, angle, player, size, strength) {
   Pulse.superConstructor.apply(this, arguments);
   this.player = player;
   this.rect = new gamejs.Rect([pos[0] - 4, pos[1] - 4], [8, 8]);
   this.speed = speed;
   this.angle = angle;
   this.strength = strength;
   this.size = size;
   
   this.update = function (msDuration) {
      this.rect.left += Math.cos(this.angle) * speed * (msDuration / 1000);
      this.rect.top += Math.sin(this.angle) * speed * (msDuration / 1000);
      
      if ((this.rect.left <= -this.rect.width) || (this.rect.left >= this.size[0]) || (this.rect.top <= -this.rect.height) || (this.rect.top >= this.size[1])) {
         this.kill();
      }
   };
   
   this.draw = function (surface) {
      gamejs.draw.circle(surface, "#f00", [this.rect.left + 4, this.rect.top + 4], 3, 2);
   };
   
   return this;
};
gamejs.utils.objects.extend(Pulse, gamejs.sprite.Sprite);

/*
   A base class for enemies in the game.
*/
var Enemy = function () {
   Enemy.superConstructor.apply(this, arguments);
   
   this.health = 1;
   
   this.damage = function (amount) {
      this.health -= amount;
      
      if (this.health <= 0) {
         this.kill();
      }
   };
};
gamejs.utils.objects.extend(Enemy, gamejs.sprite.Sprite);

/*
   A simple dumb floating asteroid :-)
*/
var Asteroid = function (images, size, player, weapons) {
   Asteroid.superConstructor.apply(this, arguments);
   
   this.size = size
   this.origImage = images.asteroid;
   this.image = this.origImage
   this.angle = Math.random() * Math.PI * 2;
   this.rotationSpeed = -75 + Math.random() * 150;
   this.speed = 40 + Math.random() * 40;
   this.rect = new gamejs.Rect([50 + (Math.random() * (size[0] - 100)), -50], this.image.getSize());
   this.health = 50;
   this.strength = 25;
   
   /*
      Move and rotate the asteroid.
   */
   this.update = function(msDuration) {
      this.angle += this.rotationSpeed * (msDuration / 1000);
      this.image = gamejs.transform.rotate(this.origImage, this.angle);
      
      this.rect.top += this.speed * (msDuration / 1000);
      
      if (this.rect.top >= this.size[1]) {
         this.kill();
      }
   };
   
   return this;
};
gamejs.utils.objects.extend(Asteroid, Enemy);

var Scout = function (images, size, player, weapons) {
   Scout.superConstructor.apply(this, arguments);
   this.player = player;
   this.images = images;
   this.image = images.scout;
   this.rect = new gamejs.Rect([50 + (Math.random() * (size[0] - 100)), -50], this.image.getSize());
   this.size = size;
   this.weapons = weapons
   this.fireRate = 3500;
   this.nextFire = this.fireRate / 2;
   this.strength = 25;
   this.health = 25;
   this.speed = 50;
   
   this.update = function (msDuration) {
      this.nextFire -= msDuration;
      while (this.nextFire < 0) {
         this.weapons.add(new Pulse([this.rect.left + (this.rect.width / 2), this.rect.top + this.rect.height], 100, Math.PI * 0.5, this.player, this.size, 10));
         this.nextFire += this.fireRate;
      }
   
      this.rect.top += this.speed * (msDuration / 1000);
      
      if (this.rect.top >= this.size[1]) {
         this.kill();
      }
   };
   
   return this;
};
gamejs.utils.objects.extend(Scout, Enemy);

var Drone = function (images, size, player, weapons) {
   Drone.superConstructor.apply(this, arguments);
   this.player = player;
   this.images = images;
   this.image = images.drone;
   this.rect = new gamejs.Rect([50 + (Math.random() * (size[0] - 100)), -50], this.image.getSize());
   this.size = size;
   this.weapons = weapons
   this.fireRate = 3000;
   this.nextFire = this.fireRate / 2;
   this.strength = 30;
   this.health = 40;
   this.speed = 50;
   
   this.update = function (msDuration) {
      this.nextFire -= msDuration;
      while (this.nextFire < 0) {
         var angle = Math.PI - Math.atan2((this.player.rect.left + (this.player.rect.width / 2)) - this.rect.left, (this.player.rect.top + (this.player.rect.height / 2)) - this.rect.top) - (Math.PI / 2);
         this.weapons.add(new Pulse([this.rect.left + (this.rect.width / 2), this.rect.top + this.rect.height], 100, angle, this.player, this.size, 20));
         this.nextFire += this.fireRate;
      }
   
      this.rect.top += this.speed * (msDuration / 1000);
      
      if (this.rect.top >= this.size[1]) {
         this.kill();
      }
   };
   
   return this;
};
gamejs.utils.objects.extend(Drone, Enemy);

var HeavyDrone = function (images, size, player, weapons) {
   HeavyDrone.superConstructor.apply(this, arguments);
   this.player = player;
   this.images = images;
   this.image = images.heavyDrone;
   this.rect = new gamejs.Rect([50 + (Math.random() * (size[0] - 100)), -50], this.image.getSize());
   this.size = size;
   this.weapons = weapons
   this.fireRate = 3000;
   this.nextFire = this.fireRate / 2;
   this.strength = 30;
   this.health = 40;
   this.speed = 50;
   
   this.update = function (msDuration) {
      this.nextFire -= msDuration;
      while (this.nextFire < 0) {
         var angle = Math.PI - Math.atan2((this.player.rect.left + (this.player.rect.width / 2)) - this.rect.left, (this.player.rect.top + (this.player.rect.height / 2)) - this.rect.top) - (Math.PI / 2);
         this.weapons.add(new Pulse([this.rect.left + (this.rect.width / 2), this.rect.top + this.rect.height], 300, angle, this.player, this.size, 40));
         this.nextFire += this.fireRate;
      }
   
      this.rect.top += this.speed * (msDuration / 1000);
      
      if (this.rect.top >= this.size[1]) {
         this.kill();
      }
   };
   
   return this;
};
gamejs.utils.objects.extend(HeavyDrone, Enemy);

var Porcupine = function (images, size, player, weapons) {
   Porcupine.superConstructor.apply(this, arguments);
   this.player = player;
   this.images = images;
   this.image = images.porcupine;
   this.rect = new gamejs.Rect([50 + (Math.random() * (size[0] - 100)), -50], this.image.getSize());
   this.size = size;
   this.weapons = weapons
   this.fireRate = 5000;
   this.nextFire = this.fireRate / 2;
   this.strength = 30;
   this.health = 25;
   this.speed = 50;
   this.alternate = Math.random() < 0.5;
   
   this.update = function (msDuration) {
      this.nextFire -= msDuration;
      while (this.nextFire < 0) {
         var porcupine = this;
         
         if (this.alternate) {
            var angles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
         } else {
            var angles = [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75];
         }
         
         this.alternate = !this.alternate;
         
         angles.forEach(function (angle) {
            porcupine.weapons.add(new Pulse([porcupine.rect.left + (porcupine.rect.width / 2), porcupine.rect.top + porcupine.rect.height], 100, angle, porcupine.player, porcupine.size, 10));
         });
         
         this.nextFire += this.fireRate;
      }
   
      this.rect.top += this.speed * (msDuration / 1000);
      
      if (this.rect.top >= this.size[1]) {
         this.kill();
      }
   };
   
   return this;
};
gamejs.utils.objects.extend(Porcupine, Enemy);

var AiManager = function (size, player) {
   this.size = size;
   this.player = player;
   this.ships = new gamejs.sprite.Group();
   this.weapons = new gamejs.sprite.Group();
   this.images = {
      'asteroid': gamejs.image.load('images/asteroid1.png'),
      'scout': gamejs.image.load('images/scout.png'),
      'drone': gamejs.image.load('images/drone.png'),
      'heavyDrone': gamejs.image.load('images/heavy-drone.png'),
      'porcupine': gamejs.image.load('images/porcupine.png'),
   };
   this.levels = [
      {
         'duration': 20 * 1000,
         'maxCount': 10,
         'units': [
            {
               'type': Asteroid,
               'frequency': 25
            }
         ]
      },
      {
         'duration': 60 * 1000,
         'maxCount': 15,
         'units': [
            {
               'type': Asteroid,
               'frequency': 20
            },
            {
               'type': Scout,
               'frequency': 25
            }
         ]
      },
      {
         'duration': 30 * 1000,
         'maxCount': 40,
         'units': [
            {
               'type': Asteroid,
               'frequency': 150
            }
         ]
      },
      {
         'duration': 60 * 1000,
         'maxCount': 20,
         'units': [
            {
               'type': Asteroid,
               'frequency': 20
            },
            {
               'type': Scout,
               'frequency': 15
            },
            {
               'type': Drone,
               'frequency': 30
            }
         ]
      },
      {
         'duration': 45 * 1000,
         'maxCount': 10,
         'units': [
            {
               'type': Porcupine,
               'frequency': 100
            },
         ]
      },
      {
         'duration': 120 * 1000,
         'maxCount': 30,
         'units': [
            {
               'type': Asteroid,
               'frequency': 10
            },
            {
               'type': Scout,
               'frequency': 15
            },
            {
               'type': Drone,
               'frequency': 40
            },
            {
               'type': Porcupine,
               'frequency': 25
            }
         ]
      },
      {
         'duration': 45 * 1000,
         'maxCount': 5,
         'units': [
            {
               'type': HeavyDrone,
               'frequency': 100
            },
         ]
      },
      {
         'duration': 120 * 1000,
         'maxCount': 30,
         'units': [
            {
               'type': Asteroid,
               'frequency': 10
            },
            {
               'type': Scout,
               'frequency': 15
            },
            {
               'type': Drone,
               'frequency': 25
            },
            {
               'type': HeavyDrone,
               'frequency': 40
            },
            {
               'type': Porcupine,
               'frequency': 40
            }
         ]
      },
      {
         'duration': 45 * 1000,
         'maxCount': 25,
         'units': [
            {
               'type': HeavyDrone,
               'frequency': 100
            },
         ]
      },
      {
         'duration': 60 * 1000,
         'maxCount': 30,
         'units': [
            {
               'type': HeavyDrone,
               'frequency': 60
            },
            {
               'type': Porcupine,
               'frequency': 60
            }
         ]
      },
   ];
   this.level = 0;
   this.levelDuration = this.levels[this.level].duration;
   
   this.update = function (msDuration) {
      this.levelDuration -= msDuration;
      if (this.levelDuration <= 0 && this.level < this.levels.length - 1) {
         this.level += 1;
         this.levelDuration = this.levels[this.level].duration;
      }
      
      var manager = this;
      var level = this.levels[this.level];
      level.units.forEach(function (unit) {
         if (manager.ships.sprites().length <= level.maxCount && Math.random() < (unit.frequency / 100 * (msDuration / 1000))) {
            manager.ships.add(new unit.type(manager.images, manager.size, manager.player, manager.weapons));
         }
      });
      
      this.ships.update(msDuration);
      this.weapons.update(msDuration);
   };
   
   this.collide = function () {
      var player = this.player;
      
      gamejs.sprite.spriteCollide(player, this.weapons).forEach(function (weapon) {
         player.damage(weapon.strength);
         weapon.kill();
      });
      
      gamejs.sprite.spriteCollide(player, this.ships).forEach(function (ship) {
         player.damage(ship.strength);
         ship.kill();
      });
   };
   
   this.draw = function (surface) {
      this.ships.draw(surface);
      this.weapons.draw(surface);
   };
   
   return this;
};

exports.AiManager = AiManager;

