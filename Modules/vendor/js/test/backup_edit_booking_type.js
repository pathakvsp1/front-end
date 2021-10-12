
var i = 2, j = 1;
function closebtn() {
    const close = document.querySelector(".timer-cut");
    close.style.display = "none";

}
function hidebtn(ele) {
    const hide = document.querySelector(`.${ele}`);
    hide.remove();
    if (j > 1) j--;
    console.log(j);
}
function noneBtn() {
    const none = document.querySelector(".timer");
    none.style.display = "none";
}

function time__btn() {
    const close = document.querySelector(".timeCut");
    close.style.display = "none";
}
function time_Btn() {
    const hide = document.querySelector(".timerCut");
    hide.style.display = "none";
}
function timeBtn() {
    const none = document.querySelector(".timer_cut");
    none.style.display = "none";
}


function harsh() {

  if (document.getElementById("x").checked == true) {
    document.getElementById("u").disabled = false;
    document.getElementById("u").setAttribute("class", "a");
    document.getElementById("paymode").disabled = false;
    document.getElementById("paymode").setAttribute("class", "a");
  } else {
    document.getElementById("u").disabled = true;
    document.getElementById("u").value = 0;
    document.getElementById("u").removeAttribute("class", "a");
    document.getElementById("paymode").disabled = true;
    document.getElementById("paymode").removeAttribute("class", "a");
  }
}

function showTab(n) {
  // This function will display the specified tab of the form...
  document.getElementById("btnModalField").style.display = "none";
  document.getElementById("cancel").style.display = "block";
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";

  document.getElementById("nextBtn").innerHTML = "Save";


  if (n == 2) {
    document.getElementById("btnModalField").style.display = "block";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

//////////////////////////////////////////////////////////////////

//from email file

function closebtn() {
  const close = document.querySelector(".timer-cut");
  close.style.display = "none";
}

function noneBtn() {
  const none = document.querySelector(".timer");
  none.style.display = "none";
}

// .timeCut is the email followup class
function time__btn() {
  const close = document.querySelector(".timeCut");
  close.style.display = "none";
}

function time_Btn() {
  const hide = document.querySelector(".timerCut");
  hide.style.display = "none";
}

function timeBtn() {
  const none = document.querySelector(".timer_cut");
  none.style.display = "none";

//////////////////////////////////////////////////////////////////

// Loop when clicked on email tabs
email_tabs.forEach((item, index, listArray) => {
  console.log("this file is loaded")
  item.addEventListener('click', () => {
    console.log("edit_booking_type_email");
    item.style.backgroundColor = "#007bff";
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
        email_div[0].style.display = "block";
      // document.querySelector("#confirm_email").style.display = "block";
    }

    // reminder email
    if (listArray[1].classList.contains('active')) {
      email_div[1].style.display = "none";
      // document.querySelector("#reminder_email").style.display = "block";
    }

    // cancel
    if (listArray[2].classList.contains('active')) {
        email_div[2].style.display = "none";
      // document.querySelector("#cancel_email").style.display = "block";
    }

    // reschedule
    if (listArray[3].classList.contains('active')) {
        email_div[3].style.display = "none";
      // document.querySelector("#reschedule_email").style.display = "block";
    }

    // followup
    if (listArray[4].classList.contains('active')) {
        email_div[4].style.display = "none";
      // document.querySelector("#followup_email").style.display = "block";
    }

  })
})

////////////////////////////////////////////////////////////////////////

const tabNavList = document.querySelectorAll('.email-control');
const tabBody = document.querySelectorAll('#email_body');
// colour change on active and hover email section
console.log("main1");
tabNavList.forEach((item, index, listArray) => {
  console.log('edit-bookingtype.js')
  item.addEventListener('click', () => {
    item.style.backgroundColor = "#007bff";
    item.style.color = "white";
    listArray.forEach((ele, i) => {
      if (i !== index) {
        ele.style.backgroundColor = "white";
        ele.style.color = "black";
      }
    })
    if (item.classList.contains('active')) {

      return;
    } else {
      document.querySelector('.active').classList.remove('active');
      item.classList.add('active');


    }

    if (listArray[0].classList.contains('active')) {
      tabBody[0].classList.add('active');
      tabBody[1].classList.remove('active');
      tabBody[2].classList.remove('active');
      tabBody[3].classList.remove('active');
      tabBody[4].classList.remove('active');
      //tabBody[1].item.style.backgroundColor = "#DC3545";
      //tabBody[1].item.style.color = "white";tabBody[2].item.style.backgroundColor = "#DC3545";
      //tabBody[2].item.style.color = "white";tabBody[3].item.style.backgroundColor = "#DC3545";
      //tabBody[3].item.style.color = "white";tabBody[4].item.style.backgroundColor = "#DC3545";
      //tabBody[4].item.style.color = "white";
    }
    if (listArray[1].classList.contains('active')) {
      tabBody[1].classList.add('active');
      tabBody[0].classList.remove('active');
      tabBody[2].classList.remove('active');
      tabBody[3].classList.remove('active');
      tabBody[4].classList.remove('active');
    }
    if (listArray[2].classList.contains('active')) {
      tabBody[2].classList.add('active');
      tabBody[0].classList.remove('active');
      tabBody[1].classList.remove('active');
      tabBody[3].classList.remove('active');
      tabBody[4].classList.remove('active');
    }
    if (listArray[3].classList.contains('active')) {
      tabBody[3].classList.add('active');
      tabBody[0].classList.remove('active');
      tabBody[1].classList.remove('active');
      tabBody[2].classList.remove('active');
      tabBody[4].classList.remove('active');
    }
    if (listArray[4].classList.contains('active')) {
      tabBody[4].classList.add('active');
      tabBody[0].classList.remove('active');
      tabBody[1].classList.remove('active');
      tabBody[3].classList.remove('active');
      tabBody[2].classList.remove('active');
    }

  })
})
var i = 2, j = 1;
function closebtn() {
  const close = document.querySelector(".timer-cut");
  close.style.display = "none";


}

// delete input box
function hidebtn(ele) {
  const hide = document.querySelector(`.${ele}`);

  hide.remove();
  if (j > 1) j--;
  console.log(j);
}
function noneBtn() {
  const none = document.querySelector(".timer");
  none.style.display = "none";
}

function time__btn() {
  const close = document.querySelector(".timeCut");
  close.style.display = "none";
}
function time_Btn() {
  const hide = document.querySelector(".timerCut");
  hide.style.display = "none";
}
function timeBtn() {
  const none = document.querySelector(".timer_cut");
  none.style.display = "none";
}

var top = document.querySelector(".time-cut")
var op = document.querySelector(".temp")
console.log(op)
// addition of inbox box on click on add button
op.addEventListener("click", function () {

  if (j < 3) {
    document.querySelector(".timer").innerHTML += `<div class="a${i}"><div class="time-cut">
    <input type="email" class="form-control col-2 mr-2" value="1" id="exampleInputEmail1"
      aria-describedby="emailHelp">
    <select class="form-control col-7" id="exampleFormControlSelect1">
      <option>Hour(s) Before</option>
      <option>Day(s) Before</option>
      <option>Minute(s) Before</option>
    </select> <span class="px-3" onclick="hidebtn('a${i}')"><i class="far fa-trash-alt"></i></span>
  </div></div>`
    j += 1;
    i += 1;
  }
  console.log(i);

});