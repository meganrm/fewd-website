var body = document.querySelector("body");

function newTag(tagName, options) {
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
  }
}

  function newTagText(tagType, parent, text){
    var elementName=document.createElement(tagType);
    parent.appendChild(elementName);
    elementName.textContent=text;
    return elementName;
  }


  function newTagjQuery(tagType, parent, text){
    var elementName=$('<'+tagType+'>');
    elementName.appendTo(parent);
    elementName.text(text);
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

function convertToNumber(input){
  return parseInt(input.value);
}
