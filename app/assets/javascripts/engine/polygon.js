var Polygon = function(polyhedron, points){
  this.polyhedron = polyhedron;
  this.points = points;

  this.elt = document.createElementNS("http://www.w3.org/2000/svg", "path");
  this.elt.setAttribute('fill', this.polyhedron.fill);
  this.elt.setAttribute('stroke', this.polyhedron.stroke);
  this.elt.setAttribute('stroke-width', '0.005');

  this.translate = function(x, y, z){
    points.forEach(function(point){
      point.translate(x, y, z);
    });
  }

  this.rotate = function(vector, angle){
    points.forEach(function(point){
      point.rotate(vector, angle);
    });
  }

  this.scale = function(x, y, z, ratio){
    points.forEach(function(point){
      point.scale(x, y, z, ratio);
    });
  }

  this.set = function(){
    points.forEach(function(point){
      point.set();
    });
  }

  this.reset = function(){
    points.forEach(function(point){
      point.reset();
    });
  }

  this.draw = function(){
    this.elt.setAttribute('d', this.path());
  }

  // this.clear = function(){
  //   this.elt.setAttribute('d', '');
  // }

  this.path = function(){
    var path = this.points.map(function(point){
      var projection = point.to_plan(5.0);
      return (projection.x) + " " + (projection.y);
    })

    return "M " + path.join(" L ") + " Z";
  }

  this.zPos = function(){
    return this.points.map(function(point){ return point.z; }).reduce((a, b) => a + b, 0);
  }

  this.draw();
}
