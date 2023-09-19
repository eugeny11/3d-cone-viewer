import * as THREE from "three";

let scene, camera, renderer;

function initThreeScene(containerElement) {
  scene = new THREE.Scene();

  const aspectRatio =
    containerElement.clientWidth / containerElement.clientHeight;
  camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = 10;

  renderer = new THREE.WebGL1Renderer({ antialias: true });
  renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
  containerElement.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position(5, 5, 5);
  scene.add(pointLight);
}

export { initThreeScene };

function computeConeVertices(radius, height, segments) {
  let vertices = [];

  vertices.push(new THREE.Vector3(0, 0, height));

  for (let i = 0; i < segments; i++) {
    let angle = (2 * Math.PI * i) / segments;
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);
    vertices.push(new THREE.Vector3(x, y, 0));
  }

  return vertices;
}

function createConeGeometry(radius, height, segments) {
  let geometry = new THREE.Geometry();

  for (let i = 0; i < segments; i++) {
    geometry.faces.push(new THREE.Face3(0, i, i + 1));
  }

  geometry.faces.push(new THREE.Face3(0, segments, 1));

  return geometry;
}

function drawCone(radius, height, segments) {
  let geometry = createConeGeometry(radius, height, segments);
  let material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  let coneMesh = new THREE.Mesh(geometry, material);

  scene.add(coneMesh);
}

export { drawCone };
