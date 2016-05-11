var TAU = Math.PI * 2.0

function initPolyhedron(svg_id, points, faces, options){
  var svg = document.querySelector(svg_id);
  var points = points.map(function(point){
    return new Point(point['x'], point['y'], point['z']);
  });

  return new Polyhedron(svg, points, faces, options);
}
