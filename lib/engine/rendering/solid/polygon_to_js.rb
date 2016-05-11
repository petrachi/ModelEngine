class Engine::Rendering::Solid::PolygonToJs
  attr_accessor :polygon, :svg

  def initialize polygon:, svg:
    @polygon = polygon
    @svg = svg
  end

  def render
    "initPolyhedron('##{ svg }', #{ points }, #{ faces });".html_safe
  end

  def points
    polygon.points.map{ |point| {x: point.x, y: point.y, z: 0.0} }.to_json
  end

  def faces
    [(0..polygon.points.size-1).to_a]
  end
end
