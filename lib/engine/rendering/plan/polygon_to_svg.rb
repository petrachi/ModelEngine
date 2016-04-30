class Engine::Rendering::Plan::PolygonToSvg
  attr_accessor :polygon

  def initialize polygon:
    @polygon = polygon
  end

  def render
    "<path d='#{ path }' fill='transparent' stroke='orange' stroke-width='0.005'/>".html_safe
  end

  def path
    "M " << points.join(" L ") << " Z"
  end

  def points
    polygon.points.map do |point|
      "#{ point.x } #{ point.y }"
    end
  end
end
