var scene = new THREE.Scene();  // Creating a scene

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); // Including a camera

var renderer = new THREE.WebGLRenderer(); //Setting renderer
renderer.setSize( window.innerWidth, window.innerHeight ); // Setting size 
document.body.appendChild( renderer.domElement ); 
renderer.setClearColor(0xaa22ff);

camera.position.z = 50; // Position of camera

// Help
var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Newton's second law of motion</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows the relation between force and mass.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The three bars in the top right corner controls the animation.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The first bar is used to increase or decrease mass of the green block. Don't take the mass as zero because mass can't be zero. (Maybe zero, by the way I don't know much Physics.)</p>";
    helpContent = helpContent + "<p>The second bar is to give force on the right side and third bar is to give on left side.</p>";
    helpContent = helpContent + "<p>Once you click on any of the last two bars, block starts moving.";
	helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>Block moves in the right or left direction according to your input. Its speed determines the time taken by the block to fall down the surface. More the speed, less the time taken and vice versa.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

//Info or Concept
var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Newton's second law of motion</h2>";
	infoContent = infoContent + "<p>In this experiment initial velocity is taken as zero.</p>";
    infoContent = infoContent + "<h3>Input</h3>";
    infoContent = infoContent + "<p>Force and mass are given as input. Force will be negative if you give force in negative direction.</p>";
    infoContent = infoContent + "<h3>Acceleration</h3>";
    infoContent = infoContent + "<p>Acceleration is the ratio of force and mass and it takes the sign of force.<br>Acceleration = force / mass</p>";
    infoContent = infoContent + "<h3>Time</h3>";
    infoContent = infoContent + "<p>Time can be found from the formula of distance : d = (1/2) * a * t * t.<br>Time t = square_root( (2*distance) / (acceleration) )</p>";
    infoContent = infoContent + "<h3>Final velocity</h3>";
    infoContent = infoContent + "<p>Final velocity is the product of acceleration and time and it takes the sign of acceleration.<br>Final velocity = acceleration * time</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}


//Start of experiment
function loadExperimentElements(){
		
		PIEsetExperimentTitle("Newton's second law of motion");
		PIEsetDeveloperName("Kishan Radia");
		
		initialiseHelp(); // Calling help
		initialiseInfo(); // Calling info
	
}

var geometry2 = new THREE.BoxGeometry( 10, 10, 0 );
var material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

var cube2 = new THREE.Mesh( geometry2, material2 ); // The green block in the middle is created.
scene.add( cube2 ); // The block is added to scene. 

var geometry = new THREE.BoxGeometry( 70, 2, 0 );
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

var cube = new THREE.Mesh( geometry, material ); // Surface is created
scene.add( cube );
cube.position.y=-6.1;	

geometry = new THREE.BoxGeometry( 12, 5, 0 );
material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

cube3 = new THREE.Mesh( geometry, material ); // White background of stopwatch in the left top corner.
scene.add( cube3 );

cube3.position.y = 32;
cube3.position.x = -75;

geometry = new THREE.BoxGeometry( 50, 2, 0 );
material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 

cube = new THREE.Mesh( geometry, material ); // Red stick for support of surface.
scene.add( cube );

cube.position.y=-32.15;	
cube.rotation.z=1.58;
cube.position.x=-20;

geometry = new THREE.BoxGeometry( 50, 2, 0 );
material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 

cube = new THREE.Mesh( geometry, material ); // Another red stick for support of surface.
scene.add( cube );

cube.position.y=-32.15;	
cube.rotation.z=1.58;
cube.position.x=20;

var stopwatch=0; // Time given in left top most corner.

var text1 = document.createElement('div');
	text1.style.position = 'absolute';
	//text1.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	text1.style.width = 1000;
	text1.style.fontSize = "x-large";
	text1.style.height = 1000;
	text1.style.backgroundColor = "orange";
	text1.innerHTML = stopwatch.toPrecision(4);
	text1.style.top = 40 + 'px';
	text1.style.left = 30 + 'px';
	document.body.appendChild(text1); // The value of stopwatch is stored in text1 and added to scene.


renderer.render( scene, camera); // It is used to render the screen.

// Below are for the bars in the right top most corner.		
var guiControls=new function(){
	this.mass=1; // For mass
	this.rightwardforce=0; // For force in right direction.
	this.leftwardforce=0; // For force in left direction
}

// New datGUI is created.
var datGUI=new dat.GUI();

datGUI.add(guiControls,'mass',0,10,1);
datGUI.add(guiControls,'rightwardforce',0,10,1);
datGUI.add(guiControls,'leftwardforce',0,10,1);

// Declaration of different variables.
var force=0; // Force
var mass; // Mass
var acceleration; // Acceleration
var velocity; // Final velocity
var time; // Time
var distance; // Distance

// In the comments below, F = Force, m = mass, a = Acceleration, t = Time, D = Distance, v = final velocity

// A Event Listener is added.
document.addEventListener('mouseup', ondocmouseup, false);
function ondocmouseup(){
// Animation starts on increasing force in either direction.
var animate = function () {
	
	if(force!=0){
		datGUI.close();
	} // If force is given, the bars are removed.
	
	requestAnimationFrame( animate );
	
	force=guiControls.rightwardforce-guiControls.leftwardforce; // Value of force.
	mass=guiControls.mass; // Value of mass.
	acceleration=(force)/(mass); // a=F/m.
	distance=35; // Geometry gives distance as 35.
	if(acceleration>0)
	time=Math.sqrt((2*distance)/(acceleration)); // D = (1/2) * a * t * t. From this time can be found.
	if(acceleration<0)
	time=Math.sqrt(((-2)*distance)/(acceleration)); // D = (-)(1/2) * a * t * t. From this time can be found. Minus sign is there because acceleration is negative.
	velocity=(acceleration)*(time); // v = a * t.
	
	// When block falls in the left part.
	if(cube2.position.x > 40){
		cube2.rotation.z += -0.05;
		cube2.position.y -= 1;
	}
	else if(cube2.position.x < -40){ // When block falls in right part.
		cube2.rotation.z += 0.05;
		cube2.position.y -= 1;
	}
    else{ // When block is on yellow surface.
		if(mass!=0){
		cube2.position.x += (force)/(mass*10);
		if(((force)/(mass*10))>0)
		stopwatch+=((time)*((force)/(mass*10)))/(40); // Stopwatch in the left top most corner.
		if(((force)/(mass*10))<0)
		stopwatch-=((time)*((force)/(mass*10)))/(40);
		
		if(stopwatch>time)stopwatch = time;
		
		text1.innerHTML = stopwatch.toPrecision(4);
		document.body.appendChild(text1);
		}
	}
	
	if(cube2.position.y<-46){
		datGUI.open();
		output(); // Output is given.
	}
	
	
	renderer.render(scene, camera);
};
animate(); // For continuous animation.
}

//Everything is calculated and shown on screen when experiment ends.
var output=function(){
	/*var text2 = document.createElement('div');
	text2.style.position = 'absolute';
	//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	text2.style.fontSize = "x-large";
	text2.style.backgroundColor = "yellow";
	text2.innerHTML = "Force = "+force.toPrecision(4)+" N<br>"+"Mass = "+mass.toPrecision(4)+" kg<br>"+"Acceleration = "+acceleration.toPrecision(4)+" N/kg<br>"+"Final Velocity = "+velocity.toPrecision(4)+" m/s<br>"+"Time = "+time.toPrecision(4)+" s";
	text2.style.top = 50 + 'px';
	text2.style.left = 500 + 'px';
	document.body.appendChild(text2);*/
	
	var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 2; j++) {
            if (i == 5 && j == 1) {
                break
            } else {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode('kisan'));
                tr.appendChild(td);
            }
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
	
	var text3 = document.createElement('div');
	text3.style.position = 'absolute';
	//text3.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	text3.style.fontSize = "x-large";
	text3.style.backgroundColor = "yellow";
	text3.innerHTML = "Press Ctrl + R to reset the experiment.";
	text3.style.top = 200 + 'px';
	text3.style.left = 425 + 'px';
	document.body.appendChild(text3);
	resetexperiment();
	
}
var k=0;
function resetexperiment(){
	if(k>50){
		datGUI.close();
	}
	k++;
}
resetexperiment();

