// Compliance.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";
import Player from "./Player";

const fileZones = [
  { name: "sample.pdf", position: [7.5, 0, 5] },
  { name: "tokmakov2019.pdf", position: [2, 0, 5] },
  { name: "ssrn-4365306.pdf", position: [2, 0, 6] },
];

export default function Compliance({ onEnterElevatorZone, playerPosition, onEnterZone, onPressE }) {
  const { scene } = useGLTF("/models/office/first_level.glb");

  const elevatorZone = [4, 0, 0]; // Adjust this if needed

  const handleZoneCheck = (pos) => {
    const inZone =
      Math.abs(pos.x - elevatorZone[0]) < 1.5 &&
      Math.abs(pos.z - elevatorZone[2]) < 1.5;
    onEnterElevatorZone?.(inZone);
  };

  return (
    <>
      <primitive object={scene} scale={1} position={[8, 0, -10]} />

      {/* 🔵 Debug Highlights for file zones */}
      {fileZones.map((file, index) => (
        <mesh key={index} position={file.position}>
          <boxGeometry args={[1.2, 0.1, 1.2]} />
          <meshBasicMaterial color="blue" transparent opacity={0.4} />
        </mesh>
      ))}

      <Player
        // onEnterZone={handleZoneCheck}
        onEnterZone={(pos) => {
    handleZoneCheck(pos);     // ✅ for elevator
    onEnterZone?.(pos);       // ✅ for file prompts
  }}
        onPressE={onPressE}
        initialPosition={playerPosition}
        initialYaw={Math.PI}
      />
    </>
  );
}
