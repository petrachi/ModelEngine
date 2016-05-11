var Polyhedron = function(svg, points, faces, options){
  var that = this;

  this.animationObject;
  this.fill = 'transparent';
  this.stroke = 'orange';
  // this.backfaceVisibility = 'visible';

  if(options){
    if(options['fill']) this.fill = options['fill'];
    if(options['stroke']) this.stroke = options['stroke'];
  }

  // this.fill = 'orange';

  this.svg = svg;
  this.points = points;
  this.faces = faces;
  this.polygons = this.faces.map(function(face){
    var points = face.map(function(index){ return that.points[index]; });
    return new Polygon(that, points)
  });

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

  this.scale = function(x, y, z, ratio){
    points.forEach(function(point){
      point.scale(x, y, z, ratio);
    });
    this.draw();
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
    this.draw();
  }

  this.draw = function(){
    // if(this.backfaceVisibility == 'hidden'){
    //   this.polygons.filter(function(polygon){
    //     return polygon.zPos() >= 0.0;
    //   }).forEach(function(polygon){
    //     polygon.draw();
    //   });
    //
    //   this.polygons.filter(function(polygon){
    //     return polygon.zPos() < 0.0;
    //   }).forEach(function(polygon){
    //     polygon.clear();
    //   });
    // }else{
      this.polygons.sort(function(a, b){
        return a.zPos() - b.zPos();
      }).forEach(function(polygon){
        polygon.draw();
        that.svg.appendChild(polygon.elt);
      });
    // }






    // var polygons = this.polygons
    // console.log(this.polygons.map(function(x){return x.zPos()}))
    // if(this.backfaceVisibility == 'hidden') polygons = polygons.filter(function(polygon){ return polygon.zPos() > 0.0; });
    // polygons = polygons.sort(function(a, b){ return a.zPos() - b.zPos(); })
    // polygons = polygons.forEach(function(polygon){ polygon.draw(); });
  }

  this.animation = function(){
    if(this.animationObject){
      return this.animationObject;
    }else{
      this.animationObject = new Animation(this);
      return this.animationObject;
    }
  }

  this.draw();
}
