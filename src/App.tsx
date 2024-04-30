import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene, Engine } from "react-babylonjs";
import { FC } from "react";
import Instances from "./components/Instances";
import { Color3, Color4 } from "@babylonjs/core";

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
        <Scene clearColor={Color4.FromColor3(Color3.Black(), 1)}>
          <arcRotateCamera
            name="camera1"
            alpha={(Math.PI * 3) / 2}
            beta={Math.PI / 3}
            radius={90}
            target={Vector3.Zero()}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={new Vector3(0, 1, 0)}
          />
          <Instances animate={true} />
        </Scene>
      </Engine>
    </div>
  );
};

export default App;
