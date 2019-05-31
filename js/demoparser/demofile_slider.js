let fs = require("fs");
let demofile = require("demofile");
let checkpointTick = 1;  
let ticksPerSec = 128; //frames per second
let interval = 0.1; //seconds


var MapSizeMin = -3000, MapSizeMax = 3000;
var CellSize = 30;
var SIZE = 200; //200*200 meters

var tMAX = 120; //2 minutes

var PosArrTPX = createArray([tMAX * 10,10,2],0);
//console.log(PosArrTPX);

var CellArrXYT = createArray([SIZE,SIZE,tMAX * 10],0.01);
//console.log(CellArrXYT);

var min=0; 
var max=SIZE;

var TEAMBOTH = 2, PLAYERALL=100;
var GameSelectedFrom = 0, GameSelectedTo = 0, TeamSelected = TEAMBOTH, PlayerSelected = PLAYERALL; // Team = 0, 1, 2 = Both. Player 100 = All

//cube positions are fixed and not relative to screensize
var camera, scene, renderer, loader;
var controls, container_viewport;
var geometry, material, mesh;
var texture, img; //import image variables

var cubeArrXY = createArray([SIZE,SIZE],0); // geometry objects 

init();
animate();
cube_initialize();

function init() {

	//renderer
	scene = new THREE.Scene();

	container = document.getElementById( 'canvas' );
	//http://jsfiddle.net/fek9ddg5/1/
	document.body.appendChild( container );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth * 0.74, window.innerHeight * 0.65 );
	container.appendChild( renderer.domElement );
	renderer.setClearColor(0xA9A9A9, 1);
	renderer.gammaOutput = true;


	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	camera.position.z = 25; 
	camera.position.y = -10;
	camera.position.x = 0;
	camera.lookAt(scene.position);
	//camera.position.x = 5;

	texture = new THREE.TextureLoader().load('images/maps/de_mirage.jpg');
	img = new THREE.MeshBasicMaterial({
		map: texture,
		side: THREE.DoubleSide
	});
/*
	material2 = new THREE.LineBasicMaterial( { color: 0x0000ff } );

	geometry2 = new THREE.Geometry();
	geometry2.vertices.push(new THREE.Vector3( 0, 0, 0) );
	geometry2.vertices.push(new THREE.Vector3( 0, window.innerHeight*0.01, 0) );
	//                geometry2.vertices.push(new THREE.Vector3( 10, 0, 0) );

	line2 = new THREE.Line( geometry2, material2 );
	scene.add( line2 );
	*/

	var geom = new THREE.PlaneGeometry( window.innerWidth*0.04, window.innerHeight*0.04 );
	//geom.rotateX(-Math.PI * 0.15); // this is how you can do it
	//var material3 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh( geom, img );
	plane.overdraw = true;
	scene.add( plane );

}


function animate() {
	requestAnimationFrame( animate );
	
	renderer.render( scene, camera );
}

function cube_initialize()	{
	geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
	//geometry2.rotateX(-Math.PI * 0.15); // this is how you can do it
	material2 = new THREE.MeshNormalMaterial();
	


	for (var i = 0; i < SIZE; i++) {
		for (var j = 0; j < SIZE; j++) {
			cubeArrXY[i][j] = new THREE.Mesh( geometry2, material2 );
			cubeArrXY[i][j].position.set((i-(SIZE/2)),(j-(SIZE/2)),0);
			scene.add(cubeArrXY[i][j]);
			cubeArrXY[i][j].visible = false;
			cubeArrXY[i][j].material.transparent = true;
			cubeArrXY[i][j].material.opacity = 0.6;

		}
	}
	

}


function createArray(dimensions, value) {

// Create new array

var array = new Array(dimensions[0] || 0);

var i = dimensions[0];



// If dimensions array's length is bigger than 1

// we start creating arrays in the array elements with recursions

// to achieve multidimensional array

if (dimensions.length > 1) {

	// Remove the first value from the array

	var args = Array.prototype.slice.call(dimensions, 1);

	// For each index in the created array create a new array with recursion

	while(i--) {

		array[dimensions[0]-1 - i] = createArray(args, value);

	}

// If there is only one element left in the dimensions array

// assign value to each of the new array's elements if value is set as param

} else {

	if (typeof value !== 'undefined') {

		while(i--) {

			array[dimensions[0]-1 - i] = value;

		}

	}

}



return array;

}


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
	output.innerHTML = this.value;
	for (var j = 0; j < SIZE; j++)	{
		for (var k = 0; k < SIZE; k++)	{
			//console.log(CellArrXYT[j][k][slider.value*10]);
//			cubeArrXY[j][k].geometry.parameters.height = 5; //CellArrXYT[j][k][slider.value*10]; 
//			if (CellArrXYT[j][k][slider.value*10] >= 1)	{
			cubeArrXY[j][k].scale.z = CellArrXYT[j][k][slider.value];
			if (CellArrXYT[j][k][slider.value] < 1)	{
				cubeArrXY[j][k].visible = false;
			}
			else{
				cubeArrXY[j][k].visible = true;
			}

			 
		}
	}
	//console.log(CellArrXYT[2][2][slider.value]);
}

var fileInput = document.querySelector('input[type="file"]');
document.getElementById('get-file').onclick = function read() { 
    var file = fileInput.files.item(0); 
    var reader = new FileReader(); 
    reader.onload = function() { 

        // pass 'reader.result' to DemoFile
        console.log("Loaded");
		
		const demoFile = new demofile.DemoFile();
		buffer = reader.result;
		demoFile.on('tickend', e => {
				
			
			let players = demoFile.entities.players;

			if (demoFile.currentTick == checkpointTick) {
			checkpointTick = (demoFile.currentTick + (interval * ticksPerSec)) | 0;  
			var time = demoFile.currentTick / ticksPerSec;
			console.log("Time =", time);
			
				for (var i = ((PlayerSelected = PLAYERALL) ? 2 : PlayerSelected - 1); i < ((PlayerSelected = PLAYERALL) ? 12 : PlayerSelected); i++) {
					arrPos = (demoFile.currentTick = 1) ? 0 : time/interval;
					PosArrTPX[arrPos][i-2][0] = players[i].position.x;
					PosArrTPX[arrPos][i-2][1] = players[i].position.y;
					arrPos2 = (players[i].position.x+MapSizeMax)/CellSize | 0;
					arrPos3 = (players[i].position.y+MapSizeMax)/CellSize | 0;
					CellArrXYT[arrPos2][arrPos3][arrPos] += 1;
				}
			}
			
		});
		demoFile.gameEvents.on('round_start', e => {  

			// Calculate the tick that is 1 seconds in the future.
			// We do `| 0` to make the number whole (we only ever deal with ticks that are integers).
			ticksPerSec = demoFile.header.playbackTicks / demoFile.header.playbackTime;  
			checkpointTick = (demoFile.currentTick + (interval * ticksPerSec)) | 0;  
			console.log("Round Start");
		});
		demoFile.gameEvents.on('round_end', e => {  
			console.log("Round End");
			break;
		});

		demoFile.parse(buffer);
    }  
     
    reader.readAsArrayBuffer(file); 
}