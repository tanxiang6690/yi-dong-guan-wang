$(function(){
	/*导航下拉菜单开始*/
	var listS=$(".list");
	var itemS=$(".item");
	/*
      	同样的操作可以加for循环，循环分给每一个元素添加onmouseover/onmouseout
	*/
	for(var i=0;i<listS.length;i++){
		listS[i].index=i;
		/*如果这儿没有这步，在解析for循环的时候不会首先解析里面的内容，会报元素越界错误；
		所以给listS添加一个属性index，把对象的index保存在下标里面，onmouseover里面可以调用*/
		listS[i].onmouseover=function(){
			itemS[this.index].style.display="block";
			//animate(itemS[this.index],{height:40},Tween.Linear);
		}
		listS[i].onmouseout=function(){
			itemS[this.index].style.display="none";
			//animate(itemS[this.index],{height:0},Tween.Linear);
		}
	}
	/*导航下拉菜单结束*/

    /*banner轮播图开始*/
	var win=$(".bannerMiddle")[0];
	var aS=$("a",win);
	lis=$("li",$(".circle")[0]);
	var num=0;
	var btnL=$(".btnL")[0];
	var btnR=$(".btnR")[0];
	aS[0].style.zIndex=10;    //aS层级的初始化
	btnR.style.display="none";//btnR的初始化
	btnL.style.display="none";//btnL的初始化
	var t=setInterval(moveR,2000);
	win.onmouseover=function(){
		clearInterval(t);
		btnL.style.display="block";
		btnR.style.display="block";
	}
	win.onmouseout=function(){
		t=setInterval(moveR,2000);
		btnL.style.display="none";
		btnR.style.display="none";
	}
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			if(num==this.index){
				return;
			}
            for(var j=0;j<aS.length;j++){
				//aS[j].style.zIndex=5;         //用层级实现跳转
				animate(aS[j],{opacity:0})      //用透明度实现跳转
				lis[j].className="";//初始状态
		    }
		    lis[this.index].className="hot";
		    //aS[this.index].style.zIndex=10;
		    animate(aS[this.index],{opacity:1});
		    num=this.index;//更新num
		}
	}
	var flag=true;
	btnR.onclick=function(){
		if(flag){
			flag=false;
			moveR();
		}
	}
	btnL.onclick=function(){
		if(flag){
			flag=false;
			moveL();
		} 
	}
	function moveR(){
		num++;
		if(num==aS.length){
			num=0;
		}
		for(var i=0;i<aS.length;i++){
			//aS[i].style.zIndex=5;
			animate(aS[i],{opacity:0});
			lis[i].className="";
		}
		lis[num].className="hot";
		//aS[num].style.zIndex=10;
		animate(aS[num],{opacity:1},function(){
		    	flag=true;
		})
	}
	function moveL(){
		num--;
		if(num<0){
			num=aS.length-1;
		}
		for(var i=0;i<aS.length;i++){
			//aS[i].style.zIndex=5;
			animate(aS[i],{opacity:0})
			lis[i].className="";
		}
		lis[num].className="hot";
		//aS[num].style.zIndex=10;
		animate(aS[num],{opacity:1},function(){
		    	flag=true;
		})
	}
	/*banner轮播图结束*/



	/*box部分轮播图开始*/
    var boxS=$(".box")[0];
	nodeLunbo(boxS,1);
	function nodeLunbo(obj,num){
		var imgBox=$(".imgBox")[0];
		var boxas=$("a",imgBox);
		var widths=parseInt(getStyle(boxas[0],"width"))+10;
		var boxBtnL=$(".boxBtnL",obj)[0];
		var boxBtnR=$(".boxBtnR",obj)[0];
		var flag=true;
		/*
		设置imgBox的宽度
		*/
		imgBox.style.width=widths*boxas.length+"px";
		var t1=setInterval(BoxmoveL,1000);
		obj.onmouseover=function(){
			clearInterval(t1);
			boxBtnR.style.display="block";
			boxBtnL.style.display="block";
		}
		obj.onmouseout=function(){
			t1=setInterval(BoxmoveL,1000);
			boxBtnR.style.display="none";
			boxBtnL.style.display="none";
		}
		boxBtnL.onclick=function(){
		    if(flag){
		  	  flag=false;
		  	  BoxmoveL();
		    }	
	    }
	    boxBtnR.onclick=function(){
			if(flag){
			     flag=false;
			     BoxmoveR();
			}
        }
	/*
	先移动imgBox 
	把第一张图片放到最后
	*/
	function BoxmoveL(){
		animate(imgBox,{left:-num*widths},function(){
			for(var i=0;i<num;i++){
				var first=firstChild(imgBox);
				imgBox.appendChild(first)
				imgBox.style.left=0;
		    }
			flag=true;    
		})
	}
/*
先扒图动画
1、把最后一张图片插入到最前面(imgBox.style.left=-widths)
2、移动imgBox(left=0)
*/
	function BoxmoveR(){
		for(var i=0;i<num;i++){
			var last=lastChild(imgBox);
		    beforeChild(imgBox,last);
		    imgBox.style.left=-num*widths+"px";
		}
		animate(imgBox,{left:0},function(){
			    flag=true;
		    })
	    }  
	}
	/*box部分轮播图结束*/


	//侧边滚动动效
	var kefu=$(".kefu")[0];
	var tu=$(".tu",kefu);
	for (var i = 0; i < tu.length; i++) {
	    tu[i].index=i;
	    tu[i].onmouseover=function(){
	    	animate(tu[this.index],{width:124});
	    }
	    tu[i].onmouseout=function(){
	    	animate(tu[this.index],{width:58})
	    }
	}
})   
