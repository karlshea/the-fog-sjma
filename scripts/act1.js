// Fog Act 1

// Import required source code
// Import three.js core
import * as THREE from "../build/three.module.js";

// Import add-ons for glTF models, orbit controls, and font loader
import { OrbitControls } from "../src/OrbitControls.js";
import { FontLoader } from "../src/FontLoader.js";
import { AsciiEffect } from "../src/AsciiEffect.js";

let container,
  scene,
  camera,
  effect,
  renderer,
  material,
  material2,
  mesh,
  mesh2,
  message,
  message2,
  message3,
  shapes,
  shapes2,
  shapes3,
  mixer,
  text,
  text2,
  text3,
  controls,
  clock,
  color,
  geometry,
  geometry2,
  geometry3,
  xMid,
  xMid2,
  xMid3,
  matDark;

let start = Date.now();
let ticker = 0;
let loader3 = new FontLoader();

let fogTexts = [
  "In summer, fog", 
  "increases the dangers", 
  "to shipping.",
  "The fog had now",
   "buried all heaven.",
   " ",
  "The fog was peopled", 
  "with phantoms.",
  " ",
  "His head swam;", 
  "the fog and smoke", 
  "stupefied him.",
  "Mists and fogs militate", 
  "against observation", 
  "by aircraft...",
  "...especially as we",
  "were compassed round", 
  "by a very thick fog.",
  "Come in, or the fog", 
  "will get into the house.",
  " "
];


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

  //ascii effects
  effect = new AsciiEffect(renderer, " .,:;|-=#", {
    scale: 0.82,
    resolution: 0.4,
    block: true,
    invert: true,
  });
  //effect.setSize(window.innerWidth * .9, window.innerHeight * .9);
  effect.setSize(window.innerWidth, window.innerHeight * 1.25);
  effect.domElement.style.color = "white";
  effect.domElement.style.backgroundColor = "black";

  // Special case: append effect.domElement, instead of renderer.domElement.
  // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

  document.body.appendChild(effect.domElement);

  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  instructions.addEventListener("click", function () {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });

  window.addEventListener("keyup", onKeyUp);

  //Moving Materials
  material = new THREE.ShaderMaterial({
    uniforms: {
      tExplosion: {
        type: "t",
        value: THREE.ImageUtils.loadTexture("../../assets/fog6.png"),
      },
      time: {
        // float initialized to 0
        type: "f",
        value: 0.0,
      },
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    side: THREE.DoubleSide,
  });

  material2 = new THREE.ShaderMaterial({
    uniforms: {
      tExplosion: {
        type: "t",
        value: THREE.ImageUtils.loadTexture("../../assets/fog6id.png"),
      },
      time: {
        // float initialized to 0
        type: "f",
        value: 10.0,
      },
    },
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    side: THREE.DoubleSide,
  });

  //Objects
  mesh2 = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 50), material);
  mesh2.position.set(0, 2, 0);
  mesh2.rotation.set(0, 0, 0);
  mesh2.scale.set(0.45, 0.25, 0.35);
  scene.add(mesh2);

  mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(40, 80), material2);
  mesh.position.set(0, 0, 0);
  mesh.scale.set(1.25, 1.25, 1.25);
  scene.add(mesh);

  // Add Orbit Controls
  controls = new OrbitControls(camera, effect.domElement);
  controls.minDistance = 3;
  controls.maxDistance = 40;
  controls.target.set(0, 0, -0.2);

  // Position our camera so we can see the shape
  camera.position.set(0, 40, 10);

  // Add a directional light to the scene
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  scene.add(directionalLight);

  // Add an ambient light to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  // Add Text under models
  loader3.load(
    "../../assets/helvetiker_regular.typeface.json",
    function (font) {
      // Define font color
      color = 0xdfdfdf;
      // Define font material
      matDark = new THREE.LineBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
      });
      // Generate and place left side text
      message = "The fog had now";
      shapes = font.generateShapes(message, 1.75);
      geometry = new THREE.ShapeGeometry(shapes);
      geometry.computeBoundingBox();
      xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);
      text = new THREE.Mesh(geometry, matDark);
      text.position.set(0, -5.5, 0);
      //scene.add(text);

      // Generate and place right side text
      message2 = "buried all heaven.";
      shapes2 = font.generateShapes(message2, 1.75);
      geometry2 = new THREE.ShapeGeometry(shapes2);
      geometry2.computeBoundingBox();
      xMid2 = -0.5 * (geometry2.boundingBox.max.x - geometry2.boundingBox.min.x);
      geometry2.translate(xMid2, 0, 0);
      text2 = new THREE.Mesh(geometry2, matDark);
      text2.position.set(0, -8, 0);
      //scene.add(text2);

      // Generate and place right side text
      message3 = "buried all heaven.";
      shapes3 = font.generateShapes(message3, 1.75);
      geometry3 = new THREE.ShapeGeometry(shapes3);
      geometry3.computeBoundingBox();
      xMid3 = -0.5 * (geometry3.boundingBox.max.x - geometry3.boundingBox.min.x);
      geometry3.translate(xMid3, 0, 0);
      text3 = new THREE.Mesh(geometry3, matDark);
      text3.position.set(0, -8, 0);
      //scene.add(text2);
    }
  );
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
  material.uniforms["time"].value = 0.00025 * (Date.now() - start);
  material2.uniforms["time"].value = 0.00025 * (Date.now() - start);
  textAnimation1();
  effect.render(scene, camera);
}

//Manual Looping animation for mesh2
function textAnimation1() {

  if (ticker == 0) {
     if (text.position.z > 1) {
       text.position.z -= 0.005;
       text2.position.z -= 0.005;
       text3.position.z -= 0.005;
     } else if (text.position.z <= 1){
      text.geometry.dispose();
      text.material.dispose();
      scene.remove( text );
      text2.geometry.dispose();
      text2.material.dispose();
      scene.remove( text2 );
      text3.geometry.dispose();
      text3.material.dispose();
      scene.remove( text3 );
       let newText = Math.floor(Math.random() * (fogTexts.length/3));
       console.log(fogTexts[newText*3]+"\n"+fogTexts[(newText*3)+1]+"\n"+fogTexts[(newText*3)+2]);
       loader3.load('../../assets/helvetiker_regular.typeface.json', function(font) {
         // Define font color
         //color = 0xdfdfdf;
         color = 0x757575;
         // Define font material
         matDark = new THREE.LineBasicMaterial({
           color: color,
           side: THREE.DoubleSide
         });
         //line 1
         message = fogTexts[newText*3];
         shapes = font.generateShapes(message, 1.25);
         geometry = new THREE.ShapeGeometry(shapes);
         geometry.computeBoundingBox();
         xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
         geometry.translate(xMid, 0, 0);
         text = new THREE.Mesh(geometry, matDark);
         text.position.set(0, 1.75, 1);
         //text.rotation.set(-1.5708, 0 , 0);
         scene.add(text);
         //line 2
         message2 = fogTexts[(newText*3)+1];
         shapes2 = font.generateShapes(message2, 1.25);
         geometry2 = new THREE.ShapeGeometry(shapes2);
         geometry2.computeBoundingBox();
         xMid2 = -0.5 * (geometry2.boundingBox.max.x - geometry2.boundingBox.min.x);
         geometry2.translate(xMid2, 0, 0);
         text2 = new THREE.Mesh(geometry2, matDark);
         text2.position.set(0, 0, 1);
         scene.add(text2);
         //line 3
         message3 = fogTexts[(newText*3)+2];
         shapes3 = font.generateShapes(message3, 1.25);
         geometry3 = new THREE.ShapeGeometry(shapes3);
         geometry3.computeBoundingBox();
         xMid3 = -0.5 * (geometry3.boundingBox.max.x - geometry3.boundingBox.min.x);
         geometry3.translate(xMid3, 0, 0);
         text3 = new THREE.Mesh(geometry3, matDark);
         text3.position.set(0, -1.75, 1);
         scene.add(text3);
       });
       ticker = 1;
     }
   }
   if (ticker == 1) {
     if (text.position.z < 12) {
       text.position.z += 0.005;
       text2.position.z += 0.005;
       text3.position.z += 0.005;
     } else if (text.position.z > 12) {
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
  effect.setSize(window.innerWidth, window.innerHeight * 1.25);
  render();
}

function onKeyUp(event) {
  if (event.keyCode === 27) {
    instructions.style.display = "";
    blocker.style.display = "";
  }
}
