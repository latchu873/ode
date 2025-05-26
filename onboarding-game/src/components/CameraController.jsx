// src/components/CameraController.jsx
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraController({ camera, ballRef }) {
  useFrame(() => {
    if (!ballRef.current) return;
    const ballPosition = ballRef.current.translation();

    const desiredPosition = new THREE.Vector3(
      ballPosition.x,
      ballPosition.y + 1.5,
      ballPosition.z + 5
    );

    camera.position.lerp(desiredPosition, 0.1);
    camera.lookAt(ballPosition.x, ballPosition.y + 1, ballPosition.z);
  });

  return null;
}
