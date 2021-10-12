const tabNavListSettings = document.querySelectorAll('.profile-control');
const tabBodySettings = document.querySelectorAll('.rows');

tabNavListSettings[0].classList.add('active');

var current_link = window.location.href;

//  /staff/info/staffSetting#login

if (current_link.includes("#tab2"))
{   
  tabNavListSettings[0].classList.remove('active');
    tabBodySettings[1].classList.add('active');
    tabBodySettings[0].classList.remove('active');
    tabBodySettings[2].classList.remove('active');
    tabNavListSettings[1].classList.add('active');
}

//  /staff/info/staffSetting#plans
  
if (current_link.includes("#tab3"))
{   
  tabNavListSettings[0].classList.remove('active');
    tabBodySettings[1].classList.add('active');
    tabBodySettings[0].classList.remove('active');
    tabBodySettings[2].classList.remove('active');
    tabNavListSettings[2].classList.add('active');
}
  

tabNavListSettings.forEach((item, index, listArray) => {
    item.addEventListener('click', () => {

        if (item.classList.contains('active')) {
            return;
        } else {
            document.querySelector('.active').classList.remove('active');
            item.classList.add('active');
        }

        // if (current_link.includes("#login"))
        // {
        //    listArray[1].classList.contains('active')
        // }
  

        if (listArray[0].classList.contains('active')) {
            tabBodySettings[0].classList.add('active');
            tabBodySettings[1].classList.remove('active');
            tabBodySettings[2].classList.remove('active');
	    
        }
        if (listArray[1].classList.contains('active')) {
            tabBodySettings[1].classList.add('active');
            tabBodySettings[0].classList.remove('active');
            tabBodySettings[2].classList.remove('active');
        }
        if (listArray[2].classList.contains('active')) {
            tabBodySettings[2].classList.add('active');
            tabBodySettings[0].classList.remove('active');
            tabBodySettings[1].classList.remove('active');
        }
    })
})
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

$("#saveteamconnection").click(function () {
	
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

  $.ajax({
    type: 'POST',
    url: '/staff/info/saveteamConnection',
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


///////// Booking Page JS CODE

//Upload image
var loadFile = function (event) {
    var imageFile = document.getElementById('imageType');
    imageFile.src = URL.createObjectURL(event.target.files[0]);
    imageFile.onload = function () {
      URL.revokeObjectURL(imageFile.src)
    }
  };

var loadFile2 = function (event) {
    var imageFile = document.getElementById('logoImage');
    imageFile.src = URL.createObjectURL(event.target.files[0]);
    imageFile.onload = function () {
      URL.revokeObjectURL(imageFile.src)
    }
  };  


//Displaying tabs
var secondform = document.getElementsByClassName("secondtab")[0];
var firstform = document.getElementsByClassName("firsttab")[0];
var thirdform = document.getElementsByClassName("thirdtab")[0];


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

//Remove image
var removeFile = function (event) {
    var imageFile = document.getElementById('imageType');
    var setimage = document.getElementById('setimage');
	setimage.value = "imageremove";
    imageFile.src = defaultimage;
    $('#image').val('');
    imageFile.onload = function () {
      URL.revokeObjectURL(imageFile.src)
    }
  };

  var removeFile2 = function (event) {
    var imageFile = document.getElementById('logoImage');
    var setimage = document.getElementById('setlogoimage');
    setimage.value = "imageremove";
	//$("#logo")[0].files[0]='undefined';
    imageFile.src = defaultlogoimage;
	
	$('#logo').val('');
    imageFile.onload = function () {
      URL.revokeObjectURL(imageFile.src)
    }
  };  

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

