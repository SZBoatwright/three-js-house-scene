// Global Variables
let scene;
let camera;
let renderer;

// Constants
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const CLOUD_MAT = new THREE.MeshLambertMaterial({ color: 0xffffff });

// Scene variables
const SPEED_MIN = 3;
const SPEED_MAX = 75;
const CLOUD_CLOSE = 1;
const CLOUD_FAR = -3.25;
const CLOUD_VERTICAL = 3;
const CLOUD_HORIZONTAL = 13;
const SCALE_MAX = 125;
const SCALE_MIN = 75;
const CLOUDS_SPAWN_AMNT = 10;

let cloudSpawnPositions = ["", "", "", "", "", "", "", "", "", ""];
cloudSpawnPositions.forEach(function(curVal, i) {
  cloudSpawnPositions[i] = getRandomInt(-CLOUD_HORIZONTAL, CLOUD_HORIZONTAL);
});
console.log(cloudSpawnPositions);

// Scene Lighting
const LIGHT_POINT = new THREE.PointLight(0xffffff, 0.5); // creates an ambient light with the color and intensity
const LIGHT_AMB = new THREE.AmbientLight(0xffffff, 0.5); // creates an ambient light with the color and intensity
const LIGHT_AMB_BLU = new THREE.AmbientLight(0x26b2de, 0.15);

// Init Scene
function init() {
  scene = new THREE.Scene();
  initCamera();
  initRenderer();
  initCloud();

  // Adds the scene lighting
  scene.add(LIGHT_AMB);
  scene.add(LIGHT_AMB_BLU);

  scene.add(LIGHT_POINT);
  LIGHT_POINT.position.y = 100;
  LIGHT_POINT.position.x = 50;

  document.body.appendChild(renderer.domElement); // Adds in WebGL renderer
}

// Functions
function initCamera() {
  camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 10);
  camera.position.set(0, 0, 7);
  camera.lookAt(scene.position);
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x26b2de); // sets the background color
  renderer.setPixelRatio(window.devicePixelRatio); // sets the pixel ratio to be the size of the screen
}

function initCloud() {
  var loader = new THREE.JSONLoader();
  loader.load("./data/cloud1.json", function(geometry) {
    let mesh = new THREE.Mesh(geometry, CLOUD_MAT);

    // Give the cloud a random speed between MIN_SPEED and MAX_SPEED
    mesh["speed"] = getRandomInt(SPEED_MIN, SPEED_MAX) * 0.0001;

    scene.add(mesh);

    // Mesh position
    mesh.position.z = getRandomInt(CLOUD_FAR, CLOUD_CLOSE);
    mesh.position.y = getRandomInt(-CLOUD_VERTICAL, CLOUD_VERTICAL);

    // Mesh scale
    mesh.scale.x = getRandomInt(SCALE_MIN, SCALE_MAX) * 0.01;
    mesh.scale.y = getRandomInt(SCALE_MIN, SCALE_MAX) * 0.01;
    mesh.scale.z = getRandomInt(SCALE_MIN, SCALE_MAX) * 0.01;
  });
}

function cloudsInitialInit() {
  for (i = 0; i < 10; i++) {
    initCloud();
    scene.children[scene.children.length - 1].position.x =
      cloudSpawnPositions[i];
  }
}

function moveClouds() {
  scene.children.forEach(function(curVal, i) {
    if (scene.children[i]["type"] == "Mesh") {
      // Moves the cloud based on assigned speed
      scene.children[i].position.x -= scene.children[i].speed;
    }
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render() {
  requestAnimationFrame(render);
  // Animation stuff
  moveClouds();

  renderer.render(scene, camera);
}

init();
render();
