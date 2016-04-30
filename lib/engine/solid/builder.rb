module Engine::Solid::Builder
  def self.cube x:, y:, z:, edge:
    dist = edge / 2.0
    origin = Engine::Solid::Point.new x: x, y: y, z: z
    vector = Engine::Solid::Vector.new origin: origin, x: 0.0, y: 1.0, z: 0.0

    top_starting_point = Engine::Solid::Point.new x: x - dist, y: y - dist, z: z - dist
    top_points = (0..3).to_a.map do |index|
      top_starting_point.copy.rotate vector: vector, angle: index * TAU/4
    end

    bottom_starting_point = Engine::Solid::Point.new x: x - dist, y: y + dist, z: z - dist
    bottom_points = (0..3).to_a.map do |index|
      bottom_starting_point.copy.rotate vector: vector, angle: index * TAU/4
    end

    points = top_points + bottom_points
    faces = [
      [0, 1, 2 ,3],
      [0, 1, 5, 4],
      [4, 5, 6 ,7],
      [3, 2, 6 ,7],
      [1, 2, 6 ,5],
      [0, 3, 7 ,4],
    ]
    polygons = faces.map do |face|
      Engine::Solid::Polygon.new points: face.map{ |index| points[index] }
    end

    Engine::Solid::Polyhedron.new points: points, polygons: polygons
  end
end
