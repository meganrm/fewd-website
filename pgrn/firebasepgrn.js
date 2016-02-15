var ref = new Firebase("https://pgrnqualtricsdate.firebaseio.com");
var userresponse = ref.child('responses');

function signin() {
  event.preventDefault()
  ref.authWithPassword({
    email    : $("#username").val(),
    password : $("#password").val()
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
  $("#sign-in").addClass('hide')
}


var fromfirebase=[]

userresponse.once("value", function(snapshot) {
  // The callback function will get called twice, once for "fred" and once for "barney"
  snapshot.forEach(function(childSnapshot) {
    // key will be "fred" the first time and "barney" the second time
    var key = childSnapshot.key();
    // childData will be the actual contents of the child
    var childData = childSnapshot.val();
    if
    fromfirebase.push(childData)
  });

  $(document).ready(function() {
    $('#directory').DataTable( {
        data: fromfirebase,
        "columns": [
            { "data": "name" },
            { "data": "email" },
            { "data": "phone" },
            { "data": "address" },
			{ "data": "title" },
			{ "data": "intitution" },
			{ "data": "other" },
			{ "data": "dieases" },
			{ "data": "expertise" },
			{ "data": "resources" }
        ],

    "scrollX": true,
	 "columnDefs": [
		{ "width": "10%", "targets": 1 },
		{ "width": "10%", "targets": 2 },
		{ "width": "20%", "targets": 3 },
		{ "width": "20%", "targets": 7 },
		{ "width": "20%", "targets": 8 },
		{ "width": "20%", "targets": 9 }
		]

	}
	);
} );
});



var approvedfb={fromfirebase}
</script>
