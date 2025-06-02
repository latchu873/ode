// BTSS.jsx
import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import Player from "./Player";

export default function BTSS({ onEnterElevatorZone, onPressElevator, playerPosition }) {
  const { scene } = useGLTF("/models/office/second_level.glb");

  const elevatorZone = [2, 0, 0];

  const handleZoneCheck = (pos) => {
    const inZone =
      Math.abs(pos.x - elevatorZone[0]) < 1.5 &&
      Math.abs(pos.z - elevatorZone[2]) < 1.5;
    onEnterElevatorZone?.(inZone);
  };

  return (
    <>
      <primitive object={scene} scale={1} position={[-10, 0, -10]} />

      {/* 🔴 Highlight Elevator Zone (for debugging) */}
      {/* <mesh position={elevatorZone}>
        <boxGeometry args={[1.5, 0.1, 1.5]} />
        <meshBasicMaterial color="red" transparent opacity={0.3} />
      </mesh> */}

      <Player
    //   key={scene}
        onEnterZone={handleZoneCheck}
        onPressE={onPressElevator}
        initialPosition={playerPosition}
        initialYaw={Math.PI}
      />
    </>
  );
}
