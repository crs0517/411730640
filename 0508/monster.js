var monster_colors = "004b23-006400-007200-008000-38b000-70e000-9ef01a-ccff33".split("-").map(a=>"#"+a)
class Monster{
constructor(args){
this.r = args.r || random(50,70)
this.p = args.p || createVector(random(width),random(height))
this.v = args.v || createVector(random(-1,1),random(-1,1))
this.color = args.color ||random(monster_colors)
this.mode = random(["happy","bad"])
}
draw(){
push()
translate(this.p.x,this.p.y)
fill(this.color)
noStroke()
ellipse(0,0,this.r)
if(this.mode == "happy"){
fill(255)
ellipse(0,0,this.r/2)
fill(0)
ellipse(0,0,this.r/3)
}else{
fill(255)
arc(0,0,this.r/2,this.r/2,0,PI)
fill(0)
arc(0,0,this.r/3,this.r/3,0,PI)
}
stroke(this.color)
strokeWeight(4)
//line(this.r/2,0,this.r,0)
noFill();
for(var j=0;j<8;j++){
rotate(PI/4)
beginShape()
for (var i=0;i<(this.r/2);i++){
vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
}
endShape()
}
pop()
}
update(){
this.p.add(this.v)
//碰壁的處理程式碼
if(this.p.x<0 || this.p.x>=width)
{
this.v.x = -this.v.x
}
if(this.p.y<=0 || this.p.y>=width)
{
this.v.y = -this.v.y
}
}}