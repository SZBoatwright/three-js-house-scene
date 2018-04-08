var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('my-canvas'), antialias: true});
renderer.setClearColor(0x26b2de); // sets the background color
renderer.setPixelRatio(window.devicePixelRatio); // sets the pixel ratio to be the size of the screen
renderer.setSize(window.innerWidth, window.innerHeight); // sets the renderer to fill the window

let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000); // Adds new camera w/ FOV of 35, then sets the width and height of the camera to be that of the window, then sets the near and far clipping distances.

let scene = new THREE.Scene(); // adds in the scene

//creates the scene lighting
let lightAmb = new THREE.AmbientLight(0xffffff, 0.5); // creates an ambient light with the color and intensity
scene.add(lightAmb);

let lightPnt = new THREE.PointLight(0xffffff, 0.5); // creates an ambient light with the color and intensity
scene.add(lightPnt);
lightPnt.position.y = 100;
lightPnt.position.x = 50;

//create cloud
let cloudMat = new THREE.MeshLambertMaterial({color: 0xffffff}); // creates a lambert material that has shading

let loader = new THREE.JSONLoader();
loader.load('data/cloud1.json', handleLoad);

function handleLoad (geometry, materials) {
  let mesh = new THREE.Mesh(geometry, cloudMat);
  scene.add(mesh);
  mesh.position.z = -20;
}

// render the scene
function render() { // renders the scene using the scene and camera objects
  renderer.render (scene, camera);
  requestAnimationFrame(render);
} 
render();