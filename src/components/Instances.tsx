import { MeshBuilder, Vector3 } from "@babylonjs/core";
import { useScene } from "react-babylonjs";

const Instances = () => {
  const scene = useScene();
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );

  return (
    <instancedMesh
      source={sphere}
      key={0}
      name="sphere0"
      position={new Vector3()}
    />
  );
};

export default Instances;
