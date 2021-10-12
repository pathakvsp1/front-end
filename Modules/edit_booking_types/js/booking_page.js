///////// Booking Page JS CODE



//Displaying tabs
var secondform = document.getElementsByClassName("secondtab")[0];
var firstform = document.getElementsByClassName("firsttab")[0];
var thirdform = document.getElementsByClassName("thirdtab")[0];
var current_link = window.location.href;

if (current_link.includes("#tab2"))
{   
  showSecond();
}

//  /staff/info/staffSetting#plans
  
if (current_link.includes("#tab3"))
{   
  console.log(current_link);
  showthird();
}

function showfirst() {
firstform.style.display = "block";
secondform.style.display = "none";
thirdform.style.display = "none";
}

function showSecond() {
secondform.style.display = "block";
firstform.style.display = "none";
thirdform.style.display = "none";
}

function showthird() {
secondform.style.display = "none";
firstform.style.display = "none";
thirdform.style.display = "block";
}


//display pills and set active colors
var faqPill = document.getElementsByClassName("FAQ")[0];
var reviewPill = document.getElementsByClassName("review")[0];
var divfaq = document.getElementById("faqdiv");
var afaq = document.getElementById("faqa");
var divrew = document.getElementById("rewdiv");
var arew = document.getElementById("rewa");

function faqopen() {
faqPill.style.display = "block";
reviewPill.style.display = "none";
divfaq.style.backgroundColor = "#326bff";
afaq.style.color = "white";
divrew.style.backgroundColor = "white";
arew.style.color = "black";
}

function reviewopen() {
reviewPill.style.display = "block";
faqPill.style.display = "none";
divrew.style.backgroundColor = "#326bff";
arew.style.color = "white";
divfaq.style.backgroundColor = "white";
afaq.style.color = "black";
}



//Upload image
var loadFile = function (event) {
    var imageFile = document.getElementById('profile_uploaded_image');
    imageFile.src = URL.createObjectURL(event.target.files[0]);
    imageFile.onload = function () {
      URL.revokeObjectURL(imageFile.src)
    }
  };

var loadFile2 = function (event) {
    var imageFile = document.getElementById('cover_uploaded_image');
    imageFile.src = URL.createObjectURL(event.target.files[0]);
    imageFile.onload = function () {
      URL.revokeObjectURL(imageFile.src)
    }
  };  

//Remove image
var removeFile = function (event) {
    var imageFile = document.getElementById('profile_uploaded_image');
    var setimage = document.getElementById('setimage');
  setimage.value = "imageremove";
    imageFile.src = defaultimage;
    $('#profile_image').val('');
    imageFile.onload = function () {
      URL.revokeObjectURL(imageFile.src)
    }
  };

  var removeFile2 = function (event) {
    var imageFile = document.getElementById('cover_uploaded_image');
    var setimage = document.getElementById('setlogoimage');
    setimage.value = "imageremove";
  //$("#logo")[0].files[0]='undefined';
    imageFile.src = defaultlogoimage;
  
  $('#logo').val('');
    imageFile.onload = function () {
      URL.revokeObjectURL(imageFile.src)
    }
  };  

////////// Booking Page AJAX ////////////////



$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
$("#saveconnection").click(function () {
  
  let email = $('#email').val();
  let username = $('#username').val();
  let passwordValue = $('#password').val();
  let smtp = $('#smtp').val();
  let smtpconnection = $('#toggle').is(":checked");
  let protocol = $('#protocol').val();
  let port = $('#port').val();
  let color = $('#color').val();
  let selectedstaffid = $('#selectedstaffid').val();
  

  let formData = new FormData($('#smtpform')[0]);
  formData.append('email', email);
  formData.append('username', username);
  formData.append('passwordValue', passwordValue);
  formData.append('smtp', smtp);
  formData.append('smtpconnection', smtpconnection);
  formData.append('protocol', protocol);
  formData.append('port', port);
  formData.append('color', color);
  formData.append('selectedstaffid', selectedstaffid);
  formData.append("logo",$("#logo")[0].files[0]);
alert(selectedstaffid);

  $.ajax({
    type: 'POST',
    url: '/staff/info/saveSMTPConnection',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {

    $('.success').show();
      $('.success').html(data.status);
    },
    error: function (jqXhr, json, errorThrown) {
      var errors = jqXhr.responseJSON;
    var errorsHtml = '';
      $.each(errors['errors'], function (index, value) {
        errorsHtml += '<ul class="list-group"><li class="list-group-item alert alert-danger">' + value + '</li></ul>';
      });

      Swal.fire({
        title: "Error ",
        html: errorsHtml,
        width: 'auto',
        confirmButtonText: 'Ok',
        closeOnConfirm: true,
        closeOnCancel: true,
        type: 'error'
      });
      return false;
    }

  });
}
);

//////////////// TEAM SETTINGS //////////////// 

$("#saveteamconnection").click(function () {
  
  let email = $('#email').val();
  let username = $('#username').val();
  let passwordValue = $('#password').val();
  let smtp = $('#smtpserver').val();
  let smtpconnection = $('#toggle').is(":checked");
  let protocol = $('#protocol').val();
  let port = $('#port').val();
  let selectedstaffid = $('#selectedstaffid').val();
  

  let formData = new FormData($('#smtpform')[0]);
  formData.append('email', email);
  formData.append('username', username);
  formData.append('password', passwordValue);
  formData.append('smtp', smtp);
  formData.append('smtpconnection', smtpconnection);
  formData.append('protocol', protocol);
  formData.append('port', port);
  formData.append('selectedstaffid', selectedstaffid);
  
  $.ajax({
    type: 'POST',
    url: '/staff/info/saveteamConnection',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {

    $('.success').show();
      $('.success').html(data.status);
	  window.location.reload();
    },
    error: function (jqXhr, json, errorThrown) {
      var errors = jqXhr.responseJSON;
    
     $('.success-message').hide();
       $('.failure-message').show();
      $('.failure-message').html(errors);
      return false;
    }

  });
}
);

$("#testteamconnection").click(function () {
	$('.failure-message').hide();
  $('.success-message').hide();
  let email = $('#email').val();
  let username = $('#username').val();
  let passwordValue = $('#password').val();
  let smtp = $('#smtpserver').val();
  
  let smtpconnection = $('#toggle').is(":checked");
  let protocol = $('#protocol').val();
  let port = $('#port').val();
  let color = $('#color').val();
  let selectedstaffid = $('#selectedstaffid').val();
  

  let formData = new FormData($('#smtpform')[0]);
  formData.append('email', email);
  formData.append('username', username);
  formData.append('password', passwordValue);
  formData.append('smtp', smtp);
  formData.append('smtpconnection', smtpconnection);
  formData.append('protocol', protocol);
  formData.append('port', port);
  formData.append('selectedstaffid', selectedstaffid);
  
  $.ajax({
    type: 'POST',
    url: '/staff/info/testteamSMTPConnection',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {

    $('.success-message').show();
	$('.failure-message').hide();
      $('.success-message').html(data.status);
    },
    error: function (jqXhr, json, errorThrown) {
      var errors = jqXhr.responseJSON;
	  
    $('.success-message').hide();
       $('.failure-message').show();
      $('.failure-message').html(errors);
      return false;
    }

  });
}
);
$.ajaxSetup({
  beforeSend: function(xhr, type) {
      if (!type.crossDomain) {
          xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
      }
  },
});
jQuery(function($){
	let username=$('#username').val();
	if(username=='')
$('#brandbutton').prop('disabled', true);
else
$('#brandbutton').prop('disabled', false);	
let businessusername=$('#businessusername').val();
	if(businessusername=='')
$('#teambrandbutton').prop('disabled', true);
else
$('#teambrandbutton').prop('disabled', false);	
$("#username").on('change keyup paste', function(){
	let username=$('#username').val();
	let selectedstaffid=$('#selectedstaffid').val();
	if(username==''){
	$('#brandbutton').prop('disabled', true);
	$('#tick').html('');
	return false;
	}
	
    $.ajax({
    type: 'GET',
    url: '/checkUsernameExistence',
    data: {username:username,ajax:'true',selectedstaffid:selectedstaffid},
  success: function (data) {
    
		if(data.available=='true'){
			$('#tick').html('&#10004;');
			$('#brandbutton').prop('disabled', false);
		}
		else{
			$('#tick').html('&#10060;');
			$('#brandbutton').prop('disabled', true);
		}
    },
    error: function (jqXhr, json, errorThrown) {
      alert(json);
      var errors = jqXhr.responseJSON;
      var errorsHtml = '';
      $.each(errors['errors'], function (index, value) {
        errorsHtml += '<ul class="list-group"><li class="list-group-item alert alert-danger">' + value + '</li></ul>';
      });

      alert(errorsHtml);
      return false;
    }

  });
 

});
}); 
$("#businessusername").on('change keyup paste', function(){
	let businessusername=$('#businessusername').val();
	if(businessusername==''){
	$('#teambrandbutton').prop('disabled', true);
	$('#tick').html('');
	return false;
	}
	
    $.ajax({
    type: 'POST',
    url: '/checkTeamUsernameExistence',
    data: {businessusername:businessusername,ajax:'true'},
  success: function (data) {
    
		if(data.available=='true'){
			$('#tick').html('&#10004;');
			$('#teambrandbutton').prop('disabled', false);
		}
		else{
			$('#tick').html('&#10060;');
			$('#teambrandbutton').prop('disabled', true);
		}
    },
    error: function (jqXhr, json, errorThrown) {
      
      var errors = jqXhr.responseJSON;
	  
      var errorsHtml = '';
      $.each(errors['errors'], function (index, value) {
        errorsHtml += '<ul class="list-group"><li class="list-group-item alert alert-danger">' + value + '</li></ul>';
      });

      
      return false;
    }

  });
 

});
