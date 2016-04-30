class Engine::Rendering::Solid::PolygonToSvg
  attr_accessor :polygon, :perspective

  def initialize polygon:, perspective:
    @polygon = polygon
    @perspective = perspective
  end

  def render
    "<path d='#{ path }' fill='rgba(255, 165, 0, 0.75)' stroke='orangered' stroke-width='0.005'/>".html_safe
  end

  def path
    "M " << points.join(" L ") << " Z"
  end

  def points
    polygon.points.map do |point|
      projection = point.to_plan perspective: perspective
      "#{ projection.x } #{ projection.y }"
    end
  end
end
