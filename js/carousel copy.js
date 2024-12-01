const picture = [
  "img/index/carousel/1.jpg",
  "img/index/carousel/2.jpg",
  "img/index/carousel/3.jpg",
];

window.addEventListener("load", function () {
  const main = document.querySelector(".banner_main");
  const bg = document.querySelector(".bg");
  const image = document.querySelector(".banner_image");
  const select = document.querySelector(".select");
  const dot = document.querySelector(".dot");
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");

  /* 设置index为0，这个变量后面就一直用来充当图片数组的下标 */
  let index = 0;

  /* 从图片数组的长度，动态添加小圆点 */
  for (let i = 0; i < picture.length; i++) {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    select.appendChild(dot);
    /* 添加自定义属性index，对应每张图片的下标 */
    dot.bianhao = i;
  }

  /* 排他思想，清除所有小圆点check样式，后面要引用这个封装函数 */
  function qingchu() {
    for (let i = 0; i < dot.length; i++) {
      dot[i].classList.remove("check");
    }
  }

  /* 切下一张图的封装函数，后面也是要引用 */
  function yunxing() {
    /* index加1 */
    index = index + 1;
    if (index == picture.length) {
      index = 0;
    }
    /* 显示图片，显示图片数组下标为目前index那张 */
    image.src = picture[index];
    /* 虚化背景也要换 */
    /*  bg.style.cssText = ` background-image: url(${picture[index]});` */

    /* 小圆点的显示 */
    qingchu();
    /* 显示那张图就显示对于的圆点，给他.check的样式 */
    dot[index].classList.add("check");

    /* 若index超过，回到-1 */
    if (index == picture.length - 1) {
      index = -1;
    }
  }

  /* 点击向右按钮时的操作 */

  right.addEventListener("click", function () {
    /* 直接用上面的切图封装函数 */
    yunxing();
  });

  /* 点击向左按钮时的操作，跟上面的切下张图封装函数异曲同工 */

  left.addEventListener("click", function () {
    index = index - 1;
    if (index == -1) {
      index = picture.length - 1;
    }
    image.src = picture[index];

    /* 向左时小圆点的显示 */
    qingchu();
    dot[index].classList.add("check");
  });

  /* 进入main这个底层盒子时，停止自动轮播和.yun类的动画效果，自动轮播的定时器我写在最后面 */

  main.addEventListener("mouseover", function () {
    clearInterval(lunbo);
    image.classList.remove("yun");
  });

  /*  离开main这个底层盒子时，开始自动轮播和.yun类的动画效果，自动轮播的定时器我写在最后面 */

  main.addEventListener("mouseout", function () {
    lunbo = setInterval(yunxing, 8000);
    image.classList.add("yun");
    image.style.animationDelay = "2s";
  });

  /*  点击小圆点时的切图操作 */
  for (let i = 0; i < picture.length; i++) {
    dot[i].addEventListener("click", function () {
      qingchu();
      this.classList.add("check");
      index = i;
      image.src = picture[index];
      bg.style.cssText = ` background-image: url(${picture[index]});`;
    });
  }

  /* 自动轮播定时器与初始状态 */

  lunbo = setInterval(yunxing, 8000);
  image.classList.add("yun");
  dot[0].classList.add("check");

  //顶部的焦点图切换
  function hotChange() {
    var current_index = 0;
    var timer = window.setInterval(autoChange, 8000);
    var button_li = document
      .getElementById("button")
      .getElementsByTagName("li");
    var pic_li = document
      .getElementById("banner_pic")
      .getElementsByTagName("li");
    for (var i = 0; i < button_li.length; i++) {
      button_li[i].onmouseover = function () {
        if (timer) {
          clearInterval(timer);
        }
        for (var j = 0; j < pic_li.length; j++) {
          if (button_li[j] == this) {
            current_index = j;
            button_li[j].className = "current";
            pic_li[j].className = "current";
          } else {
            pic_li[j].className = "pic";
            button_li[j].className = "but";
          }
        }
      };
      button_li[i].onmouseout = function () {
        timer = setInterval(autoChange, 8000);
      };
    }
    function autoChange() {
      ++current_index;
      if (current_index == button_li.length) {
        current_index = 0;
      }
      for (var i = 0; i < button_li.length; i++) {
        if (i == current_index) {
          button_li[i].className = "current";
          pic_li[i].className = "current";
        } else {
          button_li[i].className = "but";
          pic_li[i].className = "pic";
        }
      }
    }
  }
  hotChange();

  function tableChange() {
    //Table栏
    //获得#SwitchNav中所有的<li>元素
    var lis = document.getElementById("SwitchNav").getElementsByTagName("li");
    //获得#SwitchBigPic中所有的<a>元素
    var spans = document
      .getElementById("SwitchBigPic")
      .getElementsByTagName("span");
    //保存当前焦点元素的索引
    var current_index = 0;
    //启动定时器
    /*var timer = setInterval(autoChange,3000);*/
    //遍历lis，为各<li>元素添加事件
    for (var i = 0; i < lis.length; i++) {
      //<li>的鼠标移入事件
      lis[i].onmouseover = function () {
        //定时器存在时清除定时器
        /*if(timer){
					clearInterval(timer);
				}*/
        //遍历lis
        for (var i = 0; i < lis.length; i++) {
          //设置当前焦点元素的样式
          if (lis[i] == this) {
            spans[i].className = "sp";
            //保存当前索引，当恢复自动切换时继续切换
            lis[i].className = "scenery_chlik";
            current_index = i;
            //设置非当前焦点元素的样式
          } else {
            spans[i].className = "";
            lis[i].className = "";
          }
        }
      };
      //<li>的鼠标移出事件
      /*lis[i].onmouseout = function(){
				//启动定时器，恢复图片自动切换
				timer = setInterval(autoChange,3000);
			}*/
    }
    //定时器周期函数-图片自动切换
    function autoChange() {
      //自增索引
      ++current_index;
      //当索引自增达到上限时，索引归0
      /*if (current_index == lis.length) {
				current_index=0;
			}
			//遍历lis，将所有元素取消焦点样式
			for (var i=0; i<lis.length; i++) {
				spans[i].className = "";	
			}*/
      //为当前索引元素添加焦点样式
      spans[current_index].className = "sp";
    }
  }
  tableChange();
});
