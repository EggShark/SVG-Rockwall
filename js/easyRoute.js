let svg = document.getElementById("background");
class easyRoute{
    constructor(routeCenter){
        this.routeCenter = routeCenter;
        this.lastholdY = 2000; // we use this to check for collision
    }
get center() {
    return this.routeCenter;
}
drawHand(){
    let asvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", holds.hands[2]);
    asvg.appendChild(path);
    svg.appendChild(asvg);
}
drawRoute() {
    this.drawHand();
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