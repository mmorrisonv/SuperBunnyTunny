//code for the header - footer. 
//global - but added to its own file for locality of refrence
$(document).ready(function(){


})
//$(window).load(function(){

	setupResettableInputs('#newsletter,#searchfield');
	setupSearchBar();
	setupNewsletter();
	setupShoppingBag();
//});


function setupResettableInputs(inputs){
	$.each($(inputs),function(i,elment){
		var valueOnLoad  =  $(this).val();
		$(this).data( 'defaultWord' , valueOnLoad );
	});
	$(inputs).bind({
		click:function(){
			$(this).val('');
		},
		blur:function(){
		if($(this).val() == '' || $(this).val() == null)
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

function setupSearchBar(){
	
}
function setupNewsletter(){
	
}