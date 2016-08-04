dataset.sort(function(a, b){
 // var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
 if (a.name < b.name) //sort string ascending
  return -1
 if (a.name > b.name)
  return 1
 return 0 //default return value (no sorting)
})

function newTagjQuery(tagType, parent, text, newclass){
  var elementName=$('<'+tagType+'>');
  elementName.appendTo(parent).text(text).addClass(newclass);
  return elementName;
}

function newlistitem(listid, text, id) {
  var li= newTagjQuery('li', listid, text);
  li.attr(id);
  return li;
}

for (var i = 0; i < dataset.length; i++) {
  var name = dataset[i]['name'];
  console.log('start'+name);
  if (name.includes('PhD')){
    name= name.replace("PhD", " ");
    console.log("no PhD"+name);
  }
  if (name.includes('Dr.')){
    name= name.replace("Dr.", " ");
    // console.log("no Dr"+name);
  }
  if (name.includes(',')){
    var names =name.split(",");
    var fullname= names[1]+' '+names[0];
    console.log('after split fullname='+fullname);
  }
  else {
    fullname=name
    console.log('nochanges'+fullname);
  }
  var li= newlistitem(membersList, ' ',   fullname);
  newTagjQuery('span', li,  fullname, 'name')
  newTagjQuery('span', li,  dataset[i]['intitution'], 'affiliation')
}
