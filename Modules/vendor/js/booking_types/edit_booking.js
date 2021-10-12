$(document).ready(function () {
  locationfun(); // for location display
  paidcheckbox(); // for paid checkbox display
  showTab(0);  // Display the 1st tab
  meetingType(); // one to one meet js
});


  // For first time open page pay checkbox
 
  // Paid checkbox function

  function paidcheckbox()    
  {
      console.log("I am clicked");
   var paid_checkbox=document.querySelector("#paid_checkbox");

   if(paid_checkbox.checked==true)
   {
    document.querySelector("#price").disabled= false;
    document.querySelector("#currency").disabled= false;
    document.querySelector("#paymode").disabled= false;
    }
  else 
  {
    document.querySelector("#price").disabled= true;
    document.querySelector("#price").value = 0;
    document.querySelector("#currency").disabled= true;
    document.querySelector("#paymode").disabled= true;
    
   }
  }

// tab 1 location field
function locationfun() {
  var location = document.getElementById("location").value;
  console.log("edit_booking happy called")
  if (location == "custom") {
    document.getElementById("locationname").style = "block"
  }
  else {
    document.getElementById("locationname").style.display = "none"

  }
}


var currentTab = 0; // Current tab is set to be the first tab (0)

function showTab(n) {
  // This function will display the specified tab of the form...

  console.log("edit_booking showTab")
  var x = document.getElementsByClassName("tab");

  // set all tabs style none
  for (i = 0; i < 4; i++) {
    x[i].style.display =  "none";
  }
 
  x[n].style.display = "block";

  // ... and run a function that will display the correct step indicator:
  //fixStepIndicator(n)
}


function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var x = document.getElementsByClassName("step");
  console.log(x);
  for (i = 0; i < 4; i++) {
    x[i].className = x[i].className.replace("active", " ");
  }

  //... and adds the "active" class on the current step:
  x[n].className += "active";
}



// var deletedIds = "";
// let existingStaffId = 0; //This is used in checking for unique staff service
// let currentStaffId = 0; //This is used when saving appointments related to the current staff service created
// var dynamicId = 1;//This is for creating form fields after clicking on save in modal in booking form


// CSRF token
let profile_input = false;
        let cover_input = false;
        let profile_url = "";
        let cover_url = "";

        let imgWidth = 0;
        let imgHeight = 0;

        let imgType = ""

        let profile_set_view = false
        let cover_set_view = false

        let $modal = $('#modal');
        let image = document.getElementById('modal_image');
        let cropper;

        $('#cover_image').change(function(event) {
            cover_input = true
            cover_set_view = true
            imgType = "cover"
            let files = event.target.files;

            let done = function(url) {
                image.src = url
                $modal.modal('show');
                
            };

            if (files && files.length > 0) {
                reader = new FileReader();
                reader.onload = function(event) {

                    const file = document.querySelector("#cover_image").files[0];
                    reader.readAsDataURL(file);
                    reader.onload = function(event) {
                        const imgElement = document.createElement("img");
                        imgElement.src = event.target.result;
                        imgElement.onload = function(e) {
                            const canvas = document.createElement("canvas");
                            const MAX_WIDTH = 600;

                            const scaleSize = MAX_WIDTH / e.target.width;
                            canvas.width = MAX_WIDTH;
                            canvas.height = e.target.height * scaleSize;

                            const ctx = canvas.getContext("2d");

                            ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

                            const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
                            // console.log(srcEncoded);
                            
                            done(srcEncoded);
                        }
                    }

                }
                reader.readAsDataURL(files[0]);
            }
        });

        $('#profile_image').change(function(event) {
            imgType = "profile"
            profile_input = true
            profile_set_view = true
            let files = event.target.files;

            let done = function(url) {
                image.src = url
                $modal.modal('show');
            };

            if (files && files.length > 0) {
                reader = new FileReader();
                reader.onload = function(event) {

                    const file = document.querySelector("#profile_image").files[0];
                    reader.readAsDataURL(file);
                    reader.onload = function(event) {
                        const imgElement = document.createElement("img");
                        imgElement.src = event.target.result;
                        imgElement.onload = function(e) {
                            const canvas = document.createElement("canvas");
                            const MAX_WIDTH = 600;

                            const scaleSize = MAX_WIDTH / e.target.width;
                            canvas.width = MAX_WIDTH;
                            canvas.height = e.target.height * scaleSize;

                            const ctx = canvas.getContext("2d");

                            ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

                            const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
                            // console.log(srcEncoded);
                            done(srcEncoded);
                        }
                    }

                }
                reader.readAsDataURL(files[0]);
            }
        });

        $modal.on('shown.bs.modal', function() {
            if (profile_set_view) {
                cropper_view = 1
                imgHeight = 452
                imgWidth = 452
                profile_set_view = false
            }

            if (cover_set_view) {
                imgHeight = 600
                imgWidth = 800
                cropper_view = NaN
                cover_set_view = false
            }

            cropper = new Cropper(image, {
                aspectRatio: cropper_view,
                viewMode: 3,
                preview: '.preview'
            });
            
        }).on('hidden.bs.modal', function() {
            cropper.destroy();
            cropper = null;
        });

        $('#save').click(function() {
            canvas = cropper.getCroppedCanvas({
                width: imgWidth,
                height: imgHeight
            });

            canvas.toBlob(function(blob) {
                url = URL.createObjectURL(blob);
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function() {
                    let base64data = reader.result;
                    if (cover_input) {
                        $('#cover_uploaded_image').attr('src', reader.result);
                        cover_input = false
                        cover_url = reader.result
                        $('#cover_url').val(cover_url);
                    }
                    if (profile_input) {
                        // console.log(typeof reader.result);
                        // console.log(reader.result);
                        $('#profile_uploaded_image').attr('src', reader.result);
                        profile_input = false
                        profile_url = reader.result;
                        $('#profile_url').val(profile_url);
                    }
                    $(function() {
                        $('#modal').modal('toggle');
                    });

                };
            });
        });


$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});


var loadFile = function (event) {
  var imageFile = document.getElementById('profile_uploaded_image');
  imageFile.src = URL.createObjectURL(event.target.files[0]);
  imageFile.onload = function () {
    URL.revokeObjectURL(imageFile.src)
  }
};

//Method to remove the image file 
  function removeFile() {
	  var imageFile = document.getElementById('profile_uploaded_image');
    var setimage = document.getElementById('setimage');
    setimage.value="imageremove";
	imageFile.src = defaultimage;
    $('#profile_uploaded_image').val('');
    imageFile.onload = function() {
      URL.revokeObjectURL(imageFile.src)
    }
  }



function makeId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `field-option-${result}`;
}

var deletedIds = "";

let existingStaffId = 0; //This is used in checking for unique staff service
let currentStaffId = 0; //This is used when saving appointments related to the current staff service created
var dynamicId = 1;//This is for creating form fields after clicking on save in modal in booking form





function getExistingStaffId(formData) {

  $.ajax({
    type: 'POST',
    url: '/getExistingStaffService',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      existingStaffId = data.id;

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
$("#btnUpdateConfirmation").click(function () {
  tinyMCE.triggerSave();
  let confirmsubject = $('#confirmsubject').val();
  let confirmbody = $('#confirmbody').val();
  let serviceid = $('#serviceid').val();
  let formData = new FormData($('#bookingForm')[0]);
	formData.append('serviceid', serviceid);
	

  
  formData.append('confirmsubject', confirmsubject);
  formData.append('confirmbody', confirmbody);

  $.ajax({
    type: 'POST',
    url: '/updateEmailConfirmationTemplate',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {


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
$("#btnUpdateReminder").click(function () {
	alert('called');
	 tinyMCE.triggerSave();

  if (!$('#remindertoggle').is(":checked")) {
    return false;
  }
 
  let serviceid = $('#serviceid').val();
	formData.append('serviceid', serviceid);
	
  let remindersubject = $('#remindersubject').val();
  let reminderbody = $('#reminderbody').val();
  var remindertiming_select= new Array();
 $('select[name="remindertiming_select[]"] option:selected').each(function() {
    remindertiming_select.push($(this).val());
}); 
var remindertiming= new Array();
$("input[name='remindertiming[]']").each(function(){
	alert($(this).val());
    remindertiming.push($(this).val());
});  
  
  let remindertoggle = $('#remindertoggle').is(":checked");

  let formData = new FormData($('#bookingForm')[0]);
  formData.append('remindersubject', remindersubject);
  formData.append('reminderbody', reminderbody);
  formData.append('remindertoggle', remindertoggle);
  formData.append('remindertiming', remindertiming);
  formData.append('remindertiming_select', remindertiming_select);

  $.ajax({
    type: 'POST',
    url: '/updateEmailReminderTemplate',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {


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
$("#btnUpdateFollowup").click(function () {

  if (!$('#toggleFollowup').is(":checked")) {
    return false;
  }let serviceid = $('#serviceid').val();
	
	
  
  tinyMCE.triggerSave();
  
  let followupsubject = $('#followupsubject').val();
  let followupbody = $('#followupbody').val();
  let toggleFollowup = $('#toggleFollowup').is(":checked");
  
  var followuptiming_select= new Array();
 $('select[name="followuptiming_select[]"] option:selected').each(function() {
    followuptiming_select.push($(this).val());
}); 

var followuptiming= new Array();
$("input[name='followuptiming[]']").each(function(){
    followuptiming.push($(this).val());
}); 
  let formData = new FormData($('#bookingForm')[0]);
  formData.append('serviceid', serviceid);
  formData.append('followupsubject', followupsubject);
  formData.append('followupbody', followupbody);
  formData.append('toggleFollowup', toggleFollowup);
  formData.append('followuptiming', followuptiming);
  formData.append('followupselect', followuptiming_select);

  $.ajax({
    type: 'POST',
    url: '/updateEmailFollowupTemplate',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {


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

$("#btnUpdateReschedule").click(function () {
  tinyMCE.triggerSave();
  let serviceid = $('#serviceid').val();
	formData.append('serviceid', serviceid);
	
  let reschedulesubject = $('#reschedulesubject').val();
  let reschedulebody = $('#reschedulebody').val();

  let formData = new FormData($('#bookingForm')[0]);
  formData.append('reschedulesubject', reschedulesubject);
  formData.append('reschedulebody', reschedulebody);

  $.ajax({
    type: 'POST',
    url: '/updateEmailRescheduleTemplate',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {


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

$("#btnUpdateCancellation").click(function () {
  tinyMCE.triggerSave();
  let serviceid = $('#serviceid').val();
	formData.append('serviceid', serviceid);
	
  let cancelsubject = $('#cancelsubject').val();
  let cancelbody = $('#cancelbody').val();

  let formData = new FormData($('#bookingForm')[0]);
  formData.append('cancelsubject', cancelsubject);
  formData.append('cancelbody', cancelbody);

  $.ajax({
    type: 'POST',
    url: '/updateEmailCancellationTemplate',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {


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
$("#btnSaveStep1").click(function () {
	if (!validateForm()) return false;
	let formData = new FormData($('#bookingForm')[0]);
	let serviceid = $('#serviceid').val();
	let price = $('#price').val();
	let setimage=$('#setimage').val();
	formData.append('serviceid', serviceid);
	formData.append('setimage', setimage);
	formData.append('price', price);
	formData.append('paymode', $('#paymode').val());
	formData.append('currency', $('#currency').val());
	formData.append('paidAppointment', $('#paid_checkbox').is(":checked"));
	 $.ajax({
      type: 'POST',
      url: '/update_staff_services',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
			$('.success').html(data.status).hide()
            .fadeIn(1500, function() { $('.success-'); });
			setTimeout(resetAll,5000);

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
    return false;
}
);
$("#btnSaveStep2").click(function () {
	
	if (!validateForm()) return false;
	let formData = new FormData($('#bookingForm')[0]); tinyMCE.triggerSave();
	let serviceid = $('#serviceid').val();
	formData.append('serviceid', serviceid);
	
    let confirmsubject = $('#confirmsubject').val();
    let confirmbody = $('#confirmbody').val();

    formData.append('confirmsubject', confirmsubject);
    formData.append('confirmbody', confirmbody);

    let reschedulesubject = $('#reschedulesubject').val();
    let reschedulebody = $('#reschedulebody').val();

    formData.append('reschedulesubject', reschedulesubject);
    formData.append('reschedulebody', reschedulebody);

    let cancelsubject = $('#cancelsubject').val();
    let cancelbody = $('#cancelbody').val();

    formData.append('cancelsubject', cancelsubject);
    formData.append('cancelbody', cancelbody);

    let remindersubject = $('#remindersubject').val();
    let reminderbody = $('#reminderbody').val();

    formData.append('remindersubject', remindersubject);
    formData.append('reminderbody', reminderbody);

    let followupsubject = $('#followupsubject').val();
    let followupbody = $('#followupbody').val();

    formData.append('followupsubject', followupsubject);
    formData.append('followupbody', followupbody);


    let remindertoggle = $('#remindertoggle').is(":checked");
    formData.append('remindertoggle', remindertoggle);

    let toggleFollowup = $('#toggleFollowup').is(":checked");
    formData.append('toggleFollowup', toggleFollowup);
   
	 $.ajax({
      type: 'POST',
      url: '/insertStaffAppoinments',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
			$('.success').html(data.status).hide()
            .fadeIn(1500, function() { $('.success-webhook'); });
			setTimeout(resetAll,5000);

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
    return false;
}
);

$("#btnSaveStep3").click(function () {
	if (!validateForm()) return false;
	let formData = new FormData($('#bookingForm')[0]);

	json_string = "";
          option_string = "";
          var order = $("#dynamic_form").sortable("toArray");
          //looping through each and every element in the array of ids.
            console.log(order);
          order.forEach((element) => {
            let arr,string;
            if (form.querySelector(`#${element} .optionsColumn`) != null) {
              arr = Array.from(
                form.querySelectorAll(`#${element} section label`)
              );
              //initializing the options string inorder to append new options to the string.
              string = "";
              arr.map((e) => {
                string += `${e.innerHTML},`;
              });

              //json string for radio or check box
              json_string += 
              `${
                form.querySelectorAll(`#${element} section input`)[0].type
              },${form.querySelector(`#${element} > label`).innerHTML},${
                form.querySelector(`#${element} section > div input`).required
              }:`;
              option_string += string.substring(0, string.length -1) + ":";
              
            }else if(form.querySelector(`#${element} select`)){
              arr = Array.from(form.querySelectorAll(`#${element} option`));
              string = "";
              arr.map((e) => {
                string += `${e.value},`;
              });

              //json string for drop down
              json_string += `select,${form.querySelector(`#${element} > label`).innerHTML},${form.querySelector(`#${element} select`).required}:`;
              option_string += string.substring(0, string.length -1) + ":";
            } 

            else {

              //json string for textarea
              if(form.querySelector(`#${element} textarea`))
              {
                json_string += `textarea,${form.querySelector(`#${element} > label`).innerHTML},${form.querySelector(`#${element} textarea`).required}:`;
                option_string += ":";
              }

              else
              {
                //json string for text field
              json_string += `text,${
                form.querySelector(`#${element} > label`).innerHTML
              },${form.querySelector(`#${element} input`).required}:`;
              option_string += ":";
            }

            }
          });

          //reducing json string upto last-1 element because the json_string ends with extra ":".
          json_string = json_string.substring(0, json_string.length - 1).replaceAll("*", "").replace(/\s\s+/g, ' ');
          console.log("-------- Questions String On edit_booking-------------")
          console.log(json_string);
          console.log("-------- Options String -------------")
          option_string = option_string.substring(0, option_string.length - 1).replace(/\s\s+/g, '');;
          console.log(option_string);
        
   formData.append('currentStaffId',currentStaffId);
   formData.append('formFields',json_string);
   formData.append('formFieldOptions',option_string);
   let serviceid = $('#serviceid').val();
   console.log(serviceid);
	formData.append('serviceid', serviceid);
	
    
	 $.ajax({
      type: 'POST',
      url: '/insertFormFields',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
$('.success').html(data.status).hide()
            .fadeIn(1500, function() { $('.success'); });
			setTimeout(resetAll,5000);
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
        return false;
}
);

$(".savestep4").click(function () {
	
	if (!validateForm()) return false;
	tinyMCE.triggerSave();
	let formData = new FormData($('#bookingForm')[0]); tinyMCE.triggerSave();
	let serviceid = $('#serviceid').val();
	formData.append('serviceid', serviceid);
	formData.append('ajax', 'ajax');
	
    let confirmsubject = $('#confirmsubject').val();
	let confirmbody = $('#confirmbody').val();
	
    formData.append('confirmsubject', confirmsubject);
    formData.append('confirmbody', confirmbody);

    let reschedulesubject = $('#reschedulesubject').val();
	let reschedulebody = $('#reschedulebody').val();

    formData.append('reschedulesubject', reschedulesubject);
    formData.append('reschedulebody', reschedulebody);

    let cancelsubject = $('#cancelsubject').val();
    let cancelbody = $('#cancelbody').val();

    formData.append('cancelsubject', cancelsubject);
    formData.append('cancelbody', cancelbody);

    let remindersubject = $('#remindersubject').val();
    let reminderbody = $('#reminderbody').val();

    formData.append('remindersubject', remindersubject);
    formData.append('reminderbody', reminderbody);

    let followupsubject = $('#followupsubject').val();
    let followupbody = $('#followupbody').val();

    formData.append('followupsubject', followupsubject);
    formData.append('followupbody', followupbody);


    let remindertoggle = $('#remindertoggle').is(":checked");
    formData.append('remindertoggle', remindertoggle);

    let toggleFollowup = $('#toggleFollowup').is(":checked");
    formData.append('toggleFollowup', toggleFollowup);
	
	var followuptiming_select= new Array();
 $('select[name="followuptiming_select[]"] option:selected').each(function() {
    followuptiming_select.push($(this).val());
}); 

var followuptiming= new Array();
$("input[name='followuptiming[]']").each(function(){
    followuptiming.push($(this).val());
});

formData.append('followuptiming', followuptiming);
formData.append('followupselect', followuptiming_select);

var remindertiming_select= new Array();
 $('select[name="remindertiming_select[]"] option:selected').each(function() {
    remindertiming_select.push($(this).val());
}); 
var remindertiming= new Array();
$("input[name='remindertiming[]']").each(function(){
    remindertiming.push($(this).val());
})
formData.append('remindertiming', remindertiming);
  formData.append('remindertiming_select', remindertiming_select);

   
	 $.ajax({
      type: 'POST',
      url: '/insertDefaultTemplates',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
			$('.success').html(data.status).hide()
            .fadeIn(1500, function() { $('.success'); });
			setTimeout(resetAll,5000);

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
    return false;
}
);
function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;

  let formData = new FormData($('#bookingForm')[0]);
  if (n == -1) {
    existingStaffId = getExistingStaffId(formData);

  }

  if (n == 1 && currentTab == 0) { // Step 1

    formData.append('existingStaffId', existingStaffId);

    $.ajax({
      type: 'POST',
      url: '/update_staff_services',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {


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
    return false;
  }
  if (n == 1 && currentTab == 1) { //Step 2 save

    formData.append('currentStaffId', currentStaffId);

    $.ajax({
      type: 'POST',
      url: '/insertStaffAppoinments',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {


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
    return false;
  }
  if (n == 1 && currentTab == 2) { // forms step3 save

    var values = new Array();
    var optionsValues = new Array();
    $('.dynamic').each(function (i, obj) {
      var tempValues = new Array();
      var hidden_fields = $(obj).find('input:hidden');
      let j = 0;
      hidden_fields.each(function () {

        if (j == 2) {
          optionsValues[i] = $(this).val();
        }
        else {
          tempValues[j] = $(this).val();
        }
        j++;

      });

      values[i] = tempValues;
    });
    var messageRow = 'messageRow';
    var messageField = new Array();
    if ($("#" + messageRow).length > 0) {
      messageField = ["textarea", "Message", "", "yes"];
      formData.append('messageField', messageField);
    }
    formData.append('currentStaffId', currentStaffId);
    formData.append('formFields', values.join(':'));
    formData.append('formFieldOptions', optionsValues.join(':'));

    $.ajax({
      type: 'POST',
      url: '/insertFormFields',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {

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
    return false;
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;

  // if you have reached the end of the form...
  if (currentTab >= 3) { //step 4 save and submit
    tinyMCE.triggerSave();
    let confirmsubject = $('#confirmsubject').val();
    let confirmbody = $('#confirmbody').val();

    formData.append('confirmsubject', confirmsubject);
    formData.append('confirmbody', confirmbody);

    let reschedulesubject = $('#reschedulesubject').val();
    let reschedulebody = $('#reschedulebody').val();

    formData.append('reschedulesubject', reschedulesubject);
    formData.append('reschedulebody', reschedulebody);

    let cancelsubject = $('#cancelsubject').val();
    let cancelbody = $('#cancelbody').val();

    formData.append('cancelsubject', cancelsubject);
    formData.append('cancelbody', cancelbody);

    let remindersubject = $('#remindersubject').val();
    let reminderbody = $('#reminderbody').val();

    formData.append('remindersubject', remindersubject);
    formData.append('reminderbody', reminderbody);

    let followupsubject = $('#followupsubject').val();
    let followupbody = $('#followupbody').val();

    formData.append('followupsubject', followupsubject);
    formData.append('followupbody', followupbody);


    let remindertoggle = $('#remindertoggle').is(":checked");
    formData.append('remindertoggle', remindertoggle);

    let toggleFollowup = $('#toggleFollowup').is(":checked");
    formData.append('toggleFollowup', toggleFollowup);
    $.ajax({
      type: 'POST',
      url: '/insertDefaultTemplates',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        swal.fire({
          title: "Success",
          text: "Booking Type Updated!",
          type: "success"
        }).then(function () {
          window.location = data.url;
        });
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
  // Otherwise, display the correct tab:
  showTab(currentTab);
}


// Step 2 validations - Fix
function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByClassName("a");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

    function meetingType() {
  meeting_type1 = String(document.getElementById("meeting_type").value);
  console.log("Got executed");

  if (meeting_type1 == "groupBooking") {
    document.getElementById("participants").disabled = false;
    // document.getElementById("participants").value = "1";
    // document.getElementById("p").setAttribute("class", "a");
      console.log(meeting_type1);
  } 

  if (meeting_type1 == "onetoonemeet") {
    document.getElementById("participants").value = "1";
    document.getElementById("participants").disabled = true;
      console.log(meeting_type1);
  }
}

// tab two - one to one meet select

function resetAll(){
 
$('.success').hide(); 


}
