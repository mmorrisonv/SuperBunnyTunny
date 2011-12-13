$(document).ready(function(){
	
	//activate demo modals
	$('#my-modal,#modal-thankyou,#modal-email,#modal-wlistconfirm,#modal-html').modal({backdrop:true,keyboard:true});

	//activate global modals
	$('#modal-newsletter-thankyou').modal({backdrop:true,keyboard:true});

	//setup modal for zoom on product detail page
	$('.zoombtn').click(function(){
	    var fsOID =  $('#previewImage').attr('oid');
		//window.open ("/zoom.aspx","mywindow","menubar=1,resizable=1,width=650,height=850");
		var url = "/zoom.aspx?oid="+fsOID;
		$(".modal-body","#modal-html").load(url, function() {
		    onResizePage();
		    $("#modal-html").addClass('zoom').modal({backdrop:true,keyboard:true});
		    
	    });
	});
	
	//setup modal for zoom on product detail page
	$('.jemailbtn').click(function(){
		$('#modal-email').modal('show');
	});
	//setup modal for jwishlistbtn
	$('.jwishlistbtn').click(function(){
		$('#modal-wlistconfirm').modal('show');
	});
	
	
})
$(window).load(function(){
	


});

