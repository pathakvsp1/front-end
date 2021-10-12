

var secondform = document.getElementsByClassName("secondform")[0];
var firstform = document.getElementsByClassName("firstform")[0];
var thirdform = document.getElementsByClassName("thirdform")[0];
var current_link = window.location.href;

  //  /staff/info/staffSetting#login

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

  var add_i = 1;
  var reschedule_i = 1;
  var cancel_i = 1;
  var addi=0;
  var resi=0;
  var canci=0;
  
  function hidebtn(ele,z) {
    const hide = document.querySelector(`.${ele}`);
    hide.remove();
    if(z==1) {addi--;add_i--}
  else if(z==2){ resi--;reschedule_i--}
    else {canci--;cancel_i--}
  }

  // plus buttons initiated
  var addition = document.querySelector("#addition-plus");
  var rescheduling = document.querySelector("#rescheduling-plus");
  var cancelling = document.querySelector("#cancelled-plus");
  var add_i = 1;
  var reschedule_i = 1;
  var cancel_i = 1;
  var addi=0;
  var resi=0;
  var canci=0;
  addition.addEventListener("click", function () {

    if(addi<3){document.querySelector('#Booking').insertAdjacentHTML('beforeend', "<div class='row add"+add_i+"'><input type='hidden' id='bookingcount' name='bookingcount' value='"+add_i+"'><div class='textadd col-10 pl-0 '><input type='text' name='text"+addi+"'  id='text"+addi+"' class='select-input'></div><div class='iconadd col-2 py-2'><button type='button' class='mr-1 border-btn btn' id='testAdd' onclick='testLink(\""+'Booking'+"\",\""+addi+"\")'>Test Link</button><button class='light-btn btn' type='button' onclick='hidebtn(\""+'add'+add_i+"\",\""+'1'+"\")'><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button></div></div>");
    addi++;
    
  }
  add_i++;
  })
  rescheduling.addEventListener("click", function () {
    if(resi<3){document.querySelector('#Rescheduled').insertAdjacentHTML('beforeend', "<div class='row reschedule"+reschedule_i+"'><input type='hidden' id='reschedulecount' name='reschedulecount' value='"+reschedule_i+"'><div class='textadd col-10 pl-0 '><input type='text' name='reschedule"+resi+"'  id='reschedule"+resi+"' class='select-input'></div><div class='iconadd col-2 py-2'><button type='button' class='mr-1 border-btn btn' id='testAdd' onclick='testLink(\""+'Reschedule'+"\",\""+resi+"\")'>Test Link</button><button class='light-btn btn' type='button' onclick='hidebtn(\""+'reschedule'+reschedule_i+"\",\""+'2'+"\")'><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button></div></div>");

                            resi++;}
    reschedule_i++;
  })
  cancelling.addEventListener("click", function () {
    if(canci<3){document.querySelector('#Cancelled').insertAdjacentHTML('beforeend', "<div class='row cancel"+cancel_i+"'><input type='hidden' id='cancelcount' name='cancelcount' value='"+cancel_i+"'><div class='textadd col-10 pl-0 '><input type='text' name='cancel"+canci+"'  id='cancel"+canci+"' class='select-input'></div><div class='iconadd col-2 py-2'><button type='button' class='mr-1 border-btn btn' id='testAdd' onclick='testLink(\""+'Cancel'+"\",\""+canci+"\")'>Test Link</button><button class='light-btn btn' type='button' onclick='hidebtn(\""+'cancel'+cancel_i+"\",\""+'3'+"\")'><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'><path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/><path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg></button></div></div>");
                            canci++;}
    cancel_i++;
  });
  $.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  
  }
});

function connectAnalytics(type) {

let value;
alert(type);
if(type=='google')
value=$('#googleAnalytics').val();
else if(type=='facebook')
value=$('#facebookAnalytics').val();  
else if(type=='googletag')
value=$('#tagManager').val();
else
value=$('#clarity').val();  

  $.ajax({
    type: 'GET',
    url: '/staff/info/connectAnalytics',
    data: {type:type,value:value,'csrf-token':'{{csrf_token()}}'},
    dataType: 'json',
  success: function (data) {
    $('.success').show();
      $('.success').html(data.status).hide()
            .fadeIn(1500, function() { $('.success'); });
      setTimeout(resetAll,3000);
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
function resetAll(){
 
$('.success').hide(); 
$('.success-webhook').hide(); 

}
function testLink(type,val){
  alert(type);
  alert(val);
let url;
let obj="text"+val;

 if(type=='Booking')
  url= $("#"+obj).val();
 else if(type=='Reschedule')
  url= $("#reschedule"+val).val();
else
 url= $("#cancel"+val).val();
alert(url);

 $.ajax({
    type: 'GET',
    url: '/staff/info/testLink',
    data: {type:type,url:url},
    dataType: 'json',
  success: function (data) {
    
    $('.success-webhook').html(data.status).hide()
            .fadeIn(1500, function() { $('.success-webhook'); });
      setTimeout(resetAll,3000);
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
 $.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  
  }
});
$('#connectPaypal').on('click', function(e){
   e.preventDefault();
   var paypalemail = $('#paypalemail').val();
   
   $.ajax({
        type: 'GET',
        url: '/staff/paypal/connect',
        data: {
            paypalemail : paypalemail
        },
        success: function (response) {
      
             window.location.reload();
        }
    });
});
$('#disconnectPaypal').on('click', function(e){
   e.preventDefault();
   $.ajax({
        type: 'GET',
        url: '/staff/paypal/disconnect',
        data: {
            
        },
        
        
        success: function (response) {
      
              window.location.reload();
        }
    });
});