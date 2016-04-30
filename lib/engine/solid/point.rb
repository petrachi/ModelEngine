class Engine::Solid::Point
  attr_accessor :x, :y, :z

  def initialize x:, y:, z:
    @x = x
    @y = y
    @z = z
  end

  def translate x:, y:, z:
    @x += x
    @y += y
    @z += z

    self
  end

  def rotate vector:, angle:
    vector.to_unit

    sin = Math.sin angle / 2
    cos = Math.cos angle / 2

    q0 = cos
    q1 = vector.x * sin
    q2 = vector.y * sin
    q3 = vector.z * sin

    translate x: -vector.origin.x, y: -vector.origin.y, z: -vector.origin.z

    rotation_matrix = Matrix[
      [q0**2 + q1**2 - q2**2 - q3**2, 2*(q1*q2 - q0*q3), 2*(q1*q3 + q0*q2)],
      [2*(q2*q1 + q0*q3), q0**2 - q1**2 + q2**2 - q3**2, 2*(q2*q3 - q0*q1)],
      [2*(q3*q1 - q0*q2), 2*(q3*q2 + q0*q1), q0**2 - q1**2 - q2**2 + q3**2],
    ]

    result_matrix = rotation_matrix * Matrix[[@x], [@y], [@z]]
    @x = result_matrix.element(0, 0)
    @y = result_matrix.element(1, 0)
    @z = result_matrix.element(2, 0)

    translate x: vector.origin.x, y: vector.origin.y, z: vector.origin.z

    self
  end

  def to_plan perspective:
    deformation = (z + perspective) / perspective
    Engine::Plan::Point.new x: x * deformation, y: y * deformation
  end

  def copy
    self.class.new x: x, y: y, z: z
  end

end
