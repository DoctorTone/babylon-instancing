import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene, Engine } from "react-babylonjs";
import React, { FC } from "react";
import Instances from "./components/Instances";

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
            alpha={(Math.PI * 3) / 2}
            beta={Math.PI / 3}
            radius={40}
            target={Vector3.Zero()}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          <Instances />
        </Scene>
      </Engine>
    </div>
  );
};

export default App;
