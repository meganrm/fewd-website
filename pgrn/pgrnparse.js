var dataset = []

for (var i = 0; i < responses.responses.length; i++) {
  var array = responses.responses[i];
  var name = array['Q3_7_TEXT'];
  displayname = checkfirstname(name);

  if (name && name!='Revathy N'&& name !=
 'Lee, Yee Ming' &&  name !='u1252073' && name != 'Rossiter, Jennifer' && name != 'Niloufar Farzan') {
      var isnew = true;
      if (dataset.length>=1) {
          isnew = checkNew(name)
          }

      if (isnew){
        var dieaseList = allAnswers("Q7", array);
        var expertiseList = allAnswers("Q8", array);
        var resourceList = allAnswers("Q15", array);

        dataset.push({
          "name":displayname,
          "email": array['Q3_1_TEXT'],
          "phone": array['Q3_2_TEXT'],
          "address": array['Q3_3_TEXT'],
          "title": array['Q3_4_TEXT'],
          "intitution": array['Q3_5_TEXT'],
          "other": array['Q6'],
          "dieases": dieaseList.join(', '),
          "expertise": expertiseList.join(', '),
          "resources": resourceList.join(', '),
          })
        }


  }
}
function checkNew(newname){
  for (var i = 0; i < dataset.length; i++) {
    if (newname == dataset[i].name){
      console.log("repeat, "+newname+', '+dataset[i].name);
      return false;
      }
      else {
        return true
      };
  }
}

function checkfirstname(name){
  if (name.includes(',')) {
    return name;
  }
  else if (name.includes(' ')) {
    var fullname= name.split(' ')
    return fullname[1]+', '+fullname[0]
  }
  else return name;
}

function allAnswers(question, obj){
  var answers = []
  var ondeck=[];

  for (key in obj){
    // debugger
    if (obj.hasOwnProperty(key)){
      if(key.indexOf(question)===0){
        // debugger
        // console.log(key, obj[key]);


          if (obj[key].includes('type')||obj[key].includes('describe')||obj[key].includes('specify')) {
            // debugger
            if (obj[key]) {
              var newvalue=obj[key].replace(/ *\([^)]*\) */g, "")
              var newobj={}
              var newkey=key+"_TEXT"
              newobj[newkey]=newvalue
              ondeck.push(newobj);

              console.log('newkey='+newkey+'newvalue='+newvalue);
              }

          }
          else if (key.includes("TEXT")) {

            console.log(key, obj[key], ondeck);
            for (var i = 0; i < ondeck.length; i++) {
              if (ondeck[i].hasOwnProperty(key)){
                if (obj[key]){
                answers.push(ondeck[i][key]+':'+obj[key])
                console.log("ondeck and obj "+ondeck[i][key]+':'+obj[key]);
              }
                else {
                  answers.push(ondeck[i][key])
                  console.log("ondeck only "+ondeck[i][key]+':'+obj[key]);

                }

            }
          }
          }


          else if (obj[key]){
            console.log("pushed"+obj[key]);
            answers.push(obj[key])
          }

        }

    }
  }
  return answers

  }
  // console.log(answers);



var approved = {dataset}
