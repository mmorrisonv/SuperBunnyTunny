$(document).ready(function(){
	    
	//activate demo modals
	$('#my-modal,#modal-thankyou,#modal-email,#modal-wlistconfirm,#modal-html,#modal-GCbal,#modal-tycontact,#modal-forgotpw').modal({backdrop:true,keyboard:true});
	$('#modal-referfriend,#modal-sendwishlist').modal({backdrop:true,keyboard:true});

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
	$('img.jemailbtn').click(function(){
	    var oid = $(this).attr('oid');
		$('#modal-email').modal('show');
		
		$('.jModalSendEmailBtn').click(function()
		{
		    sendEmail(oid);
		    $('.jModalSendEmailBtn').unbind('click');
		});
		
		$('.jModalCancelEmailBtn').click(function()
		{  
		    $('#modal-email').modal('hide');
		});
	});
	
	$('a.jContactUsbtn').click(function(){
        $.ajax({
            type:'POST',
            dataType:'json',
            url:'/ajx/sendemail.aspx?action=contactus',   
            data:$("form").serialize(),
            
            success: function(data){
                $('span[id$="_err"]').empty();               
                if(data.status == 'error'){
                    $('#dvOops').show();
                    $.each(data.errors, function(i,val){
                        $('#'+val.field+'_err').html(val.msg);
                        if (val.field=="system") alert(val.msg);
                    });
                } 
                else {
                    $('#dvOops').hide();
                    $('#modal-tycontact').modal('show');
                }
            }
        });
    });
	//jGCsubmit

	
	
	//setup modal for jwishlistbtn
	$('.jwishlistbtn').click(function(){
		$('#modal-wlistconfirm').modal('show');
	});
	
	//setup modal for giftcard balance
	$('.jModalGF').click(function(e){
	
	    e.preventDefault();
		$('#modal-GCbal').modal('show');
		
		    $('#gcError').text("");
		
		$('.jGCsubmit').unbind('click').click(setupGCBalanceSubmitBtn);
	});
	//setup modal for contact thank you message
	$('.jModalContactTY').click(function(){
		$('#modal-tycontact').modal('show');
	});
	//setup modal for forgotpw
	$('.jModalFPass').click(function(){
	   
	    ResetPassword('refresh');
	  	$('#modal-forgotpw').modal('show');
	});
	
	$('.jrefreshBtn').click(function() {
	    ResetPassword('refresh');
	});

	$('.jsubmitFPassBtn').click(function() {
       
       var chal =  $('#challenge').val();
       var emailText = $('#email-text').val();
       var chalText = $('#challenge-text').val();

	   ResetPassword('reset',chal,chalText,emailText);
	});
	
	$('.jModalReferFriend').click(function(){
		$('#modal-referfriend').modal('show');
	});


	$('.jModalSendWishlist').click(function(){
		$('#modal-sendwishlist').modal('show');
	});

});//end document ready

	
function setupGCBalanceSubmitBtn(e){ 
 
    e.preventDefault();
    var cardnum   = $('.FormGCnum').val(),
        cardpin   = $('.FormGCpin').val(),
        $amountDOM = $('.FormGCdisp'),
        $errorDOM = $('#gcError');
        
        $amountDOM.val("");

        console.log(cardnum + ' ' +cardpin);
    $.ajax({
    
        type:'POST',
        dataType:'json',
        url:'/ajx/giftcard.aspx?action=confirm',  
        data: { num:cardnum,pin:cardpin },
        success: function(data)
        {
            if(data.status == 'success') { 
                $errorDOM.text(""); 
                $amountDOM.val(data.amount); 
            }
            else { $errorDOM.text(data.msg); }
        }
    });
};


$(window).load(function(){
});

// **** JSON version of the password challenge - SRD
function ResetPassword(action,chal,chalText,emailText) {
	 $.ajax({
        type: 'POST',
        dataType: 'json',
        cache: false,
        url: '/ajx/password.aspx?action='+action, 
        data: {challenge:chal,challengeText:chalText,email:emailText},
        success: function(data)
        {
            $('span[id$="_err"]').empty();
            if(data.status == 'ok') { 
                $('#modal-forgotpw').modal('hide');
          		$('#modal-tycontact').modal('show');
            }
            else {
                //Handle Error Messages
                 $.each(data.errors, function(i,val){
                        $('#'+val.field+'_err').html(val.msg);
                        if (val.field=="system") alert(val.msg);
                    });
                
                //Reset the Captcha Image
                $('#imgChallenge').attr('src','/image_handler.ashx?c='+data.captcha);
                $('input.#challenge').val(data.captcha);
            }
        }
    });        
}
function SetCaptcha_old(action,chal,chalText,emailText) {
    
	 $.ajax({
        type: 'POST',
        dataType: 'html',
        cache: false,
        url: '/ajx/password.aspx?action='+action, 
        data: {challenge:chal,challengeText:chalText,email:emailText},
        success: function(data)
        {
            $('#Captcha-Drop').empty().append($(data).find('#container'));
            
            $('#spanEmailError').empty().append($(data).find('#spnemailErr').contents());
            $('#spnchaltextErr').empty().append($(data).find('#spnchallErr').contents());
        }
    });        
    if (action == 'refresh') { $('#challenge-text').val(''); }
};




function sendEmail(oid){
	//Send Message
    var jsonQuestionResponse = null;         

    $.ajax({
        type:'POST',
        dataType:'json',
        url:'/ajx/sendemail.aspx?action=send&oid='+oid,   
        data:{emailname:$('#email-name').val(),emailaddresses:$('#email-to-addresses').val()
            ,emailnotes:$('#email-notes').val(),emailcopy:$('#email-copy').attr('checked')},
            
        success: function(data){
            jsonQuestionResponse = data;            
            var jsonResponse = jsonQuestionResponse.info;
            var msgStatus; 
          }
    });
}          
            
//            if(jsonResponse.status == 'error'){                      
//                $.each( data.PRODUCT_QUESTION_INFO.ERRORS , function(i,val){
//                    msgStatus = val; 
//                });
//            }
//            else// success
//                msgStatus = 'Thank You. Your message has been sent. We will get back to you shortly. If you would like to speak to customer service directly please call 1.866.654.4577';
 
        

