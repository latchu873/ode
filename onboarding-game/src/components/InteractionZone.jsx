// InteractionZone.jsx
import { RigidBody } from "@react-three/rapier";

export default function InteractionZone({ onEnter, onExit }) {
  return (
    <RigidBody
      type="fixed"
      sensor
      colliders="cuboid"
      position={[0, 0.5, -2]} // <-- Aligned with door and player's detection zone
      onIntersectionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "player") onEnter?.();
      }}
      onIntersectionExit={({ other }) => {
        if (other.rigidBodyObject?.name === "player") onExit?.();
      }}
    >
      <mesh visible={true}> {/* Set to true for debugging */}
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="green" transparent opacity={0.3} />
      </mesh>
    </RigidBody>
  );
}
