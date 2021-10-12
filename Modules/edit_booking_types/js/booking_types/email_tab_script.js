// Initial reminder toggle check


// defining email tags
const email_tabs = document.querySelectorAll('.email-control');
const email_div = document.querySelectorAll('.email_div');


// Initial Confirm set //

// Setting all email_div to none
 for (i = 0; i < 5; i++) {
    email_div[i].style.display = "none";
  }

// Setting confirm div to show and confirm tab to blue
email_div[0].style.display = "block";
email_tabs[0].style.backgroundColor = "#1e5dfd";
email_tabs[0].style.color = "white"


// Loop when clicked on email tabs
email_tabs.forEach((item, index, listArray) => {
     item.addEventListener('click', () => {
        console.log("edit_booking_type");
        item.style.backgroundColor = "#1e5dfd";
        item.style.color = "white";
        listArray.forEach((ele, i) => {
            if (i !== index) {
                ele.style.backgroundColor = "white";
                ele.style.color = "black";
            }
        })
        if (item.classList.contains('active')) {
            return;
            } 
        else {
            document.querySelector('.active').classList.remove('active');
            item.classList.add('active');
            }


  // set all tabs style none
  for (i = 0; i < 5; i++) {
    email_div[i].style.display = "none";
  }
    

    // confirm email
    if (listArray[0].classList.contains('active')) {
      document.querySelector("#confirm_email").style.display = "block";
    }

    // reminder email
    if (listArray[1].classList.contains('active')) {
      document.querySelector("#reminder_email").style.display = "block";
    }

    // cancel
    if (listArray[2].classList.contains('active')) {
      document.querySelector("#cancel_email").style.display = "block";
    }

    // reschedule
    if (listArray[3].classList.contains('active')) {
      document.querySelector("#reschedule_email").style.display = "block";
    }

    // followup
    if (listArray[4].classList.contains('active')) {
      document.querySelector("#followup_email").style.display = "block";
    }

  })
})


// on/off
const toggle2 = $(".toggle>input");
$(".toggle>input").click(function () {
    const onoff = $(this).siblings(".onoff");
    $(this).is(":checked") ? $(onoff).html("ON") : $(onoff).html("OFF");
});


// for initial open if reminder is on
remindertoggle();
followuptoggle();

function remindertoggle(){
  const toggle = document.querySelector('#remindertoggle');
   if (toggle.checked == true) {
       document.querySelector(".email_reminder_div").style.display = "block"
    }
    if (toggle.checked !== true) {
       document.querySelector(".email_reminder_div").style.display = "none"
    }
}

function followuptoggle(){
  const toggl = document.querySelector('#toggleFollowup')

    if (toggl.checked == true) {
       document.querySelector(".email_followup_div").style.display = "block"
    }
    if (toggl.checked !== true) {
       document.querySelector(".email_followup_div").style.display = "none" 
    }
}

// on/off

// email reminder
const toggle = document.querySelector('#remindertoggle');

toggle.addEventListener('click', () => {

     if (toggle.checked == true) {
       document.querySelector(".email_reminder_div").style.display = "block"
    }
    if (toggle.checked !== true) {
		
	let formData = new FormData($('#bookingForm')[0]);
	formData.append('type', 'reminder');
	 $.ajax({
      type: 'POST',
      url: '/updateFollowupOrReminder',
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
    

       document.querySelector(".email_reminder_div").style.display = "none"
    }

});

// email followup
const toggl = document.querySelector('#toggleFollowup')

toggl.addEventListener('click', () => {
    if (toggl.checked == true) {
       document.querySelector(".email_followup_div").style.display = "block"
    }
    if (toggl.checked !== true) {
		
	
	let formData = new FormData($('#bookingForm')[0]);
	formData.append('type', 'followup');
	 $.ajax({
      type: 'POST',
      url: '/updateFollowupOrReminder',
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
    

       document.querySelector(".email_followup_div").style.display = "none" 
    }
});


// Email Reminder Timer generation

var current_timers = 1;
var i = 2;

var top = document.querySelector(".time-cut")
var op = document.querySelector(".temp")

op.addEventListener("click", function () {
  
current_timers = document.getElementById('email_reminder_div').querySelector('.timer').childElementCount;

  if (current_timers < 3) {
    document.querySelector(".timer").innerHTML += `<div class="a${i}"><div class="time-cut" style="float:left;">
    <input type="text" class="form-control col-2 mr-2" value="1" name="remindertiming[]"
      aria-describedby="emailHelp" style="width:30%;">
    <select class="form-control col-7" name="remindertiming_select[]"  style="width:30%;">
      <option>Hour(s) Before</option>
      <option>Day(s) Before</option>
      
    </select> 
    <span class="px-3" onclick="hidebtn('a${i}')"  style=""><i class="far fa-trash-alt"></i></span>
  </div></div>`
    current_timers += 1;
    i += 1;
  }
  // console.log(i);
  console.log(current_timers);


});

// Email reminder delete
function hidebtn(ele) {
  const hide = document.querySelector(`.${ele}`);
  hide.remove();
  if (current_timers > 1) current_timers--;
  // console.log(j);
}