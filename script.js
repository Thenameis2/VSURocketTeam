// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('earth-container').appendChild(renderer.domElement);

// Create the Earth sphere
const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
const earthTexture = new THREE.TextureLoader().load('earth.png'); // Replace with actual texture
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Create the Rocket
const rocketGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
const rocketTexture = new THREE.TextureLoader().load('rocket.png'); // Replace with actual image
const rocketMaterial = new THREE.MeshBasicMaterial({ map: rocketTexture });
const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
rocket.position.set(0, 6, 0); // Position the rocket slightly above Earth's surface
scene.add(rocket);

// Set up camera position
camera.position.z = 15;

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.005;

  // Move the rocket in a looping pattern
  const loopRadius = 5; // Adjust the radius of the loop
  const loopSpeed = 0.5; // Adjust the speed of the loop
  const loopHeight = 2; // Adjust the height of the loop
  const currentTime = Date.now() * 0.001;
  rocket.position.x = loopRadius * Math.sin(loopSpeed * currentTime);
  rocket.position.y = loopHeight * Math.sin(2 * loopSpeed * currentTime) + 6; // Keep the rocket above Earth's surface
  rocket.position.z = loopRadius * Math.cos(loopSpeed * currentTime);

  renderer.render(scene, camera);
};

animate();

const tabButtons = document.querySelectorAll('.tab-button');
const pageContents = document.querySelectorAll('.page-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to the clicked button
    button.classList.add('active');

    // Get the target content section based on data-target attribute
    const target = button.getAttribute('data-target');

    // Show the target content and hide other content sections
    pageContents.forEach(content => {
      if (content.id === target) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  });
});

