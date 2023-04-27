// import{GLTFLoader} from "./three/examples/jsm/loaders"
import * as THREE from "three";
import * as Tone from 'tone';
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
          const x = Math.random() * 4 - 2;
          const y = Math.random() * 4 - 2;
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
        //   this.color();
        }
        // console.log(this.boxes);
      }
      color(){
        for(let i=0; i<this.boxes.length; i++){
            this.geometryGame.set(Math.random()* 0xffffff);
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
            this.boxes[i].position.z = Math.random()* 40-60;
            this.boxes[i].position.x = Math.random() * 4 - 2;
            this.boxes[i].position.y = Math.random() * 4 - 2;
            const synth = new Tone.Synth().toDestination();
            let Av = "C";
            let xPos = this.boxes[i].position.x;
            let yPos = this.boxes[i].position.y;
            let Pos = xPos + yPos;

            // console.log(Pos)
            //let pitch = Av += str;
            const picth = ["D4", "G4", "C4","G4","B4","D4","F4","A4"];
            let playThis;

            if(Pos>3){
                playThis=picth[0]
            }
            else if(Pos>2&& Pos<=3){
                playThis=picth[1]
            }
            else if(Pos>1&& Pos<=2){
                playThis=picth[2]
            }
            else if(Pos>0&& Pos<=1){
                playThis=picth[3]
            }
            else if(Pos>-1&& Pos<=0){
                playThis=picth[4]
            }
            else if(Pos>-2&& Pos<=-1){
                playThis=picth[5]
            }
            else if(Pos>-3&& Pos<=-2){
                playThis=picth[6]
            }
            else if(Pos<=-3){
                playThis=picth[7]
        }


            
//play a middle 'C' for the duration of an 8th note
        synth.triggerAttackRelease(playThis, "8n");

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