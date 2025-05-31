import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function IDCard({ collected }) {
  const groupRef = useRef();
  const { scene } = useGLTF("/models/office/onboarding3.glb");

  // Find and isolate the ID card mesh by name (adjust if needed)
  const card = scene.getObjectByName("Object_6") || scene.children[0];

  useEffect(() => {
    if (collected && card) {
      card.visible = false;
    }
  }, [collected, card]);

  return (
    <primitive
      ref={groupRef}
      object={card}
      scale={0.1}
      position={[1.8, 1.2, 30]} // Adjust to match desk position
      rotation={[0, 0, 0]}
      visible={!collected}
    />
  );
}
