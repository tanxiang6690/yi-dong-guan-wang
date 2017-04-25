$(function() {
	/*
	 *list是一级导航菜单的类 className;
	 *item是每个导航里面的二级导航菜单的类 className;
	 *obj1:是一级参数;
	 *obj2:是二级参数;
	 */
	function navList(obj1, obj2) {
		/*导航下拉菜单开始*/
		var fatherObj = document.getElementsByClassName(obj1);
		var sonObj = document.getElementsByClassName(obj2);
		/*
		 *同样的操作可以加for循环，循环分给每一个元素添加onmouseover/onmouseout
		 */
		for (var i = 0; i < fatherObj.length; i++) {
			fatherObj[i].index = i;
			/*如果这儿没有这步，在解析for循环的时候不会首先解析里面的内容，会报元素越界错误；
			所以给fatherObj添加一个属性index，把对象的index保存在下标里面，onmouseover里面可以调用*/
			fatherObj[i].onmouseover = function() {
				sonObj[this.index].style.display = "block";
				//animate(sonObj[this.index],{height:40},Tween.Linear);
			}
			fatherObj[i].onmouseout = function() {
				sonObj[this.index].style.display = "none";
				//animate(sonObj[this.index],{height:0},Tween.Linear);
			};
		};
		/*导航下拉菜单结束*/
	};

	/*
	 *banner轮播图开始
	 *bannerContainer:最大的父元素                                        fatherObj
	 *aS:bannerContainer下面a链接的集合,bannerContainer>a>img
	 *lis:指示点的集合,bannerContainer>ul.bannerPage>li                   pageLi
	 *btnL:左按钮,bannerContainer>div.btn>span.btnL                       btnL
	 *btnR:右按钮,bannerContainer>div.btn>span.btnR                       btnR
	 */
	function swiperBanner(fatherObj, pageObj, pageBtnL, pageBtnR) {
		var bannerContainer = document.getElementById(fatherObj),
			aS = $("a", bannerContainer);
		var lis = $("li", document.getElementById(pageObj)),
			num = 0,
			btnL = document.getElementById(pageBtnL),
			btnR = document.getElementById(pageBtnR);
		aS[0].style.zIndex = 10; //aS层级的初始化
		btnR.style.display = "none"; //btnR的初始化
		btnL.style.display = "none"; //btnL的初始化
		var t = setInterval(moveR, 2000);
		bannerContainer.onmouseover = function() {
			clearInterval(t);
			btnL.style.display = "block";
			btnR.style.display = "block";
		}
		bannerContainer.onmouseout = function() {
			t = setInterval(moveR, 2000);
			btnL.style.display = "none";
			btnR.style.display = "none";
		}
		for (var i = 0; i < lis.length; i++) {
			lis[i].index = i;
			lis[i].onclick = function() {
				if (num == this.index) {
					return;
				}
				for (var j = 0; j < aS.length; j++) {
					//aS[j].style.zIndex=5;         //用层级实现跳转
					animate(aS[j], {
							opacity: 0
						}) //用透明度实现跳转
					lis[j].className = ""; //初始状态
				}
				lis[this.index].className = "hot";
				//aS[this.index].style.zIndex=10;
				animate(aS[this.index], {
					opacity: 1
				});
				num = this.index; //更新num
			}
		}
		var flag = true;
		btnR.onclick = function() {
			if (flag) {
				flag = false;
				moveR();
			}
		}
		btnL.onclick = function() {
			if (flag) {
				flag = false;
				moveL();
			}
		}

		function moveR() {
			num++;
			if (num == aS.length) {
				num = 0;
			}
			for (var i = 0; i < aS.length; i++) {
				//aS[i].style.zIndex=5;
				animate(aS[i], {
					opacity: 0
				});
				lis[i].className = "";
			}
			lis[num].className = "hot";
			//aS[num].style.zIndex=10;
			animate(aS[num], {
				opacity: 1
			}, function() {
				flag = true;
			})
		}

		function moveL() {
			num--;
			if (num < 0) {
				num = aS.length - 1;
			};
			for (var i = 0; i < aS.length; i++) {
				//aS[i].style.zIndex=5;
				animate(aS[i], {
					opacity: 0
				})
				lis[i].className = "";
			};
			lis[num].className = "hot";
			//aS[num].style.zIndex=10;
			animate(aS[num], {
				opacity: 1
			}, function() {
				flag = true;
			});
		};
		/*banner轮播图结束*/
	}

	//所有函数的调用
	//下拉菜单的调用     
	navList("list", "item");
	//banner轮播的调用
	swiperBanner('bannerMiddle', 'bannerPage', 'btnL', 'btnR');

	/*box部分轮播图开始*/
	var boxS = $(".box")[0];
	nodeLunbo(boxS, 1);

	function nodeLunbo(obj, num) {
		var imgBox = $(".imgBox")[0];
		var boxas = $("a", imgBox);
		var widths = parseInt(getStyle(boxas[0], "width")) + 10;
		var boxBtnL = $(".boxBtnL", obj)[0];
		var boxBtnR = $(".boxBtnR", obj)[0];
		var flag = true;
		/*
		设置imgBox的宽度
		*/
		imgBox.style.width = widths * boxas.length + "px";
		var t1 = setInterval(BoxmoveL, 1000);
		obj.onmouseover = function() {
			clearInterval(t1);
			boxBtnR.style.display = "block";
			boxBtnL.style.display = "block";
		}
		obj.onmouseout = function() {
			t1 = setInterval(BoxmoveL, 1000);
			boxBtnR.style.display = "none";
			boxBtnL.style.display = "none";
		}
		boxBtnL.onclick = function() {
			if (flag) {
				flag = false;
				BoxmoveL();
			}
		}
		boxBtnR.onclick = function() {
				if (flag) {
					flag = false;
					BoxmoveR();
				}
			}
			/*
			先移动imgBox 
			把第一张图片放到最后
			*/
		function BoxmoveL() {
				animate(imgBox, {
					left: -num * widths
				}, function() {
					for (var i = 0; i < num; i++) {
						var first = firstChild(imgBox);
						imgBox.appendChild(first)
						imgBox.style.left = 0;
					}
					flag = true;
				})
			}
			/*
			先扒图动画
			1、把最后一张图片插入到最前面(imgBox.style.left=-widths)
			2、移动imgBox(left=0)
			*/
		function BoxmoveR() {
			for (var i = 0; i < num; i++) {
				var last = lastChild(imgBox);
				beforeChild(imgBox, last);
				imgBox.style.left = -num * widths + "px";
			}
			animate(imgBox, {
				left: 0
			}, function() {
				flag = true;
			});
		};
	};
	/*box部分轮播图结束*/


	//侧边滚动动效
	var kefu = $(".kefu")[0];
	var tu = $(".tu", kefu);
	for (var i = 0; i < tu.length; i++) {
		tu[i].index = i;
		tu[i].onmouseover = function() {
			animate(tu[this.index], {
				width: 124
			});
		}
		tu[i].onmouseout = function() {
			animate(tu[this.index], {
				width: 58
			})
		}
	}
})