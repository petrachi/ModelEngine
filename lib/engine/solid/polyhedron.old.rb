class Engine::Solid::Polyhedron
  def self.build coordinates
    new polygons: coordinates.map{ |coordinate| Engine::Solid::Polygon.build coordinate }
  end

  attr_accessor :polygons

  def initialize polygons:
    @polygons = polygons
  end

  def translate x:, y:, z:
    polygons.each{ |polygon| polygon.translate x: x, y: y, z: z }
    self
  end

  def rotate vector:, angle:
    polygons.each{ |polygon| polygon.rotate vector: vector, angle: angle }
    self
  end

  def to_svg perspective: 1.0
    Engine::Rendering::Solid::PolyhedronToSvg.new(polyhedron: self, perspective: perspective).render
  end
end
