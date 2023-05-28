let points = [[0,0],[2,0],[4,2],[5,1],[5,-3],[3,-5],[8,-5],[9,-6],[12,0],[13,-1],[10,-6],[10,-12],[8,-12],[9,-11],[7,-9],[3,-9],[1,-11],[1,-12],[-1,-12],[0,-11],[0,-9],[-1,-8],[-1,-5],[-3,-3],[-3,1],[-2,2],[0,0]]; //list資料
var stroke_colors = "cad2c5-84a98c-52796f-354f52-2f3e46".split("-").map(a=>"#"+a)
var fill_colors = "2b2d42-8d99ae-edf2f4-ef233c-d90429".split("-").map(a=>"#"+a)

class Obj{
    constructor(args){ //預設值，基本資料(包含有物件的顏色、位置、速度、大小…)
    // this.p = args.p| {x: random(width),y:random(height) //一個物件開始的位置
    this.p = args.p || createVector(random(width),random(height))
    // this.v = {x: random(-1,1),y:random(-1,1)} //速度，x,y移動的速度為亂數產生-1,1之間的
    this.v = createVector(random(-1,1),random(-1,1))
    this.size = random(5,10) //放大倍率
    this.color = random(fill_colors) //充滿顏色
    this.stroke = random(stroke_colors) //線條顏色
    }
    draw() //把物件畫出來的函數
    {
    push()
    translate(this.p.x,this.p.y)
    scale((this.v.x<0?1:-1),-1) //放大縮小的指令,this.v.x<0?1:-1 ==>this.v.x<0條件成立的話，則值為1，否則為-1
    fill(this.color)
    stroke(this.stroke)
    strokeWeight(3)
    beginShape()
    for(var i =0;i<points.length-1;i=i+1){
    //line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
    vertex(points[i][0]*this.size,points[i][1]*this.size)
    //curveVertex(points[i][0]*this.size,points[i][1]*this.size)
    }
    endShape()
    pop()
    
    }
 update(){
    // this.p.x = this.p.x + this.v.x
    // this.p.y = this.p.y + this.v.y
    this.p.add(this.v)
    
    let mouseV = createVector(mouseX,mouseY)
    let delta = mouseV.sub(this.p).limit(3)
    this.p.add(delta)
     
     if(this.p.x<=0 || this.p.x>=width){
      this.v.x = -this.v.x 
     }
     if(this.p.y<=0 || this.p.y>=width){
      this.v.y = -this.v.y 
     }
    }
    isBallInRanger(x,y){
    let d = dist(x,y,this.p.x,this.p.y)
    if(d<this.size*4){
    return true
    }
    else {
    return false
    }
    }
    }
    

var ball //代表單一個物件，利用這個變數來做正在處理的物件
var balls =[] //陣列，放所有的物件資料
var bullet
var bullets = []
var score =0

function setup(){
createCanvas(windowWidth,windowHeight);
//產生幾個物件
for(j=0;j<20;j=j+1)
{
ball = new Obj({}) //產生一個新的物件，暫時放到ball變數中
balls.push(ball) //把ball物件放到balls物件群(陣列)中
}
}

function draw(){

background(220);
// for(k=0;k<balls.length;k=k+1){
// ball = balls[k]
// ball.draw()
// ball.update()
// }
text(score,50,50)
textSize(25)

for(let ball of balls){ //針對陣列變數，取出陣列內一個一個的物件
ball.draw()
ball.update()
for(let bullet of bullets){
  if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
    score = score+1
    balls.splice(balls.indexOf(ball),1)
    bullets.splice(bullets.indexOf(bullet),1)
    
  }
}
push()
  if(score< 21){
    translate(width/2,height/2)
    text("GAME WIN",0,0)
    textSize(250)
  }
pop()


}

for(let bullet of bullets){ //針對陣列變數，取出陣列內一個一個的物件
  bullet.draw()
  bullet.update() 
}

push()
 let dx = mouseX-width/2
 let dy = mouseY-height/2
 let angle = atan2(dy,dx)

 translate(width/2,height/2)
 rotate(angle)

 noStroke() 
 fill("#414833")
 ellipse(0,0,60)
 fill("#582f0e")
 triangle(50,0,-25,-25,-25,25)
pop()

}

function mousePressed(){
// 按下滑鼠產生一個
// ball = new Obj({
// p:{x: mouseX, y:mouseY }
// }) //產生一個新的物件，暫時放到ball變數中
// balls.push(ball)
// for(let ball of balls){
// if(ball.isBallInRanger()){
// score=score+1
// balls.splice(balls.indexOf(ball),1)
// }

// }
bullet = new Bullet({})
bullets.push(bullet)


}