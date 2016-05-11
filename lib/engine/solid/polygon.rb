class Engine::Solid::Polygon
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

  def to_svg perspective: 1.0
    Engine::Rendering::Solid::PolygonToSvg.new(polygon: self, perspective: perspective).render
  end

  def to_js svg:
    Engine::Rendering::Solid::PolygonToJs.new(polygon: self, svg: svg).render
  end
end
