import { MeshBuilder, Vector3 } from "@babylonjs/core";
import { useScene } from "react-babylonjs";
import { SCENE } from "../state/Config";
import { polarToCartesian } from "../state/Utils";

const Instances = () => {
  const scene = useScene();
  const spherePositions = [];
  let angleIncrement;
  const spheresPerRing = [
    SCENE.NUM_SPHERES,
    SCENE.NUM_SPHERES,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
  ];

  let angle;
  for (let ring = 0; ring < spheresPerRing.length; ++ring) {
    for (let sphere = 0; sphere < spheresPerRing[ring]; ++sphere) {
      angleIncrement = (Math.PI * 2) / spheresPerRing[ring];
      angle = sphere * angleIncrement;
      const { x, y } = polarToCartesian(SCENE.START_RADIUS + ring, angle);
      spherePositions.push(new Vector3(x, 0, y));
    }
  }

  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: SCENE.SPHERE_RADIUS, segments: 32 },
    scene
  );

  return (
    <>
      {spherePositions.map((pos, index) => {
        return (
          <instancedMesh
            source={sphere}
            key={index}
            name="sphere0"
            position={pos}
          />
        );
      })}
    </>
  );
};

export default Instances;
