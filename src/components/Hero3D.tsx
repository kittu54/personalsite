"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const MORPH_DURATION = 3.0;
const SETTLE_DURATION = 1.8;

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function sampleKnotCurve(n: number) {
  const pts: THREE.Vector3[] = [];
  const p = 2,
    q = 3,
    R = 1,
    r = 0.35;
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const phi = t * Math.PI * 2 * p;
    pts.push(
      new THREE.Vector3(
        (R + r * Math.cos((q * phi) / p)) * Math.cos(phi),
        (R + r * Math.cos((q * phi) / p)) * Math.sin(phi),
        r * Math.sin((q * phi) / p)
      )
    );
  }
  return pts;
}

function sampleRodCurve(n: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const a = t * Math.PI * 2;
    pts.push(
      new THREE.Vector3(
        Math.sin(a * 2) * 0.08,
        Math.cos(a) * 3.2,
        Math.sin(a) * 0.06
      )
    );
  }
  return pts;
}

const THEME_CONFIG = {
  dark: {
    materialColor: "#908474",
    settledOpacity: 0.45,
    ambientIntensity: 0.35,
    dirLight1: { color: "#e0d8ce", intensity: 1 },
    dirLight2: { color: "#b0a898", intensity: 0.5 },
    pointLight: { color: "#d0c8bc", intensity: 0.4 },
    particleColor: "#555560",
  },
  light: {
    materialColor: "#6a5a4a",
    settledOpacity: 0.55,
    ambientIntensity: 0.6,
    dirLight1: { color: "#c8c0b4", intensity: 1.2 },
    dirLight2: { color: "#a8a090", intensity: 0.6 },
    pointLight: { color: "#b8b0a0", intensity: 0.5 },
    particleColor: "#8a8a90",
  },
};

function KineticSculpture({
  mouse,
  skipIntro,
  onIntroComplete,
  isMobile,
  themeConfig,
}: {
  mouse: { x: number; y: number };
  skipIntro: boolean;
  onIntroComplete: () => void;
  isMobile: boolean;
  themeConfig: (typeof THEME_CONFIG)["dark"];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const target = useMemo(() => ({ rotX: 0, rotY: 0 }), []);
  const intro = useRef({ morphDone: skipIntro, signaled: skipIntro });
  const onCompleteRef = useRef(onIntroComplete);
  onCompleteRef.current = onIntroComplete;

  const { rodPos, knotPos, geometry } = useMemo(() => {
    const segments = isMobile ? 80 : 160;
    const radial = isMobile ? 12 : 20;
    const tube = 0.28;

    const curvePts = isMobile ? 128 : 256;
    const knotCurve = new THREE.CatmullRomCurve3(
      sampleKnotCurve(curvePts),
      true
    );
    const rodCurve = new THREE.CatmullRomCurve3(
      sampleRodCurve(curvePts),
      true
    );

    const knotGeo = new THREE.TubeGeometry(
      knotCurve,
      segments,
      tube,
      radial,
      true
    );
    const rodGeo = new THREE.TubeGeometry(
      rodCurve,
      segments,
      tube,
      radial,
      true
    );

    const kp = new Float32Array(knotGeo.attributes.position.array);
    const rp = new Float32Array(rodGeo.attributes.position.array);

    if (!skipIntro) {
      const posArr = knotGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < posArr.length; i++) posArr[i] = rp[i];
      knotGeo.attributes.position.needsUpdate = true;
    }

    rodGeo.dispose();

    return { rodPos: rp, knotPos: kp, geometry: knotGeo };
  }, [skipIntro, isMobile]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const mat = mesh.material as unknown as Record<string, number>;
    const t = state.clock.getElapsedTime();

    const morphRaw = skipIntro ? 1 : Math.min(t / MORPH_DURATION, 1);
    const morphP = easeInOutCubic(morphRaw);

    const settleRaw = skipIntro
      ? 1
      : Math.min(Math.max((t - MORPH_DURATION) / SETTLE_DURATION, 0), 1);
    const settleP = easeOutQuart(settleRaw);

    if (!skipIntro && morphRaw < 1) {
      const posAttr = geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      const len = arr.length;
      for (let i = 0; i < len; i++) {
        arr[i] = rodPos[i] + (knotPos[i] - rodPos[i]) * morphP;
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();
    } else if (!skipIntro && !intro.current.morphDone) {
      const posAttr = geometry.attributes.position;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < arr.length; i++) arr[i] = knotPos[i];
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();
      intro.current.morphDone = true;
    }

    if (intro.current.morphDone && !intro.current.signaled) {
      intro.current.signaled = true;
      onCompleteRef.current();
    }

    const scl = THREE.MathUtils.lerp(2.4, 2.0, settleP);
    const opa = THREE.MathUtils.lerp(0.95, themeConfig.settledOpacity, settleP);
    const metal = THREE.MathUtils.lerp(0.95, 0.8, settleP);
    const rough = THREE.MathUtils.lerp(0.08, 0.3, settleP);

    mat.opacity = opa;
    mat.metalness = metal;
    mat.roughness = rough;
    mesh.scale.setScalar(scl);

    if (!isMobile) {
      target.rotX = THREE.MathUtils.lerp(target.rotX, mouse.y * 0.3, 0.02);
      target.rotY = THREE.MathUtils.lerp(target.rotY, mouse.x * 0.3, 0.02);
    }

    const introRotBoost = skipIntro ? 1 : 1 + (1 - morphP) * 2;
    mesh.rotation.x = target.rotX + Math.sin(t * 0.25) * 0.1;
    mesh.rotation.y = target.rotY + t * 0.05 * introRotBoost;
    mesh.rotation.z = Math.sin(t * 0.18) * 0.05;
  });

  return (
    <Float
      speed={skipIntro ? 1.2 : 0.3}
      rotationIntensity={0.1}
      floatIntensity={skipIntro ? 0.35 : 0.1}
    >
      <mesh ref={meshRef} geometry={geometry} scale={skipIntro ? 2.0 : 2.4}>
        <meshStandardMaterial
          color={themeConfig.materialColor}
          roughness={skipIntro ? 0.3 : 0.08}
          metalness={skipIntro ? 0.8 : 0.95}
          transparent
          opacity={skipIntro ? themeConfig.settledOpacity : 0.95}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

function AmbientParticles({
  visible,
  count,
  color,
}: {
  visible: boolean;
  count: number;
  color: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const opRef = useRef(0);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    opRef.current = THREE.MathUtils.lerp(
      opRef.current,
      visible ? 0.4 : 0,
      0.02
    );
    (ref.current.material as THREE.PointsMaterial).opacity = opRef.current;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color={color}
        transparent
        opacity={0}
        sizeAttenuation
      />
    </points>
  );
}

interface Hero3DProps {
  mouse: { x: number; y: number };
  skipIntro: boolean;
  onIntroComplete: () => void;
}

export default function Hero3D({
  mouse,
  skipIntro,
  onIntroComplete,
}: Hero3DProps) {
  const onCompleteRef = useRef(onIntroComplete);
  onCompleteRef.current = onIntroComplete;
  const stableCallback = useCallback(() => onCompleteRef.current(), []);

  const [particlesOn, setParticlesOn] = useState(skipIntro);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const readTheme = () => {
      const attr = document.documentElement.getAttribute("data-theme");
      setCurrentTheme(attr === "light" ? "light" : "dark");
    };
    readTheme();

    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const config = THEME_CONFIG[currentTheme];

  useEffect(() => {
    setIsMobile(
      "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768
    );
  }, []);

  useEffect(() => {
    if (skipIntro) return;
    const t = setTimeout(() => setParticlesOn(true), MORPH_DURATION * 900);
    return () => clearTimeout(t);
  }, [skipIntro]);

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={config.ambientIntensity} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={config.dirLight1.intensity}
          color={config.dirLight1.color}
        />
        <directionalLight
          position={[-4, -2, 3]}
          intensity={config.dirLight2.intensity}
          color={config.dirLight2.color}
        />
        {!isMobile && (
          <pointLight
            position={[2, -1, 4]}
            intensity={config.pointLight.intensity}
            color={config.pointLight.color}
          />
        )}
        <KineticSculpture
          mouse={mouse}
          skipIntro={skipIntro}
          onIntroComplete={stableCallback}
          isMobile={isMobile}
          themeConfig={config}
        />
        <AmbientParticles
          visible={particlesOn}
          count={isMobile ? 15 : 40}
          color={config.particleColor}
        />
      </Canvas>
    </div>
  );
}
