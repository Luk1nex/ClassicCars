import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );
const loader = new THREE.TextureLoader();

const geometry = new THREE.IcosahedronGeometry( 1, 100 );
const material = new THREE.MeshStandardMaterial ( {
	 color: 0xffffff,
	  flatShading: true,
	  map: loader.load("./Textures/earthmap1k.jpg")

	 } );

const earthMesh = new THREE.Mesh( geometry, material );
// const stars = getStarField();
scene.add( earthMesh );


camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.autoRotateSpeed = 0.05;

controls.update();

const light = new THREE.DirectionalLight(0xffffff);
light.position.set( -2, 0.5, 1.5 );
scene.add( light );
light.intensity = 1;


const lightMat = new THREE.MeshBasicMaterial({
	map: loader.load("./Textures/earthlights1k.jpg"),
	// transparent : true,
	// opacity: 0.3
	blending: THREE.AdditiveBlending,

});


const lightsMesh = new THREE.Mesh(geometry, lightMat);

scene.add(lightsMesh);
lightsMesh.scale.setScalar(1.006);

function StarLoader(){
	for (let i = 0; i < 2000; i++) {
		
		CreateStar();
	}
}


const cloudsMat = new THREE.MeshStandardMaterial({
	// color: 0xffffff,
	map: loader.load("./Textures/earthcloudmap.jpg"),
	blending: THREE.AdditiveBlending,

});

const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);

scene.add(cloudsMesh)
cloudsMesh.scale.setScalar(1.004);

function animate(t=0) {
	renderer.render( scene, camera );
	controls.update();

	earthMesh.rotation.y += 0.001;
	cloudsMesh.rotation.y += 0.001;
	lightsMesh.rotation.y += 0.001;

}
StarLoader();
function render() {
	renderer.render( scene, camera );
}

renderer.setAnimationLoop( animate );


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function CreateStar() {
	console.log("Creating Star");
	const geometry = new THREE.IcosahedronGeometry(1, 3);
    const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,

    });
    
   	const NewStar = new THREE.Mesh(geometry, material); 
    const XVal = getRandomInt(-1000, 1000);
    const YVal = getRandomInt(-1000, 1000);
    const ZVal = getRandomInt(-1000, 1000);

	NewStar.position.set(XVal, YVal, ZVal);
    console.log("X", "Y")

    const StarCount = 20;
	scene.add(NewStar);

}







