class Engine::Solid::Polyhedron
  attr_accessor :points, :polygons

  def initialize points: nil, polygons:
    @points = points
    @polygons = polygons
  end

  def subset
    if points
      points
    else
      polygons
    end
  end

  def translate x:, y:, z:
    subset.each{ |object| object.translate x: x, y: y, z: z }
    self
  end

  def rotate vector:, angle:
    subset.each{ |object| object.rotate vector: vector, angle: angle }
    self
  end

  def to_svg perspective: 1.0
    Engine::Rendering::Solid::PolyhedronToSvg.new(polyhedron: self, perspective: perspective).render
  end
end
