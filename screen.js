var gamejs = require('gamejs');

var Hud = function (size) {
   this.health = 100;
   this.score = 0;
   this.level = 0;
   this.font = new gamejs.font.Font('20px ubuntu, sans-serif');
   this.healthIcon = gamejs.image.load('images/health-hud.png');
   this.size = size;
   
   var cachedScore = -1;
   var scoreSurface = null;
   var cachedLevel = -1;
   var levelSurface = null;
   
   this.draw = function (surface) {
      if (this.score != cachedScore) {
         cachedScore = this.score;
         scoreSurface = this.font.render(this.score, "#fff");
      }
      if (this.level != cachedLevel) {
         cachedLevel = this.level;
         levelSurface = this.font.render("Level " + (this.level + 1), "#fff");
      }
      
      surface.blit(this.healthIcon, [8, 8]);
      gamejs.draw.rect(surface, "#0c0", new gamejs.Rect([26 + 16, 19, Math.max(0, this.health), 4]), 0);
      surface.blit(scoreSurface, [this.size[0] - scoreSurface.getSize()[0] - 8, 8]);
      surface.blit(levelSurface, [this.size[0] - levelSurface.getSize()[0] - 8, scoreSurface.getSize()[1] + 8]);
   };
   
   return this;
};

exports.Hud = Hud

