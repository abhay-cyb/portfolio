import * as THREE from 'three';

// Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Variables for performance based on device
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 400 : 1200;

// Particles Geometry
const particlesGeometry = new THREE.BufferGeometry();
const posArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++) {
    // Spread particles over a large volume
    posArray[i] = (Math.random() - 0.5) * (Math.random() * 100);
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.08 : 0.05,
    color: 0x8B5CF6, // Purple
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse Interaction Variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Adjust density based on new width (simple approach)
    if(window.innerWidth < 768 && particlesMaterial.size !== 0.08) {
        particlesMaterial.size = 0.08;
    } else if (window.innerWidth >= 768 && particlesMaterial.size !== 0.05) {
        particlesMaterial.size = 0.05;
    }
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();

    // Gentle automatic rotation
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Mouse parallax effect
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    // Add subtle waving effect to particles
    const positions = particlesMesh.geometry.attributes.position.array;
    for(let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = particlesMesh.geometry.attributes.position.array[i3];
        // positions[i3 + 1] += Math.sin(elapsedTime + x) * 0.002;
    }
    particlesMesh.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();
