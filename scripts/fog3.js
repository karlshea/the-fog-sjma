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

let container, scene, camera, renderer, mesh, mesh2, mesh3, mixer, controls, clock;

let ticker = 0;

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

  // Load preanimated model, add material, and add it to the scene
  // const loader = new GLTFLoader().load(
  //   "../../assets/blend_def_ani.glb",
  //   function(gltf) {
  //     gltf.scene.traverse(function(child) {
  //       if (child.isMesh) {
  //         child.material = newMaterial;
  //       }
  //     });
  //     // set position and scale
  //     mesh = gltf.scene;
  //     mesh.position.set(4, 0, 0);
  //     mesh.rotation.set(0, 0, 0);
  //     mesh.scale.set(1, 1, 1);
  //     // Add model to scene
  //     scene.add(mesh);
  //     //Check for and play animation frames
  //     mixer = new THREE.AnimationMixer(mesh);
  //     gltf.animations.forEach((clip) => {
  //       mixer.clipAction(clip).play();
  //     });
  //
  //   },
  //   undefined,
  //   function(error) {
  //     console.error(error);
  //   }
  // );

  // Material to be added to static model
  // var newMaterial2 = new THREE.MeshStandardMaterial({
  //   color: 0xdfdfdf
  // });
  //
  // // Load static model, add material, and add it to the scene
  // const loader2 = new GLTFLoader().load(
  //   "../../assets/blend_def.glb",
  //   function(gltf) {
  //     // Scan loaded model for mesh and apply defined material if mesh is present
  //     gltf.scene.traverse(function(child) {
  //       if (child.isMesh) {
  //         child.material = material;
  //       }
  //     });
  //     // set position and scale
  //     mesh = gltf.scene;
  //     mesh.position.set(4, 0, 0);
  //     mesh.rotation.set(0, 0, 0);
  //     mesh.scale.set(1, 1, 1);
  //     // Add model to scene
  //     scene.add(mesh);
  //
  //   },
  //   undefined,
  //   function(error) {
  //     console.error(error);
  //   }
  // );

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
  const loader3 = new FontLoader();
  loader3.load('../../assets/helvetiker_regular.typeface.json', function(font) {
    // Define font color
    const color = 0x50000000;
    // Define font material
    const matDark = new THREE.LineBasicMaterial({
      color: color,
      side: THREE.DoubleSide
    });
    // Generate and place left side text
    const message = "In summer, fog increases the dangers to shipping.";
    const shapes = font.generateShapes(message, .5);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    const text = new THREE.Mesh(geometry, matDark);
    text.position.set(0, 0, 6.5);
    scene.add(text);

    // Generate and place right side text
    // const message2 = "Preanimated Model";
    // const shapes2 = font.generateShapes( message2, .5 );
    // const geometry2 = new THREE.ShapeGeometry( shapes2 );
    // geometry2.computeBoundingBox();
    // const xMid2 = - 0.5 * ( geometry2.boundingBox.max.x - geometry2.boundingBox.min.x );
    // geometry2.translate( xMid2, 0, 0 );
    // const text2 = new THREE.Mesh( geometry2, matDark );
    // text2.position.set(4, -4 , 0);
    // scene.add( text2 );
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
  renderer.render(scene, camera);
  manualAnimation();
}

//Manual Looping animation for mesh2
function manualAnimation() {
  // if (ticker == 0) {
  //   if (mesh2.scale.x < 2) {
  //     mesh2.scale.x += 0.00341;
  //   }
  //   if (mesh2.scale.x >= 2 && mesh2.scale.y < 2) {
  //     mesh2.scale.y += 0.00341;
  //   }
  //   if (mesh2.scale.x >= 2 && mesh2.scale.y >= 2 && mesh2.scale.z < 2) {
  //     mesh2.scale.z += 0.00341;
  //   }
  //   if (mesh2.scale.x >= 2 && mesh2.scale.y >= 2 && mesh2.scale.z >= 2) {
  //     ticker = 1;
  //   }
  // }
  // if (ticker == 1) {
  //   if (mesh2.scale.x >= 2 && mesh2.scale.y >= 2 && mesh2.scale.z > 1) {
  //     mesh2.scale.z -= 0.00341;
  //   }
  //   if (mesh2.scale.x >= 2 && mesh2.scale.y > 1 && mesh2.scale.z <= 1) {
  //     mesh2.scale.y -= 0.00341;
  //   }
  //   if (mesh2.scale.x > 1 && mesh2.scale.y <= 1 && mesh2.scale.z <= 1) {
  //     mesh2.scale.x -= 0.00341;
  //   }
  //   if (mesh2.scale.x <= 1 && mesh2.scale.y <= 1 && mesh2.scale.z <= 1) {
  //     ticker = 0;
  //   }
  // }
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
