import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene, Engine } from "react-babylonjs";
import React, { FC } from "react";

const App: FC = () => {
  return (
    <div style={{ flex: 1, display: "flex" }}>
      <Engine
        antialias
        adaptToDeviceRatio
        canvasId="babylon-js"
        renderOptions={{
          whenVisibleOnly: true,
        }}
      >
        <Scene>
          <arcRotateCamera
            name="camera1"
            alpha={0}
            beta={Math.PI / 3}
            radius={10}
            target={Vector3.Zero()}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          <ground name="ground" width={6} height={6} />
          <box
            name="box"
            size={2}
            position={new Vector3(0, 1, 0)}
            rotation={Vector3.Zero()}
          />
        </Scene>
      </Engine>
    </div>
  );
};

export default App;
