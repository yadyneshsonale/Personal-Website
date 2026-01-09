import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'

interface DitherProps {
  waveColor?: [number, number, number]
  disableAnimation?: boolean
  enableMouseInteraction?: boolean
  mouseRadius?: number
  colorNum?: number
  waveAmplitude?: number
  waveFrequency?: number
  waveSpeed?: number
}

function WavePlane({
  waveColor = [0.5, 0.5, 0.5],
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
  colorNum = 4,
  waveAmplitude = 0.3,
  waveFrequency = 3,
  waveSpeed = 0.05,
}: DitherProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport, pointer } = useThree()
  const timeRef = useRef(0)

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseRadius;
    uniform float uWaveAmplitude;
    uniform float uWaveFrequency;
    uniform bool uEnableMouseInteraction;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float wave = sin(pos.x * uWaveFrequency + uTime) * cos(pos.y * uWaveFrequency + uTime) * uWaveAmplitude;
      
      if (uEnableMouseInteraction) {
        vec2 mousePos = uMouse * 5.0;
        float dist = distance(pos.xy, mousePos);
        float influence = smoothstep(uMouseRadius, 0.0, dist);
        wave += influence * 0.5;
      }
      
      pos.z += wave;
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform vec3 uWaveColor;
    uniform float uTime;
    uniform float uColorNum;

    float dither4x4(vec2 position, float brightness) {
      int x = int(mod(position.x, 4.0));
      int y = int(mod(position.y, 4.0));
      int index = x + y * 4;
      float limit = 0.0;

      if (index == 0) limit = 0.0625;
      if (index == 1) limit = 0.5625;
      if (index == 2) limit = 0.1875;
      if (index == 3) limit = 0.6875;
      if (index == 4) limit = 0.8125;
      if (index == 5) limit = 0.3125;
      if (index == 6) limit = 0.9375;
      if (index == 7) limit = 0.4375;
      if (index == 8) limit = 0.25;
      if (index == 9) limit = 0.75;
      if (index == 10) limit = 0.125;
      if (index == 11) limit = 0.625;
      if (index == 12) limit = 1.0;
      if (index == 13) limit = 0.5;
      if (index == 14) limit = 0.875;
      if (index == 15) limit = 0.375;

      return brightness < limit ? 0.0 : 1.0;
    }

    void main() {
      vec3 color = uWaveColor;
      
      float brightness = (vPosition.z + 1.0) * 0.5;
      brightness += sin(vUv.x * 20.0 + uTime) * 0.1;
      brightness += cos(vUv.y * 20.0 + uTime) * 0.1;
      
      float dithered = dither4x4(gl_FragCoord.xy, brightness);
      float quantized = floor(brightness * uColorNum) / uColorNum;
      
      color *= mix(quantized, dithered, 0.5);
      
      gl_FragColor = vec4(color, 0.3);
    }
  `

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseRadius: { value: mouseRadius },
      uWaveColor: { value: new THREE.Color(...waveColor) },
      uColorNum: { value: colorNum ?? 4 },
      uWaveAmplitude: { value: waveAmplitude },
      uWaveFrequency: { value: waveFrequency },
      uEnableMouseInteraction: { value: enableMouseInteraction },
    }),
    [waveColor, colorNum, mouseRadius, waveAmplitude, waveFrequency, enableMouseInteraction]
  )

  useFrame((state, delta) => {
    if (!meshRef.current) return

    if (!disableAnimation) {
      timeRef.current += delta * waveSpeed
      // @ts-ignore
      meshRef.current.material.uniforms.uTime.value = timeRef.current
    }

    if (enableMouseInteraction) {
      // @ts-ignore
      meshRef.current.material.uniforms.uMouse.value.set(pointer.x, pointer.y)
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, 128, 128]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function Dither(props: DitherProps) {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      zIndex: 0,
      background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 50%, #0f1419 100%)'
    }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <WavePlane {...props} />
      </Canvas>
    </div>
  )
}
