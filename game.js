// import{GLTFLoader} from "./three/examples/jsm/loaders"
import * as THREE from "three";
export class Conductor{

    constructor(row, column) {
        this.row = [];
        this.column = [];
        this.boxes = [];
        this.zPos = [];
        this.data = [];


        this.direction = new THREE.Vector3(0, 0, -1).normalize();
      }
    
      initXY(rowNum, colNum,scene) {

        for (let i = 0; i < colNum * rowNum; i++) {
          const x = Math.random() * 6 - 3;
          const y = Math.random() * 6 - 3;
          const z = Math.random() * 3 - 6;
          this.row.push(x);
          this.column.push(y);
          this.zPos.push(z);
        }
        this.generateBoxs(scene);
      }
    
      generateBoxs(scene) {
        var geometryGame = new THREE.BoxGeometry(1, 1, 1);
        var materialGame = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
          });
        for (let i = 0; i < this.row.length * this.column.length; i++) {
          const box = new THREE.Mesh(geometryGame, materialGame);
          box.position.x = this.row[i];
          box.position.y = this.column[i];
          box.position.z = this.zPos[i];
    
          const boxPoints = new THREE.Vector3(
            box.position.x,
            box.position.y,
            box.position.z
          );
    
        //   raycaster.set(boxPoints, this.direction);
    
          this.boxes.push(box);
          scene.add(this.boxes[i]);
        }
        // console.log(this.boxes);
      }
      color(){
        for(let i=0; i<this.boxes.length; i++){
            box.color.set(Math.random()* 0xffffff);
        }
      }
      
      tempo(){
        //wss: from arduino 
        
        return x
      }

      surround(){
        surmaterial = new THREE.MeshBasicMaterial({
            color:0xffffff,
            wireframe:true
        });
        surGeometry = new THREE.BoxGeometry;
      }


      move(speed) {
        for (let i = 0; i < this.boxes.length; i++) {
          if (this.boxes[i].position.z >= 2) {
            this.boxes[i].position.z = Math.random() * 3 - 6;
            this.boxes[i].position.x = Math.random() * 6 - 3;
            this.boxes[i].position.y = Math.random() * 6 - 3;
          }
          this.boxes[i].position.z += speed;
        }
      }

      run(){
        this.move(this.tempo);
        
      }

    
      hit() {
        let hitHand = raycaster.intersectObjects(cubes);
        try {
          if (hitHand[0].distance <= 0.01) {
            console.log("hit");
            playAudio();
          }
        } catch(e) {}
        console.log(hitHand);
      }
    

};

export class loadScene{
    constructor(){
        const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
        loader.setDRACOLoader( dracoLoader );
    }
    
    loadThisScene(){
    loader.load(
        // resource URL
        'models/gltf/duck/duck.gltf',
        // called when the resource is loaded
        function ( gltf ) {
    
            scene.add( gltf.scene );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        });
    }

};