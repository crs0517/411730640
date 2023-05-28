class Bullet{
    constructor(args){ //預設值，基本資料(包含有物件的顏色、位置、速度、大小…)
    this.r = args.r || 10
    this.p = args.p || createVector(width/2,height/2)
    this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(6)
    this.color = args.color || "red" //充滿顏色
    }
    draw(){
    push()
     translate(this.p.x,this.p.y)
     fill(this.color)
     noStroke()
     ellipse(0,0,this.r)
    //  rectMode(CENTER)
    //  rect(0,0,20,40)
    //  triangle()
    pop()
    }
    update(){
     this.p.add(this.v)
    }
}