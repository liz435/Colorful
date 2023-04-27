import * as THREE from "three";
import handData from "./hand.model";
import handCubes from "./hand.view";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import{Conductor} from "./game";
import Stats from "stats.js";
import * as Tone from 'tone';



let camera, scene, renderer, controls;
(function initScene() {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight / 1.2);
  document.body.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  window.addEventListener(
    "resize",
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight / 1.2);
    },
    false
  );
})();

/**
 *
 * @param { THREE.Vector3} origin
 * @param {THREE.Vector3} dir
 */

const geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cubes = [];
let areCubesAdded = false;
function manageHand() {
  const { landmarks } = handData;
  console.log(landmarks)

  if (areCubesAdded === false && landmarks.length > 0) {
    for (let i = 0; i < landmarks.length; i++) {
      const cube = new THREE.Mesh(geometry, material);
      cubes.push(cube);
      scene.add(cube);
    }
    areCubesAdded = true;
  }

  if (landmarks.length > 0 && areCubesAdded === true) {
    for (let i = 0; i < landmarks.length; i++) {
      const currLndmrk = landmarks[i];

      const vector = new THREE.Vector3(
        currLndmrk.x * 2 - 1,
        -currLndmrk.y * 2 + 1,
        currLndmrk.z * 10
      );

      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      dir.setX(-dir.x);
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir);

      cubes[i].position.copy(pos);
    }
  }
}

const rays = [];
let areRaysAdded = false;
let sentOnce = false;
const rayParent = new THREE.Group();
scene.add(rayParent);
function manageRaycasters() {
  if (handCubes.cubesAdded) return;

  cubes.forEach((cu) => {
    if (!areRaysAdded) {
      const raycaster = new THREE.Raycaster();
      raycaster.set(cu.position, new THREE.Vector3(0, 0, 1).normalize());

      raycaster.ray.direction;

      const arrow = new THREE.ArrowHelper(
        raycaster.ray.direction,
        raycaster.ray.origin,
        300,
        0xff0000
      );

      rayParent.add(arrow);

      rays.push({
        raycaster: raycaster,
        arrow: arrow,
      });
    }
    scene.add(rayParent);
    if (areCubesAdded && areRaysAdded) {
      rayParent.clear();
      for (let index = 0; index < cubes.length; index++) {
        const currCube = cubes[index];
        const currRaycaster = rays[index].raycaster.ray;
        //  const currArrow =  rays[index].arrow;
        // rays[index].arrow.dispose();
        //  rays[index].arrow.position.set(cubes[index].position)

        const intersects = rays[index].raycaster.intersectObjects(
          scene.children
        );


        
        if (intersects.length) {
          console.log(intersects.length)
          if(sentOnce === false){
            console.log('fired')
          fetch("http://localhost:3001/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"status": "true" }),
          })
            .then((response) => response.json())
            .then((response) => console.log(JSON.stringify(response)));
            sentOnce = true
        }
        // }else{
        //   fetch("http://localhost:3001/", {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/json",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ status: false }),
        //   })
        //     .then((response) => response.json())
        //     .then((response) => console.log(JSON.stringify(response)));
        // }
      }
    //    console.log(intersects.length)
        currRaycaster.origin = currCube.position;

        const arrow = new THREE.ArrowHelper(
          currRaycaster.direction,
          currRaycaster.origin,
          300,
          0xff0000
        );

        rayParent.add(arrow);
      }
    }
  });

  areRaysAdded = true;
}

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const size = 8;
const divisions = 8;
const colorLinesCenter = 0xffffff;
const colorLinesGrid = new THREE.Color("lime");
const helper = new THREE.GridHelper(
  size,
  divisions,
  colorLinesCenter,
  colorLinesGrid
);
scene.add(helper);

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

camera.position.z = 5;

// Create a cube mesh
const test = new THREE.Mesh(geometry, material);
const test2 = new THREE.Mesh(geometry, material);
test.scale.set(10, 10, 10);
test.position.z = 8;
test2.scale.set(10, 10, 10);
test2.position.z = 12;
test.position.x += 2;
//test.scale = new THREE.Vector3(5,5,5)
// Add the cube mesh to the scene
scene.add(test);
scene.add(test2);



const demo = new Conductor();
demo.initXY(3, 2, scene);


 handCubes.createCubes(geometry, material);
 handCubes.addCubesToScene(scene);
 let attack=0.1;
 let synth = new Tone.MonoSynth({
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 2*attack
  }
}).toDestination();
let playThisPitch;
let playThisOct;
let playThis;

let yPos;
let xPos;

function synthPlay(x,y){
const pitch=["C","D","E","F","G","A","B"]
const octv=["3","4","5","6"];


  if(x>0.875){
    playThisPitch=pitch[0]
}
else if(x>0.750&& x<=0.875){
    playThisPitch=pitch[1]
}
else if(x>0.625&& x<=0.750){
    playThisPitch=pitch[2]
}
else if(x>0.5&& x<=0.625){
    playThisPitch=pitch[3]
}
else if(x>0.375&& x<=0.5){
    playThisPitch=pitch[4]
}
else if(x>0.250&& x<=0.375){
    playThisPitch=pitch[5]
}
else if(x>0.125&& x<=0.250){
    playThisPitch=pitch[6]
}
else if(x<=0.125){
    playThisPitch=pitch[7]
}

if(y>0.750){
  playThisOct=octv[0]
}
else if(y>0.5&& y<=0.750){
  playThisOct=octv[1]
}
else if(y>0.250&& y<=0.50){
  playThisOct=octv[2]
}else if(y<0.25){
  playThisOct=octv[3]
}

playThis= playThisPitch + playThisOct;



}

(function animate() {

  stats.begin();
  stats.end();
  // console.log(handData.landmarks[0])
//  manageHand();
 handCubes.render(camera)
//  manageRaycasters();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  // Rotate the cube mesh
  demo.move(0.1);
  xPos=  handData.landmarks[0].x;
  yPos= handData.landmarks[0].y;
  synthPlay(xPos,yPos);
  synth.triggerAttackRelease(playThis, "4n");
  console.log(xPos)

  

  





  test.rotation.x += 0.01;
  test.rotation.y += 0.01;
  // console.log(scene.children)
})()


