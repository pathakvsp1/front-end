
var secondform = document.getElementsByClassName("secondform")[0];
var firstform = document.getElementsByClassName("firstform")[0];
var thirdform = document.getElementsByClassName("thirdform")[0];
var current_link = window.location.href;


//  WEBHOOKS DIV //

var newbooking_div = document.getElementById("new_booking");
var reschedule_div = document.getElementById("rescheduled");
var cancel_div = document.getElementById("cancelled");

newbooking_div.style.display="none";
reschedule_div.style.display="none";
cancel_div.style.display="none";


// plus buttons initiated
  var addition = document.querySelector("#addition-plus");
  var rescheduling = document.querySelector("#rescheduling-plus");
  var cancelling = document.querySelector("#cancelled-plus");

  addition.addEventListener("click", function () {

  if(newbooking_div.style.display=="none"){
    newbooking_div.style.display="block";
  }
  else if(newbooking_div.style.display=="block"){
    newbooking_div.style.display="none";
  }
  })
  rescheduling.addEventListener("click", function () {
  
  if(reschedule_div.style.display=="none"){
    reschedule_div.style.display="block";
  }
  else if(reschedule_div.style.display=="block"){
    reschedule_div.style.display="none";
  }
  
  })
  cancelling.addEventListener("click", function () {
  
  if(cancel_div.style.display=="none"){
    cancel_div.style.display="block";
  }
  else if(cancel_div.style.display=="block"){
    cancel_div.style.display="none";
  }
  
  });


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



  $.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  
  }
});

function connectAnalytics(type) {

let value;

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
 
let url;
let obj="text"+val;

 if(type=='Booking')
  url= $("#"+obj).val();
 else if(type=='Reschedule')
  url= $("#reschedule"+val).val();
else
 url= $("#cancel"+val).val();


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
			window.location.href = "/staff/integrations#tab2";
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
      
          window.location.href = "/staff/integrations#tab2";
		  window.location.reload();
		  
        }
    });
});