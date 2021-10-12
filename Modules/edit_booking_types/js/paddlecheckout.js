Paddle.Environment.set('sandbox');
	Paddle.Setup({ vendor: 3084,
     });
    
    function checkoutClosed(data) {
            console.log(data);
        alert('Your purchase has been cancelled, we hope to see you again soon!');
       
}
function checkoutComplete(data) {
                console.log(data);
                alert('Thanks for your purchase.');
                var checkoutId = data.checkout.id;
        
                Paddle.Order.details(checkoutId, function(data) {
                    var user = {!! auth()->guard('staff')->user() !!};
                    
        console.log(data);
    });
        }
    
    jQuery(function($){
    
	document.getElementById('buy').addEventListener('click', openCheckout, false);
    function openCheckout() {
		var user = {!! auth()->guard('staff')->user() !!};
        //alert(user.code);
        //var email = user.email;
        Paddle.Checkout.open({
			product: 15711,
            method: 'inline',
            email: email,
            successCallback: "checkoutComplete",
            closeCallback: "checkoutClosed",
            passthrough: "{\"user_id\":"+user.code+"}",
            frameTarget: 'renderpaddle', 
				frameInitialHeight: 416,
				frameStyle: 'width:100%; min-width:312px; background-color: transparent; border: none;'
           
		});
       

	}
    });
</script>