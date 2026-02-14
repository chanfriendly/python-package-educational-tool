import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const LegoBlock = ({ position, color = "#ff453a" }) => {
  const group = useRef();
  const targetPos = useRef(new THREE.Vector3(...position));
  const initialized = useRef(false);

  useEffect(() => {
    targetPos.current.set(...position);
  }, [position]);

  useLayoutEffect(() => {
    if (!initialized.current && group.current) {
      group.current.position.set(...position);
      initialized.current = true;
    }
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      // Smooth lerp to target
      group.current.position.lerp(targetPos.current, 8 * delta);
    }
  });

  return (
    <group ref={group}>
      {/* Main Brick Body */}
      <RoundedBox args={[0.9, 0.8, 0.9]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </RoundedBox>
      {/* Stud */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  );
};
