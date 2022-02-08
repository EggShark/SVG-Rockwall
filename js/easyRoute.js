let svg = document.getElementById("background");
class easyRoute{
    constructor(routeCenter){
        this.routeCenter = routeCenter;
        this.chances = [0,.70,.30]; //These need to line up as chances[0] is the chance of event[0] its jank could make a dict with array
        this.events = [this.createCluster,this.createMirror,this.createLargeMove];
    }
    get center() {
        return this.routeCenter;
    }
    drawHand(x,y,width,height,colour){
        let rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect"); // temperary as the next ones will be premade svgs
        rectangle.setAttribute("x",x);
        rectangle.setAttribute("y",y);
        rectangle.setAttribute("width",width);
        rectangle.setAttribute("height",height);
        rectangle.setAttribute("fill",colour);
        svg.appendChild(rectangle);
    }
    drawFoot(x,y,radius,colour) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx",x);
        circle.setAttribute("cy",y);
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", colour);
        svg.appendChild(circle);
    }
    drawRoute() {
        let lastY = 2000;
        while(lastY > 0){
            let curY = lastY - randn_bm(200);
            this.chanceSelector(curY);
            lastY = curY;
        }
    }
    chanceSelector(y) {
        let r = Math.random()
        for (let i = 0; i < this.chances.length; i++) {
            if(r < this.chances[i]) {
                this.events[i](y,this);
                return 0;
            }
            else {
                r = r - this.chances[i];
            }
        }
        console.warn("chances did not add up to 100 and couldnt decide");
    }
    // I have to pass all of these function obj/this as it belives the array is this
    createCluster(curY, obj){
        console.log("clustor");
    }
    createLargeMove(curY, obj){
        let x = obj.routeCenter + getRandomIntRange(-30, 50);
        let x2 = obj.routeCenter + getRandomIntRange(-50, 30);
        let y = curY + getRandomIntRange(10,30);
        let y2 = curY + getRandomIntRange(80,100);
        let footY = (y2 + y)/2
        obj.drawHand(x, y, 40, 10, "white"); // hold at the bottom
        obj.drawHand(x2, y2, 40, 10, "white"); // hold at the top
        obj.drawFoot(x + getRandomIntRange(-10,10), footY, getRandomIntRange(5,10), "red"); // foot hold for when you stick the move
    }
    createMirror(curY, obj){
        let x = obj.routeCenter + randn_bm(300);
        let hand2x = x - getRandomIntRange(80,100);
        let hand2y = curY + getRandomInt(100,90);
        obj.drawHand(x,curY,getRandomIntRange(20,40),getRandomIntRange(10,20),"white");
        obj.drawHand(hand2x, hand2y, getRandomIntRange(20,40), getRandomIntRange(10,20),"white");
        obj.drawFoot(x + getRandomIntRange(-30, 30), curY + getRandomIntRange(40,60), getRandomIntRange(5,10), "red");
        obj.drawFoot(hand2x + getRandomIntRange(-30, 30), hand2y + getRandomIntRange(40,60), getRandomIntRange(5,10), "red");
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