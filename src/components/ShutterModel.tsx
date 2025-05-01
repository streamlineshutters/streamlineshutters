import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

// Material configurations for different shutter types
const MATERIAL_CONFIGS = {
  fusion: {
    color: '#ffffff',
    roughness: 0.8,
    metalness: 0.1,
    name: 'Fusion Plus'
  },
  element: {
    color: '#a1a1aa',
    roughness: 0.1,
    metalness: 0.9,
    name: 'Element 13'
  },
  sovereign: {
    color: '#854d0e',
    roughness: 0.7,
    metalness: 0.1,
    name: 'Sovereign Basswood'
  }
} as const;

// Shutter dimensions and layout constants
const SHUTTER_CONFIG = {
  slat: {
    width: 1.6,
    height: 0.7,     // Slat height
    depth: 0.1,
    overlap: 0.1     // Overlap amount
  },
  panel: {
    width: 1.8,
    height: 5.8,
    depth: 0.15,
    frameThickness: 0.15,
    innerHeight: 5.5  // Height minus frame thickness
  },
  frame: {
    width: 4,
    height: 6,
    depth: 0.2,
    thickness: 0.3
  }
};

// Calculate optimal slat positions based on updated width and height
const calculateSlatPositions = () => {
  const { count, height, overlap } = SHUTTER_CONFIG.slat;
  const panelInnerHeight = SHUTTER_CONFIG.panel.innerHeight;

  // Start position to place the first slat at the bottom
  const startY = -(panelInnerHeight / 2) + (height / 2);

  // Calculate the required number of slats based on the height
  const totalHeight = panelInnerHeight;
  const requiredSlats = Math.ceil(totalHeight / (height - overlap));

  // Calculate positions for each slat, starting from the bottom and applying overlap
  const positions = Array.from({ length: requiredSlats }).map((_, index) => {
    return startY + index * (height - overlap);
  });

  // Remove the last slat (bottommost one) from the positions
  positions.pop();

  return positions;
};

// Pre-calculate slat positions
const SLAT_POSITIONS = calculateSlatPositions();

interface ShutterPanelProps {
  position: [number, number, number];
  rotation: number;
  slatAngle: number;
  material: THREE.Material;
  isLeft?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

const ShutterPanel: React.FC<ShutterPanelProps> = ({
  position,
  rotation,
  slatAngle,
  material,
  isLeft = false,
  castShadow = true,
  receiveShadow = true
}) => {
  const panelRef = useRef<THREE.Group>(null);
  const slatRefs = useRef<THREE.Mesh[]>([]);
  const currentRotation = useRef(rotation);
  const currentSlatAngle = useRef(slatAngle);

  // Initialize slatRefs array if empty
  if (slatRefs.current.length === 0) {
    slatRefs.current = Array(SHUTTER_CONFIG.slat.count).fill(null);
  }

  useFrame(() => {
    if (panelRef.current) {
      // Smooth panel rotation
      currentRotation.current += (rotation - currentRotation.current) * 0.1;
      panelRef.current.rotation.y = currentRotation.current;

      // Smooth slat rotation
      currentSlatAngle.current += (slatAngle - currentSlatAngle.current) * 0.1;
      slatRefs.current.forEach((slat) => {
        if (slat) {
          slat.rotation.x = currentSlatAngle.current;
        }
      });
    }
  });

  const pivotOffset = isLeft ? -SHUTTER_CONFIG.panel.width / 2 : SHUTTER_CONFIG.panel.width / 2;
  const panelCenter = 0;

  return (
    <group position={position}>
      {/* Pivot group */}
      <group position={[pivotOffset, 0, 0]} ref={panelRef}>
        <group position={[-pivotOffset, 0, 0]}>
          {/* Panel frame */}
          <group>
            <Box
              args={[SHUTTER_CONFIG.panel.frameThickness, SHUTTER_CONFIG.panel.height, SHUTTER_CONFIG.panel.depth]}
              position={[panelCenter - SHUTTER_CONFIG.panel.width / 2 + SHUTTER_CONFIG.panel.frameThickness / 2, 0, 0]}
              material={material}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
            />
            <Box
              args={[SHUTTER_CONFIG.panel.frameThickness, SHUTTER_CONFIG.panel.height, SHUTTER_CONFIG.panel.depth]}
              position={[panelCenter + SHUTTER_CONFIG.panel.width / 2 - SHUTTER_CONFIG.panel.frameThickness / 2, 0, 0]}
              material={material}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
            />
            <Box
              args={[SHUTTER_CONFIG.panel.width, SHUTTER_CONFIG.panel.frameThickness, SHUTTER_CONFIG.panel.depth]}
              position={[panelCenter, SHUTTER_CONFIG.panel.height / 2 - SHUTTER_CONFIG.panel.frameThickness / 2, 0]}
              material={material}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
            />
            <Box
              args={[SHUTTER_CONFIG.panel.width, SHUTTER_CONFIG.panel.frameThickness, SHUTTER_CONFIG.panel.depth]}
              position={[panelCenter, -SHUTTER_CONFIG.panel.height / 2 + SHUTTER_CONFIG.panel.frameThickness / 2, 0]}
              material={material}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
            />
          </group>

          {/* Slats */}
          {SLAT_POSITIONS.map((yPos, i) => (
            <Box
              key={`slat-${i}`}
              args={[SHUTTER_CONFIG.panel.width, SHUTTER_CONFIG.slat.height, SHUTTER_CONFIG.slat.depth]}
              position={[panelCenter, yPos, SHUTTER_CONFIG.panel.depth / 2 + SHUTTER_CONFIG.slat.depth / 2]}
              ref={(mesh) => {
                if (mesh) slatRefs.current[i] = mesh;
              }}
              material={material}
              castShadow={castShadow}
              receiveShadow={receiveShadow}
            />
          ))}

          {/* Added guide lines for center */}
          <Box
            args={[0.05, SHUTTER_CONFIG.panel.height, 0.05]} // Thin vertical lines
            position={[panelCenter - 0.05, 0, 0]} // Position left line
            material={material}
            castShadow={castShadow}
            receiveShadow={receiveShadow}
          />
          <Box
            args={[0.05, SHUTTER_CONFIG.panel.height, 0.05]} // Thin vertical lines
            position={[panelCenter + 0.05, 0, 0]} // Position right line
            material={material}
            castShadow={castShadow}
            receiveShadow={receiveShadow}
          />
        </group>
      </group>
    </group>
  );
};

interface ShutterModelProps {
  type: keyof typeof MATERIAL_CONFIGS;
  panelOpenAngle: number;  // 0 to 120 degrees
  slatAngle: number;      // 0 to 90 degrees
}

const ShutterModel: React.FC<ShutterModelProps> = ({ type, panelOpenAngle, slatAngle }) => {
  const groupRef = useRef<THREE.Group>(null);

  const shutterMaterial = new THREE.MeshStandardMaterial({
    ...MATERIAL_CONFIGS[type],
    envMapIntensity: 1,
    shadowSide: THREE.FrontSide
  });

  const windowMaterial = new THREE.MeshStandardMaterial({
    color: '#e5e7eb',
    transparent: true,
    opacity: 0.1,
    roughness: 0.1,
    metalness: 0.1,
    envMapIntensity: 0.2,
    side: THREE.DoubleSide
  });

  const panelRotation = (Math.min(120, Math.max(0, panelOpenAngle)) * Math.PI) / 180;
  const slatRotation = (Math.min(90, Math.max(0, slatAngle)) * Math.PI) / 180;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  // Panel positions adjusted to fully close the gap and almost overlap in the center
  const leftPanelPosition: [number, number, number] = [
    -(SHUTTER_CONFIG.panel.width / 2 + SHUTTER_CONFIG.panel.frameThickness / 2) + 0.02, // Slight adjustment to close the gap
    0, 
    0
  ];

  const rightPanelPosition: [number, number, number] = [
    SHUTTER_CONFIG.panel.width / 2 + SHUTTER_CONFIG.panel.frameThickness / 2 - 0.02, // Slight adjustment to close the gap
    0, 
    0
  ];

  return (
    <group ref={groupRef}>
      <Box
        args={[
          SHUTTER_CONFIG.frame.width - SHUTTER_CONFIG.frame.thickness * 2,
          SHUTTER_CONFIG.frame.height - SHUTTER_CONFIG.frame.thickness * 2,
          0.1
        ]}
        position={[0, 0, -0.2]}
        material={windowMaterial}
        receiveShadow
      />

      <group>
        <Box
          args={[SHUTTER_CONFIG.frame.thickness, SHUTTER_CONFIG.frame.height, SHUTTER_CONFIG.frame.depth]}
          position={[-SHUTTER_CONFIG.frame.width / 2 + SHUTTER_CONFIG.frame.thickness / 2, 0, -0.1]}
          material={shutterMaterial}
          castShadow
          receiveShadow
        />
        <Box
          args={[SHUTTER_CONFIG.frame.thickness, SHUTTER_CONFIG.frame.height, SHUTTER_CONFIG.frame.depth]}
          position={[SHUTTER_CONFIG.frame.width / 2 - SHUTTER_CONFIG.frame.thickness / 2, 0, -0.1]}
          material={shutterMaterial}
          castShadow
          receiveShadow
        />
        <Box
          args={[SHUTTER_CONFIG.frame.width, SHUTTER_CONFIG.frame.thickness, SHUTTER_CONFIG.frame.depth]}
          position={[0, SHUTTER_CONFIG.frame.height / 2 - SHUTTER_CONFIG.frame.thickness / 2, -0.1]}
          material={shutterMaterial}
          castShadow
          receiveShadow
        />
        <Box
          args={[SHUTTER_CONFIG.frame.width, SHUTTER_CONFIG.frame.thickness, SHUTTER_CONFIG.frame.depth]}
          position={[0, -SHUTTER_CONFIG.frame.height / 2 + SHUTTER_CONFIG.frame.thickness / 2, -0.1]}
          material={shutterMaterial}
          castShadow
          receiveShadow
        />
      </group>

      <ShutterPanel
        position={leftPanelPosition}
        rotation={-panelRotation}
        slatAngle={slatRotation}
        material={shutterMaterial}
        isLeft={true}
        castShadow
        receiveShadow
      />

      <ShutterPanel
        position={rightPanelPosition}
        rotation={panelRotation}
        slatAngle={slatRotation}
        material={shutterMaterial}
        isLeft={false}
        castShadow
        receiveShadow
      />
    </group>
  );
};

export default ShutterModel;
