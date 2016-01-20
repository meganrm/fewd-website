
$("#movie-search-form").submit(formSubmitted);

var papers ={
  "nodes":[],
  "links":[]
};


function formSubmitted(event) {
  event.preventDefault();
  var url = "http://api.elsevier.com/content/search/scopus?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&query=" + $("#query").val();
 $.get("http://proxy.avandamiri.com/get?url=" + escape(url), resultsReceived)

 };

var nodeid=0

function resultsReceived(results) {
  event.preventDefault();
  if (results['search-results']['entry']) {

    for (var i = 0; i < results['search-results']['entry'].length; i++) {
      // debugger
      // console.log(results['search-results']['entry'][i]['dc:title']);
      var paper = results['search-results']['entry'][i];
      var doi =paper['prism:doi'];
      // console.log(doi);
      papers.nodes.push({"name": paper['dc:title'],'id':doi, "year": paper['prism:coverDate']});
      if (doi) {
        nodeid=i;
        lookupbyDoi(doi);
      }

    }
  }
  else{alert("nothing was returned")};
}



function lookupbyDoi(doi) {
  console.log("looupbydoi, "+doi);
  var documentUrl =  "http://api.elsevier.com:80/content/article/doi/"+doi+"?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&httpAccept=application%2Fxml";
  // testfunction(documentUrl)
$.get("http://proxy.avandamiri.com/get?url=" + documentUrl, getcitations)
}
// function testfunction(url) {
//   console.log(url);
// }

function getcitations(results){
  event.preventDefault();
    var paper = $(results);
    var citationtitles = paper.find('maintitle');
    // debugger
    // console.log('getcitations');

    for (var i = 0; i < citationtitles.length; i++) {
      // console.log(i);
      papers.nodes.push({"name":   citationtitles[i].textContent, "year": "year"});
      papers.links.push({"source": nodeid, "target": papers.nodes.length, "value": 1});
    }
  };

// for (var i = 0; i < papers.nodes.length; i++) {
//     if(papers.nodes[i]['id']){
//       console.log(papers.nodes[i]['id']);
//       nodeid=i;
//       lookupbyDoi(papers.nodes[i]['id']);
//   }
// }

return papers
