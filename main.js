/*
   Space Fighter Game
*/

var gamejs = require('gamejs');
var draw = gamejs.draw;

var screen = require('./screen');
var input = require('./input');
var animate = require('./animate');
var stars = require('./stars');
var player = require('./player');
var enemy = require('./enemy');

var SIZE = [800, 600];

function main() {
   // screen setup
   gamejs.display.setMode(SIZE);
   gamejs.display.setCaption("Fighter");
   
   var intro = gamejs.image.load('images/intro.png');
   
   var font = new gamejs.font.Font('48px ubuntu, sans-serif');
   var paused = font.render("Paused", "#08c");
   var gameOver = font.render("Game Over", "#000");
   
   var background = gamejs.image.load("images/nebula1.jpg");
   var backgroundPos = SIZE[1] - background.getSize()[1];
   
   var starMap = new stars.StarMap(SIZE);
   starMap.seed();
   
   var powerups = new gamejs.sprite.Group();
   
   var enemies = [];
   
   // create some ship sprites and put them in a group
   var ship = new player.Ship([SIZE[0] / 2 - 28, SIZE[1] - 100, 57, 26], SIZE, enemies);
   var controls = new input.UserControls(SIZE, ship);
   
   var ai = new enemy.AiManager(SIZE, ship);
   enemies.push(ai.ships);
   
   var hud = screen.Hud(SIZE);
   
   var pausedDrawn = false;
   
   // game loop
   var mainSurface = gamejs.display.getSurface();
   // msDuration = time since last tick() call
   var tick = function(msDuration) {
         gamejs.event.get().forEach(function(event) {
            controls.handle(event);
         });
         
         if (controls.paused) {
            if (!pausedDrawn) {
               pausedDrawn = true;
               // Draw paused overlay
               gamejs.draw.rect(mainSurface, "rgba(0, 0, 0, 0.5)", new gamejs.Rect([0, 0], SIZE), 0)
               mainSurface.blit(paused, [SIZE[0] / 2 - paused.getSize()[0] / 2, SIZE[1] / 2 - paused.getSize()[1] / 2]);
            }
            
            return;
         }
         
         pausedDrawn = false;
         
         if (!controls.paused) {
            backgroundPos += 10 * (msDuration / 1000);    
            if (backgroundPos >= SIZE[1] - (background.getSize()[1] / 2)) {
               backgroundPos = SIZE[1] - background.getSize()[1];
            }
            
            starMap.update(msDuration);
            
            if (controls.initialClick && !ship.isDead()) {
               powerups.update(msDuration);
               ship.update(msDuration);
               ship.clipMotion();
               
               ai.update(msDuration);
            }
         }
         
         mainSurface.blit(background, [(SIZE[0] / 2) - (background.getSize()[0] / 2), backgroundPos]);
         
         starMap.draw(mainSurface);
         
         if (controls.initialClick) {
            if (!ship.isDead()) {
               powerups.draw(mainSurface);
               ship.angle = controls.angle();
               ship.firing = controls.fire;
               
               ship.draw(mainSurface);
               ship.weapons.forEach(function (weapon) {
                  weapon.draw(mainSurface)
               });
               
               if (ship.damaged) {
                  gamejs.draw.rect(mainSurface, "rgba(255, 0, 0, " + (ship.damaged / 150) + ")", new gamejs.Rect([0, 0], SIZE), 0)
                  ship.damaged = Math.max(0, ship.damaged - msDuration);
               }
               
               if (ship.clearAllEnemies) {
                  if (ship.clearAllEnemies == 150) {
                     ai.weapons.empty();
                  }
                  gamejs.draw.rect(mainSurface, "rgba(255, 255, 255, " + (ship.clearAllEnemies / 150) + ")", new gamejs.Rect([0, 0], SIZE), 0)
                  ship.clearAllEnemies = Math.max(0, ship.clearAllEnemies - msDuration);
               }
               
               ai.draw(mainSurface);
            } else {
               gamejs.draw.rect(mainSurface, "rgba(255, 0, 0, 0.5)", new gamejs.Rect([0, 0], SIZE), 0)
               mainSurface.blit(gameOver, [SIZE[0] / 2 - gameOver.getSize()[0] / 2, SIZE[1] / 2 - gameOver.getSize()[1] / 2]);
            }
         } else {
            mainSurface.blit(intro, [(SIZE[0] / 2) - (intro.getSize()[0] / 2), (SIZE[1] / 2) - (intro.getSize()[1] / 2)]);
         }
         
         hud.health = ship.health;
         hud.level = ai.level;
         hud.draw(mainSurface);
   };
   gamejs.time.fpsCallback(tick, this, 45);
   
   var collisionTick = function (msDuration) {
      var collisions;
      
      if (controls.paused || ship.isDead()) {
         return;
      }
      
      collisions = gamejs.sprite.groupCollide(ship.weapons, ai.ships, true);
      collisions.forEach(function (collision) {
         var weapon = collision.a;
         var enemy = collision.b;
         
         enemy.damage(weapon.strength);
         hud.score += weapon.strength;
         
         if (enemy.isDead() && Math.random() < 0.1) {
            powerups.add(new player.Powerup([enemy.rect.left + (enemy.rect.width / 2) - 12, enemy.rect.top + (enemy.rect.height / 2) - 12], enemy.speed));
         }
      });
      
      collisions = gamejs.sprite.spriteCollide(ship, powerups, true);
      collisions.forEach(function (powerup) {
         powerup.engage(ship);
         hud.score += 100;
      });
      
      ai.collide();
   };
   gamejs.time.fpsCallback(collisionTick, this, 45);
}

/**
 * M A I N
 */
gamejs.preload([
   'images/intro.png',
   'images/nebula1.jpg',
   'images/ship_1.png',
   'images/ship_2.png',
   'images/missile1_1.png',
   'images/missile1_2.png',
   'images/asteroid1.png',
   'images/weapon-upgrade.png',
   'images/speed-upgrade.png',
   'images/health-upgrade.png',
   'images/health-hud.png',
   'images/scout.png',
   'images/drone.png',
   'images/heavy-drone.png',
   'images/porcupine.png',
]);
gamejs.ready(main);

