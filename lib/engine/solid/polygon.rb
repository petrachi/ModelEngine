class Engine::Solid::Polygon
  attr_accessor :points

  def initialize points:
    @points = points
  end

  def translate x:, y:, z:
    points.each{ |point| point.translate x: x, y: y, z: z }
    self
  end

  def rotate vector:, angle:
    points.each{ |point| point.rotate vector: vector, angle: angle }
    self
  end

  def to_svg perspective: 1.0
    Engine::Rendering::Solid::PolygonToSvg.new(polygon: self, perspective: perspective).render
  end
end
