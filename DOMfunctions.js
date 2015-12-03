var body = document.querySelector("body");

  function newTag(tagType, parent){
    var elementName=document.createElement(tagType);
    parent.appendChild(elementName);
    return elementName;
  }
  function newTagText(tagType, parent, text){
    var elementName=document.createElement(tagType);
    parent.appendChild(elementName);
    elementName.textContent=text;
    return elementName;
  }
  function newImage(parent, src, height, width){
    var elementName=document.createElement("img");
    parent.appendChild(elementName);
    elementName.setAttribute("src", src);
    elementName.setAttribute("height", height);
    elementName.setAttribute("width", width);
    return elementName;
  }
