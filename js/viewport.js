//cube positions are fixed and not relative to screensize
var camera, scene, renderer, loader;
var controls, container_viewport;
var geometry, material, mesh;
var texture, img; //import image variables
//var cube = []; 
var tMAX = 120; //2 minutes
var SIZE = 30; //100*100 meters

var PosArrTPX = createArray([tMAX * 10,10,2],0);
//console.log(PosArrTPX);

var CellArrXYT = createArray([SIZE,SIZE,tMAX * 10],0.01);
//console.log(CellArrXYT);

var min=0; 
var max=SIZE;

var TEAMBOTH = 2, PLAYERALL=100;
var GameSelectedFrom = 0, GameSelectedTo = 0, TeamSelected = TEAMBOTH, PlayerSelected = PLAYERALL; // Team = 0, 1, 2 = Both. Player 100 = All


var cubeArrXY = createArray([SIZE,SIZE],0); // geometry objects 


init();
animate();
//calculate_height();
//cube_initialize(); already called
//addcubes();


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

/*

*   Function to create an n-dimensional array

*

*   @param array dimensions

*   @param any type value

*

*   @return array array

*/

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

 


cube_initialize();

for (var i = 0; i < tMAX * 10; i++ )	{
	for (var j = 0; j < 10; j++)	{
		PosArrTPX[i][j][0] = Math.floor(Math.random() * (+max - +min)) + +min;
		PosArrTPX[i][j][1] = Math.floor(Math.random() * (+max - +min)) + +min; 
		if (PosArrTPX[i][j][0] == 2 && PosArrTPX[i][j][1] == 2)	{
			//console.log(i);
		}
		
	}
}

//console.log(PosArrTPX);



for (var i = 1; i < tMAX * 10; i++ )	{
	for (var k = 0; k < SIZE; k++)	{
		for (var l = 0; l < SIZE; l++)	{
			CellArrXYT[k][l][i] = CellArrXYT[k][l][i-1];
		}
	}
	for (var j = 0; j < 10; j++)	{
		CellArrXYT[PosArrTPX[i][j][0]][PosArrTPX[i][j][1]][i] += 5;
		//console.log(CellArrXYT[PosArrTPX[i][j][0]][PosArrTPX[i][j][1]][i]);
		//console.log(CellArrXYT[PosArrTPX[i][j][0]][PosArrTPX[i][j][1]][i]); 
	}
	//console.log(CellArrXYT[2][2][i-1],CellArrXYT[2][2][i], i);
		
}



//console.log(CellArrXYT);

/*function printArray(arr) {
    for (var i = 0; i < arr.length; i++)
        if (Array.isArray(arr[i]))
            printArray(arr[i])
        else
            console.log(arr[i])
}
}


function calculate_height()	{

	var min=-15; 
	var max=15;
	for(var j = 0; j < 10; j++)	{
		xcor.push(Math.floor(Math.random() * (+max - +min)) + +min);
		temp_x = xcor[j];
		ycor.push(Math.floor(Math.random() * (+max - +min)) + +min);
		temp_y = ycor[j];
		c[j][temp_x][temp_y] = 1;
	};
}
*/

//slider - https://www.w3schools.com/howto/howto_js_rangeslider.asp
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