const picture = [
  "img/index/carousel/1.jpg",
  "img/index/carousel/2.jpg",
  "img/index/carousel/3.jpg",
];

const PICTURE_CHANGE_INTERVAL = 8000; // 轮播切换时间间隔（毫秒）

window.addEventListener("load", () => {
  const main = document.querySelector(".banner_main");
  const imageWrapper = document.querySelector(".banner_image_wrapper");
  const select = document.querySelector(".banner_select");
  const left = document.querySelector(".banner_btn_left");
  const right = document.querySelector(".banner_btn_right");

  // 初始化索引
  let index = 0;

  // 创建 DocumentFragment，用于存储图片和小圆点
  const imageFragment = document.createDocumentFragment();
  const dotFragment = document.createDocumentFragment();

  // 动态生成图片标签
  picture.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("banner_image");
    imageFragment.appendChild(img); // 将图片放入 fragment
  });

  // 将图片 fragment 一次性插入到 imageWrapper 中
  imageWrapper.appendChild(imageFragment);

  // 获取所有动态生成的图片
  const images = document.querySelectorAll(".banner_image");

  // 动态生成小圆点
  picture.forEach((src, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.index = i; // 使用data-index存储索引
    dotFragment.appendChild(dot); // 将小圆点放入 fragment
  });

  // 将小圆点 fragment 一次性插入到 .select 中
  select.appendChild(dotFragment);

  const dots = document.querySelectorAll(".dot");

  // 切换图片的函数
  const changeImage = () => {
    // 隐藏当前图片
    images.forEach(image => image.classList.remove("active"));

    // 显示新的图片
    images[index].classList.add("active");

    // 更新小圆点
    dots.forEach(dot => dot.classList.remove("check"));
    dots[index].classList.add("check");
  };

  // 切换到下一张图片
  const nextImage = () => {
    index = (index + 1) % picture.length;
    changeImage();
  };

  // 切换到上一张图片
  const prevImage = () => {
    index = (index - 1 + picture.length) % picture.length;
    changeImage();
  };

  // 向右按钮点击事件
  right.addEventListener("click", nextImage);

  // 向左按钮点击事件
  left.addEventListener("click", prevImage);

  // 鼠标移入停止轮播，移出开始轮播
  let carouselTimer;
  main.addEventListener("mouseover", () => {
    clearInterval(carouselTimer);
  });

  main.addEventListener("mouseout", () => {
    carouselTimer = setInterval(nextImage, PICTURE_CHANGE_INTERVAL);
  });

  // 小圆点点击事件
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      changeImage();
    });
  });

  // 自动轮播
  carouselTimer = setInterval(nextImage, PICTURE_CHANGE_INTERVAL);
  images[0].classList.add("active");
  dots[0].classList.add("check");

  // 初始化第一张图片
  changeImage();
});
