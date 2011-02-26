var gamejs = require('gamejs');

/*
   A class to allow the player to control her ship.
*/
exports.UserControls = function(ship) {
   this.ship = ship;
   this.up = false;
   this.down = false;
   this.left = false;
   this.right = false;
   this.fire = false;
   this.paused = false;
   
   /*
      Handle events from the main loop to e.g. store which keys are currently
      being pressed by the player.
   */
   this.handle = function(event) {
      if (event.type === gamejs.event.KEY_DOWN) {
         if (event.key === gamejs.event.K_UP) {
            this.up = true;
         } else if (event.key === gamejs.event.K_DOWN) {
            this.down = true;
         } else if (event.key === gamejs.event.K_LEFT) {
            this.left = true;
         } else if (event.key === gamejs.event.K_RIGHT) {
            this.right = true;
         } else if (event.key === gamejs.event.K_SPACE) {
            this.fire = true;
         } else if (event.key === gamejs.event.K_ESC) {
            this.paused = !this.paused;
         } else if (event.key === gamejs.event.K_u) {
            this.ship.upgradeWeapon();
         } else if (event.key === gamejs.event.K_k) {
            this.ship.kill();
         } else {
            console.debug(event.key);
         }
      } else if (event.type === gamejs.event.KEY_UP) {
         if (event.key === gamejs.event.K_UP) {
            this.up = false;
         } else if (event.key === gamejs.event.K_DOWN) {
            this.down = false;
         } else if (event.key === gamejs.event.K_LEFT) {
            this.left = false;
         } else if (event.key === gamejs.event.K_RIGHT) {
            this.right = false;
         } else if (event.key === gamejs.event.K_SPACE) {
            this.fire = false;
         }
      }
   }
   
   /*
      Get the angle depending on the keys that are currently pressed.
   */
   this.angle = function () {
      if (this.up && this.left) {
         return Math.PI + (Math.PI * 0.25);
      } else if (this.up && this.right) {
         return Math.PI * -0.25;
      } else if (this.down && this.left) {
         return Math.PI - (Math.PI * 0.25);
      } else if (this.down && this.right) {
         return Math.PI * 0.25;
      } else if (this.up) {
         return Math.PI * 1.5;
      } else if (this.down) {
         return Math.PI * 0.5;
      } else if (this.left) {
         return Math.PI;
      } else if (this.right) {
         return 0;
      }
      
      return null;
   }
   
   return this;
}

