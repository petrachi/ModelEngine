class Engine::Plan::Polygon
  def self.build coordinates
    new points: coordinates.map{ |coordinate| Engine::Plan::Point.new coordinate }
  end

  attr_accessor :points

  def initialize points:
    @points = points
  end

  def translate **options
    points.each{ |point| point.translate **options }
    self
  end

  def rotate **options
    points.each{ |point| point.rotate **options }
    self
  end

  def scale **options
    points.each{ |point| point.scale **options }
    self
  end

  def to_svg
    Engine::Rendering::Plan::PolygonToSvg.new(polygon: self).render
  end

  def to_js svg:
    Engine::Rendering::Plan::PolygonToJs.new(polygon: self, svg: svg).render
  end
end
