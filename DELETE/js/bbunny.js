$(window).load(function(){
	
	adjustNavUniform();
})

function adjustNavUniform(){
	//console.log('test');

	/*
	var width = $('header .widthFull').width();
	var count = $('header .widthFull li').length;

	$('header .widthFull li').css('width',width / count);*/

	$.each($('.jsuniform'),function(index,value){
		//console.log(this);
		$this = $(this);
		var width = $this.width();
		var count = $this.children().length;
		$this.children().css('width',width / count);
	});

}