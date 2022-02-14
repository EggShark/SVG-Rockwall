let colours = ["black","green"];
let topPath = [0]; // I have to put this here for the polygon path
let routeCenters = []; // will store X vaules each route will be ~ 100-200 pixels apart and will allow it 
let shapes = {
    0: document.createElementNS('http://www.w3.org/2000/svg', 'rect'),
    1: document.createElementNS('http://www.w3.org/2000/svg', 'circle')
}; // going to use this for foot holds later it will be plygons with values I sepcify after I make some in ilustrator
let userSize = document.getElementById("amount");
function drawLine(x1,y1,x2,y2,colour,width){
    let aline = document.createElementNS('http://www.w3.org/2000/svg', 'line'); //need to do this for some reason has to do with xml --> html
    aline.setAttribute('x1', x1);
    aline.setAttribute('y1', y1);
    aline.setAttribute('x2', x2);
    aline.setAttribute('y2', y2);
    aline.setAttribute('stroke', colour);
    aline.setAttribute('stroke-width', width);
    svg.appendChild(aline);
}

function heightOffset(lastY){
    let x = getRandomInt(2);
    if (x == 1) {
        return lastY + getRandomInt(50);
    }
    else {
        return lastY - getRandomInt(100); // makes it so it doesnt just go down
    }
}

function drawBackground() {
    let pointString = "";
    let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    for (let i = 0; i < topPath.length; i += 2) {
        pointString = pointString + `${topPath[i]},${topPath[i+1]} `; // cant do polygon.points += so this is my solution its jank but it works alright
    }
    pointString = pointString + `${topPath[topPath.length-2]},2000 0,2000 0,60`; // just finishes the polygon out
    polygon.setAttribute("points", pointString); // acually sets points value
    polygon.setAttribute("fill", "yellow");
    svg.appendChild(polygon);
}

function createRouteZones() {
    if (routeCenters.length == 0) {
        console.log("l")
    }
}

function linesdrawing(amount) {
    let lastX = 1;
    let lastY = 60;
    topPath.length = 0;
    for (let index = 0; index < amount; index++) {
        if(index % 2 == 0){
            colour = colours[0];
        }
        else{
            colour = colours[1];
        } // changing colours was for debugg porpuses will leave in for now plan to remove it later
        let x1 = lastX - 1;
        let y1 = lastY - 1;
        let x2 = lastX + getRandomIntRange(100,600);
        let y2 = heightOffset(lastY);
        if (y2 < 10){y2 = Math.abs(y2) * 2};
        drawLine(x1,y1,x2,y2,colour, 10);
        lastX = x2;
        lastY = y2;
        topPath.push(x2,y2); // store the cordanits to trace with 
    }
}

function start(){
    svg.innerHTML = '';
    if (userSize.value.length == 0){
        userSize.value = 6; //just a default value makes life easy
    }
    linesdrawing(userSize.value);
    drawBackground();
    svg.style.width = topPath[topPath.length - 2] // X value --> pixels just allows the full thing to show
}
start();
let pain = new easyRoute(100);
pain.drawRoute();
