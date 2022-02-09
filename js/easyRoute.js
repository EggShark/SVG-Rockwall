let svg = document.getElementById("background");
class easyRoute{
    constructor(routeCenter){
        this.routeCenter = routeCenter;
        this.chances = [.3,.5,.2]; //These need to line up as chances[0] is the chance of event[0] its jank could make a dict with array
        this.events = [this.createCluster,this.createMirror,this.createLargeMove];
        this.lastholdY = 2000; // we use this to check for collision
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
        while (this.lastholdY > 0) {
            this.chanceSelector(this.lastholdY);
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

        let handCount = getRandomIntRange(4,6);
        for (let i = 1; i < handCount; i++){ //starting with 1 so I can use it for * operatios to decide placement
            let handX = obj.routeCenter + randn_bm(300); 
            let y = curY - getRandomIntRange(50,90);
            obj.lastholdY = y;
            let footX = handX + getRandomIntRange(-50,50);
            let footY = y + getRandomIntRange(40,50); 
            obj.drawFoot(footX,footY,getRandomIntRange(5,10),"red");
            obj.drawHand(handX,y,getRandomIntRange(20,40), getRandomIntRange(10,20), "black");
            let r = Math.random();
            if (r < .40) {
                obj.drawHand(handX + getRandomIntRange(-100,-50), y, getRandomIntRange(20,40), getRandomIntRange(10,20),"black");
            }
            if (r > .60) {
                obj.drawFoot(footX + getRandomIntRange(-50,50),y + getRandomIntRange(40,30), getRandomIntRange(5,10),"red");
            }
            curY = y
            obj.lastholdY = y;
        }
    }
    createLargeMove(curY, obj){
        let hold1Y = curY - getRandomIntRange(20,40);
        let hold1X = obj.routeCenter + randn_bm(300);
        obj.drawHand(hold1X,hold1Y,getRandomIntRange(20,40), getRandomIntRange(10,20),"black");
        let hold2Y = hold1Y - getRandomIntRange(90,150);
        let hold2X = obj.routeCenter + randn_bm(300);
        obj.drawHand(hold2X, hold2Y, getRandomIntRange(20,40), getRandomIntRange(10,20),"black");
        let footY = (hold1Y + hold2Y)/2;
        let footX = obj.routeCenter + randn_bm(300);
        obj.drawFoot(footX,footY,getRandomIntRange(10,5),"red");
        obj.lastholdY = hold2Y;
    }
    createMirror(curY, obj){
        let hand1X = obj.routeCenter + randn_bm(300);
        let hand1Y = curY - getRandomIntRange(20,40);
        obj.drawHand(hand1X,hand1Y,50,10,"black");
        let footX1 = hand1X + getRandomInt(-100,100);
        let footY1 = hand1Y + getRandomIntRange(10,20)
        obj.drawFoot(footX1,footY1,getRandomIntRange(10,5),"red");
        let hand2X = hand1X + getRandomIntRange(100,150);
        let hand2Y = hand1Y + getRandomIntRange(20,-20);
        let footX2 = hand2X + getRandomInt(-100,100);
        let footY2 = hand2Y + getRandomIntRange(10,20)
        obj.drawFoot(footX2,footY2,getRandomIntRange(10,5),"red");
        obj.drawHand(hand2X,hand2Y,getRandomIntRange(20,40), getRandomIntRange(10,20),"black")
        obj.lastholdY = hand2Y;
    }
    collisionCheck(holdY){
        if (Math.abs(holdY-this.lastholdY)  <= 60) {
            return false
        }
    }
    collisionCheckX(holdX, lastholdX){
        if (Math.abs(holdX - lastholdX) <= 40) {
            return
        }
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