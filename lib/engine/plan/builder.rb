module Engine::Plan::Builder
  def self.square x:, y:, edge:
    dist = edge / 2.0

    starting_point = Engine::Plan::Point.new x: x - dist, y: y - dist
    points = (0..3).to_a.map do |index|
      starting_point.copy.rotate x: x, y: y, angle: index * TAU/4
    end

    Engine::Plan::Polygon.new points: points


    # Engine::Plan::Polygon.build [
    #   {x: x - dist, y: y - dist},
    #   {x: x + dist, y: y - dist},
    #   {x: x + dist, y: y + dist},
    #   {x: x - dist, y: y + dist},
    # ]
  end

  def self.triangle x:, y:, edge:
    dist = edge / Math.sqrt(3.0)

    starting_point = Engine::Plan::Point.new x: x, y: y - dist
    points = (0..2).to_a.map do |index|
      starting_point.copy.rotate x: x, y: y, angle: index * TAU/3
    end

    Engine::Plan::Polygon.new points: points

    # top = Engine::Plan::Point.new x: x, y: y - dist
    # right = top.dup.rotate x: x, y: y, angle: TAU/3
    # left = right.dup.rotate x: x, y: y, angle: TAU/3
    #
    # Engine::Plan::Polygon.new points: [top, right, left]
  end
end
