import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090b, 0.06);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.5, 7.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xf1ede7, transparent: true, opacity: 0.88 })
    );
    moon.position.set(2.25, 2.15, -0.5);
    group.add(moon);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.4, 0.026, 12, 90),
      new THREE.MeshBasicMaterial({ color: 0xff5a36, transparent: true, opacity: 0.75 })
    );
    ring.rotation.x = Math.PI * 0.35;
    ring.position.set(2.25, 2.15, -0.38);
    group.add(ring);

    const stars = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.035, transparent: true, opacity: 0.8 })
    );
    const starPositions = [];
    for (let i = 0; i < 340; i++) {
      starPositions.push((Math.random() - 0.5) * 14, Math.random() * 7 - 0.6, -2 - Math.random() * 7);
    }
    stars.geometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    scene.add(stars);

    const mountainMaterial = new THREE.MeshStandardMaterial({
      color: 0x171a1f,
      roughness: 1,
      metalness: 0.05,
      flatShading: true
    });

    const createMountain = (x, z, s, h, seed) => {
      const geometry = new THREE.ConeGeometry(s, h, 9, 3, true);
      const mountain = new THREE.Mesh(geometry, mountainMaterial);
      mountain.position.set(x, h * 0.18, z);
      mountain.rotation.y = seed;
      return mountain;
    };

    group.add(
      createMountain(-3.6, 0.4, 2.8, 3.0, 0.2),
      createMountain(-1.7, 0.1, 2.2, 2.35, 1.1),
      createMountain(0.2, 0.35, 2.9, 3.25, 2.2),
      createMountain(2.9, 0.75, 2.7, 2.9, 0.7)
    );

    const light = new THREE.DirectionalLight(0xffffff, 1.7);
    light.position.set(4, 8, 7);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.32));

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 18, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x090a0c, transparent: true, opacity: 0.96 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.6;
    scene.add(ground);

    const grid = new THREE.GridHelper(18, 26, 0x282b31, 0x17191d);
    grid.position.y = -0.58;
    grid.material.transparent = true;
    grid.material.opacity = 0.4;
    scene.add(grid);

    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.7;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.35;
    };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', resize);

    const animate = (t) => {
      group.rotation.y += (pointerX * 0.3 - group.rotation.y) * 0.012;
      group.rotation.x += (pointerY * 0.05 - group.rotation.x) * 0.012;
      ring.rotation.z = t * 0.00018;
      stars.rotation.y = t * 0.00001;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="scene3d" ref={mountRef} aria-hidden="true" />;
}
