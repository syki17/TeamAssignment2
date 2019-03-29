/*
File Name: toggle.js
Author: Nicholas Gardner
Website: nicholas-gardner.azurewebsites.net
Description: the file containing the toggle function
*/

// a function for toggling the visibility of an element's child
// accepts a page element, selects it's child element, and makes it visible if invisible, and vice-versa
function toggle(ele) {
  var eleChild = ele.parentElement.children[1]
  if (eleChild.style.display === "none") {
    eleChild.style.display = "block";
  } else {
    eleChild.style.display = "none";
  }
} 