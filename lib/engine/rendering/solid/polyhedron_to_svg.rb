class Engine::Rendering::Solid::PolyhedronToSvg
  attr_accessor :polyhedron, :perspective

  def initialize polyhedron:, perspective:
    @polyhedron = polyhedron
    @perspective = perspective
  end

  def render
    ordered_polygons.map{ |polygon| polygon.to_svg perspective: perspective }.join("\n").html_safe
  end

  def ordered_polygons
    polyhedron.polygons.sort_by do |polygon|
      polygon.points.map(&:z).reduce(&:+) / polygon.points.size
    end
  end
end
