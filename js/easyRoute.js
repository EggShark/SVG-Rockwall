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
        let asvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let hold = this.holdPicker();
        path.setAttribute("d", holds.hands[hold]);
        path.setAttribute("fill", holds.colours[this.routeColour]);
        asvg.appendChild(path);
        asvg.setAttribute("x",x);
        asvg.setAttribute("y",y);
        svg.appendChild(asvg);
    }
    drawRoute() {
        this.drawDebugLine()
        for (let holdY = svg.height.baseVal.value; holdY > 0; holdY = holdY - getRandomIntRange(150,230)) {
            console.log("ahhhh",holdY)
            this.drawHand(this.routeCenter + getRandomIntRange(-150,150),holdY);
            
        }
    }
    holdPicker(){
        let hold = getRandomInt(holds.hands.length);
        if (hold == this.lastHoldType) return this.holdPicker(); // makes sure we dont get the same hold twice
        this.lastHoldType = hold;
        return hold;
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