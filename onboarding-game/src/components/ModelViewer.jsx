import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import Player from "./Player";
import Building from "./Building";
import InteractionZone from "./InteractionZone";
import OnboardingScene from "./OnboardingScene"; // Make sure this file exists

export default function ModelViewer() {
  const [scene, setScene] = useState("main");
  const [showPrompt, setShowPrompt] = useState(false);

  // const handleEnterZone = (pos) => {
  //   const inZone =
  //     Math.abs(pos.x - 4.5) < 1.5 &&
  //     Math.abs(pos.z + 0.5) < 1.5;
  //   setShowPrompt(inZone);
  // };

  const handleEnterZone = (pos) => {
  const inZone =
    Math.abs(pos.x - 4.5) < 1.5 &&
    Math.abs(pos.z - (-0.5)) < 1.5;
    if(inZone) {
      console.log("Entered interaction zone at position:", pos);
    }
  setShowPrompt(inZone);
};


  const handlePressE = () => {
    if (showPrompt && scene === "main") {
      setScene("onboarding");
    }
  };

  return (
    <>
      {scene === "main" && showPrompt && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            textAlign: "center",
            color: "white",
            fontSize: 24,
            zIndex: 1000
          }}
        >
          Press "E" to interact
        </div>
      )}

      <Canvas camera={{ position: [0, 2, 10], fov: 40 }} style={{ height: "100vh", background: "#000" }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Physics>
            {scene === "main" ? (
              <>
                <Building />
                <InteractionZone />
                <Player onEnterZone={handleEnterZone} onPressE={handlePressE} />
              </>
            ) : (
              <>
              <OnboardingScene />
              <Player onEnterZone={handleEnterZone} onPressE={handlePressE} />
              </>
            )}
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
}
