$(document).ready(function(){
	
	//activate modals
	$('#my-modal,#modal-thankyou,#modal-email,#modal-wlistconfirm').modal({backdrop:true,keyboard:true});
	//setup modal for zoom on product detail page
	$('.zoombtn').click(function(){
		window.open ("/pages/group1/zoom.html","mywindow","menubar=1,resizable=1,width=650,height=850");
	});
})
$(window).load(function(){
	


});

