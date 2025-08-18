'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import Navbar from '../components/Narbar';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modelsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene / camera / renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.35, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5, 5, 5);
    scene.add(dir);

    const pmremGen = new THREE.PMREMGenerator(renderer);
    pmremGen.compileEquirectangularShader();

    const exrLoader = new EXRLoader();
    let exrTexture: THREE.DataTexture | null = null;
    let envMap: THREE.Texture | null = null;

    const material = new THREE.MeshPhysicalMaterial({
      metalness: 1,
      roughness: 0.18,
      clearcoat: 0.7,
      clearcoatRoughness: 0.06,
    });

    exrLoader.load(
      '/env/forest.exr',
      (tex: THREE.DataTexture) => {
        exrTexture = tex;
        const pmrem = pmremGen.fromEquirectangular(tex);
        envMap = pmrem.texture;
        scene.environment = envMap;

        const shapes: THREE.BufferGeometry[] = [
          new THREE.CylinderGeometry(0.5, 0.5, 1.5, 64),
          new THREE.BoxGeometry(1.1, 1.1, 1.1),
          new THREE.SphereGeometry(0.75, 64, 64),
          new THREE.ConeGeometry(0.55, 1.3, 64),
        ];

        const meshes: THREE.Mesh[] = [];
        const copiesPerShape = 4;
        const laneWidth = 24;
        const spacing = laneWidth / (shapes.length * copiesPerShape);

        for (let g = 0; g < shapes.length; g++) {
          for (let i = 0; i < copiesPerShape; i++) {
            const m = new THREE.Mesh(shapes[g], material);
            m.position.x = -laneWidth / 2 + (g * copiesPerShape + i) * spacing;
            m.position.y = (Math.random() - 0.5) * 0.5;
            m.position.z = (Math.random() - 0.5) * 0.3;
            meshes.push(m);
            scene.add(m);
          }
        }
        modelsRef.current = meshes;
      },
      undefined,
      (err) => console.error('EXR load failed:', err)
    );

    let raf = 0;
    const speed = 0.06; 
    const bound = 12;

    const render = () => {
      raf = requestAnimationFrame(render);

      for (const m of modelsRef.current) {
        m.position.x += speed * 0.1;
        if (m.position.x > bound) m.position.x = -bound;
        m.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    render();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      for (const m of modelsRef.current) {
        scene.remove(m);
        m.geometry.dispose();
      }
      modelsRef.current.length = 0;
      material.dispose();
      if (envMap) envMap.dispose();
      if (exrTexture) exrTexture.dispose();
      pmremGen.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-white">  
      <Navbar />

      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mt-19 text-center px-5">
        <h1 className="text-4xl md:text-6xl font-medium leading-tight text-black">
          Precision <span className="italic font-serif  text-slate-500">CNC</span> Parts<br />
          Shipped as Fast as <br /> Tomorrow
        </h1>
      </div>

      <div className="relative z-10 mt-auto mb-6 flex flex-col items-center text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Upload Your CAD File
        </h2>
        <p className="text-gray-600 max-w-lg mb-5">
          we will take care of machining, finishing and shipping -- accurate parts delivered fast, no stress
        </p>

        <label className="cursor-pointer">
          <input type="file" accept=".step,.stp,.stl,.iges,.igs,.cad" className="hidden" />
          <span className="px-5 md:px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700">
            Upload Your Design
          </span>
        </label>

      </div>
    </section>
  );
}
