class Engine::Solid::Polyhedron
  attr_accessor :points, :faces, :polygons

  def initialize points:, faces:
    @points = points
    @faces = faces
    @polygons = faces.map do |face|
      Engine::Solid::Polygon.new points: face.map{ |index| points[index] }
    end
  end

  def translate **options
    points.each{ |point| object.translate **options }
    self
  end

  def rotate **options
    points.each{ |point| object.rotate **options }
    self
  end

  def scale **options
    points.each{ |point| object.scale **options }
    self
  end

  def to_svg perspective: 1.0
    Engine::Rendering::Solid::PolyhedronToSvg.new(polyhedron: self, perspective: perspective).render
  end

  def to_js svg:
    Engine::Rendering::Solid::PolyhedronToJs.new(polyhedron: self, svg: svg).render
  end
end
