var body = document.querySelector("body");


function newImage(parent, src, height, width){
  var elementName=document.createElement("img");
  parent.appendChild(elementName);
  elementName.setAttribute("src", src);
  elementName.setAttribute("height", height);
  elementName.setAttribute("width", width);
  return elementName;
}


function neweventlistener(item, listenfor, fun){
  var ele = document.querySelector(item);
  ele.addEventListener(listenfor, fun);
}



function newTagText(tagType, parent, text){
  var parent = document.querySelector(parent);
  var elementName=document.createElement(tagType);
  parent.appendChild(elementName);
  elementName.textContent=text;
  return elementName;
}

function newli(parentlist, content, classname, id){
  var li= newTagText('li', parentlist, content)
  li.setAttribute('class', classname)
  li.setAttribute('id', id)
  return li
}
