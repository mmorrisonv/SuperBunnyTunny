$(window).load(function(){
	
	adjustNavUniform();
})

function adjustNavUniform(){
	//console.log('test');
	var width = $('header .widthFull').width();
	var count = $('header .widthFull li').length;

	$('header .widthFull li').css('width',width / count);
}