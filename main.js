import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load(
    "scene.gltf",
    gltf => {
        gltf.scene.scale.set(0.005, 0.005, 0.005); // Scale down the model
        gltf.scene.position.set(-5, -10, 0); // Position the model
        scene.add(gltf.scene);
    },
    undefined,
    error => {
        console.error(error);
    },
);

let geometry = new THREE.BoxGeometry(1, 5, 10);
let material = new THREE.MeshPhongMaterial({ color: 0x88c0d0 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

geometry = new THREE.BoxGeometry(5, 3, 2);
material = new THREE.MeshPhongMaterial({ color: 0xff00ff });
const cube2 = new THREE.Mesh(geometry, material);
scene.add(cube2);

const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
const points = [];
points.push(new THREE.Vector3(10, 10, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, lineMaterial);
scene.add(line);

camera.position.z = 20;

const color = 0xffffff;
const intensity = 10;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

let frame = 0;

function animate() {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    cube2.rotation.z += 0.04;
    cube2.rotation.x -= 0.02;
    camera.position.z = 20 + Math.sin(frame * 0.01) * 10;
    camera.position.y = Math.sin(frame * 0.02) * 10;
    cube2.position.x = Math.sin(frame * 0.05) * 10;
    frame++;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
