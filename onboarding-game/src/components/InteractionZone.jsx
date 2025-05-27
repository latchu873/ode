import { RigidBody } from "@react-three/rapier";

export default function InteractionZone() {
  return (
    <RigidBody type="fixed" colliders="cuboid" sensor>
      <mesh position={[4.5, 0, -0.5]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="lime" transparent opacity={0.3} />
      </mesh>
    </RigidBody>
  );
}
