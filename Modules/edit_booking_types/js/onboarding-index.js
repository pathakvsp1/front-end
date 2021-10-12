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
$('#usernamebutton').prop('disabled', true);
else
$('#usernamebutton').prop('disabled', false);	
$("#username").on('change keyup paste', function(){
	let username=$('#username').val();
	
	if(username===''){
	$('#usernamebutton').prop('disabled', true);
	$('#tick').html('');
	return false;
	}
	else{
		
    $.ajax({
    type: 'GET',
    url: '/checkUsernameExistence',
    data: {username:username,ajax:'true'},
  success: function (data) {
    
		if(data.available=='true'){
			
			$('#tick').html('&#10004;');
			$('#usernamebutton').prop('disabled', false);
		}
		else{
			$('#tick').html('&#10060;');
			$('#usernamebutton').prop('disabled', true);
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
	}

});
}); 