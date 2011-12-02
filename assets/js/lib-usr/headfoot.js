//code for the header - footer. 
//global - but added to its own file for locality of refrence
$(document).ready(function(){
	setupResettableInputs('#newsletter,#searchfield');
	setupSearchBar();
	setupNewsletter();
	setupShoppingBag();
	setupHeaderDropdowns();
	setupLeftNav();
})

//-------------------------------------------------SETUP
function setupResettableInputs(inputs){
	$.each($(inputs),function(i,elment){
		
	});
	$(inputs).bind({
		click:function(){
			var valOnClick  =  $(this).val();
			if( valOnClick == 'EMAIL SIGN-UP' || valOnClick == 'SEARCH' || valOnClick === null)
			{
				$(this).data( 'defaultWord' , valOnClick );
				$(this).val('');	
			}
		},
		blur:function(){
		if($(this).val() == '' || $(this).val() === null)
			$(this).val($(this).data('defaultWord'));
		}
	});

}

function setupShoppingBag(){
	$('.shopcart').hover(
		function(){
			$(this).children('.shopcart-menu').show();
			},
		function(){
			$(this).children('.shopcart-menu').hide();
		}
		);
}

function setupHeaderDropdowns(){
	$('header .nav li').hover(function(){
			$(this).children('.dropdown-nav').show();
			},
		function(){
			$(this).children('.dropdown-nav').hide();
		}
	);
}

function setupLeftNav(){
	$('#leftnav > ul > li a').click(function(){
		//console.log($(this));
		$(this).parent().toggleClass('open');
	});
}

function setupSearchBar(){

}
function setupNewsletter(){
	$('#newsletterbtn').click(function(){
		var email;
		email = $('#newsletter').val();
		console.log(email);
		if( email === null || email == 'EMAIL SIGN-UP' || email == '' ){
			$('#newslettererror').text('*PLEASE ENTER A VALID EMAIL ADDRESS');
		}
		else{
			$('#modal-newsletter-thankyou').modal('show');
		}
			
	});
}








//-------------------------------------------------LISTENERS

