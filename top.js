let svg = document.getElementById("background");
let colours = ["black","green"];
let topPath = [];
let lastX = 1;
let lastY = 60;
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function heightOffset(lastY){
    let x = getRandomInt(2);
    if (x == 1) {
        return lastY + getRandomInt(100);
    }
    else {
        return lastY + -getRandomInt(100);
    }
}

function drawPolygon() {
    let pointString = ""
    let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    console.log(topPath);
    for (let i = 0; i < topPath.length; i += 2) {
        pointString = pointString + `${topPath[i]},${topPath[i+1]} `;
    }
    pointString = pointString + "2000,2000 0,2000 ";
    polygon.setAttribute("points", pointString);
    polygon.setAttribute("fill", "yellow");
    svg.appendChild(polygon);
}

for (let index = 0; index < 6; index++) {
    if(index % 2 == 0){
        colour = colours[0];
    }
    else{
        colour = colours[1];
    }
    let x1 = lastX - 1;
    let y1 = lastY - 1;
    let x2 = lastX + getRandomInt(600);
    let y2 = heightOffset(lastY);
    if (y2 < 10){y2 = 10};
    drawLine(x1,y1,x2,y2,colour, 10);
    lastX = x2;
    lastY = y2;
    topPath.push(x1,y1,x2,y2);
}
drawPolygon();