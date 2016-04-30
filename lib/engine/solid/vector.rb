class Engine::Solid::Vector
  attr_accessor :origin, :x, :y, :z

  def initialize origin:, x:, y:, z:
    @origin = origin
    @x = x
    @y = y
    @z = z
  end

  def length
    Math.sqrt x**2 + y**2 + z**2
  end

  def to_unit
    vector_length = length
    
    @x /= vector_length
    @y /= vector_length
    @z /= vector_length
  end

end
