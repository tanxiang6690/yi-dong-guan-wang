/*
2016,6,4
一：getClass("one",[range]);获取带有指定class名的元素的集合,[range]:表示可传可不传，如果要传的话不能加[]
one是指定的class类名
思路：1，判断当前版本浏览器是否支持现在的属性；
         (document.getElementsByClassName)==true,直接用，否则就是false，然后进行判断;
      2，如果可以支持的话就直接用document.getElementsByClassName();
      3，不支持的话就用兼容（用已有的来模拟）
           从所有的元素里面进行挑选
           通过类名
      4，all[i].className是否包含指定的className;
      5，range：获取元素的范围；
*/
function getClass(classname,range){
	//range初始化：有三种方法：
	//1，三元表达式：var range=range?range:document;
	range=range||document;
	if(document.getElementsByClassName){  //判断浏览器是否有这样的获取方法，有的话就中心return        
        return range.getElementsByClassName(classname); 
	}else{
		var newarr=[];
		var all=range.getElementsByTagName("*");//IE6~8的获取方法
		for(var i=0;i<all.length;i++){
			//当前元素的className是否包含指定的classname
			// if(all[i].className==classname){         
			// 	newarr.push(all[i]);
			// }
			//判断当前的all[i].className中是否有指定的classname
			if(checkClass(all[i].className,classname)){//对象.className;获取对象的类名  
				newarr.push(all[i]);
			}
		}
		return newarr;
	}
}
/*"one two three"---->"one","two","three"
二：checkClass(str,classname)
检查str里面是否包含classname
思路：1，将str进行分割，转换成数组
      2，遍历数组，是否存在某一个元素等于指定的classname
      3，相等    返回true
      4，不相等  返回false 
*/
function checkClass(str,classname){
	var newarr=str.split(" ");//split("分割位置",[指定的长度])这儿表示从空格的位置开始分割
	//conlose.log(newarr);   查看str是否分割成功
	for(var i=0;i<newarr.length;i++){
		if(newarr[i]==classname){
			return true;
		}
	}
	return false;
}
/************************************************************************************

2016.6.6
获取或者设置元素的文本
三：getText(obj,[val]);一个参数表示获取，两个参数表示设置；
思路1，判断浏览器（obj.innerText）(obj.textContent);
    2，判断val参数；val是要设置获取实现的内容
    3，获取文本或者设置文本
*/
function getText(obj,val){
	if(obj.textContent){           //w3c
		if(val){
			obj.textContent=val;            //设置文本内容
		}else{
			return obj.textContent;             //获取文本内容
		}
	}else{                         //ie6-ie-8  
		if(val){
			obj.innerText=val;              //设置文本内容
		}else{
			return obj.innerText;            //获取文本内容
		}
	}
}
/**************************************************************************************

2016.6.6
四：getStyle(obj.attr)
获取/设置样式的兼容函数
思路：1，判断浏览器，obj.currentStyle
      2，obj.currentStyle.attr
      3，getComputedStyle(obj.null).attr
*/
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}
/*************************************************************************************
2016.6.6
五：获取元素的兼容函数$(select):$("div")/$("#one")/$(".one");需要三个分支，
传字符串：
	$("div")： 通过标签
	$("#one")：通过id选择
	$(".one")：通过className选择
	$("<div>"):创建一个新的div
传函数：
    传号之后执行window.onload=function(){}
思路：1，判断参数的第一个字符.#...；str.charAt(0);
      2，根据字符执行响应的分支：返回响应的元素
      3，content：获取元素的范围；
*/
function $(select,content){
    content=content||document;
    if(typeof select=="string"){
	    var first=select.charAt(0);
	    if(first=="."){           
	    	return getClass(select.substring(1),content);
	    }else if(first=="#"){
	    	return document.getElementById(select.substring(1));
	    }else if(/^[a-z][a-z1-6]{0,8}$/.test(select)){
	    	return content.getElementsByTagName(select);
	    }else if(/^<[a-z][a-z1-6]{0,8}>$/.test(select)){
	    	//div：把div的<>去掉需要截取
	    	return document.createElement(select.slice(1,-1));
	    }
    }else if(typeof select=="function"){
    	window.onload=function(){
    		select();
    	}
    }
}
/*******************************************************************************
2016.6.8
六：获取指定元素的子元素的集合和有意义的文本,默认情况为获取元素的节点
getChild(obj);
obj：指定的元素
type:指定获取元素的类型
true：只获取元素的节点
false：获取元素节点和有意义的文本节点
1，获取obj的所有的子元素
2，挑选     obj.nodeType==1说明就是元素集合
*/
function getChild(obj,type){
	type=type==undefined?true:false;
	var arr=[];
	var child=obj.childNodes;
	if(type){               //type==true||undefined的时候执行；
		for(var i=0;i<child.length;i++){
            if(child[i].nodeType==1){
        	    arr.push(child[i]);
            }
	    }
	    return arr;
	}else{
        for(var i=0;i<child.length;i++){
        	//replace.();把空白替换掉：str="a b c"-------str=["a","b","c"]
            if(child[i].nodeType==1||(child[i].nodeType==3&&child[i].nodeValue.replace(/^\s+|\s+$/g,"")!="")){
        	    arr.push(child[i]);
            }
	    }
	    return arr;
	}
}
/************************************************************************
七：获取第一个元素*/
function firstChild(obj){
	return getChild(obj)[0];
}
/************************************************************************
八：获取任意的元素*/
function randomChild(obj,num){
	return getChild(obj)[num];
}
//**********************************************
function lastChild(obj){
	var length=getChild(obj).length;
	return getChild(obj)[length-1];
}
/********************************************************************
2016.6.12
九：给最前面插入一个元素beforeChild(obj,div);
obj:父元素
div:要插入的元素
思路：1，获取第一个子元素
      2，obj.insertBefore(div,firstChild);
*/
function beforeChild(obj,child){
	var first=firstChild(obj);
	obj.insertBefore(child,first);
}
/**************************************************************************
2016.6.12
十：给后面插入一个元素：insertAfter(obj,div,ture)
获得兄弟节点的第一个;调用下面的getNext
obj:要插入的位置
ele：要插入的元素
type：类型为true时：忽略文本(true和false是getNext()的返回值)
            false时：不能忽略文本
思路：1，看是否有下一个兄弟节点
        1.1，往下一个兄弟节点的前面插入元素
      2，没有兄弟节点
        2.1，直接插入到父元素的后面
**/
function insertAfter(obj,ele,type){
	type=type==undefined?true:type;//初始化参数
	var next=getNext(obj,true);
	var parent=obj.parentNode;
	if(next){//next==true;
		parent.insertBefore(ele,next);
	}else{//next==false;
		parent.appendChild(ele);
	}
}
/*************************************************
2016.6.12
十一：获得obj下一个兄弟节点get(obj,true)，如果有兄弟
      节点则返回该节点，如果没有就返回一个false
obj：指定的对象；
type：类型为true时：忽略文本,是默认值；
            false时：不能忽略文本；
思路：1，判断是否有下一个兄弟节点
        没有：返回false
        有：2，判断next是否是一个元素节点或者有意义的文本节点
            3，更新next；继续往下寻找下一个兄弟节点；
               判断next是否是一个空
               空：返回一个false
               不为空：重复第2步；
*/
function getNext(obj,type){
	type=type==undefined?true:type;
	if(type){
	//忽略文本
		var next=obj.nextSibling;
		if(next==null){
			return false;
		}
		//当next的类型是一个注释或是文本时，继续往下循环；
		while(next.nodeType==8||next.nodeType==3){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}else{
	//不能忽略文本
	    var next=obj.nextSibling;
		if(next==null){
			return false;
		}
		//当next的类型是一个注释或是文本时，继续往下循环；
		while(next.nodeType==8||(next.nodeType==3&& !(next.nodeValue.replace(/^\s+|\s+$/g,"")))){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}
/**************************************************************
2016.6.12
十二：获取上一个兄弟元素
**/
function getPrevious(obj,type){
	type=type==undefined?true:type;
	if(type){
	//忽略文本
		var next=obj.previousSibling;
		if(next==null){
			return false;
		}
		//当next的类型是一个注释或是文本时，继续往下循环；
		while(next.nodeType==8||next.nodeType==3){
			next=next.previousSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}else{
	//不能忽略文本
	    var next=obj.previousSibling;
		if(next==null){
			return false;
		}
		//当next的类型是一个注释或是文本时，继续往下循环；
		while(next.nodeType==8||(next.nodeType==3&& !(next.nodeValue.replace(/^\s+|\s+$/g,"")))){
			next=next.previousSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}