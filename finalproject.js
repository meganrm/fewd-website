
$("#scopus-search-form").submit(formSubmitted);

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

function animationli() {
	$('.title').each(function(i) {
	$(this).delay((i++) * 500).fadeTo(1000, 1); })
};

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

function formSubmitted(event) {
  event.preventDefault();
  var url = "http://api.elsevier.com/content/search/scopus?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&query=" + $("#query").val();
 $.get("http://proxy.avandamiri.com/get?url=" + escape(url), resultsReceived)

 };

var nodeid=0

function resultsReceived(results) {
  event.preventDefault();
  if (results['search-results']['entry']) {
    $("#scopus-search-form").addClass('hide')
    nodeid=nodeid+results['search-results']['entry'].length
    for (var i = 0; i < results['search-results']['entry'].length; i++) {
      var paper = results['search-results']['entry'][i];
      var doi =paper['prism:doi'];
      var scopusids= paper['dc:identifier'].split(':')
      var scopusid= scopusids[1]

      // console.log(scopusid);
      var year= paper['prism:coverDate'];
      var date = year.split('-');
      var year = date[0]
      var li = newlistitem('#titles', paper['dc:title'], 'title', doi);
      papers.nodes.push(
      {"name": paper['dc:title'],
      'scopusid':scopusid,
      "year": year,
      "value": paper['citedby-count'],
      "doi":doi
        });
      if (doi) {
        lookupbyDoi(doi);
      }
      else {
        console.log("no doi");
        console.log(paper);
        lookupbyScopus(scopusid);
      }

    }
    animateli()
  }
  else{alert("nothing was returned")};


}



function lookupbyScopus(doi) {
  // console.log("looupbydoi, "+doi);
  var documentUrl =  "http://api.elsevier.com:80/content/article/scopus_id/"+doi+"?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&httpAccept=text/xml&view=FULL";
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
    // console.log('getcitations', citationtitles.length);
    iterator = iterator+1

    if (citationtitles.length==0) {
      // console.log(results);
    }
    for (var i = 0; i < citationtitles.length; i++) {
      // console.log("paper looking up "+doi[0].textContent+", "+citationtitles[i].textContent);
      papers.nodes.push({"name":   citationtitles[i].textContent, "year": 1999, 'value': 3});
      papers.links.push({"sourcedoi": doi[0].textContent, "target": papers.nodes.length-1, "value": 1});
      iterator = iterator+1
      console.log(citationtitles[i]);
    }

    if (iterator ==nodeid){
      localStorage.setItem('paperStorage', JSON.stringify(papers))
      $("#titles").addClass('hide')
      runViz()
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
  var delay = 300; //millisecond delay between cycles
  function cycleThru(){
          var jmax = $("ul li").length -1;
          $("ul li:eq(" + j + ")")
                  .animate({"opacity" : "1"} ,400)
                  .animate({"opacity" : "1"}, delay)
                  .animate({"opacity" : "0"}, 400, function(){
                          (j == jmax) ? j=0 : j++;
                          cycleThru();
                  });
          };

  cycleThru();

                   };
