$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
function pauseBooking(serviceid,e) {
	
let toggle = e.checked;

  $.ajax({
    type: 'POST',
    url: '/pauseBookingType',
    data: {serviceid:serviceid,toggle:toggle},
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

}

$("document").ready(function(){
    setTimeout(function(){
       $("#successmessage").remove();
    }, 5000 );

});