
$("#scopus-search-form").submit(formSubmitted);

// for (var i = 0; i < papers.nodes.length; i++) {
//     if(papers['nodes'][i]['journal']&&(!papers['nodes'][i]['link'])){
//       console.log(papers.nodes[i])
//     }
//   }

var papers ={
  "nodes":[],
  "links":[]
};

// function animationli(ul){
//   for (var i = 0; i < ul.length; i++) {
//     ul[i].addClass('move')
//
//   }
// }

function checkDuplicate(name){
  for (var i = 0; i < papers.nodes.length; i++) {
    if (name==papers['nodes'][i]['name']){
      return i
    }
    else{
      return false
    }
  }
}

function findDuplicates(paperarray){
  // console.log(paperarray.nodes.length);
  for (var i = 0; i < paperarray.nodes.length; i++) {
    for (var k = i+1; k < paperarray.nodes.length; k++) {
      if (paperarray['nodes'][i]['name']==paperarray['nodes'][k]['name']){
          obj1keys= Object.keys(paperarray['nodes'][i])
          obj2keys= Object.keys(paperarray['nodes'][k])
          // console.log(paperarray['nodes'][i]['name']+'='+paperarray['nodes'][k]['name']);
          if (obj1keys.length>obj2keys.length) {
            // console.log('removing:'+k+'keeping:'+i);
            paperarray.nodes.splice( k, 1 );
            // console.log(paperarray);
          }
          else{
            // console.log('removing:'+i+'keeping:'+k);

            paperarray.nodes.splice( i, 1 );
            // console.log(paperarray);


          }
      }
  }
}
// console.log(papers.nodes.length);
return paperarray
}

function findmin(array){
  var currentmin = 2016;
  for (var i = 0; i < array.length; i++) {
    if (array[i]< currentmin){
      currentmin=array[i]
    }
  }
  return currentmin
}

function newTagjQuery(tagType, parent, text, newclass){
  var elementName=$('<'+tagType+'>');
  elementName.appendTo(parent).text(text).addClass(newclass);
  return elementName;
}

function newlistitem(listid, text, newclass, id) {
  var li= newTagjQuery('li', listid, text, newclass);
  li.attr('id', id);
  return li;
}

var currentquery;

//iterators
var lookupiterator = 0 //number of nodes recieved
var totalResults
var stopPoint = 1 //number of times to go through query loop
var nodeid=0 //total nodes to lookup


//inital lookup based on user query
function formSubmitted(event) {
  event.preventDefault();
  $('li').remove()
  $("#welcome").addClass('hide')

  currentquery=$("#query").val()
  stopPoint=Number($("#iterator").val())*25+1
  if (localStorage[currentquery]) { //check if already searched this term
    $("#scopus-search-form").addClass('hide')

    runViz(JSON.parse(localStorage.getItem(currentquery)))
    }
  else{//otherwise do a lookup with the current query
    var search=  $("#query").val().replace(/ /g, '%20')
    var url = "http://api.elsevier.com/content/search/scopus?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&query=" + search;
    $.get("http://proxy.avandamiri.com/get?url=" + escape(url), resultsReceived)
  }
};

//result of get(), called recursively
function resultsReceived(results) {
  event.preventDefault();
  $('ul').removeClass('hide')
  if (results['search-results']['entry']) {
    $("#scopus-search-form").addClass('hide')
    nodeid=nodeid+results['search-results']['entry'].length //update iterator stop point
    totalResults=results['search-results']['opensearch:totalResults']
    for (var i = 0; i < results['search-results']['entry'].length; i++) {
      var paper = results['search-results']['entry'][i];
      var doi =paper['prism:doi'];
      var scopusids= paper['dc:identifier'].split(':')
      var scopusid= scopusids[1]
      // console.log(scopusid);
      var year= paper['prism:coverDate'];
      var date = year.split('-');
      var year = date[0]
      // console.log(paper['prism:publicationName']);
      var li = newlistitem('#titles', paper['dc:title'], 'title', doi);
      papers.nodes.push(
      {"name": paper['dc:title'],
      'journal': paper['prism:publicationName'],
      'scopusid':scopusid,
      "year": year,
      'link': "https://scholar.google.com/scholar?q="+escape(doi),
      "value": paper['citedby-count'],
      "doi":doi
        });
      // if (doi) {
      //   papers['nodes'][i]['link']="https://scholar.google.com/scholar?q="+escape(doi),
      //   console.log('setting link:'+papers['nodes'][i]['link']);
      //
      //   lookupbyDoi(doi);
      //
      // }
      // else {
        // console.log("no doi");
        // papers['nodes'][i]['link']= "https://scholar.google.com/scholar?q="+escape(scopusid),

        console.log('setting scopus link:'+papers['nodes'][i]['link']);
        lookupbyScopus(scopusid);
      // }

    }
  }
  else{alert("nothing was returned")};
  console.log('hey there');

  if (lookupiterator==0){  animateli()//fix for double animation
  }
  lookupiterator=lookupiterator+25 //another round done
  if (lookupiterator<stopPoint&&lookupiterator<totalResults) {
    console.log('getting more papers:'+lookupiterator);
    var search=  $("#query").val().replace(/ /g, '%20')
    var url = "http://api.elsevier.com/content/search/scopus?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&query=" + search+ "&start="+lookupiterator;
   $.get("http://proxy.avandamiri.com/get?url=" + escape(url), resultsReceived)
  }
}



function lookupbyScopus(scopus) {
  // console.log("looupbydoi, "+doi);
  var documentUrl =  "http://api.elsevier.com:80/content/article/scopus_id/"+scopus+"?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&httpAccept=text/xml&view=FULL";
  // testfunction(documentUrl)
$.get("http://proxy.avandamiri.com/get?url=" + documentUrl, getcitations)
}

function lookupbyDoi(doi) {
  // console.log("looupbydoi, "+doi);
  var documentUrl =  "http://api.elsevier.com:80/content/article/doi/"+doi+"?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&httpAccept=text/xml&view=FULL";
  // testfunction(documentUrl)
$.get("http://proxy.avandamiri.com/get?url=" + documentUrl, getcitations)
}
// function testfunction(url) {
//   console.log(url);
// }
var iterator=0

function getcitations(results){
  event.preventDefault();
    var paper = $(results);
    var citationtitles = paper.find('maintitle');
    if (!citationtitles){
      var citationtitles = paper.find('title');

    }
    var doi = paper.find('doi');
    nodeid=nodeid+citationtitles.length
    // debugger
    console.log('getcitations', citationtitles.length, lookupiterator);
    iterator = iterator+1


    for (var i = 0; i < citationtitles.length; i++) {
      // console.log("paper looking up "+doi[0].textContent+", "+citationtitles[i].textContent);
      papers.nodes.push({"name":   citationtitles[i].textContent, "year": 1999, 'value': 3});
      papers.links.push({"sourcedoi": doi[0].textContent, "targetname": citationtitles[i].textContent, "value": 1});
      iterator++
      // console.log(citationtitles[i]);
    }
    console.log('iterator:'+iterator+' '+'nodeid:'+nodeid);
    if (iterator ==nodeid&& lookupiterator>stopPoint){
      // findDuplicates()
      localStorage.setItem(currentquery, JSON.stringify(papers))
      $("#titles").addClass('hide')
      console.log('running viz');
      runViz(papers)
    }
  };

// for (var i = 0; i < papers.nodes.length; i++) {
//     if(papers.nodes[i]['id']){
//       console.log(papers.nodes[i]['id']);
//       nodeid=i;
//       lookupbyDoi(papers.nodes[i]['id']);
//   }
// }


function animateli() {
  var j = 0;
  var delay = 800; //millisecond delay between cycles
  function cycleThru(){
          if (!$('ul').hasClass('hide')) {

          var jmax = $("ul li").length -1;
          $("ul li:eq(" + j + ")")
                  .animate({"opacity" : "1"} ,400)
                  .animate({"opacity" : "1"}, delay)
                  .animate({"opacity" : "0"}, 400, function(){
                          (j == jmax) ? j=0 : j++;
                          cycleThru();
                  });
          }
          };

  cycleThru();

                   };
