let svg = document.getElementById("background");
class easyRoute{
    constructor(routeCenter){
        this.routeCenter = routeCenter;
        this.lastholdY = 2000;
    }
get center() {
    return this.routeCenter;
}
drawHand(x,y){
    let asvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let hold = getRandomIntRange(0,holds.hands.length);
    let viewboxSize = getRandomIntRange(2000,3000);
    path.setAttribute("d", holds.hands[hold]);
    asvg.appendChild(path);
    asvg.setAttribute("x",x);
    asvg.setAttribute("y",y);
    asvg.setAttribute("viewBox",`0 0 ${viewboxSize} ${viewboxSize}`);
    svg.appendChild(asvg);
}
drawRoute() {
    for (this.lastholdY > 0; this.lastholdY = this.lastholdY - 200;){
        this.drawHand(this.routeCenter + getRandomIntRange(-200,200),this.lastholdY);
    }
}
    chanceSelector(y) {}
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