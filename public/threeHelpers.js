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
