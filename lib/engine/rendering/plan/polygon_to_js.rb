class Engine::Rendering::Plan::PolygonToJs
  attr_accessor :polygon, :svg

  def initialize polygon:, svg:
    @polygon = polygon
    @svg = svg
  end

  def render
    "initPolygon('##{ svg }', #{ coordinates });".html_safe
  end

  def coordinates
    polygon.points.map{ |point| {x: point.x, y: point.y, z: 0.0} }.to_json
  end
end
