$(document).ready(function(){
	
	//activate demo modals
	$('#my-modal,#modal-thankyou,#modal-email,#modal-wlistconfirm,#modal-html,#modal-GCbal,#modal-tycontact,#modal-forgotpw').modal({backdrop:true,keyboard:true});

	//activate global modals
	$('#modal-newsletter-thankyou').modal({backdrop:true,keyboard:true});

	//setup modal for zoom on product detail page
	$('.zoombtn').click(function(){
	    var fsOID =  $('#previewImage').attr('oid');
	    var fsAVID =  $('#previewImage').attr('avid');
		//window.open ("/zoom.aspx","mywindow","menubar=1,resizable=1,width=650,height=850");
		var url = "/product_zoom.aspx?id="+fsOID+"&avid="+fsAVID;
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
	//setup modal for giftcard balance
	$('.jModalGF').click(function(){
		$('#modal-GCbal').modal('show');
	});
	//setup modal for contact thank you message
	$('.jModalContactTY').click(function(){
		$('#modal-tycontact').modal('show');
	});
	//setup modal for forgotpw
	$('.jModalFPass').click(function(){
		$('#modal-forgotpw').modal('show');
	});

	
	
})
$(window).load(function(){
	


});

