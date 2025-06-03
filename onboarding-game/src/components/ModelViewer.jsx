// ModelViewer.jsx
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import Player from "./Player";
import OnboardingScene from "./OnboardingScene";
import BTSS from "./BTSS";
import Compliance from "./Compliance";
import QuizModal from "./QuizModal";
import quizQuestions from "./questions";

export default function ModelViewer() {
  const [scene, setScene] = useState("onboarding");
  const [showPrompt, setShowPrompt] = useState(false);
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [hrDialogueIndex, setHrDialogueIndex] = useState(-1);
  const [nearIDCard, setNearIDCard] = useState(false);
  const [collectedID, setCollectedID] = useState(false);
  const [nearFloor, setNearFloor] = useState(false);
  const [nearFileName, setNearFileName] = useState(null);

  const [showQuiz, setShowQuiz] = useState(false);
  const [confirmQuiz, setConfirmQuiz] = useState(false);
  const [nearQuizZone, setNearQuizZone] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);

  const fileZones = [
    { name: "sample.pdf", position: [7.5, 0, 5] },
    { name: "tokmakov2019.pdf", position: [2, 0, 5] },
    { name: "ssrn-4365306.pdf", position: [2, 0, 10] },
  ];

  const hrDialogues = [
    "Welcome to the CITICORP!",
    "You will be walked through the orientation process.",
    "You'll find your assets in the main lobby.",
    "After collecting your assets, you can choose a floor to work on.",
    "Good luck on your first day!",
  ];

  const handleEnterZone = (pos) => {
    if (scene === "btss") return;

    if (scene === "onboarding") {
      const nearHR = Math.abs(pos.x - 1) < 0.5 && Math.abs(pos.z - 0) < 0.5;
      const nearCard = !collectedID && Math.abs(pos.x - 1) < 1.5 && Math.abs(pos.z + 2) < 1.5;
      const nearFloorTrigger = collectedID && hrDialogueIndex === -1 && Math.abs(pos.x - 0) < 1.5 && Math.abs(pos.z - 4) < 1.5;

      setShowPrompt(moduleCompleted ? false : nearHR);
      setNearIDCard(nearCard);
      setNearFloor(nearFloorTrigger);
    }

    if (scene === "compliance") {
      let nearbyFile = null;
      for (const file of fileZones) {
        const [fx, , fz] = file.position;
        if (Math.abs(pos.x - fx) < 1.2 && Math.abs(pos.z - fz) < 1.2) {
          nearbyFile = file.name;
          break;
        }
      }
      setNearFileName(nearbyFile);

      const quizZoneX = 5, quizZoneZ = 10;
      const inQuiz = Math.abs(pos.x - quizZoneX) < 1.5 && Math.abs(pos.z - quizZoneZ) < 1.5;
      setNearQuizZone(inQuiz);
    }
  };

  const handlePressE = () => {
    if (scene === "onboarding") {
      if (nearIDCard && !collectedID) {
        setCollectedID(true);
        alert("✅ ID Card collected!");
      } else if (showPrompt) {
        if (hrDialogueIndex < hrDialogues.length - 1) {
          setHrDialogueIndex((prev) => prev + 1);
        } else {
          setHrDialogueIndex(-1);
        }
      } else if (nearFloor) {
        setShowFloorModal(true);
      }
    }

    if (scene === "compliance") {
      if (nearFileName) {
        window.open(`http://localhost:5000/files/${nearFileName}`, "_blank");
      } else if (showPrompt) {
        setShowFloorModal(true);
      } else if (nearQuizZone) {
        setConfirmQuiz(true);
      }
    }
  };

  const handleQuizComplete = async (score, total, answers) => {
    const completed = score >= 4;
    if (completed) setModuleCompleted(true);

    try {
      const res = await fetch("http://localhost:5000/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, score, completed }),
      });
      const json = await res.json();
      console.log("✅ Submitted to backend:", json);
      alert(completed ? "🎉 Module completed!" : "❌ You need at least 4 correct answers.");
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  const handleFloorSelect = (floor) => {
    setShowFloorModal(false);
    if (floor === "BTSS") setScene("btss");
    else if (floor === "Reception") {
      setScene("onboarding");
      setHrDialogueIndex(-1);
      setNearIDCard(false);
      setNearFileName(null);
      setShowPrompt(false);
    } else if (floor === "Compliance") {
      setScene("compliance");
    } else {
      alert(`Selected: ${floor}`);
    }
    setShowFloorModal(false);
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
      <div style={{
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
      }} />

      {/* Prompts */}
      {scene === "onboarding" && hrDialogueIndex >= 0 && (
        <div style={{ ...promptStyle, bottom: 100 }}>{hrDialogues[hrDialogueIndex]}</div>
      )}
      {scene === "onboarding" && nearIDCard && !collectedID && <div style={promptStyle}>Press E to collect ID card</div>}
      {scene === "onboarding" && !showFloorModal && (
        <>
          {moduleCompleted ? (
            <div style={promptStyle}>🎉 You have completed onboarding!</div>
          ) : (
            showPrompt && hrDialogueIndex === -1 && (
              <div style={promptStyle}>Press E to talk</div>
            )
          )}
        </>
      )}
      {scene === "onboarding" && nearFloor && <div style={promptStyle}>Press E to choose a floor</div>}
      {scene === "compliance" && nearFileName && <div style={promptStyle}>Press E to open {nearFileName}</div>}
      {scene === "compliance" && nearQuizZone && !showQuiz && <div style={promptStyle}>Press E to take test</div>}
      {scene === "btss" && showPrompt && <div style={promptStyle}>Press E to open elevator</div>}
      {scene === "compliance" && showPrompt && <div style={promptStyle}>Press E to open elevator</div>}

      {/* Confirmation for test */}
      {confirmQuiz && (
        <div style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#222",
          padding: "20px",
          color: "white",
          borderRadius: "10px",
          zIndex: 25,
        }}>
          <p>Do you want to take the test?</p>
          <button onClick={() => { setConfirmQuiz(false); setShowQuiz(true); }}>Start</button>
          <button onClick={() => setConfirmQuiz(false)} style={{ marginLeft: 10 }}>Cancel</button>
        </div>
      )}

      {/* Quiz modal */}
      {showQuiz && (
        <QuizModal
          questions={quizQuestions}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}

      {/* Floor modal */}
      {showFloorModal && (
        <div style={{
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
        }}>
          <h3 style={{ marginBottom: "10px", textAlign: "center" }}>Select Floor</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Reception", "BTSS", "Compliance"].map((floor) => (
              <li key={floor}
                style={{
                  background: "#444",
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onClick={() => handleFloorSelect(floor)}
              >
                {floor}
              </li>
            ))}
          </ul>
          <button style={{
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

      {/* Canvas */}
      <Canvas camera={{ position: [0, 2, 10], fov: 40 }}
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          background: "#000",
        }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Physics>
            {scene === "onboarding" && (
              <>
                <OnboardingScene collectedIDCard={collectedID} />
                <Player
                  key={scene}
                  onEnterZone={handleEnterZone}
                  onPressE={handlePressE}
                  initialPosition={[3, 0, 0]}
                  initialYaw={-Math.PI / 2}
                />
              </>
            )}
            {scene === "btss" && (
              <BTSS
                key={scene}
                onEnterElevatorZone={(inZone) => setShowPrompt(inZone)}
                onPressElevator={() => showPrompt && setShowFloorModal(true)}
                playerPosition={[-10, 0, -7]}
              />
            )}
            {scene === "compliance" && (
              <Compliance
                key={scene}
                onPressE={handlePressE}
                onEnterZone={handleEnterZone}
                onEnterElevatorZone={(inZone) => setShowPrompt(inZone)}
                playerPosition={[-10, 0, -7]}
              />
            )}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
