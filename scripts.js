var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('my-canvas'), antialias: true});
renderer.setClearColor(0xafafaf); //sets the background color
renderer.setPixelRatio(window.devicePixelRatio); // sets the pixel ratio to be the size of the screen
renderer.setSize(window.innerWidth, window.innerHeight); //sets the renderer to fill the window

let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000); // Adds new camera w/ FOV of 35, then sets the width and height of the camera to be that of the window, then sets the near and far clipping distances.

let scene = new THREE.Scene(); //adds in the scene

//creates the scene lighting
let lightAmb = new THREE.AmbientLight(0xffffff, 0.5); //creates an ambient light with the color and intensity
scene.add(lightAmb);

let lightPnt = new THREE.PointLight(0xffffff, 0.5); //creates an ambient light with the color and intensity
scene.add(lightPnt);

//create cube 1 - has no shading
let geometry = new THREE.BoxGeometry(150, 100, 100); // sets a cube object (length, width, and height)
let materialBasic = new THREE.MeshBasicMaterial(); // creates a basic material w/ no shading
let mesh1 = new THREE.Mesh(geometry, materialBasic); // combines the geometry and material into a mesh
mesh1.position.set(200, 0, -1000);
scene.add(mesh1);

//create cube 2 - has shading
let materialLambert = new THREE.MeshLambertMaterial({color: 0xf3569a}); //creates a lambert material that has shading
let mesh2 = new THREE.Mesh(geometry, materialLambert);
mesh2.position.set(-200, 0, -1000);
scene.add(mesh2);

//create cloud
let loader = new THREE.JSONLoader();
loader.load('data/cloud1.json', handleLoad);

function handleLoad (geometry, materials) {
  let material = new THREE.MeshNormalMaterial();
  let mesh = new THREE.Mesh(geometry, materials);
  scene.add(mesh);
  mesh.position.z = -20;
}

function render() { //renders the scene using the scene and camera objects
  mesh1.rotation.x += 0.01;
  mesh1.rotation.y += 0.01;
  mesh2.rotation.x += -0.01;
  mesh2.rotation.y += -0.01;
  renderer.render (scene, camera);
  requestAnimationFrame(render);
} 
render();