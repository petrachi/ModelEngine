var Animation = function(polyhedron){
  this.polyhedron = polyhedron;
  this.controls = document.querySelector('#' + this.polyhedron.svg.id + '-controls');
  this.fps = 60;
  this.repeat = 1;
  this.additive = false;
  this.duration;
  this.transform;
  this.running = false;

  this.translate = function(x, y, z, duration, options){
    var that = this;
    var duration_values = {
      x: x/duration,
      y: y/duration,
      z: z/duration
    }

    this.transform = new Transformation(this, function(steps){
      that.polyhedron.translate(
        duration_values['x'] * steps,
        duration_values['y'] * steps,
        duration_values['z'] * steps
      );
    });

    this.duration = duration;
    this.transform.duration = duration;
    if(options && options['repeat']) this.repeat = options['repeat'];
    if(options && options['additive']) this.additive = options['additive'];
  }

  this.rotate = function(vector, angle, duration, options){
    var that = this;
    var duration_values = {angle: angle/duration}

    this.transform = new Transformation(this, function(steps){
      that.polyhedron.rotate(vector, duration_values['angle'] * steps);
    });

    this.duration = duration;
    this.transform.duration = duration;
    if(options && options['repeat']) this.repeat = options['repeat'];
    if(options && options['additive']) this.additive = options['additive'];
  }

  this.scale = function(x, y, z, ratio, duration, options){
    var that = this;
    var duration_values = {ratio: Math.pow(ratio, 1/duration)};

    this.transform = new Transformation(this, function(steps){
      that.polyhedron.scale(x, y, z, Math.pow(duration_values['ratio'], steps));
    });

    this.duration = duration;
    this.transform.duration = duration;
    if(options && options['repeat']) this.repeat = options['repeat'];
    if(options && options['additive']) this.additive = options['additive'];
  }


  this.start = function(){
    if(this.running == false){
      this.running = true;
      this.transform.repeat = this.repeat;
      this.run();
    }
  }

  this.run = function(){
    if(this.additive == false) this.polyhedron.reset();
    this.transform.duration = this.duration;
    if(this.transform.repeat != 'always'){
      this.transform.repeat -= 1;
    }
    this.transform.startpoint = null;
    this.transform.checkpoint = null;
    this.transform.run();
  }

  this.stop = function(){
    this.transform.pause();
    if(this.additive == false) this.polyhedron.reset();
    this.running = false;
  }

  this.play = function(){
    if(this.running == false){
      this.running = true;
      if(this.transform.repeat != 'always' && this.transform.duration == this.duration){
        this.transform.repeat -= 1;
      }
      this.transform.startpoint = null;
      this.transform.checkpoint = null;
      this.transform.run();
    }
  }

  this.pause = function(){
    this.transform.pause();
    this.running = false;
  }

  this.reset = function(){
    this.transform.pause();
    this.polyhedron.reset();
    this.running = false;
  }

  this.start_control = function(){
    if(this.controls == null) return;
    if(this.controls.querySelector('#start') == null) return;

    var that = this;
    this.controls.querySelector('#start').addEventListener('click', function(){
      that.start();
    });
  }

  this.stop_control = function(){
    if(this.controls == null) return;
    if(this.controls.querySelector('#stop') == null) return;

    var that = this;
    this.controls.querySelector('#stop').addEventListener('click', function(){
      that.stop();
    });
  }

  this.play_control = function(){
    if(this.controls == null) return;
    if(this.controls.querySelector('#play') == null) return;

    var that = this;
    this.controls.querySelector('#play').addEventListener('click', function(){
      that.play();
    });
  }

  this.pause_control = function(){
    if(this.controls == null) return;
    if(this.controls.querySelector('#pause') == null) return;

    var that = this;
    this.controls.querySelector('#pause').addEventListener('click', function(){
      that.pause();
    });
  }

  this.reset_control = function(){
    if(this.controls == null) return;
    if(this.controls.querySelector('#reset') == null) return;

    var that = this;
    this.controls.querySelector('#reset').addEventListener('click', function(){
      that.reset();
    });
  }

  this.initControls = function(){
    this.start_control();
    this.stop_control();
    this.play_control();
    this.pause_control();
    this.reset_control();
  }
  this.initControls();
}
