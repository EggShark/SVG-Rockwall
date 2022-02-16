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
        let viewboxSize = getRandomIntRange(2000,3000);
        let hold = this.holdPicker();
        path.setAttribute("d", holds.hands[hold]);
        asvg.appendChild(path);
        asvg.setAttribute("x",x);
        asvg.setAttribute("y",y);
        asvg.setAttribute("viewBox",`0 0 ${viewboxSize} ${viewboxSize}`);
        asvg.setAttribute("class", `st${this.routeColour}`); // classes came named as st0-8 so I use `` with an int to selec st0-8
        svg.appendChild(asvg);
    }
    drawRoute() {
        this.drawDebugLine()
        while(this.lastholdY >= 0){
            let holdY = this.lastholdY - getRandomIntRange(120,200);
            this.drawHand(this.routeCenter + getRandomInt(-300,300),holdY);
            this.lastholdY = holdY;
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
function randn_bm(value) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm(value); // resample between 0 and 1
    return Math.floor(num * value);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}