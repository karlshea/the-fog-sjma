// Art 109 Three.js Demo Site
// client6.js
// A three.js scene which loads a static and animated model.

// The pink model is static (contains no animation data in the file)
// It is animated manually in Three.js

// The green model is preanimated (contains animation data created in blender)
// 3D model is from Blender default

// Implements Orbit controls and font loader

// Import required source code
// Import three.js core
import * as THREE from "../build/three.module.js";

// Import add-ons for glTF models, orbit controls, and font loader
import {
  OrbitControls
} from "../src/OrbitControls.js";
import {
  GLTFLoader
} from "../src/GLTFLoader.js";
import {
  FontLoader
} from "../src/FontLoader.js"

var container, scene, camera, renderer, mesh, mesh2, mesh3, mixer, controls, clock, text, message, shapes, geometry, xMid, matDark, color, loader3, font;

let ticker = 0;

let fogTexts = [
  "In summer, fog increases the dangers to shipping.",
  "The fog had now buried all heaven.",
  "The fog was peopled with phantoms.",
  "His head swam; the fog and smoke stupefied him.",
  "Mists and fogs militate against observation by aircraft...",
  "Our situation was somewhat dangerous, especially as we were compassed round by a very thick fog.",
  "Come in, or the fog will get into the house."
];

let material, material2;

let start = Date.now();

// Call init and animate functions (defined below)
init();
animate();

function init() {

  //Identify div in HTML to place scene
  container = document.getElementById("space");

  //Crate clock for animation
  clock = new THREE.Clock();

  //Create scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  // Add scene to gltf.html
  container.appendChild(renderer.domElement);

  // Material to be added to preanimated model
  var newMaterial = new THREE.MeshStandardMaterial({
    color: 0x2E5939
  });

  var newMaterial2 = new THREE.MeshStandardMaterial({
    color: 0xdfdfdf,
    wireframe: true
  });

  newMaterial = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });

  material = new THREE.ShaderMaterial({

    uniforms: {
       tExplosion: {
         type: "t",
         value: THREE.ImageUtils.loadTexture('../../assets/fog4.png')
       },
      time: { // float initialized to 0
        type: "f",
        value: 0.0
      }
    },
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent

  });

  mesh2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(20, 50),
    material
  );
  mesh2.position.set(0, 2, 0);
  mesh2.rotation.set(0, 0, 0);
  mesh2.scale.set(.75, .75, .25);
  scene.add(mesh2);

  // Add Orbit Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 3;
  controls.maxDistance = 55;
  controls.target.set(0, 0, -0.2);

  // Position our camera so we can see the shape
  camera.position.z = 20;

  // Add a directional light to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  scene.add(directionalLight);

  // Add an ambient light to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  // Add Text under models
  loader3 = new FontLoader();
  loader3.load('../../assets/helvetiker_regular.typeface.json', function(font) {
    // Define font color
    color = 0x50000000;
    // Define font material
    matDark = new THREE.LineBasicMaterial({
      color: color,
      side: THREE.DoubleSide
    });
    // Generate and place left side text
    message = "In summer, fog increases the dangers to shipping.";
    shapes = font.generateShapes(message, .5);
    geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    text = new THREE.Mesh(geometry, matDark);
    text.position.set(0, 0, 8.5);
    scene.add(text);
  });
}

// Define animate loop
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  var delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  render();
}

// Define the render loop
function render() {
  material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
  manualAnimation();
  renderer.render(scene, camera);

}

//Manual Looping animation for mesh2
function manualAnimation() {

  if (ticker == 0) {
     if (text.position.z > 4) {
       text.position.z -= 0.0025;
     } else if (text.position.z <= 4){
       let newText = Math.floor(Math.random() * fogTexts.length);
       console.log(newText);
       loader3.load('../../assets/helvetiker_regular.typeface.json', function(font) {
         // Define font color
         color = 0x50000000;
         // Define font material
         matDark = new THREE.LineBasicMaterial({
           color: color,
           side: THREE.DoubleSide
         });
         message = fogTexts[newText];
         shapes = font.generateShapes(message, .5);
         geometry = new THREE.ShapeGeometry(shapes);
         geometry.computeBoundingBox();
         xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
         geometry.translate(xMid, 0, 0);
         text = new THREE.Mesh(geometry, matDark);
         text.position.set(0, 0, 4);
         scene.add(text);
       });
       ticker = 1;
     }
   }
   if (ticker == 1) {
     if (text.position.z < 7.5) {
       text.position.z += 0.0025;
     } else if (text.position.z > 7.5) {
       ticker = 0;
     }
   }
}

// Respond to Window Resizing
window.addEventListener("resize", onWindowResize);

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  render();
}
