//code for the header - footer. 
//global - but added to its own file for locality of refrence
$(document).ready(function(){
	setupResettableInputs('#newsletter,#searchfield,.qtyinput');
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
			if( valOnClick == 'EMAIL SIGN-UP' || valOnClick == 'SEARCH' || valOnClick == 'QTY' || valOnClick === null)
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

//function setupShoppingBag(){
//	$('.shopcart').hover(
//		function(){
//			$(this).children('.shopcart-menu').show();
//			},
//		function(){
//			$(this).children('.shopcart-menu').hide();
//		}
//		);
//}

function setupShoppingBag(){
	$('.shopcart').hover(
		function(){ ShowBag(); },
		function(){	$(this).removeClass('hovered').children('.shopcart-menu').hide();
	});

//  $.ajax({
//    
//        type:'POST',
//        dataType:'json',
//        url:'/ajx/cart.aspx?action=retrieve',  
//        success: function(data){
//            jsonQuestionResponse = data;            
//            var jsonResponse = jsonQuestionResponse.status;
//            var cartCount = jsonQuestionResponse.cartcount;
//            $('#cartCountTotal').text('Shopping Cart ('+cartCount+')');
//          }
//    });
}

function ShowBag()
{
	var buttontxt = $('#account .shopcart a').text(),
	numItems  = buttontxt.substring(14,17);
	if(numItems == '(0)')
		return;
	
	$('.shopcart').addClass('hovered').children('.shopcart-menu').load('ajx/cartdrop.aspx').show();
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
		
		if( email === null || email == 'EMAIL SIGN-UP' || email == '' ){
			$('#newslettererror').text('*PLEASE ENTER A VALID EMAIL ADDRESS');
		}
		else{
			$('#modal-newsletter-thankyou').modal('show');
		}
			
	});
}








//-------------------------------------------------LISTENERS

