import { OrbitControls } from "./OrbitControls.js";

let scene, camera, renderer, controls;

function initThreeScene(containerElement) {
  scene = new THREE.Scene();

  const aspectRatio =
    containerElement.clientWidth / containerElement.clientHeight;

  camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 10, 10); // Перемещаем камеру выше и немного назад
  camera.lookAt(0, 0, 0); // Направляем камеру на центр сцены

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
  containerElement.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 5;
  controls.maxDistance = 50;
  controls.update();

  const gridHelper = new THREE.GridHelper(10, 10);
  gridHelper.position.y = -5;
  scene.add(gridHelper);
}

export { initThreeScene };

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export { animate };

/* function computeConeVertices(radius, height, segments) {
  let vertices = [];

  vertices.push(new THREE.Vector3(0, 0, height));

  for (let i = 0; i < segments; i++) {
    let angle = (2 * Math.PI * i) / segments;
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);
    vertices.push(new THREE.Vector3(x, y, 0));
  }

  return vertices;
} */

function createConeGeometry(radius, height, segments) {
  return new THREE.ConeGeometry(radius, height, segments);
}

let currentConeMesh = null;

function drawCone(radius, height, segments) {
  console.log("Drawing cone with", { radius, height, segments });

  if (currentConeMesh) {
    scene.remove(currentConeMesh);
    currentConeMesh.geometry.dispose();
    currentConeMesh.material.dispose();
  }

  let geometry = createConeGeometry(radius, height, segments);
  let material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  let coneMesh = new THREE.Mesh(geometry, material);

  let scale = 1;
  if (radius > 5 || height > 5) {
    scale = (5 / Math.max(radius, height)) * 3;
    coneMesh.scale.set(scale, scale, scale);
  }

  let scaledHeight = height * scale;
  coneMesh.position.set(0, scaledHeight / 6, 0);

  scene.add(coneMesh);

  currentConeMesh = coneMesh;
}

export { drawCone };

function computeNormals(Pi, B) {
  let Ni = Pi.clone().sub(B);
  return Ni.normalize();
}

function computeConeNormals(radius, height, segments) {
  const B = new THREE.Vector3(0, 0, -Math.pow(radius, 2) / height);
  const vertices = computeSmoothConeVertices(radius, height, segments);
  const normals = [];

  for (let i = 0; i < vertices.length; i++) {
    normals.push(computeNormals(vertices[i], B));
  }

  return normals;
}

function computeSmoothConeVertices(radius, height, segments) {
  const vertices = [];

  vertices.push(new THREE.Vector3(0, 0, 0));

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    vertices.push(new THREE.Vector3(x, y, 0));
  }

  vertices.push(new THREE.Vector3(0, 0, height));

  return vertices;
}

function createSmoothConeGeometry(radius, height, segments) {
  const geometry = new THREE.BufferGeometry();

  const vertices = computeSmoothConeVertices(radius, height, segments);

  const normals = computeConeNormals(radius, height, segments);

  const indices = [];

  for (let i = 1; i <= segments; i++) {
    indices.push(0, i, i + 1);

    indices.push(i, vertices.length - 1, i + 1);
  }

  indices.push(0, segments, 1);
  indices.push(segments, vertices.length - 1, 1);

  const flattenedVertices = [];
  const flattenedNormals = [];

  for (let i = 0; i < vertices.length; i++) {
    flattenedVertices.push(vertices[i].x, vertices[i].y, vertices[i].z);
    flattenedNormals.push(normals[i].x, normals[i].y, normals[i].z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(flattenedVertices, 3)
  );
  geometry.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute(flattenedNormals, 3)
  );

  geometry.setIndex(indices);

  return geometry;
}

function drawSmoothCone(radius, height, segments) {
  if (currentConeMesh) {
    scene.remove(currentConeMesh);
    currentConeMesh.geometry.dispose();
    currentConeMesh.material.dispose();
  }
  console.log("Drawing smooth cone with", { radius, height, segments });
  const geometry = createSmoothConeGeometry(radius, height, segments);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    flatShading: false,
  });
  const coneMesh = new THREE.Mesh(geometry, material);

  let scale = 1;
  if (radius > 5 || height > 5) {
    scale = (5 / Math.max(radius, height)) * 3;
    coneMesh.scale.set(scale, scale, scale);
  }

  coneMesh.rotation.x = -Math.PI / 2;
  coneMesh.position.set(0, -5, 0);

  scene.add(coneMesh);

  currentConeMesh = coneMesh;
}

export { drawSmoothCone };
