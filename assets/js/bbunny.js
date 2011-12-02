$(document).ready(function(){
	//temporary includes
	$.getScript("/assets/js/lib-usr/modal.js");
	$.getScript("/assets/js/lib-usr/headfoot.js");

	//activate select plugin on all select elements
	$('select').selectmenu();
	
	//rejigger nav
	adjustNavUniform();

})
$(window).load(function(){
	

	adjustScrollable();

	initScrollable();
	setupScrollable();

	onResizePage();
});


    
$(window).resize(onResizePage);



function onResizePage()
{
	console.log('resize');
	var $win = $(window),
	wh = $win.height(),
	ww = $win.width()

    rectifyScrollable({ w:ww , h:wh, verticalcenter:true });
}


function adjustNavUniform(){

	$.each($('.jsuniform'),function(index,value){
		$this = $(this);
		var width = $this.width();
		var count = $this.children().length;
		$this.children().css('width',width / count);
	});
};

function adjustScrollable(){
    var wwidth = $(window).width();
    var cwidth = $('#scrollableHomepage').width();
    
    //console.log(wwidth + ' ' + cwidth);
    $('#scrollableHomepage').css('left',(wwidth/2) - (cwidth/2));
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
       
        scrapi.seekTo(0,0);
        /*var wwidth = gwd('w');
        var wheight = gwd('h');*/
        //rectifyScrollable({w:wwidth , h:wheight , verticalcenter:true});
        
        //scrapi.seekTo(0);
        
        scrapi.seekTo(0,100);
        $("#scrollableHomepage").fadeOut(0);
        $("#scrollableHomepage").css('visibility','visible');
        /*$('#boxBackground').show();
        $("#scrollableHomepage").show().css('visibility','visible');*/
        $('#boxBackground').fadeIn();
        $("#scrollableHomepage").fadeIn();
        //rectifyScrollable({w:wwidth , h:wheight , verticalcenter:true});
        //scrapi.seekTo(0,0);
         
    }

    function rectifyScrollable(opt){
        //if not locked
        if(!opt.originY)
            opt.originY = $('.slide').offset().top;
        var sldHeight = $('.slide').height();
        //sldHeight = 452;
        
        if(opt.verticalcenter === true && sldHeight > 100 ){
             //$("#scrollableHomepage").css({ 'top' : opt.h / 2 - ( sldHeight / 2 ) });//vertically center scrollable
             opt.originY = $('.slide').offset().top;
        }
        var mL = (opt.w/2) - (980 / 2) -5;
        //$('#page').css('margin-left', mL );//position the sldies relative inside the parent scrollable div
        $('#boxBackground').css('margin-left', mL );
        $('#scrollableHomepage').css('left', mL+14 );
        
        //make slides the width of the browser so that only one is visible at a time
        //$('#scrollableHomepage .items .slide').css({'width':opt.w});
        
        //move prev next buttons
        $('.prev.button').css({'left':opt.w/2 - (920/2) - 30,'top':opt.originY + ( sldHeight / 2 ) });
        $('.next.button').css({'left':opt.w/2 + (920/2) - -5,'top':opt.originY + ( sldHeight / 2 ) });
        
        //adjust scrollable_slideSelect slide menu 1 2 3
        $('#scrollable_slideSelect').css({ 'top':$('#page').height() - 10, 'right':$(window).width() / 2 - 70 });
    }
    
    function rectifyhomepagehotspot(){

        var slideWidth = $('.slide-container').width();
        if(slideWidth == 0) slideWidth = 920;
        var sxpos  = $('.slide-container').offset().left;
        var windowWidth = $(this).width();
        var windowHeight = $(this).height();
        var newX = (windowWidth / 2) + (slideWidth / 2);
        var newLeftWidth = (windowWidth / 2) - (slideWidth / 2) - (windowWidth / 32);
        $('#rightScrollableHotspot').css({'right':0,'width':windowWidth - newX ,'height':windowHeight - 10});
        $('#leftScrollableHotspot').css({'width':newLeftWidth , left:0,'height':windowHeight - 10});
        
    }