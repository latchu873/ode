import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import Player from "./Player";
import Building from "./Building";
import InteractionZone from "./InteractionZone";
import OnboardingScene from "./OnboardingScene";

export default function ModelViewer() {
  const [scene, setScene] = useState("main"); // 'main' or 'onboarding'
  const [showPrompt, setShowPrompt] = useState(false);
  const [showFloorModal, setShowFloorModal] = useState(false);

  const handleEnterZone = (pos) => {
    const inZone =
      Math.abs(pos.x - 4.5) < 1.5 &&
      Math.abs(pos.z - (-0.5)) < 1.5;

    if (inZone) {
      console.log("Entered interaction zone at position:", pos);
    }
    setShowPrompt(inZone);
  };

  const handlePressE = () => {
    if (scene === "main" && showPrompt) {
      setScene("onboarding");
    } else if (scene === "onboarding" && showPrompt) {
      setShowFloorModal(true);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      {/* 🎯 Crosshair */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: 0.8,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* 📝 Interaction Prompt */}
      {scene === "main" && showPrompt && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            textAlign: "center",
            color: "white",
            fontSize: 24,
            zIndex: 10,
          }}
        >
          Press "E" to interact
        </div>
      )}

      {/* 🗂️ Floor Selection Modal */}
      {scene === "onboarding" && showFloorModal && (
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#222",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 20,
            width: "300px",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          }}
        >
          <h3 style={{ marginBottom: "10px", textAlign: "center" }}>Select Floor</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Floor 1", "Floor 2", "Floor 3"].map((floor) => (
              <li
                key={floor}
                style={{
                  background: "#444",
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onClick={() => alert(`Selected: ${floor}`)}
              >
                {floor}
              </li>
            ))}
          </ul>
          <button
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              width: "100%",
              borderRadius: "5px",
              border: "none",
              background: "#888",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setShowFloorModal(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* 🧱 Canvas */}
      <Canvas
        camera={{ position: [0, 2, 10], fov: 40 }}
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          background: "#000",
        }}
      >
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
                <InteractionZone />
                <Player onEnterZone={handleEnterZone} onPressE={handlePressE} />
              </>
            )}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
