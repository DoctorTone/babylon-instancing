import { FC } from "react";
import {
  InstancedMesh,
  MeshBuilder,
  Vector3,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";
import { useBeforeRender, useScene } from "react-babylonjs";
import { SCENE } from "../state/Config";
import { polarToCartesian } from "../state/Utils";

type InstanceProps = {
  animate: boolean;
};

const Instances: FC<InstanceProps> = ({ animate }) => {
  const scene = useScene();
  const sphereObject = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: SCENE.SPHERE_RADIUS, segments: 32 },
    scene
  );
  const sphereMat = new StandardMaterial("sphereMat", scene!);
  sphereMat.diffuseColor = new Color3(0.84, 0.47, 0.16);
  sphereObject.material = sphereMat;

  const spherePositions: Vector3[] = [];

  let angleIncrement;
  const spheresPerRing = [
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
    SCENE.NUM_SPHERES * 8,
    SCENE.NUM_SPHERES * 8,
  ];

  let angle;
  let index = 0;
  const numCircles = spheresPerRing.length;
  for (let ring = 0; ring < numCircles; ++ring) {
    for (let sphere = 0; sphere < spheresPerRing[ring]; ++sphere) {
      angleIncrement = (Math.PI * 2) / spheresPerRing[ring];
      angle = sphere * angleIncrement;
      const { x, y } = polarToCartesian(SCENE.START_RADIUS + ring, angle);
      spherePositions.push(new Vector3(x, 0, y));
      ++index;
    }
  }

  const getCircle = (circle: number) => {
    const start = circle * SCENE.NUM_SPHERES * 8;
    const end = start + SCENE.NUM_SPHERES * 8;

    const spheres: InstancedMesh[] = [];
    for (let i = start; i < end; ++i) {
      spheres.push(scene!.getMeshByName(`sphere${i}`) as InstancedMesh);
    }

    return spheres;
  };

  const animateCircle = (spheres: InstancedMesh[], displaceMent: number) => {
    spheres.forEach((sphere) => {
      sphere.position.y = Math.sin(Math.PI * 2 * displaceMent) + 1;
    });
  };

  let elapsedTime = 0;
  let DELAY = 0.03;
  useBeforeRender(() => {
    if (animate) {
      const deltaTimeInMillis = scene!.getEngine().getDeltaTime();
      elapsedTime += deltaTimeInMillis / 1000;
      let currentCircle;
      for (let circle = 0; circle < numCircles; ++circle) {
        currentCircle = getCircle(circle);
        animateCircle(currentCircle, elapsedTime + circle * DELAY);
      }
      if (elapsedTime >= 3) {
        DELAY += 0.05;
        elapsedTime = 0;
      }
    }
  });

  return (
    <>
      {spherePositions.map((pos, index) => {
        return (
          <instancedMesh
            source={sphereObject}
            key={index}
            name={`sphere${index}`}
            position={pos}
          />
        );
      })}
    </>
  );
};

export default Instances;
