// import { useFrame, useThree } from "@react-three/fiber";
// import { RigidBody, useRapier } from "@react-three/rapier";
// import { useRef, useEffect, useState } from "react";
// import * as THREE from "three";

// export default function Player({ onPressE }) {
//   const ref = useRef();
//   const { camera } = useThree();
//   const [keys, setKeys] = useState({});
//   const yaw = useRef(0); // left/right
//   const pitch = useRef(0); // up/down
//   const targetYaw = useRef(0);
//   const targetPitch = useRef(0);

//   // Register key events
//   useEffect(() => {
//     const down = (e) => {
//       setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));
//       if (e.key.toLowerCase() === "e" && inInteractZone.current && onPressE) {
//         onPressE();
//       }
//     };
//     const up = (e) => setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }));
//     window.addEventListener("keydown", down);
//     window.addEventListener("keyup", up);
//     return () => {
//       window.removeEventListener("keydown", down);
//       window.removeEventListener("keyup", up);
//     };
//   }, [onPressE]);

//   // Mouse look
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const sensitivity = 0.004;
//       targetYaw.current -= e.movementX * sensitivity;
//       targetPitch.current -= e.movementY * sensitivity;

//       const maxPitch = Math.PI / 2 - 0.1;
//       targetPitch.current = Math.max(-maxPitch, Math.min(maxPitch, targetPitch.current));
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const inInteractZone = useRef(false);

//   useFrame(() => {
//     if (!ref.current) return;

//     const pos = ref.current.translation();

//     // Smooth camera rotation
//     yaw.current = THREE.MathUtils.lerp(yaw.current, targetYaw.current, 0.1);
//     pitch.current = THREE.MathUtils.lerp(pitch.current, targetPitch.current, 0.1);

//     // Movement direction
//     const direction = new THREE.Vector3();
//     const front = new THREE.Vector3();
//     const side = new THREE.Vector3();

//     if (keys["w"]) front.z = -1;
//     if (keys["s"]) front.z = 1;
//     if (keys["a"]) side.x = -1;
//     if (keys["d"]) side.x = 1;

//     direction.addVectors(front, side).normalize();

//     if (direction.length() > 0) {
//       const moveX = Math.sin(yaw.current);
//       const moveZ = Math.cos(yaw.current);
//       const moveDir = new THREE.Vector3(
//         direction.x * moveZ + direction.z * moveX,
//         0,
//         direction.z * moveZ - direction.x * moveX
//       );
//       moveDir.multiplyScalar(0.1);
//       ref.current.setNextKinematicTranslation({
//         x: pos.x + moveDir.x,
//         y: pos.y,
//         z: pos.z + moveDir.z,
//       });
//     }

//     // Camera follows
//     const camOffset = new THREE.Vector3(
//       Math.sin(yaw.current) * 5,
//       3,
//       Math.cos(yaw.current) * 5
//     );
//     const camPos = new THREE.Vector3(pos.x, pos.y, pos.z).add(camOffset);
//     camera.position.lerp(camPos, 0.1);
//     camera.lookAt(new THREE.Vector3(pos.x, pos.y + 1 + Math.sin(pitch.current), pos.z));

//     // Check for interaction zone
//     const isInZone =
//       pos.x > -1 && pos.x < 1 &&
//       pos.z > -3 && pos.z < -1;

//     if (isInZone !== inInteractZone.current) {
//       inInteractZone.current = isInZone;
//       if (onInteractZoneChange) onInteractZoneChange(isInZone);
//     }
//   });

//   return (
//     <RigidBody ref={ref} name="player" type="kinematicPosition" colliders="ball">
//       <mesh>
//         <sphereGeometry args={[0.5]} />
//         <meshStandardMaterial color="hotpink" />
//       </mesh>
//     </RigidBody>
//   );
// }

import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function Player({ onPressE }) {
  const ref = useRef();
  const { camera } = useThree();
  const [keys, setKeys] = useState({});
  const yaw = useRef(0);
  const pitch = useRef(0);
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);

  useEffect(() => {
    const down = (e) => {
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));
      if (e.key.toLowerCase() === "e" && onPressE) {
        onPressE();
      }
    };
    const up = (e) => setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }));
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [onPressE]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const sensitivity = 0.004;
      targetYaw.current -= e.movementX * sensitivity;
      targetPitch.current -= e.movementY * sensitivity;
      const maxPitch = Math.PI / 2 - 0.1;
      targetPitch.current = Math.max(-maxPitch, Math.min(maxPitch, targetPitch.current));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    const pos = ref.current.translation();

    yaw.current = THREE.MathUtils.lerp(yaw.current, targetYaw.current, 0.1);
    pitch.current = THREE.MathUtils.lerp(pitch.current, targetPitch.current, 0.1);

    const direction = new THREE.Vector3();
    const front = new THREE.Vector3();
    const side = new THREE.Vector3();

    if (keys["w"]) front.z = -1;
    if (keys["s"]) front.z = 1;
    if (keys["a"]) side.x = -1;
    if (keys["d"]) side.x = 1;

    direction.addVectors(front, side).normalize();

    if (direction.length() > 0) {
      const moveX = Math.sin(yaw.current);
      const moveZ = Math.cos(yaw.current);
      const moveDir = new THREE.Vector3(
        direction.x * moveZ + direction.z * moveX,
        0,
        direction.z * moveZ - direction.x * moveX
      );
      moveDir.multiplyScalar(0.1);
      ref.current.setNextKinematicTranslation({
        x: pos.x + moveDir.x,
        y: pos.y,
        z: pos.z + moveDir.z,
      });
    }

    const camOffset = new THREE.Vector3(
      Math.sin(yaw.current) * 5,
      3,
      Math.cos(yaw.current) * 5
    );
    const camPos = new THREE.Vector3(pos.x, pos.y, pos.z).add(camOffset);
    camera.position.lerp(camPos, 0.1);
    camera.lookAt(new THREE.Vector3(pos.x, pos.y + 1 + Math.sin(pitch.current), pos.z));
  });

  return (
    <RigidBody ref={ref} name="player" type="kinematicPosition" colliders="ball">
      <mesh>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </RigidBody>
  );
}
