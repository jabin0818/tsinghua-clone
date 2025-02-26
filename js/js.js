// JavaScript Document
function showSubMenu(li) {
  var subMenu = li.getElementsByTagName("ul")[0];
  /*li元素下的一组ul元素 第0组*/
  if (subMenu) {
    subMenu.style.display = "block";
  }
}
function hideSubMenu(li) {
  var subMenu = li.getElementsByTagName("ul")[0];
  if (subMenu) {
    subMenu.style.display = "none";
  }
}
