const picture = [
  "img/index/carousel/1.jpg",
  "img/index/carousel/2.jpg",
  "img/index/carousel/3.jpg",
];

const PICTURE_CHANGE_INTERVAL = 8000;

window.addEventListener("load", () => {
  const main = document.querySelector(".banner_main");
  const imageWrapper = document.querySelector(".banner_image_wrapper");
  const select = document.querySelector(".banner_select");
  const left = document.querySelector(".banner_btn_left");
  const right = document.querySelector(".banner_btn_right");

  let index = 0;

  const imageFragment = document.createDocumentFragment();
  const dotFragment = document.createDocumentFragment();

  picture.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("banner_image");
    imageFragment.appendChild(img);
  });

  imageWrapper.appendChild(imageFragment);

  const images = document.querySelectorAll(".banner_image");

  // 小圆点
  picture.forEach((src, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.index = i;
    dotFragment.appendChild(dot);
  });

  select.appendChild(dotFragment);

  const dots = document.querySelectorAll(".dot");

  // 切换图片
  const changeImage = () => {
    images.forEach(image => image.classList.remove("active"));

    images[index].classList.add("active");

    dots.forEach(dot => dot.classList.remove("check"));
    dots[index].classList.add("check");
  };

  const nextImage = () => {
    index = (index + 1) % picture.length;
    changeImage();
  };

  const prevImage = () => {
    index = (index - 1 + picture.length) % picture.length;
    changeImage();
  };

  right.addEventListener("click", nextImage);

  left.addEventListener("click", prevImage);

  let carouselTimer;
  main.addEventListener("mouseover", () => {
    clearInterval(carouselTimer);
  });

  main.addEventListener("mouseout", () => {
    carouselTimer = setInterval(nextImage, PICTURE_CHANGE_INTERVAL);
  });

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
