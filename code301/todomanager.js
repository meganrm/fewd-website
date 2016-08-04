//event listeners
neweventlistener('#form-newboard', 'submit', createnewboard)
neweventlistener('#new-to-do', 'submit', makenewpost)
neweventlistener('.hide-window', 'click', toggleWindow)
neweventlistener('#back-to-start', 'click', goback)

// global varibles
var start=document.querySelector('.start');
var lists=document.querySelector('.lists');
var listofnew=document.querySelector('#new');
var listofprogress=document.querySelector('#progress');
var listofdone=document.querySelector('#done');
var todowindow=document.querySelector('.new-to-do-window');
var taskboards={}
var currentboard
var statuses=['new', 'progress', 'done']
var statuses_text=['New', 'In Progress', 'Done']


readtaskboards() //intialize by looking in localstorage for the already created boards

//slides the new task window in and out.
function toggleWindow(){
  todowindow.classList.toggle('closewindow')
}

//button that takes the user back to the beginning
function goback(){
  location.reload();
}

//look for boards display names and adds event listeners
function readtaskboards(){
  if (localStorage.getItem('taskboards')) {
    var taskboardsstring = localStorage.getItem('taskboards');
    taskboards = JSON.parse(taskboardsstring)
    var boardkeys= Object.keys(taskboards)
    for (var i = 0; i < boardkeys.length; i++) {
      boardname= boardkeys[i].split('_').join(' ');
      var li=newli('.existing-boards', boardname, 'existing-boards-lis', boardkeys[i])
      neweventlistener('#'+boardkeys[i], 'click', changecurrentboard)

    }
  }
  else{
    console.log('no boards');
  }
}

//updates the current active board
function changecurrentboard(){
  currentboard=event.target.textContent.split(' ').join('_')
  readposts(currentboard)
}

//create an empty board and make it current
function createnewboard(){
  event.preventDefault()
  var username=document.querySelector('#username').value.split(' ').join('_');
  if (!username) {
    username=prompt('Please enter your name')
  }
  console.log(username);
  var boardname=document.querySelector('#boardname').value.split(' ').join('_');
  if (!boardname) {
    boardname=prompt('Please enter a name for your board')
  }
  var newBoard={
    'username':username,
    'posts':[]
  }
  taskboards[boardname]=newBoard
  currentboard=boardname
  // console.log(newBoard);
  localStorage.setItem('taskboards', JSON.stringify(taskboards))

  readtaskboards();
  readposts(boardname)
}

//read the posts in a board
function readposts(currentboard){
  start.classList.add('hide');
  lists.classList.remove('hide');
  board=taskboards[currentboard]
  posts = board['posts']
  for (var i = 0; i < posts.length; i++) {
    appendposts(posts[i])
  }


}

//moves the posts on the DOM and changes the status in the golabal task list
function updatepost(){
  event.preventDefault;
  for (var i = 0; i < posts.length; i++) {
    post=posts[i]
    if ('id'+post['time']==this.parentElement.getAttribute('id') ) {
      post['status']=this.value;
      writetaskboards()
    }
  }
  if (this.value=='progress') {
    listofprogress.appendChild(this.parentElement)
  }
  else if (this.value=='done') {
    listofdone.appendChild(this.parentElement)
  }
  else {
    listofnew.appendChild(this.parentElement)

  }
}


//appends a new post to the DOM
function appendposts(post){
  status=post['status']
  title=post['title']
  content=post['discription']
  timeline=post['timeline']
  time=post['time']
  var li= newli('#'+status, title, timeline, 'id'+time)
  var discription= newTagText('p', '#id'+time, content)
  var submittedby=newTagText('div', '#id'+time, 'Submitted by: '+post['author']);

  var currentstatus = document.createElement('select')
  currentstatus.setAttribute('class', "Status")
  li.appendChild(currentstatus);
  for (var i = 0; i < statuses.length; i++) {
    var option= document.createElement('option')
    option.setAttribute('value', statuses[i])
    option.textContent=statuses_text[i]
    currentstatus.appendChild(option)
  }
  currentstatus.addEventListener('change', updatepost)
  currentstatus.value=status
}


//create a new post to pass to the DOM and to the gobal list in local storage
function makenewpost(){
  event.preventDefault()

  post={
    'title': document.querySelector('.Type').value,
    'author': 'megan',
    'discription':document.querySelector('#discription').value,
    'timeline':document.querySelector('#time-select').value,
    'status':'new',
    'time': new Date().getTime()
  }
  document.querySelector('#discription').value = "";
  taskboards[currentboard]['posts'].push(post);
  writetaskboards();
  appendposts(post)

}

//update the local storage
function writetaskboards(){
  localStorage.setItem('taskboards', JSON.stringify(taskboards))
}
