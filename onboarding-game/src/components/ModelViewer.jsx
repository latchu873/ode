import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import Player from "./Player";
import Building from "./Building";
import InteractionZone from "./InteractionZone";
import OnboardingScene from "./OnboardingScene";

export default function ModelViewer() {
  const [scene, setScene] = useState("main");
  const [showPrompt, setShowPrompt] = useState(false);
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [hrDialogueIndex, setHrDialogueIndex] = useState(-1);
  const [nearIDCard, setNearIDCard] = useState(false);
  const [collectedID, setCollectedID] = useState(false);
  const [nearFloor, setNearFloor] = useState(false);
  const [nearFileName, setNearFileName] = useState(null); // ✅ File interaction

  // ✅ Define positions and file names
  const fileZones = [
    { name: "sample.pdf", position: [2, 0, -1] },
    { name: "tokmakov2019.pdf", position: [-3, 0, 3] },
    { name: "ssrn-4365306.pdf", position: [1, 0, 6] },
  ];

  const hrDialogues = [
    "Welcome to the CITICORP!",
    "You will be walked through the orientation process.",
    "You'll find your assets in the main lobby.",
    "After collecting your assets, you can choose a floor to work on.",
    "Good luck on your first day!",
  ];

  const handleEnterZone = (pos) => {
    if (scene === "main") {
      const inZone = Math.abs(pos.x - 4.5) < 1.5 && Math.abs(pos.z + 0.5) < 1.5;
      setShowPrompt(inZone);
    } else {
      const nearHR = Math.abs(pos.x - 0) < 1.5 && Math.abs(pos.z - 20) < 1.5;
      const nearCard = !collectedID && Math.abs(pos.x - 0) < 1.5 && Math.abs(pos.z + 10) < 1.5;
      const nearFloorTrigger = collectedID && hrDialogueIndex === -1 && Math.abs(pos.x - 0) < 1.5 && Math.abs(pos.z + 5) < 1.5;

      setShowPrompt(nearHR);
      setNearIDCard(nearCard);
      setNearFloor(nearFloorTrigger);

      // ✅ Detect proximity to any file zone
      let nearbyFile = null;
      for (const file of fileZones) {
        const [fx, , fz] = file.position;
        if (Math.abs(pos.x - fx) < 1.2 && Math.abs(pos.z - fz) < 1.2) {
          nearbyFile = file.name;
          break;
        }
      }
      setNearFileName(nearbyFile);
    }
  };

  const handlePressE = () => {
    if (scene === "main" && showPrompt) {
      setScene("onboarding");
    } else if (scene === "onboarding") {
      if (nearIDCard && !collectedID) {
        setCollectedID(true);
        alert("✅ ID Card collected!");
      } else if (showPrompt) {
        if (hrDialogueIndex < hrDialogues.length - 1) {
          setHrDialogueIndex((prev) => prev + 1);
        } else if (hrDialogueIndex === hrDialogues.length - 1) {
          setHrDialogueIndex(-1);
        }
      } else if (nearFloor) {
        setShowFloorModal(true);
      } else if (nearFileName) {
        // ✅ Open file from backend
        window.open(`http://localhost:5000/files/${nearFileName}`, "_blank");
      }
    }
  };

  const promptStyle = {
    position: "absolute",
    bottom: 40,
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 24,
    zIndex: 10,
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

      {/* 📝 Prompts */}
      {scene === "main" && showPrompt && (
        <div style={promptStyle}>Press E to interact</div>
      )}
      {scene === "onboarding" && nearIDCard && !collectedID && (
        <div style={promptStyle}>Press E to collect ID card</div>
      )}
      {scene === "onboarding" && showPrompt && !nearIDCard && hrDialogueIndex === -1 && !showFloorModal && (
        <div style={promptStyle}>Press E to talk</div>
      )}
      {scene === "onboarding" && nearFloor && (
        <div style={promptStyle}>Press E to choose a floor</div>
      )}
      {scene === "onboarding" && nearFileName && (
        <div style={promptStyle}>Press E to open {nearFileName}</div>
      )}

      {/* 💬 HR Dialogue Box */}
      {scene === "onboarding" && hrDialogueIndex >= 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#222",
            color: "white",
            padding: "15px 25px",
            borderRadius: "8px",
            fontSize: "18px",
            zIndex: 20,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {hrDialogues[hrDialogueIndex]}
        </div>
      )}

      {/* 🗂️ Floor Modal */}
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
          <h3 style={{ marginBottom: "10px", textAlign: "center" }}>
            Select Floor
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Compliance Room", "BTSS", "Terrace"].map((floor) => (
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
                <Player
                  onEnterZone={handleEnterZone}
                  onPressE={handlePressE}
                />
              </>
            ) : (
              <>
                <OnboardingScene collectedID={collectedID} />
                <InteractionZone position={[0, 0.5, 20]} /> {/* HR */}
                <InteractionZone position={[0, 0.5, -5]} /> {/* Floor trigger */}

                {/* 📦 Optional: file markers for debug */}
                {fileZones.map(({ name, position }) => (
                  <mesh key={name} position={[...position]}>
                    <boxGeometry args={[0.5, 0.1, 0.5]} />
                    <meshStandardMaterial color="skyblue" />
                  </mesh>
                ))}

                <Player
                  onEnterZone={handleEnterZone}
                  onPressE={handlePressE}
                />
              </>
            )}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
