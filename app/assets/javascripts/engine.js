var TAU = Math.PI * 2.0

var Vector = function(origin, x, y, z){
  this.origin = origin;
  this.x = x;
  this.y = y;
  this.z = z;

  this.length = function(){
    Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))
  }

  this.to_unit = function(){
    var vector_length = this.length

    this.x /= vector_length
    this.y /= vector_length
    this.z /= vector_length
  }
}


var Point = function(x, y, z){
  this.x = x;
  this.y = y;
  this.z = z;
  this.starting_point = {x: x, y: y, z: z};

  this.translate = function(x, y, z){
    this.x += x
    this.y += y
    this.z += z
  }

  this.rotate = function(vector, angle){
    vector.to_unit;

    var sin = Math.sin(angle / 2);
    var cos = Math.cos(angle / 2);

    var q0 = cos;
    var q1 = vector.x * sin;
    var q2 = vector.y * sin;
    var q3 = vector.z * sin;

    this.translate(-vector.origin.x, -vector.origin.y, -vector.origin.z);

    var new_x = this.x*(Math.pow(q0,2) + Math.pow(q1,2) - Math.pow(q2,2) - Math.pow(q3,2)) + this.y*2*(q1*q2 - q0*q3) + this.z*2*(q1*q3 + q0*q2);
    var new_y = this.x*2*(q2*q1 + q0*q3) + this.y*(Math.pow(q0,2) - Math.pow(q1,2) + Math.pow(q2,2) - Math.pow(q3,2)) + this.z*2*(q2*q3 - q0*q1);
    var new_z = this.x*2*(q3*q1 - q0*q2) + this.y*2*(q3*q2 + q0*q1) + this.z*(Math.pow(q0,2) - Math.pow(q1,2) - Math.pow(q2,2) + Math.pow(q3,2));

    this.x = new_x;
    this.y = new_y;
    this.z = new_z;

    this.translate(vector.origin.x, vector.origin.y, vector.origin.z);
  }

  this.reset = function(){
    this.x = this.starting_point['x'];
    this.y = this.starting_point['y'];
    this.z = this.starting_point['z'];
  }

  this.to_plan = function(perspective){
    var deformation = (this.z + perspective) / perspective
    return new Point(this.x * deformation, this.y * deformation, 0.0)
  }
}

var Polygon = function(svg, points){
  this.svg = svg;
  this.points = points;

  this.elt = document.createElementNS("http://www.w3.org/2000/svg", "path");
  this.elt.setAttribute('fill', 'transparent');
  this.elt.setAttribute('stroke', 'orange');
  this.elt.setAttribute('stroke-width', '0.005');
  this.animation_object;

  this.translate = function(x, y, z){
    points.forEach(function(point){
      point.translate(x, y, z);
    });
    this.draw();
  }

  this.rotate = function(vector, angle){
    points.forEach(function(point){
      point.rotate(vector, angle);
    });
    this.draw();
  }

  this.reset = function(){
    points.forEach(function(point){
      point.reset();
    });
    this.draw();
  }

  this.draw = function(){
    this.elt.setAttribute('d', this.path());
  }

  this.path = function(){
    var path = this.points.map(function(point){
      var projection = point.to_plan(5.0);
      return (projection.x) + " " + (projection.y);
    })

    return "M " + path.join(" L ") + " Z";
  }

  this.animation = function(){
    if(this.animation_object){
      return this.animation_object;
    }else{
      this.animation_object = new Animation(this);
      return this.animation_object;
    }
  }

  this.init = function(){
    this.svg.appendChild(this.elt);
    this.draw();
  }
  this.init();
}

var Animation = function(polygon){
  this.polygon = polygon;
  this.controls = document.querySelector('#' + this.polygon.svg.id + '-controls');
  this.fps = 60;
  this.repeat = 1;
  this.additive = false;
  this.duration;

  this.transform;

  this.translate = function(x, y, z, duration, options){
    var that = this;
    var duration_values = {
      x: x/duration,
      y: y/duration,
      z: z/duration
    }

    this.transform = new Transformation(this, function(steps){
      that.polygon.translate(
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
      that.polygon.rotate(vector, duration_values['angle'] * steps);
    });

    this.duration = duration;
    this.transform.duration = duration;
    if(options && options['repeat']) this.repeat = options['repeat'];
    if(options && options['additive']) this.additive = options['additive'];
  }

  this.start = function(){
    this.transform.repeat = this.repeat;
    this.run();
  }

  this.run = function(){
    if(this.additive == false) this.polygon.reset();
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
    if(this.additive == false) this.polygon.reset();
  }

  this.play = function(){
    if(this.transform.repeat != 'always' && this.transform.duration == this.duration){
      this.transform.repeat -= 1;
    }
    this.transform.startpoint = null;
    this.transform.checkpoint = null;
    this.transform.run();
  }

  this.pause = function(){
    this.transform.pause();
  }

  this.reset = function(){
    this.transform.pause();
    this.polygon.reset();
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

//
// var Animate = function(polygon){
//   var that = this;
//   this.polygon = polygon;
//
//   // this.fps = 60;
//   // this.fps = 5;
//   this.controls = document.querySelector('#' + this.polygon.svg.id + '-controls');
//   // this.animationId;
//   // this.animation;
//   this.animation = new Animation(this);
//   // this.status = {running: false, setup: false}
//
//   this.start = function(){
//
//     this.animation.run();
//
//     console.log(this.animation)
//   }
//   // this.start = function(){
//   //   this.status['running'] = true;
//   //   this.animationId = requestAnimationFrame(this.animation);
//   // }
//   //
//   this.pause = function(){
//     this.animation.pause();
//   }
//
//   this.stop = function(){
//     console.log(this.animation)
//     this.animation.pause();
//     // this.animation = null;
//     this.polygon.reset();
//   }
//   // this.stop = function(animation){
//   //   cancelAnimationFrame(this.animationId);
//   //   this.status['running'] = false;
//   // }
//
//   // this.reset = function(){
//   //   this.stop();
//   //   this.polygon.reset();
//   //   this.status['setup'] = false;
//   // }
//   //
//   // this.repeat = function(){
//   //   this.stop();
//   //   this.status['repeatCount'] -= 1
//   //   this.status['setup'] = false;
//   //
//   //   if(this.status['repeatCount'] > 0){
//   //     this.polygon.reset();
//   //     this.start();
//   //   }else{
//   //     this.status['repeatCount'] = null;
//   //   }
//   // }
//
//
//   // this.translateForever = function(x, y, z){
//   //   var that = this;
//   //   this.animation = function(){
//   //     that.status['setup'] = true;
//   //     that.polygon.translate(x, y, z);
//   //     that.start();
//   //   };
//   // }
//
//   this.translate = function(x, y, z, duration){
//
//     // that.polygon.translate(
//     //   x/10,
//     //   y/10,
//     //   z/10
//     // );
//
//     // console.log("setup translate")
//     // console.log(that.polygon)
//     // console.log(that.polygon.svg)
//     var that = this
//
//     console.log("setup")
//     console.log(this)
//     console.log(this.polygon)
//     console.log(this.polygon.points[0].x)
//     console.log(this.animation)
//     console.log(this.animation.transformation)
//
//
//     this.animation.transformation = function(){
//       // console.log("translate")
//       console.log(that)
//       // console.log(that.polygon.svg)
//       console.log(that.polygon.points[0].x)
//       that.polygon.translate(
//         x/10,
//         y/10,
//         z/10
//       );
//     }
//     // this.animation.transformation = transformation;
//
//     console.log("setup")
//     console.log(this)
//     console.log(this.polygon)
//     console.log(this.polygon.points[0].y)
//     console.log(this.animation)
//     console.log(this.animation.transformation)
//
//     // this.animation = animation;
//     //
//     // console.log(this)
//     // console.log(animation)
//   }
//
//   // this.translate = function(x, y, z, duration, options){
//   //   if(typeof(options) === 'undefined') options = {}
//   //   if(typeof(options['repeat']) === 'undefined') options['repeat'] = 1
//   //
//   //   this.status['repeat'] = options['repeat'];
//   //
//   //   var that = this;
//   //   var basic_values = {x: x/duration, y: y/duration, z: z/duration};
//   //   var animation = function(difference){
//   //     that.polygon.translate(
//   //       basic_values['x'] * difference,
//   //       basic_values['y'] * difference,
//   //       basic_values['z'] * difference
//   //     );
//   //   }
//   //   this.timedAnimation(animation, duration);
//   // }
//   //
//   // this.timedAnimation = function(animation, duration){
//   //   var that = this;
//   //   var startpoint;
//   //   var checkpoint;
//   //
//   //   this.animation = function(){
//   //     var now = window.performance.now();
//   //
//   //     if(that.status['setup'] == false){
//   //       startpoint = null;
//   //       checkpoint = now;
//   //
//   //       if(that.status['repeatCount'] == null) that.status['repeatCount'] = that.status['repeat'];
//   //       that.status['setup'] = true;
//   //     }
//   //
//   //
//   //     startpoint = startpoint || now;
//   //
//   //     if(now - startpoint < duration){
//   //       that.start();
//   //     }else{
//   //       that.repeat();
//   //       now = startpoint + duration;
//   //     }
//   //
//   //     var difference = now - (checkpoint || now);
//   //
//   //     if(now - startpoint >= duration || difference >= (1000 / that.fps)){
//   //       checkpoint = now;
//   //       animation(difference);
//   //     }
//   //
//   //     if(now - startpoint >= duration){
//   //       startpoint = null;
//   //       checkpoint = null;
//   //     }
//   //   }
//   // }
//
//   // this.rotateForever = function(vector, angle){
//   //   var that = this;
//   //   this.animation = function(){
//   //     that.status['setup'] = true;
//   //     that.polygon.rotate(vector, angle);
//   //     that.start();
//   //   };
//   // }
//
//   this.start_control = function(){
//     if(this.controls == null) return;
//     if(this.controls.querySelector('#start') == null) return;
//
//     this.controls.querySelector('#start').addEventListener('click', function(){
//       console.log(this)
//       console.log(that)
//       that.start();
//     });
//   }
//
//   this.stop_control = function(){
//     if(this.controls == null) return;
//     if(this.controls.querySelector('#stop') == null) return;
//
//     this.controls.querySelector('#stop').addEventListener('click', function(){
//       that.stop();
//     });
//   }
//
//   this.pause_control = function(){
//     if(this.controls == null) return;
//     if(this.controls.querySelector('#pause') == null) return;
//
//     this.controls.querySelector('#pause').addEventListener('click', function(){
//       that.pause();
//     });
//   }
//
//   this.initControls = function(){
//     this.start_control();
//     this.stop_control();
//     this.pause_control();
//   }
//   this.initControls();
// }
//
// var Animation = function(animate){
//   // this.running = false;
//   // this.setup = false;
//
//   // this.transformationId;
//   that = this;
//   this.animate = animate;
//   this.transformation;
//
//   this.animation;
//   this.animationId;
//
//   this.run = function(){
//     console.log("run")
//     this.animationId = requestAnimationFrame(that.transformation);
//   }
//
//   this.pause = function(animation){
//     cancelAnimationFrame(this.animationId);
//   }
//
//   // this.animation = function(){
//   //   // console.log(that);
//   //   // console.log(that.transformation);
//   //   that.transformation();
//   //   // that.run()
//   // }
// }





function initPolygon(svg_id, coordinates){
  var svg = document.querySelector(svg_id);
  var points = coordinates.map(function(coordinate){
    return new Point(coordinate['x'], coordinate['y'], coordinate['z']);
  });

  return new Polygon(svg, points);
}
//
// function initPoints(coordinates){
//   return coordinates.map(function(coordinate){
//     return new Point(coordinate['x'], coordinate['y'], coordinate['z']);
//   });
// }



// function path(points){
//   var path = points.map(function(point){
//     var projection = point.to_plan(5.0);
//     return (projection.x) + " " + (projection.y);
//   })
//
//   return "M " + path.join(" L ") + " Z";
// }
//
// function draw(elt, path){
//   elt.setAttribute('d', path);
// }
