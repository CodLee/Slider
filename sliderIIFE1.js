;(function(window){
	

	var speedList={
		"faster":2000,
		"slower":4000,
		"normal":3000
	};
	// Slider1 两个参数  第一个为容器的 ID 第二个为对象 参数
	function Slider1(containerId,conf){

		// 将配置项设为自有属性，或者变量
		var defaultConf = {
			"isAuto":true,
			"speed":"normal",
			"startIndex":0,
			"isClickable":true
		};
		// if(conf)
		// 	extend(defaultConf,conf); //这一句后，defaultConf这个对象中就会包含用户的设置

		conf && extend(defaultConf,conf);

		console.info(defaultConf);
		this.container = $(containerId);
		this.slideList = $get($get(this.container,"ul")[0],"li");//
		//this.indexList = $get($get(this.container,"ol")[0],"li");//数字指示条
		this.num = this.slideList.length;
		this.indexList = createIndexList.call(this);//数字指示条

		this.leftBtn = createLinkBtn.call(this,"left"); //创建按钮
		this.rightBtn = createLinkBtn.call(this,"right"); //创建按钮
	
		this.txtDiv = createTxtDiv.call(this);//创建文字说明的区域
		
		this.currentIndex = defaultConf.startIndex;		//当前整个轮播图中显示的 第几 张

		init.call(this,this.currentIndex);				//初始化 把其它的li都隐藏，把第一个显示出来

		this.timer ;	
		if(typeof defaultConf.speed =="string")
			this.speed = speedList[defaultConf.speed] || 2000;
		else if (typeof defaultConf.speed =="number") {
			this.speed = defaultConf.speed;
		}
		if( defaultConf.isAuto )
			this.auto();

		bindEvent.call(this,defaultConf);           //绑定事件

	}

	var createTxtDiv = function (){

		console.info(this);

		//1.创建div，设置基本属性及样式
		var div = $create("div",{className:"mask"},{})
		div.innerHTML = "";
		//2.添加到容器中
		this.container.appendChild(div);
		//3.返回
		return div;
	}

	Slider1.prototype.auto = function(){
		var that = this;
		this.timer = setInterval(function(){
			// that.rightBtn.onclick();
			that.rightBtn.click();

		},that.speed);

		// console.info("定时器"+this.timer+"开动");
	}
	var createLinkBtn = function(dir){
		//1.创建一个dom元素 设置基本的属性，同时设置样式。
		var span = $create("span",{className:"btn"+dir},{
			
		});
		
		//3.把它添加到容器中
		this.container.appendChild(span);
		//4.返回
		
		return span;
	}
	var createIndexList = function(){	//创建ol li结构
		//ol>li
		var ol = $create("ol"); //创建ol

		var lis=[];				//保存所有的ol中的li
		for (var i = 0; i < this.num; i++) {
			var li = $create("li");
			ol.appendChild(li);
			lis.push(li);		//加到数组中
		}
		this.container.appendChild(ol);
		return lis;
	}

	Slider1.prototype.moveto = function(indexabc){
		for(var i = 0; i< this.num; i++){
			this.slideList[i].style.display = "none";
			this.indexList[i].style.backgroundColor="red";
		}
		this.slideList[indexabc].style.display = "block";
		this.indexList[indexabc].style.backgroundColor="blue";

		//更新当前的索引
		this.currentIndex = indexabc;

		//更新文字说明
		var txt = $get(this.slideList[indexabc],"img")[0].alt ;
		this.txtDiv.innerHTML = txt;
	//	console.info("当前是:"+this.currentIndex);
	}
	var bindEvent = function(defaultConf){
		var that = this; /*var 能不能省*/
		//绑定指示条的事件
		if( defaultConf.isClickable){
			for (var i = 0; i < this.num; i++) {
				this.indexList[i].index = i;
				this.indexList[i].onmouseenter = function(){
					that.moveto(this.index);
				}
			} 
		}
		
		this.rightBtn.onclick = function(){
			//向右，显示下一张 当前的索引值要+1
			var i = that.currentIndex + 1;
			// i = (i== that.num) ? 0 : i; 
			i = i % that.num;
			that.moveto(i);
		}

		//绑定按钮的事件
		this.leftBtn.onclick = function(){
			//btnLeft 向左，显示上一张
			var i = that.currentIndex - 1;  //上一张的编号
			//如果它等于-1,应该要显示最后一张,最后一张的索引值是that.num-1。
			//i = (i==-1) ? that.num-1 : i;
			i = (i+that.num) % that.num;
			//i = i < 0 ? that.num+i : i;
			that.moveto(i);
		}
		if(defaultConf.isAuto) {
			this.container.onmouseenter = function(){
				// console.info("stop");
				clearInterval(that.timer);

			}
			this.container.onmouseleave = function(){
				// console.info("go on");

				that.auto();
			}
		}
	}
	var init = function(yourlikeIndex){
		if( yourlikeIndex)
			this.moveto(yourlikeIndex);
		else
			this.moveto(0);
	}

	window.Slider1 = Slider1;

})(window);