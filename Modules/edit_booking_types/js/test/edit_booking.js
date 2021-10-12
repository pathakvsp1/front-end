$(document).ready(function () {
  locationfun(); // for location display
  paidcheckbox(); // for paid checkbox display
  showTab(0);  // Display the 1st tab
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
    document.querySelector("#currency").disabled= true;
    document.querySelector("#paymode").disabled= true;
    
   }
  }

// tab 1 location field
function locationfun  () {
  var location = document.querySelector(".check").value;
  console.log("edit_booking happy called")
  if (location == "custom") {
    document.getElementById("locationname").style.display = "block"
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
  fixStepIndicator(n)
}


function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var x = document.getElementsByClassName("step");
  for (i = 0; i < 4; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}



// var deletedIds = "";
// let existingStaffId = 0; //This is used in checking for unique staff service
// let currentStaffId = 0; //This is used when saving appointments related to the current staff service created
// var dynamicId = 1;//This is for creating form fields after clicking on save in modal in booking form


// CSRF token
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});


var loadFile = function (event) {
  var imageFile = document.getElementById('imageType');
  imageFile.src = URL.createObjectURL(event.target.files[0]);
  imageFile.onload = function () {
    URL.revokeObjectURL(imageFile.src)
  }
};

var removeFile = function (event) {
  var imageFile = document.getElementById('imageType');
  var setimage = document.getElementById('setimage');
  setimage.value = "imageremove";
  imageFile.src = '{{ URL::asset(' / images / user.png; ')}}';
  $('#image').val('');
  imageFile.onload = function () {
    URL.revokeObjectURL(imageFile.src)
  }
};


/// For adding Quesiton
$("#btnModalField").click(function () {
  openModal();
});

function openModal(item = null) {

  item = JSON.parse(item);

  if (item == null) {
    $("#modalFieldTitle").text("@lang('messages.create') @lang('messages.field')");
    closeModal();
  }
  else {
    $("#modalFieldTitle").text("@lang('messages.edit') @lang('messages.field')");
    document.getElementById("description").value = item.description;
    $("#type").val(item.type).trigger("change");
    $("#is_required").val(item.is_required).trigger("change");
    document.getElementById("fieldMethod").value = "update";
    var options = ['checkbox', 'select', 'radio'];
    document.getElementById("divFieldOptions").style.display = (options.includes(item.type)) ? "block" : "none";
    document.getElementById("business_service_signup_form_field_id").value = item.id;

    if (item.options_fields != null) {
      var html = ``;
      item.options_fields.forEach(option => {
        let id = makeId(5);
        html += `<div class="form-group row" id="${id}">`;
        html += `<div class="col-8">`;
        html += `<input type="text" name="options[]" value="${option}" class="form-control" required placeholder="@lang('messages.option')..." />`;
        html += `</div>`;
        html += `<div class="col-4">`;
        html += `<button type="button" class="btn btn-danger btn-block" onclick="deleteFieldOption('${id}')"><i class="fa fa-trash fa-fw"></i></button>`;
        html += `</div>`;
        html += `</div>`;
      });
    }

    $("#inputFieldOptions").append(html);

  }

  $("#modalField").modal({
    backdrop: 'static'
  })
}

function closeModal() {
  //document.getElementById("description").value = "";
  $("#type").val("").trigger("change");
  $("#is_required").val("").trigger("change");
  document.getElementById("fieldMethod").value = "create";
  document.getElementById("divFieldOptions").style.display = "none";
  document.getElementById("inputFieldOptions").innerHTML = "";
  //document.getElementById("business_service_signup_form_field_id").value = "";
}

function deleteField(id) {
  Swal
    .fire({
      title: "@lang('messages.confirmItemDeletion')",
      icon: 'question',
      showCancelButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonText: "@lang('messages.yes')",
      cancelButtonText: "No",
      reverseButtons: true
    })
    .then((result) => {
      if (result.value) {
        //$("#id").remove(); 
      }
    });
}

function deleteFieldOption(id) {
  if (deletedIds != "") {
    deletedIds = deletedIds + "," + id;
  }
  else {
    deletedIds = id;
  }

  $("#" + id).remove();
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

  let formData = new FormData($('#bookingForm')[0]);
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

  if (!$('#remindertoggle').is(":checked")) {
    return false;
  }
  tinyMCE.triggerSave();
  let remindersubject = $('#remindersubject').val();
  let reminderbody = $('#reminderbody').val();
  let remindertoggle = $('#remindertoggle').is(":checked");

  let formData = new FormData($('#bookingForm')[0]);
  formData.append('remindersubject', remindersubject);
  formData.append('reminderbody', reminderbody);
  formData.append('remindertoggle', remindertoggle);

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
  }
  tinyMCE.triggerSave();
  let followupsubject = $('#followupsubject').val();
  let followupbody = $('#followupbody').val();
  let toggleFollowup = $('#toggleFollowup').is(":checked");
  let formData = new FormData($('#bookingForm')[0]);
  formData.append('followupsubject', followupsubject);
  formData.append('followupbody', followupbody);
  formData.append('toggleFollowup', toggleFollowup);

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


// tab two - one to one meet select
function meetingType() {
  if (document.getElementById("meeting_type").value == "groupBooking") {
    document.getElementById("participants").disabled = false;
    document.getElementById("p").setAttribute("class", "a");
  } else {
    document.getElementById("participants").disabled = true;
    // document.getElementById("p").removeAttribute("class", "a");
  }

  if (document.getElementById("meeting_type").value == "onetoonemeet") {
    document.getElementById("participants").value = " ";
  }
}


$("#btnAddFieldOption").click(function () {
  const id = makeId(5);
  var html = `<div class="form-group row" id="${id}">`;
  html += `<div class="col-8">`;
  html += `<input type="text" name="options[]" value="" class="form-control" required placeholder="@lang('messages.option')..." />`;
  html += `</div>`;
  html += `<div class="col-4">`;
  html += `<button type="button" class="btn btn-danger btn-block" onclick="deleteFieldOption('${id}')"><i class="fa fa-trash fa-fw"></i></button>`;
  html += `</div>`;
  html += `</div>`;
  $("#inputFieldOptions").append(html);
});

$("#type").select2({
  theme: 'bootstrap4'
});

$("#btnModalField").click(function () {
  openModal();
});

$("#btnCloseModalField").click(function () {
  closeModal();
});

$("#btnSaveModalField").click(function () {
  var type = document.getElementById("type").value;
  var isRequired = $('#is_required').prop('checked');
  var description = document.getElementById("description").value;
  var options = $("input[name='options[]']").map(function () { return $(this).val(); }).get();

  var html = ``;
  html += '<div id=' + dynamicId + ' class="form-group row">';
  html += '<label>' + description + '</label>';
  html += '<div class="dynamic">';
  html += '<input type="hidden" class="type" value=' + type + '></input>';
  html += '<input type="hidden" class="description" value=' + description + '></input>';
  html += '<input type="hidden" class="options" value=' + options + '></input>';
  html += '<input type="hidden" class="required" value=' + isRequired + '></input>';
  html += '</div>';
  if (type == 'select') {
    var array = options.toString().split(",");
    html += "<select readonly class='form-control' style='width:auto;height:auto;display:inline-block'>";
    $.each(array, function (i) {
      html += "<option value="
        + array[i] + ">" + array[i] + "</option>";

    });
    html += "</select>";

  }

  else if (type == 'checkbox' || type == 'radio') {
    var array = options.toString().split(",");
    $.each(array, function (i) {
      html += "<input class='form-control' disabled type=" + type + " style='width:auto;height:auto;' value=" + array[i] + ">" + array[i] + "</>";

    });

  }
  else if (type == 'textarea') {

    html += "<textarea class='form-control' readonly width='100%' rows=3></textarea>";
  }

  else {

    html += "<input class='form-control' readonly type=" + type + " style='width:auto;height:auto;display:inline-block'></input>";

  }

  html += '<button type="button" class="btn btn-primary" onclick="openModal(' + dynamicId + ')"><i class="fa fa-edit fa-fw"></i> Edit</button>';
  html += '<button type="button" class="btn btn-danger" onclick="deleteFieldOption(' + dynamicId + ')"><i class="fa fa-trash fa-fw"></i> Delete</button></div>';


  ++dynamicId;
  $("#inputOptions").append(html);

  closeModal();
});

$('#type').change(function () {
  var options = ['checkbox', 'select', 'radio'];
  document.getElementById("divFieldOptions").style.display = (options.includes(this.value)) ? "block" : "none";
});


