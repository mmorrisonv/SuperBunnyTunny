$(document).ready(function(){
	//temporary includes
	$.getScript("/assets/js/lib/modal.js");
	$.getScript("/assets/js/lib/headfoot.js");

		//activate select plugin on all select elements
		$('select').selectmenu();
		


})
$(window).load(function(){
	
	adjustNavUniform();
	adjustScrollable();

});

function adjustNavUniform(){

	$.each($('.jsuniform'),function(index,value){
		//console.log(this);
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