var dataObj=function(){
	this.fruitNum=0
	this.double=1 
	this.score=0
	this.gameOver=false
	this.alpha=0
}

dataObj.prototype.draw=function(){
	var w=can1.width
	var h=can1.height

	ctx1.fillStyle="white"
	//ctx1.fillText("黄色果实"+this.fruitNum,w*0.5,h-50)
	//ctx1.fillText("双倍果实"+this.double,w*0.5,h-80)
	ctx1.save()
	ctx1.shadowBlur=10
	ctx1.shadowColor='white'

	ctx1.fillText("SCORE: "+this.score,w*0.5,h-20)
	if(this.gameOver){
		this.alpha+=deltaTime*0.0005
		if(this.alpha>1) this.alpha=1
		ctx1.fillStyle='rgba(255,255,255,'+this.alpha+')'
		if(this.score<100){
			ctx1.fillText('小公婆真的垃圾',w*0.5,h*0.5)
		}
		if(this.score>=100 && this.score<1000){
			ctx1.fillText('矮油，不错哦',w*0.5,h*0.5)
		}
		if(this.score>=1000 && this.score<5000){
			ctx1.fillText('赏你一包金坷垃,压压精',w*0.5,h*0.5)
		}
		if(this.score>=5000){
			ctx1.fillText('干的不错我选择死亡',w*0.5,h*0.5)
		}
	}
	ctx1.restore()
}
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*10*this.double
	this.fruitNum=0 
	this.double=1
}