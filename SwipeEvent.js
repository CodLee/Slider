function SwipeEvent(obj){
	this.obj = document.getElementById(obj);
	var p1={x:0,y:0};
	var p2={x:0,y:0};
	this.obj.addEventListener("touchstart",function(e) {
		p1.x = e.targetTouches[0].pageX;
		p1.y = e.targetTouches[0].pageY;
		//console.info(e);
	});
	this.obj.addEventListener("touchend",function(e) {
		p2.x = e.changedTouches[0].pageX;
		p2.y = e.changedTouches[0].pageY;
		if( p1.x - p2.x > 30){
			//console.info(p1.x - p2.x , "向左滑动");
			var event = document.createEvent("customEvent");
			event.initCustomEvent("swipeLeft",true,true,{dist:p1.x-p2.x});
			this.dispatchEvent(event);
		}
		else if( p2.x - p1.x > 30){
			//console.info(p1.x - p2.x , "向右滑动");
			var event = document.createEvent("customEvent");
			event.initCustomEvent("swipeRight",true,true,{dist:p2.x-p1.x});
			this.dispatchEvent(event);
		}

		if( p1.y - p2.y > 30){
			//console.info(p1.x - p2.x , "向上滑动");
			var event = document.createEvent("customEvent");
			event.initCustomEvent("swipeUp",true,true,{dist:p1.y-p2.y});
			this.dispatchEvent(event);
		}
		else if( p2.y - p1.y > 30){
			//console.info(p1.x - p2.x , "向下滑动");
			var event = document.createEvent("customEvent");
			event.initCustomEvent("swipeDown",true,true,{dist:p2.y-p1.y});
			this.dispatchEvent(event);
		}
	});
	
};

window.SwipeEvent=window.$ = SwipeEvent ;
SwipeEvent.prototype.on=function(type,callback){
	this.obj.addEventListener(type,callback);
	return this;
}