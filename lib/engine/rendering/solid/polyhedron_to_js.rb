class Engine::Rendering::Solid::PolyhedronToJs
  attr_accessor :polyhedron, :svg

  def initialize polyhedron:, svg:
    @polyhedron = polyhedron
    @svg = svg
  end

  def render
    "initPolyhedron('##{ svg }', #{ points }, #{ faces }, {fill: 'rgba(255, 165, 0, 0.75)', stroke: 'orangered'});".html_safe
  end

  def points
    polyhedron.points.map{ |point| {x: point.x, y: point.y, z: point.z} }.to_json
  end

  def faces
    polyhedron.faces.to_json
  end

  # def coordinates
  #   polyhedron.polygons.map{ |polygon| Engine::Rendering::Solid::PolygonToJs.new(polygon: polygon, svg: svg).coordinates }.to_json
  # end

end
