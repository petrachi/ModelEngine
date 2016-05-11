var Transformation = function(animation, transformation){
  this.animation = animation;
  this.transformation = transformation;
  this.transformationId;

  this.duration;
  this.repeat;
  this.now;
  this.startpoint;
  this.checkpoint;

  var that = this;

  this.run = function(){
    that.now = window.performance.now();
    if(that.startpoint == null && that.checkpoint == null){
      that.startpoint = that.now;
      that.checkpoint = that.now;
    }

    if(that.duration > 0){
      that.transformationId = requestAnimationFrame(that.run);
    }else{
      that.pause();
      var paused = true;
    }

    var difference = that.now - that.checkpoint;
    if(difference > that.duration) difference = that.duration;

    that.duration -= difference;
    that.checkpoint = that.now;
    that.transformation(difference);

    if(paused && that.repeat){
      that.animation.run();
    }
  }

  this.pause = function(){
    cancelAnimationFrame(that.transformationId);
  }
}
