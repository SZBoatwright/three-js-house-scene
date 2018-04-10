// Global Variables
let scene;
let camera;
let renderer;
let cloudMesh;

// Constants
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const CLOUD_MAT = new THREE.MeshLambertMaterial({color: 0xffffff});
const SPEED_MIN = 0.003;
const SPEED_MAX = 0.0075;

// Init Scene
function init() {
  scene = new THREE.Scene();
  initCamera();
  initRenderer();
  initCloud();

  //creates the scene lighting
  let lightAmb = new THREE.AmbientLight(0xffffff, 0.5); // creates an ambient light with the color and intensity
  scene.add(lightAmb);
  let lightAmbBlu = new THREE.AmbientLight(0x26b2de, 0.15);
  scene.add(lightAmbBlu);

  let lightPnt = new THREE.PointLight(0xffffff, 0.5); // creates an ambient light with the color and intensity
  scene.add(lightPnt);
  lightPnt.position.y = 100;
  lightPnt.position.x = 50;

  document.body.appendChild(renderer.domElement);
}

// Functions
function initCamera() {
  camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 10);
  camera.position.set(0, 0, 7);
  camera.lookAt(scene.position);
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x26b2de); // sets the background color
  renderer.setPixelRatio(window.devicePixelRatio); // sets the pixel ratio to be the size of the screen
}

// Cloud Constructor 
function cloud() {
  this.positionX = 0;
  this.positionY = 0;
  this.positionZ = 0;
  this.mesh = initCloud();
}

function initCloud() {
  var loader = new THREE.JSONLoader();
  loader.load('./data/cloud1.json',function(geometry) {
    cloudMesh = new THREE.Mesh(geometry, CLOUD_MAT);
    scene.add(cloudMesh);
  });
}

function moveCloud() {
  if (!cloud) {
    return;
  }
  cloudMesh.position.x -= SPEED_MIN;
}

function render() {
  requestAnimationFrame(render);
  // Animation stuff
  moveCloud();

  renderer.render (scene, camera);
}

init();
render();