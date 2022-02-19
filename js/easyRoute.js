let svg = document.getElementById("background");
class easyRoute{
    constructor(routeCenter, routeColour){
        this.routeCenter = routeCenter;
        this.routeColour = routeColour;
        this.lastholdY = svg.height.baseVal.value;
        this.lastHoldType = null;
    }
    get center() {
        return this.routeCenter;
    }
    drawHand(x,y){
        let newHold = new hold(x,y,this.routeColour,this.holdPicker());
        svg.append(newHold.exportHold());
    }
    holdPicker(){
        let hold = getRandomIntRange(0, holds.hands.length);
        hold = (this.lastHoldType + hold) % holds.hands.length; // funky math to ensure the same hold isnt repeated
        this.lastHoldType = hold;
        return hold;
    }
    drawRoute() {
        this.drawDebugLine()
        for (let holdY = svg.height.baseVal.value; holdY > 0; holdY = holdY - getRandomIntRange(150,230)) {
            this.drawHand(this.routeCenter + getRandomIntRange(-150,150),holdY);
        }
    }
    drawDebugLine(){
        let aline = document.createElementNS('http://www.w3.org/2000/svg', 'line'); // draws a line for debugging porpuses at the "center" of the route
        aline.setAttribute("x1",this.routeCenter);
        aline.setAttribute("y1",2000);
        aline.setAttribute("x2",this.routeCenter);
        aline.setAttribute("y2",0);
        aline.setAttribute("stroke-wdith",2);
        aline.setAttribute("stroke","black");
        svg.appendChild(aline);
    }
}

class hold{
    constructor(x,y,colour,holdType){
        this.holdType = holdType;
        this.x = x;
        this.y = y;
        this.colour = colour;
    }
    exportHold(){
        let asvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", holds.hands[this.holdType]);
        path.setAttribute("fill", holds.colours[this.colour]);
        asvg.appendChild(path);
        asvg.setAttribute("x",this.x);
        asvg.setAttribute("y",this.y);
        svg.appendChild(asvg);
        return asvg;
    }
}
function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    if(num>0.5){
        num = 1.5-num
    }
    else{
        num = 0.5 - num
    }
    return num
  }

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}