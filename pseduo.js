function formSubmitted(event) {
  event.preventDefault();
  var url = "http://api.elsevier.com/content/search/scopus?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&query=" + $("#query").val();
 $.get("http://proxy.avandamiri.com/get?url=" + escape(url), resultsReceived)
 };


 function resultsReceived(results) {
   event.preventDefault();
     for (var i = 0; i < results['search-results']['entry'].length; i++) {
       paper= esults['search-results']['entry'];
       papers.nodes.push({"name": paper['dc:title'],'id':doi, "year": paper['prism:coverDate']});
       if (doi) {
         lookupbyDoi(i, doi);
          }
       }
   }

function lookupbyDoi(doi) {
     console.log("looupbydoi, "+doi);
     var documentUrl =  "http://api.elsevier.com:80/content/article/doi/"+doi+"?apiKey=90fdd364d32fd8c87a35004ffa0d0fcf&httpAccept=application%2Fxml";
     // testfunction(documentUrl)
     $.get("http://proxy.avandamiri.com/get?url=" + documentUrl, getcitations)
   }

function getcitations(results){
     event.preventDefault();
       var paper = $(results);
       var citationtitles = paper.find('maintitle');
       // debugger
       console.log('getcitations');
       for (var i = 0; i < citationtitles.length; i++) {
         console.log(i);
         papers.nodes.push({"name":   citationtitles[i].textContent, "year": "year"});
         numofnodes = papers.nodes.length
         papers.links.push({"source": nodeid, "target": numofnodes, "value": 1});
       }
     };
