module Engine::Demo
  SQUARE = Engine::Plan::Builder.square x: 0.0, y: 0.0, edge: 0.5
  CUBE = Engine::Solid::Builder.cube x: 0.0, y: 0.0, z: -1.0, edge: 0.5
  TRIANGLE = Engine::Plan::Builder.triangle x: 0.0, y: 0.0, edge: 0.5
  OCTAHEDRON = Engine::Solid::Builder.octahedron x: 0.0, y: 0.0, z: 0.0, edge: 0.5
end
