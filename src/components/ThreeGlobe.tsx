import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeGlobeProps {
  className?: string;
}

const ThreeGlobe: React.FC<ThreeGlobeProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const globeRef = useRef<THREE.Mesh>();
  const frameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // aspect ratio will be updated
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Globe geometry and material
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create a canvas for the texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create ocean base
    const gradient = ctx.createRadialGradient(512, 256, 0, 512, 256, 512);
    gradient.addColorStop(0, '#4A90E2');
    gradient.addColorStop(0.5, '#2E5BBA');
    gradient.addColorStop(1, '#1E3A8A');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);
    
    // Add continents (simplified shapes)
    ctx.fillStyle = '#22C55E';
    
    // North America - more accurate shape
    ctx.beginPath();
    ctx.moveTo(150, 120);
    ctx.quadraticCurveTo(120, 140, 130, 180);
    ctx.quadraticCurveTo(140, 220, 180, 240);
    ctx.quadraticCurveTo(220, 250, 280, 230);
    ctx.quadraticCurveTo(320, 200, 300, 160);
    ctx.quadraticCurveTo(280, 120, 240, 100);
    ctx.quadraticCurveTo(200, 90, 150, 120);
    ctx.fill();
    
    // Greenland
    ctx.beginPath();
    ctx.ellipse(320, 80, 25, 35, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // South America - distinctive shape
    ctx.beginPath();
    ctx.moveTo(220, 280);
    ctx.quadraticCurveTo(200, 300, 210, 340);
    ctx.quadraticCurveTo(220, 380, 240, 420);
    ctx.quadraticCurveTo(250, 450, 260, 480);
    ctx.quadraticCurveTo(280, 490, 300, 470);
    ctx.quadraticCurveTo(310, 440, 300, 400);
    ctx.quadraticCurveTo(290, 360, 280, 320);
    ctx.quadraticCurveTo(270, 290, 250, 280);
    ctx.quadraticCurveTo(235, 275, 220, 280);
    ctx.fill();
    
    // Europe
    ctx.beginPath();
    ctx.moveTo(480, 140);
    ctx.quadraticCurveTo(460, 150, 470, 170);
    ctx.quadraticCurveTo(480, 190, 500, 180);
    ctx.quadraticCurveTo(520, 170, 530, 150);
    ctx.quadraticCurveTo(520, 130, 500, 135);
    ctx.quadraticCurveTo(490, 130, 480, 140);
    ctx.fill();
    
    // Africa - distinctive shape
    ctx.beginPath();
    ctx.moveTo(480, 200);
    ctx.quadraticCurveTo(460, 220, 470, 260);
    ctx.quadraticCurveTo(480, 300, 490, 340);
    ctx.quadraticCurveTo(500, 380, 520, 420);
    ctx.quadraticCurveTo(540, 440, 560, 420);
    ctx.quadraticCurveTo(570, 380, 560, 340);
    ctx.quadraticCurveTo(550, 300, 540, 260);
    ctx.quadraticCurveTo(530, 220, 520, 200);
    ctx.quadraticCurveTo(500, 190, 480, 200);
    ctx.fill();
    
    // Asia - larger and more detailed
    ctx.beginPath();
    ctx.moveTo(580, 120);
    ctx.quadraticCurveTo(620, 100, 680, 110);
    ctx.quadraticCurveTo(740, 120, 800, 140);
    ctx.quadraticCurveTo(850, 160, 880, 200);
    ctx.quadraticCurveTo(870, 240, 840, 260);
    ctx.quadraticCurveTo(800, 280, 750, 270);
    ctx.quadraticCurveTo(700, 260, 650, 240);
    ctx.quadraticCurveTo(600, 220, 580, 180);
    ctx.quadraticCurveTo(570, 150, 580, 120);
    ctx.fill();
    
    // India subcontinent
    ctx.beginPath();
    ctx.moveTo(650, 240);
    ctx.quadraticCurveTo(640, 260, 650, 280);
    ctx.quadraticCurveTo(660, 300, 680, 310);
    ctx.quadraticCurveTo(700, 300, 690, 280);
    ctx.quadraticCurveTo(680, 260, 670, 240);
    ctx.quadraticCurveTo(660, 235, 650, 240);
    ctx.fill();
    
    // Australia - more accurate shape
    ctx.beginPath();
    ctx.moveTo(780, 340);
    ctx.quadraticCurveTo(760, 350, 770, 370);
    ctx.quadraticCurveTo(780, 380, 800, 375);
    ctx.quadraticCurveTo(820, 370, 830, 360);
    ctx.quadraticCurveTo(825, 345, 810, 340);
    ctx.quadraticCurveTo(795, 335, 780, 340);
    ctx.fill();
    
    // Japan
    ctx.beginPath();
    ctx.ellipse(820, 180, 8, 25, Math.PI/6, 0, 2 * Math.PI);
    ctx.fill();
    
    // UK and Ireland
    ctx.beginPath();
    ctx.ellipse(460, 130, 8, 15, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(445, 135, 4, 8, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add some islands and details
    ctx.fillStyle = '#16A34A';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const radius = Math.random() * 8 + 2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    // Create materials
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 30,
      transparent: true,
      opacity: 0.9
    });
    
    // Create globe mesh
    const globe = new THREE.Mesh(geometry, material);
    globe.castShadow = true;
    globe.receiveShadow = true;
    globeRef.current = globe;
    scene.add(globe);
    
    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.05, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x4A90E2,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffa500, 0.5, 100);
    pointLight.position.set(-5, 0, 2);
    scene.add(pointLight);
    
    // Add destination markers
    const markerGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const markerMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xff6b35 }),
      new THREE.MeshBasicMaterial({ color: 0xff3535 }),
      new THREE.MeshBasicMaterial({ color: 0xffff35 })
    ];
    
    // Add markers at various positions
    const markerPositions = [
      { lat: 28.6139, lon: 77.2090 }, // Delhi
      { lat: -13.1631, lon: -72.5450 }, // Machu Picchu
      { lat: 13.4125, lon: 103.8670 }, // Angkor Wat
    ];
    
    markerPositions.forEach((pos, index) => {
      const phi = (90 - pos.lat) * (Math.PI / 180);
      const theta = (pos.lon + 180) * (Math.PI / 180);
      
      const x = -(1.02 * Math.sin(phi) * Math.cos(theta));
      const z = (1.02 * Math.sin(phi) * Math.sin(theta));
      const y = (1.02 * Math.cos(phi));
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterials[index % markerMaterials.length]);
      marker.position.set(x, y, z);
      scene.add(marker);
    });
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Mouse and touch interaction
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      const clientX = event.clientX;
      const clientY = event.clientY;
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !globeRef.current) return;
      
      const clientX = event.clientX;
      const clientY = event.clientY;
      const deltaX = clientX - mouseRef.current.x;
      const deltaY = clientY - mouseRef.current.y;
      
      globeRef.current.rotation.y += deltaX * 0.01;
      globeRef.current.rotation.x += deltaY * 0.01;
      
      // Clamp X rotation to prevent flipping
      globeRef.current.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, globeRef.current.rotation.x));
      
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };
    
    // Touch interaction
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      if (event.touches.length === 1) {
        isDraggingRef.current = true;
        const touch = event.touches[0];
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
      }
    };
    
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      if (!isDraggingRef.current || !globeRef.current || event.touches.length !== 1) return;
      
      const touch = event.touches[0];
      const deltaX = touch.clientX - mouseRef.current.x;
      const deltaY = touch.clientY - mouseRef.current.y;
      
      globeRef.current.rotation.y += deltaX * 0.01;
      globeRef.current.rotation.x += deltaY * 0.01;
      
      // Clamp X rotation to prevent flipping
      globeRef.current.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, globeRef.current.rotation.x));
      
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;
    };
    
    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      isDraggingRef.current = false;
    };
    
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add touch event listeners
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    renderer.domElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    renderer.domElement.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (globeRef.current && !isDraggingRef.current) {
        // Gentle auto-rotation when not being dragged
        globeRef.current.rotation.y += 0.002;
      }
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const size = Math.min(mountRef.current.clientWidth, mountRef.current.clientHeight);
      rendererRef.current.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      renderer.domElement.removeEventListener('touchmove', handleTouchMove);
      renderer.domElement.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className={className}>
      <div 
        ref={mountRef} 
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{ minHeight: '300px' }}
      />
      <div className="text-center mt-4">
        <p className="text-orange-200 text-sm animate-pulse">
          <span className="hidden md:inline">Click and drag</span>
          <span className="md:hidden">Touch and drag</span>
          {" "}to rotate the 3D globe
        </p>
      </div>
    </div>
  );
};

export default ThreeGlobe;