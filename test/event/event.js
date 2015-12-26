var EventEmitter=require('events').EventEmitter;

var attack= new EventEmitter();

//attack.setMaxListeners(13);修改最大监听数

var mr=50;
var zz=50;

function attact1(who){
	mr=mr-10
	if(mr>0)
	{console.log('佐助对'+who+'使用了千鸟对其造成了10点伤害'+',血量还有'+mr)}
	else
	{console.log('佐助对'+who+'使用了千鸟对其造成了10点伤害'+',血量还有'+mr+',佐助胜利')}	
}

//addEventlistener = on

attack.on('mr',attact1);

attack.on('zz',function(who){
	zz=zz-10
	if(zz>0)
	{console.log('鸣人对'+who+'使用了螺旋丸对其造成了10点伤害'+',血量还有'+zz)}
	else
	{console.log('鸣人对'+who+'使用了螺旋丸对其造成了10点伤害'+',血量还有'+zz+',鸣人胜利')}

});

//attack.removeListener('mr',attact1);--移除事件
//attack.removeAllListeners('zz');

//监听数
console.log(attack.listeners('mr').length);
console.log(EventEmitter.listenerCount(attack,'zz'));

//var attackmr=attack.emit('mr','鸣人');
//var attackzz=attack.emit('zz','佐助');
//console.log(attackmr+','+attackzz);-----测试是否监听


attack.emit('mr','鸣人');
attack.emit('mr','鸣人');
attack.emit('mr','鸣人');
attack.emit('mr','鸣人');
attack.emit('mr','鸣人');

attack.emit('zz','佐助');
