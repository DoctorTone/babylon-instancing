import { MeshBuilder, Vector3 } from "@babylonjs/core";
import { useScene } from "react-babylonjs";
import { SCENE } from "../state/Config";
import { polarToCartesian } from "../state/Utils";

const Instances = () => {
  const scene = useScene();
  const spherePositions = [];
  const angleIncrement = (Math.PI * 2) / SCENE.NUM_SPHERES;

  let angle;
  for (let ring = 0; ring < SCENE.NUM_RINGS; ++ring) {
    for (let sphere = 0; sphere < SCENE.NUM_SPHERES; ++sphere) {
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
