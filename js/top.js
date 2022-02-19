let colours = ["black","green"];
let topPath = [0,60]; // I have to put this here for the polygon path
let routeCenters = []; // will store X vaules each route will be ~ 100-200 pixels apart and will allow it
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
    pointString = pointString + `${topPath[topPath.length-2]},4000 0,4000`; // just finishes the polygon out
    polygon.setAttribute("points", pointString); // acually sets points value
    polygon.setAttribute("fill", "#d3d3d3");
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
    topPath = [0,60];
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
        drawLine(x1,y1,x2,y2,colour, 15);
        lastX = x2;
        lastY = y2;
        topPath.push(x2,y2); // store the cordanits to trace with 
    }
}

function setRouteMaxHieght(routeX){
    for (let i = 0; i < topPath.length; i += 2) {
        if (routeX >= topPath[i] && routeX <= topPath[i+2]) return(topPath[i+1] + topPath[i+3])/2; // finds if the X is in rage of a line then procedes to set the max hieght to the average of the 2 y values
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
    let routeColour = getRandomInt(holds.colours.length);
    let pain = new easyRoute(300,routeColour, setRouteMaxHieght(300));
    pain.drawRoute();
}
svg.height.baseVal.valueAsString = "4000px";
start();