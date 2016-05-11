var Vector = function(origin, x, y, z){
  this.origin = origin;
  this.x = x;
  this.y = y;
  this.z = z;

  this.translate = function(x, y, z){
    this.origin.translate(x, y, z);
    this.x += x;
    this.y += y;
    this.z += z;
  }

  this.rotate = function(vector, angle){
    var point = new Point(this.x, this.y, this.z);
    point.rotate(vector, angle)

    this.origin.rotate(vector, angle)
    this.x = point.x;
    this.y = point.y;
    this.z = point.z;
  }

  this.scale = function(ratio){
    this.x *= ratio
    this.y *= ratio
    this.z *= ratio
  }

  this.length = function(){
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))
  }

  this.to_unit = function(){
    this.scale(1/this.length());
  }

  this.draw = function(svg){
    if(this.point == null && this.line == null){
      this.point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.point.setAttribute('r', '0.01');
      this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      this.line.setAttribute('stroke-width', '0.001');
      this.line.setAttribute('stroke', 'black');

      svg.appendChild(this.point);
      svg.appendChild(this.line);
    }

    projection = origin.to_plan(5.0);
    this.point.setAttribute('cx', projection.x);
    this.point.setAttribute('cy', projection.y);

    this.line.setAttribute('x', projection.x);
    this.line.setAttribute('y', projection.y);
    this.line.setAttribute('x2', projection.x + this.x);
    this.line.setAttribute('y2', projection.y + this.y);
  }

  this.to_unit();
}

// A related problem is to construct an algorithm that finds a non-zero perpendicular vector without branching. If the input vector is N = (a,b,c), then you could always choose T = (c,c,-a-b) but T will be zero if N=(-1,1,0). You could always check to see if T is zero, and then choose T = (-b-c,a,a) if it is, but this requires a test and branch. I can't see how to do this without the test and branch.
