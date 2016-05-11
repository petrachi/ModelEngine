module Engine::Solid::Builder
  def self.cube x:, y:, z:, edge:
    dist = edge / 2.0
    origin = Engine::Solid::Point.new x: x, y: y, z: z
    vector = Engine::Solid::Vector.new origin: origin, x: 0.0, y: 1.0, z: 0.0

    top_points = rotate_points x: x - dist, y: y - dist, z: z - dist, vector: vector, times: 4
    bottom_points = rotate_points x: x - dist, y: y + dist, z: z - dist, vector: vector, times: 4

    Engine::Solid::Polyhedron.new points: top_points + bottom_points,
      faces: [
      [0, 1, 2, 3],
      [0, 1, 5, 4],
      [4, 5, 6, 7],
      [3, 2, 6, 7],
      [1, 2, 6, 5],
      [0, 3, 7, 4],
    ]
  end

  def self.octahedron x:, y:, z:, edge:
    dist = edge / Math.sqrt(2)
    origin = Engine::Solid::Point.new x: x, y: y, z: z
    vector = Engine::Solid::Vector.new origin: origin, x: 0.0, y: 1.0, z: 0.0

    top_point = Engine::Solid::Point.new x: x, y: y + dist, z: z
    bottom_point = Engine::Solid::Point.new x: x, y: y - dist, z: z
    equator_points = rotate_points x: x, y: y, z: z + dist, vector: vector, times: 4

    Engine::Solid::Polyhedron.new points: [top_point] + equator_points + [bottom_point],
      faces: [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 1],
      [5, 1, 2],
      [5, 2, 3],
      [5, 3, 4],
      [5, 4, 1],
    ]
  end

  def self.rotate_points x:, y:, z:, vector:, times:
    starting_point = Engine::Solid::Point.new x: x, y: y, z: z
    (0..times-1).to_a.map do |index|
      starting_point.copy.rotate vector: vector, angle: index * TAU/times
    end
  end
end
