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

  this.scale = function(x, y, z, ratio){
    this.translate(-x, -y, -z);

    this.x *= ratio
    this.y *= ratio
    this.z *= ratio

    this.translate(x, y, z);
  }

  this.set = function(){
    this.starting_point['x'] = this.x;
    this.starting_point['y'] = this.y;
    this.starting_point['z'] = this.z;
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

  this.draw = function(svg){
    if(this.point == null){
      this.point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.point.setAttribute('r', '0.01');
      this.point.setAttribute('fill', 'green');

      svg.appendChild(this.point);
    }

    projection = this.to_plan(5.0);
    this.point.setAttribute('cx', projection.x);
    this.point.setAttribute('cy', projection.y);
  }
}
