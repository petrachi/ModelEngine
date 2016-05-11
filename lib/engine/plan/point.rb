class Engine::Plan::Point
  attr_accessor :x, :y

  def initialize x:, y:
    @x = x
    @y = y
  end

  def translate x:, y:
    @x += x
    @y += y

    self
  end

  def rotate angle:, x:, y:
    sin = Math.sin angle
    cos = Math.cos angle

    translate x: -x, y: -y

    rotation_matrix = Matrix[
      [cos, -sin],
      [sin, cos]
    ]

    result_matrix = rotation_matrix * Matrix[[@x], [@y]]
    @x = result_matrix.element(0, 0)
    @y = result_matrix.element(1, 0)

    translate x: x, y: y

    self
  end

  def scale x:, y:, ratio:
    translate x: -x, y: -y

    @x *= ratio
    @y *= ratio

    translate x: x, y: y
  end

  def copy
    self.class.new x: x, y: y
  end
end
