$(document).ready(function(){
	//temporary includes
	$.getScript("/assets/js/lib-usr/modal.js");
	$.getScript("/assets/js/lib-usr/headfoot.js");
	$.getScript("/assets/js/lib-usr/campaign.js");

	//activate select plugin on all select elements
	$('select').selectmenu();
	
	//rejigger nav
	adjustNavUniform();
	adjustScrollable();
	
	//if ready try to setup scrollable
	onResizePage();

})
$(window).load(function(){
	


	onResizePage();
	
}); 
$(window).resize(onResizePage);

BBUNNY  = { //namespace
    common:{
        init:function(){
                var alertFallback = false;
                if (typeof console === "undefined" || typeof console.log === "undefined") {
                    console = {};
                    console.log = function() {};
                }
        },
        finalize:function(){
 			
        },
        debug:function(){
        	//console.log('remove debug functions');
        	//add bestseller banner to listing page
        	$('.listinglayout .listing').eq(2).append('<div class="notice"><div>&nbsp;</div><span>BEST SELLER</span></div>');
        }
    },
    jBBhome:{
        init:function(){
            $(window).load(function(){
            	adjustScrollable();

	            initScrollable();
	            setupScrollable();
	            
	           

            });
        },
        finalize:function(){
        
        }   
    },
	jBBcampaign: {
	    init: function(){
	        // we do not want to show the scrollable functionality, hide all the things
	        $('.next,.prev').hide();
	        $('.jBBCampaginStart').click(BBUNNY.jBBcampaign.startCampaign).css('cursor','pointer');
	        $('.slide:not(.jfirst)').fadeTo(0,0);
	    },
	    startCampaign:function(){
	            //$('.slide').show();
            	adjustScrollable();
                
	            initScrollable();
	            $('.slide').fadeTo('slow',1);
	            setupScrollable();
	            
	            //show nav
	            $('#herolayout').animate({'height':650},300);
	            $('#campaignNav').show();
	            //console.log('scrollable setup');
	        $('.next,.prev').fadeIn();
	        $('.hero-campaign').fadeOut();
	    }
	},
	jBBproduct:{
	    init: function(){
	        BBUNNY.jBBproduct.setupCrossSellRollovers();
	        setupAltViewRollover();
	        setupProductPage();
	    },
	    setupCrossSellRollovers:function(){
	        $('.cross-sell img').hover(
	            function(){},
	            function(){}
	        );
	    }
	}
};
UTIL = {
	fire : function(func,funcname,args){
		var namespace = BBUNNY;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		}
	},
	loadEvents : function(){
		var bodyId = document.body.id;
		UTIL.fire('common');
		
		$.each(document.body.className.split(/\s+/),function(i,classnm){
			UTIL.fire(classnm);
			UTIL.fire(classnm,bodyId);
		});
		UTIL.fire('common','finalize');
		UTIL.fire('common','debug');
	},
	notEmpty: function (value){
		var blankPattern = /\S/;
		return blankPattern.test(value);
	},
	isEmail: function(value){
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
   		return emailPattern.test(value);
	},
	isNumeric: function(value){
		var numPattern = /^-?\d+$/;
		return numPattern.test(value);
	}
}
$(function(){
	UTIL.loadEvents();
});

function onResizePage()
{
	var $win = $(window),
	wh = $win.height(),
	ww = $win.width()

    rectifyScrollable({ w:ww , h:wh, verticalcenter:true });
    rectifyModals({ w:ww , h:wh, verticalcenter:true });
}


function rectifyModals( opt ){

    $('.modal').each(function(i,val)
    {
        var xoffset = ( opt.w / 2 ) - ( $(this).width() / 2 );
        var yoffset = ( opt.h / 2 ) - ( $(this).height() / 2 );
       $(this).css({left:xoffset,top:yoffset});
    });
};




function setupAltViewRollover(){
    $('.cross-sell a').hover(
        function(){
            var $this = $(this),
            verbiage = $this.find('img').attr('alt')
            overlayDiv = $this.find('.overlay'),
            canvasDiv = $('<div class="canvas"></div>'),
            verbiageDiv = $('<div class="verbiage"></div>').text(verbiage);

            if(verbiage == "" || verbiage === undefined )
                return;
            
            overlayDiv.append(verbiageDiv).prepend(canvasDiv).stop(true,true).show()

            //console.log(verbiage);
        },
        function(){
            var $this = $(this),
            overlayDiv = $this.find('.overlay');
            overlayDiv.stop(true,true).hide();
            overlayDiv.empty('.verbiage');
        }
    )
}



function adjustNavUniform(){
    //make nav children have unifrom padding
	$.each($('.jsuniform'),function(index,value){
		$this = $(this);
		var width = $this.width(),
		contentWidth=0,
		numChildren=0,
		paddingAmount=0;
	
		$.each($this.children(),function(i,val){
		    contentWidth += $(this).width();
		});
		
		numChildren = $this.children().length;
		paddingAmount = ((width - contentWidth) / numChildren) / 2 - 1;
		
		$this.children().css({'padding-left':paddingAmount,'padding-right':paddingAmount});
	});
};

function adjustScrollable(){
    var wwidth = $(window).width();
    var cwidth = $('#scrollableHomepage').width();
    
    $('#scrollableHomepage').css('left',(wwidth/2) - (cwidth/2));
};

function setupProductPage()
{
    $('#mainAltViews img').css('cursor','pointer');
    $('#mainAltViews img').click(function(){
        var fsimage = $(this).attr('fs'),
            fsOID =  $(this).attr('oid');
            fsAVID =  $(this).attr('avid');
        //console.log(fsimage);
        $('#mainAltViews img').removeClass('active');
        $(this).addClass('active');
        $('#mainProductView img').attr({'src':fsimage,'oid':fsOID,'avid':fsAVID});      
    });
};


//-------------------------------------------------SCROLLABLE SETUP
	var scrapi;

	function initScrollable()
	{

        $("#scrollableHomepage").scrollable({ circular: true, items: ".items", onSeek: onSlideNavigation });
        scrapi = $('#scrollableHomepage').data('scrollable');
	}


    
    function onSlideNavigation(){
        $('.scrollableNavButtons').removeClass('inverted');
        $('.scrollableNavButtons').eq( scrapi.getIndex() ).addClass('inverted');
        //console.log(this.getIndex());
    }

    function setupScrollable(){
        $('#scrollableLoading').remove();
       
       /* $("#scrollableHomepage").fadeOut(0);
        $("#scrollableHomepage").css('visibility','visible');

        $("#scrollableHomepage").fadeIn();*/
         
    }

    function rectifyScrollable(win){
        
        var slideWidth = $('#page .slide').width();
        var slideHeight = $('#page .slide').height();
        var mL = (win.w/2) - (slideWidth / 2) ;
        //$('#page').css('margin-left', mL );//position the sldies relative inside the parent scrollable div
        //console.log(mL);
        //$('#boxBackground').css('margin-left', mL );
        $('#scrollableHomepage #page').css('margin-left', mL );
        $('#scrollableHomepage .hero-campaign').css({'left': mL,'position':'relative'} );
        
        //make slides the width of the browser so that only one is visible at a time
        //$('#scrollableHomepage .items .slide').css({'width':win.w});
        
        //move prev next buttons
        $('#scrollableHomepage .prev').css({'left':win.w/2 - (slideWidth/2) - -10,'top':win.originY + ( slideHeight / 2 ) });
        $('#scrollableHomepage .next').css({'left':win.w/2 + (slideWidth/2) - 25,'top':win.originY + ( slideHeight / 2 ) });
        
        //adjust scrollable_slideSelect slide menu 1 2 3
        $('#scrollable_slideSelect').css({ 'top':$('#page').height() - 10, 'right':$(window).width() / 2 - 70 });
    }
    
