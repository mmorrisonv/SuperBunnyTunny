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
		$('.jModalSendEmailBtn').click(function(){sendEmail();});
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

function sendEmail(){
	//Send Message
    

        
        var jsonQuestionResponse = null;
          
         
        
        //our ajax call - qajx = questionajax
        var qajx = $.ajax({
            url:'/ajx/sendemail.aspx',  
            type:'POST',
            dataType:'json',
            data:{ name:$('.question_name').val() , email:$('.question_email').val(), subject:$('.question_subject').val() , message:$('.question_message').val()}
        })
        .success(function(data){

            jsonQuestionResponse = data;            
            var jsonResponse = jsonQuestionResponse.PRODUCT_QUESTION_INFO;
            var msgStatus; 
            if(jsonResponse.SUCCESS != 'YES'){                      
                $.each( data.PRODUCT_QUESTION_INFO.ERRORS , function(i,val){
                    msgStatus = val; 
                });
            }
            else// success
                msgStatus = 'Thank You. Your message has been sent. We will get back to you shortly. If you would like to speak to customer service directly please call 1.866.654.4577'
 
            $('p.formresponse',responseTab).text(msgStatus);    //todo: should we just create a p element instead
        })
        .error(function(data){

      
            jsonQuestionResponse = data;
            $('p.formresponse',responseTab).text('An error has occoured, please try again.');    //todo: should we just create a p element instead
            
        })
        .complete(  function(){

	    
        
        });
        

}