;(function(window){
	

	var speedList={
		"faster":2000,
		"slower":4000,
		"normal":3000
	};
	// Slider1 ��������  ��һ��Ϊ������ ID �ڶ���Ϊ���� ����
	function Slider1(containerId,conf){

		// ����������Ϊ�������ԣ����߱���
		var defaultConf = {
			"isAuto":true,
			"speed":"normal",
			"startIndex":0,
			"isClickable":true
		};
		// if(conf)
		// 	extend(defaultConf,conf); //��һ���defaultConf��������оͻ�����û�������

		conf && extend(defaultConf,conf);

		console.info(defaultConf);
		this.container = $(containerId);
		this.slideList = $get($get(this.container,"ul")[0],"li");//
		//this.indexList = $get($get(this.container,"ol")[0],"li");//����ָʾ��
		this.num = this.slideList.length;
		this.indexList = createIndexList.call(this);//����ָʾ��

		this.leftBtn = createLinkBtn.call(this,"left"); //������ť
		this.rightBtn = createLinkBtn.call(this,"right"); //������ť
	
		this.txtDiv = createTxtDiv.call(this);//��������˵��������
		
		this.currentIndex = defaultConf.startIndex;		//��ǰ�����ֲ�ͼ����ʾ�� �ڼ� ��

		init.call(this,this.currentIndex);				//��ʼ�� ��������li�����أ��ѵ�һ����ʾ����

		this.timer ;	
		if(typeof defaultConf.speed =="string")
			this.speed = speedList[defaultConf.speed] || 2000;
		else if (typeof defaultConf.speed =="number") {
			this.speed = defaultConf.speed;
		}
		if( defaultConf.isAuto )
			this.auto();

		bindEvent.call(this,defaultConf);           //���¼�

	}

	var createTxtDiv = function (){

		console.info(this);

		//1.����div�����û������Լ���ʽ
		var div = $create("div",{className:"mask"},{})
		div.innerHTML = "";
		//2.��ӵ�������
		this.container.appendChild(div);
		//3.����
		return div;
	}

	Slider1.prototype.auto = function(){
		var that = this;
		this.timer = setInterval(function(){
			// that.rightBtn.onclick();
			that.rightBtn.click();

		},that.speed);

		// console.info("��ʱ��"+this.timer+"����");
	}
	var createLinkBtn = function(dir){
		//1.����һ��domԪ�� ���û��������ԣ�ͬʱ������ʽ��
		var span = $create("span",{className:"btn"+dir},{
			
		});
		
		//3.������ӵ�������
		this.container.appendChild(span);
		//4.����
		
		return span;
	}
	var createIndexList = function(){	//����ol li�ṹ
		//ol>li
		var ol = $create("ol"); //����ol

		var lis=[];				//�������е�ol�е�li
		for (var i = 0; i < this.num; i++) {
			var li = $create("li");
			ol.appendChild(li);
			lis.push(li);		//�ӵ�������
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

		//���µ�ǰ������
		this.currentIndex = indexabc;

		//��������˵��
		var txt = $get(this.slideList[indexabc],"img")[0].alt ;
		this.txtDiv.innerHTML = txt;
	//	console.info("��ǰ��:"+this.currentIndex);
	}
	var bindEvent = function(defaultConf){
		var that = this; /*var �ܲ���ʡ*/
		//��ָʾ�����¼�
		if( defaultConf.isClickable){
			for (var i = 0; i < this.num; i++) {
				this.indexList[i].index = i;
				this.indexList[i].onmouseenter = function(){
					that.moveto(this.index);
				}
			} 
		}
		
		this.rightBtn.onclick = function(){
			//���ң���ʾ��һ�� ��ǰ������ֵҪ+1
			var i = that.currentIndex + 1;
			// i = (i== that.num) ? 0 : i; 
			i = i % that.num;
			that.moveto(i);
		}

		//�󶨰�ť���¼�
		this.leftBtn.onclick = function(){
			//btnLeft ������ʾ��һ��
			var i = that.currentIndex - 1;  //��һ�ŵı��
			//���������-1,Ӧ��Ҫ��ʾ���һ��,���һ�ŵ�����ֵ��that.num-1��
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