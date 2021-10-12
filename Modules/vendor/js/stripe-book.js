if($("#paymode").val()=='Offline' || ($("#stripetoken").val()=='' && $("#paypaltoken").val()=='' )){
  $("#booknow").attr('disabled', false);
  $("#stripe_block").hide();
  $("#paypal_block").hide();
}
else{
	
	if($("#paymode").val()=='Stripe' && $("#stripetoken").val()!='') {
		
		$("#stripe_block").show();
	}
	else{
		$("#stripe_block").hide();
	}
	if($("#paymode").val()=='Paypal'){
	
	$("#paypal_block").show();
	}
	else{
		$("#paypal_block").hide();
	}
	$("#booknow").attr('disabled', true);
}
if($("#stripetoken").val()!=''){
   var stripe = Stripe($("#apikey").val(), {
    stripeAccount: $("#accountid").val()
  });
  
var elements = stripe.elements();
var style = {
  base: {
    color: "#32325d",
  }
};

var card = elements.create("card", { style: style });
var cardelement = document.getElementById("card-element");
if(cardelement!=null)
card.mount("#card-element");
card.on('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});  

}
	$(".pay").click(function(e){
		$(".pay").attr('disabled', true);
		
		$("#booknow").attr('disabled', true);
    var name = $("#name").val();
    var email = $("#email").val();
    var billing_address = $("input[name='billing_address']").val();
    var billing_city = $("input[name='billing_city']").val();
    var billing_state = $("input[name='billing_state']").val();
    var billing_pin = $("input[name='billing_pin']").val();
    var billing_country = $("select[name='billing_country'] option:selected").val();
    
    if (name == "" || email == "" || billing_address == "" || billing_city == "" || billing_state == "" || billing_pin == "" || billing_country == "" ) {
      alert("Please fill all required fields");
      $(".pay").attr('disabled', false);
	  
    }else{
        let serviceid=$("#serviceid").val();
		let staffid=$("#staffid").val();
		 if($("#couponid").val()!='')
              var amountToPay=$('#amountValue').val();
              else
              var amountToPay=$('#price').val();
		
        $.ajax({
    type: 'POST',
    url: '/stripePayment',
    data: {serviceid:serviceid,staffid:staffid,amountToPay:amountToPay},
    success: function (data) {
      //alert(data.error);
	  if (data.response == "Success") {
              var clientSecret = data.client_secret;
              var intent_id = data.intent_id;
			  $("#intent_id").val(data.intent_id);
			  
			  // With stripe.confirmCardPayment method we fullfill payment
              // stripe.confirmCardPayment may take several seconds to complete. During that time, disable your form from being resubmitted and show a waiting indicator such as a spinner. If you receive an error, show it to the customer, re-enable the form, and hide the waiting indicator.

             stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
					name: name,
                    email: email,
                    address:{                    
                      line1: billing_address,
                      city: billing_city,
                      state: billing_state,
                      postal_code: billing_pin,
                      country: billing_country
					}
      }
    }
  }).then(function(result) {
	  
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
	  alert(result.error.message);
      console.log(result.error.message);
	  $(".pay").attr('disabled', false);
	  
    } else {
      // The payment has been processed!
	  
      if (result.paymentIntent.status === 'succeeded') {
		  
		  $('.success').html('Payment Successful').hide()
            .fadeIn(2000, function() { $('.success'); });
			setTimeout(resetAll,4000);
			$("#booknow").attr('disabled', false);
			$(".pay").attr('disabled', true);
			$('#couponDiv').hide();
			$('#payboth').hide();
			$("#billing").hide();
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  });

          }else{
			  $(".pay").attr('disabled', false);
              alert(" Some error occured, refresh the page and try again or contact support with error code. " + data.error);
          }

    },
    error: function (jqXhr, json, errorThrown) {
		$(".pay").attr('disabled', false);
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
  });
  
  $.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

function resetAll(){
 
$('.success').hide(); 


}
$('input[name="payment_method"]').click(function(){
        var inputValue = $(this).attr("value");
		
		if(inputValue=='stripe'){
			if($("#stripetoken").val()!=''){
        $("#stripe_block").show();
		$("#paypal_block").hide();
			}		
		}
		else if(inputValue=='paypal'){
			if($("#paypaltoken").val()!=''){
		$("#stripe_block").hide();
		$("#paypal_block").show();	
			}
		}
    });
	
	
