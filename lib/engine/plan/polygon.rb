class Engine::Plan::Polygon
  def self.build coordinates
    new points: coordinates.map{ |coordinate| Engine::Plan::Point.new coordinate }
  end

  attr_accessor :points

  def initialize points:
    @points = points
  end

  def translate x:, y:
    points.each{ |point| point.translate x: x, y: y }
    self
  end

  def rotate x:, y:, angle:
    points.each{ |point| point.rotate x: x, y: y, angle: angle }
    self
  end

  def to_svg
    Engine::Rendering::Plan::PolygonToSvg.new(polygon: self).render
  end

  def to_js svg:
    Engine::Rendering::Plan::PolygonToJs.new(polygon: self, svg: svg).render
  end
end
