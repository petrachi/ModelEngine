module Engine::Plan::Builder
  def self.square x:, y:, edge:
    dist = edge / 2.0
    points = rotate_points x: x - dist, y: y - dist, rx: x, ry: y, times: 4

    Engine::Plan::Polygon.new points: points
  end

  def self.triangle x:, y:, edge:
    dist = edge / Math.sqrt(3.0)
    points = rotate_points x: x, y: y - dist, rx: x, ry: y, times: 3

    Engine::Plan::Polygon.new points: points
  end

  def self.rotate_points x:, y:, rx:, ry:, times:
    starting_point = Engine::Plan::Point.new x: x, y: y
    (0..times-1).to_a.map do |index|
      starting_point.copy.rotate x: rx, y: ry, angle: index * TAU/times
    end
  end
end
