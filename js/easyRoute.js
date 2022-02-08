let svg = document.getElementById("background");
class easyRoute{
    constructor(routeCenter){
        this.routeCenter = routeCenter;
        this.chances = [.70,.20,.5];
        this.events = [this.createCluster,this.createAverage,this.createLargeMove];
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
            this.chanceSelector();
            let curY = lastY - randn_bm(200);
            let x = this.routeCenter + randn_bm(300);
            let hand2x = x - getRandomIntRange(80,100);
            let hand2y = curY + getRandomInt(100,90);
            this.drawHand(x,curY,getRandomIntRange(20,40),getRandomIntRange(10,20),"white");
            this.drawHand(hand2x, hand2y, getRandomIntRange(20,40), getRandomIntRange(10,20),"white");
            this.drawFoot(x + getRandomIntRange(-30, 30), curY + getRandomIntRange(40,60), getRandomIntRange(5,10), "red");
            this.drawFoot(hand2x + getRandomIntRange(-30, 30), hand2y + getRandomIntRange(40,60), getRandomIntRange(5,10), "red");
            lastY = curY;
        }
    }
    chanceSelector() {
        let r = Math.random()
        for (let i = 0; i < this.chances.length; i++) {
            console.log(r, this.chances[i], i, "pre check")
            if(r < this.chances[i]) {
                console.log(r, this.chances[i]);
                this.events[i](100);
                return 0;
            }
            else {
                console.log("hmmm")
                r = r - this.chances[i];
                console.log(r, i, this.chances.length, "hmmm")
            }
        }
        console.warn("chances did not add up to 100 and couldnt decide");
    }
    createCluster(y){
        console.log("clustor");
    }
    createLargeMove(y){
        console.log("DYNOOO");
    }
    createAverage(y){
        console.log("average");
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