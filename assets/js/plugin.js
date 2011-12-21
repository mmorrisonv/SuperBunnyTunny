//bbunny plugins
/*
--twitter-bootstrap
	bootstrap-modal
	bootstrap-dropdown

--scrollable

---jquery ui
	jquery.ui.core.js
	jquery.ui.widget.js
	jquery.ui.position.js
	jquery.ui.selectmenu.js

*/


	/*bootstrap modal*/
!function($){"use strict"
var transitionEnd
$(document).ready(function(){$.support.transition=(function(){var thisBody=document.body||document.documentElement,thisStyle=thisBody.style,support=thisStyle.transition!==undefined||thisStyle.WebkitTransition!==undefined||thisStyle.MozTransition!==undefined||thisStyle.MsTransition!==undefined||thisStyle.OTransition!==undefined
return support})()
if($.support.transition){transitionEnd="TransitionEnd"
if($.browser.webkit){transitionEnd="webkitTransitionEnd"}else if($.browser.mozilla){transitionEnd="transitionend"}else if($.browser.opera){transitionEnd="oTransitionEnd"}}})
var Modal=function(content,options){this.settings=$.extend({},$.fn.modal.defaults,options)
this.$element=$(content).delegate('.close','click.modal',$.proxy(this.hide,this))
if(this.settings.show){this.show()}
return this}
Modal.prototype={toggle:function(){return this[!this.isShown?'show':'hide']()},show:function(){var that=this
this.isShown=true
this.$element.trigger('show')
escape.call(this)
backdrop.call(this,function(){var transition=$.support.transition&&that.$element.hasClass('fade')
that.$element.appendTo(document.body).show()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in')
transition?that.$element.one(transitionEnd,function(){that.$element.trigger('shown')}):that.$element.trigger('shown')})
return this},hide:function(e){e&&e.preventDefault()
if(!this.isShown){return this}
var that=this
this.isShown=false
escape.call(this)
this.$element.trigger('hide').removeClass('in')
$.support.transition&&this.$element.hasClass('fade')?hideWithTransition.call(this):hideModal.call(this)
return this}}
function hideWithTransition(){var that=this,timeout=setTimeout(function(){that.$element.unbind(transitionEnd)
hideModal.call(that)},500)
this.$element.one(transitionEnd,function(){clearTimeout(timeout)
hideModal.call(that)})}
function hideModal(that){this.$element.hide().trigger('hidden')
backdrop.call(this)}
function backdrop(callback){var that=this,animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.settings.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(document.body)
if(this.settings.backdrop!='static'){this.$backdrop.click($.proxy(this.hide,this))}
if(doAnimate){this.$backdrop[0].offsetWidth}
this.$backdrop.addClass('in')
doAnimate?this.$backdrop.one(transitionEnd,callback):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one(transitionEnd,$.proxy(removeBackdrop,this)):removeBackdrop.call(this)}else if(callback){callback()}}
function removeBackdrop(){this.$backdrop.remove()
this.$backdrop=null}
function escape(){var that=this
if(this.isShown&&this.settings.keyboard){$(document).bind('keyup.modal',function(e){if(e.which==27){that.hide()}})}else if(!this.isShown){$(document).unbind('keyup.modal')}}
$.fn.modal=function(options){var modal=this.data('modal')
if(!modal){if(typeof options=='string'){options={show:/show|toggle/.test(options)}}
return this.each(function(){$(this).data('modal',new Modal(this,options))})}
if(options===true){return modal}
if(typeof options=='string'){modal[options]()}else if(modal){modal.toggle()}
return this}
$.fn.modal.Modal=Modal
$.fn.modal.defaults={backdrop:false,keyboard:false,show:false}
$(document).ready(function(){$('body').delegate('[data-controls-modal]','click',function(e){e.preventDefault()
var $this=$(this).data('show',true)
$('#'+$this.attr('data-controls-modal')).modal($this.data())})})}(window.jQuery||window.ender);

	//bootstrap-dropwdown

!function($){
"use strict"
$.fn.dropdown=function(selector){
return this.each(function(){
$(this).delegate(selector||d,'click',function(e){
var li=$(this).parent('li')
,isActive=li.hasClass('open')
clearMenus()
!isActive&&li.toggleClass('open')
return false
})
})
}
var d='a.menu, .dropdown-toggle'
function clearMenus(){
$(d).parent('li').removeClass('open')
}
$(function(){
$('html').bind("click",clearMenus)
$('body').dropdown('[data-dropdown] a.menu, [data-dropdown] .dropdown-toggle')
})
}(window.jQuery||window.ender);


	/*Scrollable*/
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.scrollable={conf:{activeClass:"active",circular:!1,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:"> *",items:".items",keyboard:!0,mousewheel:!1,next:".next",prev:".prev",size:1,speed:400,vertical:!1,touch:!0,wheelSpeed:0}};function b(a,b){var c=parseInt(a.css(b),10);if(c)return c;var d=a[0].currentStyle;return d&&d.width&&parseInt(d.width,10)}function c(b,c){var d=a(c);return d.length<2?d:b.parent().find(c)}var d;function e(b,e){var f=this,g=b.add(f),h=b.children(),i=0,j=e.vertical;d||(d=f),h.length>1&&(h=a(e.items,b)),e.size>1&&(e.circular=!1),a.extend(f,{getConf:function(){return e},getIndex:function(){return i},getSize:function(){return f.getItems().size()},getNaviButtons:function(){return n.add(o)},getRoot:function(){return b},getItemWrap:function(){return h},getItems:function(){return h.find(e.item).not("."+e.clonedClass)},move:function(a,b){return f.seekTo(i+a,b)},next:function(a){return f.move(e.size,a)},prev:function(a){return f.move(-e.size,a)},begin:function(a){return f.seekTo(0,a)},end:function(a){return f.seekTo(f.getSize()-1,a)},focus:function(){d=f;return f},addItem:function(b){b=a(b),e.circular?(h.children().last().before(b),h.children().first().replaceWith(b.clone().addClass(e.clonedClass))):(h.append(b),o.removeClass("disabled")),g.trigger("onAddItem",[b]);return f},seekTo:function(b,c,k){b.jquery||(b*=1);if(e.circular&&b===0&&i==-1&&c!==0)return f;if(!e.circular&&b<0||b>f.getSize()||b<-1)return f;var l=b;b.jquery?b=f.getItems().index(b):l=f.getItems().eq(b);var m=a.Event("onBeforeSeek");if(!k){g.trigger(m,[b,c]);if(m.isDefaultPrevented()||!l.length)return f}var n=j?{top:-l.position().top}:{left:-l.position().left};i=b,d=f,c===undefined&&(c=e.speed),h.animate(n,c,e.easing,k||function(){g.trigger("onSeek",[b])});return f}}),a.each(["onBeforeSeek","onSeek","onAddItem"],function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}});if(e.circular){var k=f.getItems().slice(-1).clone().prependTo(h),l=f.getItems().eq(1).clone().appendTo(h);k.add(l).addClass(e.clonedClass),f.onBeforeSeek(function(a,b,c){if(!a.isDefaultPrevented()){if(b==-1){f.seekTo(k,c,function(){f.end(0)});return a.preventDefault()}b==f.getSize()&&f.seekTo(l,c,function(){f.begin(0)})}});var m=b.parents().add(b).filter(function(){if(a(this).css("display")==="none")return!0});m.length?(m.show(),f.seekTo(0,0,function(){}),m.hide()):f.seekTo(0,0,function(){})}var n=c(b,e.prev).click(function(a){a.stopPropagation(),f.prev()}),o=c(b,e.next).click(function(a){a.stopPropagation(),f.next()});e.circular||(f.onBeforeSeek(function(a,b){setTimeout(function(){a.isDefaultPrevented()||(n.toggleClass(e.disabledClass,b<=0),o.toggleClass(e.disabledClass,b>=f.getSize()-1))},1)}),e.initialIndex||n.addClass(e.disabledClass)),f.getSize()<2&&n.add(o).addClass(e.disabledClass),e.mousewheel&&a.fn.mousewheel&&b.mousewheel(function(a,b){if(e.mousewheel){f.move(b<0?1:-1,e.wheelSpeed||50);return!1}});if(e.touch){var p={};h[0].ontouchstart=function(a){var b=a.touches[0];p.x=b.clientX,p.y=b.clientY},h[0].ontouchmove=function(a){if(a.touches.length==1&&!h.is(":animated")){var b=a.touches[0],c=p.x-b.clientX,d=p.y-b.clientY;f[j&&d>0||!j&&c>0?"next":"prev"](),a.preventDefault()}}}e.keyboard&&a(document).bind("keydown.scrollable",function(b){if(!(!e.keyboard||b.altKey||b.ctrlKey||b.metaKey||a(b.target).is(":input"))){if(e.keyboard!="static"&&d!=f)return;var c=b.keyCode;if(j&&(c==38||c==40)){f.move(c==38?-1:1);return b.preventDefault()}if(!j&&(c==37||c==39)){f.move(c==37?-1:1);return b.preventDefault()}}}),e.initialIndex&&f.seekTo(e.initialIndex,0,function(){})}a.fn.scrollable=function(b){var c=this.data("scrollable");if(c)return c;b=a.extend({},a.tools.scrollable.conf,b),this.each(function(){c=new e(a(this),b),a(this).data("scrollable",c)});return b.api?c:this}})(jQuery);


	/*ui:core*/

(function($,undefined){$.ui=$.ui||{};if($.ui.version){return;}
$.extend($.ui,{version:"@VERSION",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});$.fn.extend({propAttr:$.fn.prop||$.fn.attr,_focus:$.fn.focus,focus:function(delay,fn){return typeof delay==="number"?this.each(function(){var elem=this;setTimeout(function(){$(elem).focus();if(fn){fn.call(elem);}},delay);}):this._focus.apply(this,arguments);},scrollParent:function(){var scrollParent;if(($.browser.msie&&(/(static|relative)/).test(this.css('position')))||(/absolute/).test(this.css('position'))){scrollParent=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test($.curCSS(this,'position',1))&&(/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));}).eq(0);}else{scrollParent=this.parents().filter(function(){return(/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));}).eq(0);}
return(/fixed/).test(this.css('position'))||!scrollParent.length?$(document):scrollParent;},zIndex:function(zIndex){if(zIndex!==undefined){return this.css("zIndex",zIndex);}
if(this.length){var elem=$(this[0]),position,value;while(elem.length&&elem[0]!==document){position=elem.css("position");if(position==="absolute"||position==="relative"||position==="fixed"){value=parseInt(elem.css("zIndex"),10);if(!isNaN(value)&&value!==0){return value;}}
elem=elem.parent();}}
return 0;},disableSelection:function(){return this.bind(($.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(event){event.preventDefault();});},enableSelection:function(){return this.unbind(".ui-disableSelection");}});$.each(["Width","Height"],function(i,name){var side=name==="Width"?["Left","Right"]:["Top","Bottom"],type=name.toLowerCase(),orig={innerWidth:$.fn.innerWidth,innerHeight:$.fn.innerHeight,outerWidth:$.fn.outerWidth,outerHeight:$.fn.outerHeight};function reduce(elem,size,border,margin){$.each(side,function(){size-=parseFloat($.curCSS(elem,"padding"+this,true))||0;if(border){size-=parseFloat($.curCSS(elem,"border"+this+"Width",true))||0;}
if(margin){size-=parseFloat($.curCSS(elem,"margin"+this,true))||0;}});return size;}
$.fn["inner"+name]=function(size){if(size===undefined){return orig["inner"+name].call(this);}
return this.each(function(){$(this).css(type,reduce(this,size)+"px");});};$.fn["outer"+name]=function(size,margin){if(typeof size!=="number"){return orig["outer"+name].call(this,size);}
return this.each(function(){$(this).css(type,reduce(this,size,true,margin)+"px");});};});function focusable(element,isTabIndexNotNaN){var nodeName=element.nodeName.toLowerCase();if("area"===nodeName){var map=element.parentNode,mapName=map.name,img;if(!element.href||!mapName||map.nodeName.toLowerCase()!=="map"){return false;}
img=$("img[usemap=#"+mapName+"]")[0];return!!img&&visible(img);}
return(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:"a"==nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN)&&visible(element);}
function visible(element){return!$(element).parents().andSelf().filter(function(){return $.curCSS(this,"visibility")==="hidden"||$.expr.filters.hidden(this);}).length;}
$.extend($.expr[":"],{data:function(elem,i,match){return!!$.data(elem,match[3]);},focusable:function(element){return focusable(element,!isNaN($.attr(element,"tabindex")));},tabbable:function(element){var tabIndex=$.attr(element,"tabindex"),isTabIndexNaN=isNaN(tabIndex);return(isTabIndexNaN||tabIndex>=0)&&focusable(element,!isTabIndexNaN);}});$(function(){var body=document.body,div=body.appendChild(div=document.createElement("div"));$.extend(div.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});$.support.minHeight=div.offsetHeight===100;$.support.selectstart="onselectstart"in div;body.removeChild(div).style.display="none";});$.extend($.ui,{plugin:{add:function(module,option,set){var proto=$.ui[module].prototype;for(var i in set){proto.plugins[i]=proto.plugins[i]||[];proto.plugins[i].push([option,set[i]]);}},call:function(instance,name,args){var set=instance.plugins[name];if(!set||!instance.element[0].parentNode){return;}
for(var i=0;i<set.length;i++){if(instance.options[set[i][0]]){set[i][1].apply(instance.element,args);}}}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b);},hasScroll:function(el,a){if($(el).css("overflow")==="hidden"){return false;}
var scroll=(a&&a==="left")?"scrollLeft":"scrollTop",has=false;if(el[scroll]>0){return true;}
el[scroll]=1;has=(el[scroll]>0);el[scroll]=0;return has;},isOverAxis:function(x,reference,size){return(x>reference)&&(x<(reference+size));},isOver:function(y,x,top,left,height,width){return $.ui.isOverAxis(y,top,height)&&$.ui.isOverAxis(x,left,width);}});})(jQuery);

	/*ui:widget*/


(function($,undefined){if($.cleanData){var _cleanData=$.cleanData;$.cleanData=function(elems){for(var i=0,elem;(elem=elems[i])!=null;i++){try{$(elem).triggerHandler("remove");}catch(e){}}
_cleanData(elems);};}else{var _remove=$.fn.remove;$.fn.remove=function(selector,keepData){return this.each(function(){if(!keepData){if(!selector||$.filter(selector,[this]).length){$("*",this).add([this]).each(function(){try{$(this).triggerHandler("remove");}catch(e){}});}}
return _remove.call($(this),selector,keepData);});};}
$.widget=function(name,base,prototype){var namespace=name.split(".")[0],fullName;name=name.split(".")[1];fullName=namespace+"-"+name;if(!prototype){prototype=base;base=$.Widget;}
$.expr[":"][fullName]=function(elem){return!!$.data(elem,name);};$[namespace]=$[namespace]||{};$[namespace][name]=function(options,element){if(arguments.length){this._createWidget(options,element);}};var basePrototype=new base();basePrototype.options=$.extend(true,{},basePrototype.options);$[namespace][name].prototype=$.extend(true,basePrototype,{namespace:namespace,widgetName:name,widgetEventPrefix:$[namespace][name].prototype.widgetEventPrefix||name,widgetBaseClass:fullName},prototype);$.widget.bridge(name,$[namespace][name]);};$.widget.bridge=function(name,object){$.fn[name]=function(options){var isMethodCall=typeof options==="string",args=Array.prototype.slice.call(arguments,1),returnValue=this;options=!isMethodCall&&args.length?$.extend.apply(null,[true,options].concat(args)):options;if(isMethodCall&&options.charAt(0)==="_"){return returnValue;}
if(isMethodCall){this.each(function(){var instance=$.data(this,name),methodValue=instance&&$.isFunction(instance[options])?instance[options].apply(instance,args):instance;if(methodValue!==instance&&methodValue!==undefined){returnValue=methodValue;return false;}});}else{this.each(function(){var instance=$.data(this,name);if(instance){instance.option(options||{})._init();}else{$.data(this,name,new object(options,this));}});}
return returnValue;};};$.Widget=function(options,element){if(arguments.length){this._createWidget(options,element);}};$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(options,element){$.data(element,this.widgetName,this);this.element=$(element);this.options=$.extend(true,{},this.options,this._getCreateOptions(),options);var self=this;this.element.bind("remove."+this.widgetName,function(){self.destroy();});this._create();this._trigger("create");this._init();},_getCreateOptions:function(){return $.metadata&&$.metadata.get(this.element[0])[this.widgetName];},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled");},widget:function(){return this.element;},option:function(key,value){var options=key;if(arguments.length===0){return $.extend({},this.options);}
if(typeof key==="string"){if(value===undefined){return this.options[key];}
options={};options[key]=value;}
this._setOptions(options);return this;},_setOptions:function(options){var self=this;$.each(options,function(key,value){self._setOption(key,value);});return this;},_setOption:function(key,value){this.options[key]=value;if(key==="disabled"){this.widget()
[value?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",value);}
return this;},enable:function(){return this._setOption("disabled",false);},disable:function(){return this._setOption("disabled",true);},_trigger:function(type,event,data){var callback=this.options[type];event=$.Event(event);event.type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase();data=data||{};if(event.originalEvent){for(var i=$.event.props.length,prop;i;){prop=$.event.props[--i];event[prop]=event.originalEvent[prop];}}
this.element.trigger(event,data);return!($.isFunction(callback)&&callback.call(this.element[0],event,data)===false||event.isDefaultPrevented());}};})(jQuery);


/*ui:position*/


(function($,undefined){$.ui=$.ui||{};var horizontalPositions=/left|center|right/,verticalPositions=/top|center|bottom/,center="center",_position=$.fn.position,_offset=$.fn.offset;$.fn.position=function(options){if(!options||!options.of){return _position.apply(this,arguments);}
options=$.extend({},options);var target=$(options.of),targetElem=target[0],collision=(options.collision||"flip").split(" "),offset=options.offset?options.offset.split(" "):[0,0],targetWidth,targetHeight,basePosition;if(targetElem.nodeType===9){targetWidth=target.width();targetHeight=target.height();basePosition={top:0,left:0};}else if(targetElem.setTimeout){targetWidth=target.width();targetHeight=target.height();basePosition={top:target.scrollTop(),left:target.scrollLeft()};}else if(targetElem.preventDefault){options.at="left top";targetWidth=targetHeight=0;basePosition={top:options.of.pageY,left:options.of.pageX};}else{targetWidth=target.outerWidth();targetHeight=target.outerHeight();basePosition=target.offset();}
$.each(["my","at"],function(){var pos=(options[this]||"").split(" ");if(pos.length===1){pos=horizontalPositions.test(pos[0])?pos.concat([center]):verticalPositions.test(pos[0])?[center].concat(pos):[center,center];}
pos[0]=horizontalPositions.test(pos[0])?pos[0]:center;pos[1]=verticalPositions.test(pos[1])?pos[1]:center;options[this]=pos;});if(collision.length===1){collision[1]=collision[0];}
offset[0]=parseInt(offset[0],10)||0;if(offset.length===1){offset[1]=offset[0];}
offset[1]=parseInt(offset[1],10)||0;if(options.at[0]==="right"){basePosition.left+=targetWidth;}else if(options.at[0]===center){basePosition.left+=targetWidth/2;}
if(options.at[1]==="bottom"){basePosition.top+=targetHeight;}else if(options.at[1]===center){basePosition.top+=targetHeight/2;}
basePosition.left+=offset[0];basePosition.top+=offset[1];return this.each(function(){var elem=$(this),elemWidth=elem.outerWidth(),elemHeight=elem.outerHeight(),marginLeft=parseInt($.curCSS(this,"marginLeft",true))||0,marginTop=parseInt($.curCSS(this,"marginTop",true))||0,collisionWidth=elemWidth+marginLeft+
(parseInt($.curCSS(this,"marginRight",true))||0),collisionHeight=elemHeight+marginTop+
(parseInt($.curCSS(this,"marginBottom",true))||0),position=$.extend({},basePosition),collisionPosition;if(options.my[0]==="right"){position.left-=elemWidth;}else if(options.my[0]===center){position.left-=elemWidth/2;}
if(options.my[1]==="bottom"){position.top-=elemHeight;}else if(options.my[1]===center){position.top-=elemHeight/2;}
position.left=Math.round(position.left);position.top=Math.round(position.top);collisionPosition={left:position.left-marginLeft,top:position.top-marginTop};$.each(["left","top"],function(i,dir){if($.ui.position[collision[i]]){$.ui.position[collision[i]][dir](position,{targetWidth:targetWidth,targetHeight:targetHeight,elemWidth:elemWidth,elemHeight:elemHeight,collisionPosition:collisionPosition,collisionWidth:collisionWidth,collisionHeight:collisionHeight,offset:offset,my:options.my,at:options.at});}});if($.fn.bgiframe){elem.bgiframe();}
elem.offset($.extend(position,{using:options.using}));});};$.ui.position={fit:{left:function(position,data){var win=$(window),over=data.collisionPosition.left+data.collisionWidth-win.width()-win.scrollLeft();position.left=over>0?position.left-over:Math.max(position.left-data.collisionPosition.left,position.left);},top:function(position,data){var win=$(window),over=data.collisionPosition.top+data.collisionHeight-win.height()-win.scrollTop();position.top=over>0?position.top-over:Math.max(position.top-data.collisionPosition.top,position.top);}},flip:{left:function(position,data){if(data.at[0]===center){return;}
var win=$(window),over=data.collisionPosition.left+data.collisionWidth-win.width()-win.scrollLeft(),myOffset=data.my[0]==="left"?-data.elemWidth:data.my[0]==="right"?data.elemWidth:0,atOffset=data.at[0]==="left"?data.targetWidth:-data.targetWidth,offset=-2*data.offset[0];position.left+=data.collisionPosition.left<0?myOffset+atOffset+offset:over>0?myOffset+atOffset+offset:0;},top:function(position,data){if(data.at[1]===center){return;}
var win=$(window),over=data.collisionPosition.top+data.collisionHeight-win.height()-win.scrollTop(),myOffset=data.my[1]==="top"?-data.elemHeight:data.my[1]==="bottom"?data.elemHeight:0,atOffset=data.at[1]==="top"?data.targetHeight:-data.targetHeight,offset=-2*data.offset[1];position.top+=data.collisionPosition.top<0?myOffset+atOffset+offset:over>0?myOffset+atOffset+offset:0;}}};if(!$.offset.setOffset){$.offset.setOffset=function(elem,options){if(/static/.test($.curCSS(elem,"position"))){elem.style.position="relative";}
var curElem=$(elem),curOffset=curElem.offset(),curTop=parseInt($.curCSS(elem,"top",true),10)||0,curLeft=parseInt($.curCSS(elem,"left",true),10)||0,props={top:(options.top-curOffset.top)+curTop,left:(options.left-curOffset.left)+curLeft};if('using'in options){options.using.call(elem,props);}else{curElem.css(props);}};$.fn.offset=function(options){var elem=this[0];if(!elem||!elem.ownerDocument){return null;}
if(options){return this.each(function(){$.offset.setOffset(this,options);});}
return _offset.call(this);};}}(jQuery));


	/*selectmenu*/


(function($){$.widget("ui.selectmenu",{getter:"value",version:"1.9",eventPrefix:"selectmenu",options:{transferClasses:true,typeAhead:1000,style:'dropdown',positionOptions:{my:"left top",at:"left bottom",offset:null},width:null,menuWidth:null,handleWidth:26,maxHeight:null,icons:null,format:null,bgImage:function(){},wrapperElement:"<div />"},_create:function(){var self=this,o=this.options;var selectmenuId=(this.element.attr('id')||'ui-selectmenu-'+Math.random().toString(16).slice(2,10)).replace(':','\\:');this.ids=[selectmenuId,selectmenuId+'-button',selectmenuId+'-menu'];this._safemouseup=true;this.isOpen=false;this.newelement=$('<a />',{'class':this.widgetBaseClass+' ui-widget ui-state-default ui-corner-all','id':this.ids[1],'role':'button','href':'#nogo','tabindex':this.element.attr('disabled')?1:0,'aria-haspopup':true,'aria-owns':this.ids[2]});this.newelementWrap=$(o.wrapperElement).append(this.newelement).insertAfter(this.element);var tabindex=this.element.attr('tabindex');if(tabindex){this.newelement.attr('tabindex',tabindex);}
this.newelement.data('selectelement',this.element);this.selectmenuIcon=$('<span class="'+this.widgetBaseClass+'-icon ui-icon"></span>').prependTo(this.newelement);this.newelement.prepend('<span class="'+self.widgetBaseClass+'-status" />');this.element.bind({'click.selectmenu':function(event){self.newelement.focus();event.preventDefault();}});this.newelement.bind('mousedown.selectmenu',function(event){self._toggle(event,true);if(o.style=="popup"){self._safemouseup=false;setTimeout(function(){self._safemouseup=true;},300);}
return false;}).bind('click.selectmenu',function(){return false;}).bind("keydown.selectmenu",function(event){var ret=false;switch(event.keyCode){case $.ui.keyCode.ENTER:ret=true;break;case $.ui.keyCode.SPACE:self._toggle(event);break;case $.ui.keyCode.UP:if(event.altKey){self.open(event);}else{self._moveSelection(-1);}
break;case $.ui.keyCode.DOWN:if(event.altKey){self.open(event);}else{self._moveSelection(1);}
break;case $.ui.keyCode.LEFT:self._moveSelection(-1);break;case $.ui.keyCode.RIGHT:self._moveSelection(1);break;case $.ui.keyCode.TAB:ret=true;break;case $.ui.keyCode.HOME:self.index(0);break;default:ret=true;}
return ret;}).bind('keypress.selectmenu',function(event){if(event.which>0){self._typeAhead(event.which,'mouseup');}
return true;}).bind('mouseover.selectmenu focus.selectmenu',function(){if(!o.disabled){$(this).addClass(self.widgetBaseClass+'-focus ui-state-hover');}}).bind('mouseout.selectmenu blur.selectmenu',function(){if(!o.disabled){$(this).removeClass(self.widgetBaseClass+'-focus ui-state-hover');}});$(document).bind("mousedown.selectmenu-"+this.ids[0],function(event){if(self.isOpen){self.close(event);}});this.element.bind("click.selectmenu",function(){self._refreshValue();}).bind("focus.selectmenu",function(){if(self.newelement){self.newelement[0].focus();}});if(!o.width){o.width=this.element.outerWidth();}
this.newelement.width(o.width);this.element.hide();this.list=$('<ul />',{'class':'ui-widget ui-widget-content','aria-hidden':true,'role':'listbox','aria-labelledby':this.ids[1],'id':this.ids[2]});this.listWrap=$(o.wrapperElement).addClass(self.widgetBaseClass+'-menu').append(this.list).appendTo('body');this.list.bind("keydown.selectmenu",function(event){var ret=false;switch(event.keyCode){case $.ui.keyCode.UP:if(event.altKey){self.close(event,true);}else{self._moveFocus(-1);}
break;case $.ui.keyCode.DOWN:if(event.altKey){self.close(event,true);}else{self._moveFocus(1);}
break;case $.ui.keyCode.LEFT:self._moveFocus(-1);break;case $.ui.keyCode.RIGHT:self._moveFocus(1);break;case $.ui.keyCode.HOME:self._moveFocus(':first');break;case $.ui.keyCode.PAGE_UP:self._scrollPage('up');break;case $.ui.keyCode.PAGE_DOWN:self._scrollPage('down');break;case $.ui.keyCode.END:self._moveFocus(':last');break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:self.close(event,true);$(event.target).parents('li:eq(0)').trigger('mouseup');break;case $.ui.keyCode.TAB:ret=true;self.close(event,true);$(event.target).parents('li:eq(0)').trigger('mouseup');break;case $.ui.keyCode.ESCAPE:self.close(event,true);break;default:ret=true;}
return ret;}).bind('keypress.selectmenu',function(event){if(event.which>0){self._typeAhead(event.which,'focus');}
return true;}).bind('mousedown.selectmenu mouseup.selectmenu',function(){return false;});$(window).bind("resize.selectmenu-"+this.ids[0],$.proxy(self.close,this));},_init:function(){var self=this,o=this.options;var selectOptionData=[];this.element.find('option').each(function(){var opt=$(this);selectOptionData.push({value:opt.attr('value'),text:self._formatText(opt.text()),selected:opt.attr('selected'),disabled:opt.attr('disabled'),classes:opt.attr('class'),typeahead:opt.attr('typeahead'),parentOptGroup:opt.parent('optgroup'),bgImage:o.bgImage.call(opt)});});var activeClass=(self.options.style=="popup")?" ui-state-active":"";this.list.html("");if(selectOptionData.length){for(var i=0;i<selectOptionData.length;i++){var thisLiAttr={role:'presentation'};if(selectOptionData[i].disabled){thisLiAttr['class']=this.namespace+'-state-disabled';}
var thisAAttr={html:selectOptionData[i].text,href:'#nogo',tabindex:-1,role:'option','aria-selected':false};if(selectOptionData[i].disabled){thisAAttr['aria-disabled']=selectOptionData[i].disabled;}
if(selectOptionData[i].typeahead){thisAAttr['typeahead']=selectOptionData[i].typeahead;}
var thisA=$('<a/>',thisAAttr);var thisLi=$('<li/>',thisLiAttr).append(thisA).data('index',i).addClass(selectOptionData[i].classes).data('optionClasses',selectOptionData[i].classes||'').bind("mouseup.selectmenu",function(event){if(self._safemouseup&&!self._disabled(event.currentTarget)&&!self._disabled($(event.currentTarget).parents("ul>li."+self.widgetBaseClass+"-group "))){var changed=$(this).data('index')!=self._selectedIndex();self.index($(this).data('index'));self.select(event);if(changed){self.change(event);}
self.close(event,true);}
return false;}).bind("click.selectmenu",function(){return false;}).bind('mouseover.selectmenu focus.selectmenu',function(e){if(!$(e.currentTarget).hasClass(self.namespace+'-state-disabled')&&!$(e.currentTarget).parent("ul").parent("li").hasClass(self.namespace+'-state-disabled')){self._selectedOptionLi().addClass(activeClass);self._focusedOptionLi().removeClass(self.widgetBaseClass+'-item-focus ui-state-hover');$(this).removeClass('ui-state-active').addClass(self.widgetBaseClass+'-item-focus ui-state-hover');}}).bind('mouseout.selectmenu blur.selectmenu',function(){if($(this).is(self._selectedOptionLi().selector)){$(this).addClass(activeClass);}
$(this).removeClass(self.widgetBaseClass+'-item-focus ui-state-hover');});if(selectOptionData[i].parentOptGroup.length){var optGroupName=self.widgetBaseClass+'-group-'+this.element.find('optgroup').index(selectOptionData[i].parentOptGroup);if(this.list.find('li.'+optGroupName).length){this.list.find('li.'+optGroupName+':last ul').append(thisLi);}else{$(' <li role="presentation" class="'+self.widgetBaseClass+'-group '+optGroupName+(selectOptionData[i].parentOptGroup.attr("disabled")?' '+this.namespace+'-state-disabled" aria-disabled="true"':'"')+'><span class="'+self.widgetBaseClass+'-group-label">'+selectOptionData[i].parentOptGroup.attr('label')+'</span><ul></ul></li> ').appendTo(this.list).find('ul').append(thisLi);}}else{thisLi.appendTo(this.list);}
if(o.icons){for(var j in o.icons){if(thisLi.is(o.icons[j].find)){thisLi.data('optionClasses',selectOptionData[i].classes+' '+self.widgetBaseClass+'-hasIcon').addClass(self.widgetBaseClass+'-hasIcon');var iconClass=o.icons[j].icon||"";thisLi.find('a:eq(0)').prepend('<span class="'+self.widgetBaseClass+'-item-icon ui-icon '+iconClass+'"></span>');if(selectOptionData[i].bgImage){thisLi.find('span').css('background-image',selectOptionData[i].bgImage);}}}}}}else{$('<li role="presentation"><a href="#nogo" tabindex="-1" role="option"></a></li>').appendTo(this.list);}
var isDropDown=(o.style=='dropdown');this.newelement.toggleClass(self.widgetBaseClass+'-dropdown',isDropDown).toggleClass(self.widgetBaseClass+'-popup',!isDropDown);this.list.toggleClass(self.widgetBaseClass+'-menu-dropdown ui-corner-bottom',isDropDown).toggleClass(self.widgetBaseClass+'-menu-popup ui-corner-all',!isDropDown).find('li:first').toggleClass('ui-corner-top',!isDropDown).end().find('li:last').addClass('ui-corner-bottom');this.selectmenuIcon.toggleClass('ui-icon-triangle-1-s',isDropDown).toggleClass('ui-icon-triangle-2-n-s',!isDropDown);if(o.transferClasses){var transferClasses=this.element.attr('class')||'';this.newelement.add(this.list).addClass(transferClasses);}
if(o.style=='dropdown'){this.list.width(o.menuWidth?o.menuWidth:o.width);}else{this.list.width(o.menuWidth?o.menuWidth:o.width-o.handleWidth);}
this.list.css('height','auto');var listH=this.listWrap.height();if(o.maxHeight&&o.maxHeight<listH){this.list.height(o.maxHeight);}else{var winH=$(window).height()/3;if(winH<listH)this.list.height(winH);}
this._optionLis=this.list.find('li:not(.'+self.widgetBaseClass+'-group)');if(this.element.attr('disabled')){this.disable();}else{this.enable();}
this.index(this._selectedIndex());window.setTimeout(function(){self._refreshPosition();},200);},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+'-disabled'+' '+this.namespace+'-state-disabled').removeAttr('aria-disabled').unbind(".selectmenu");$(window).unbind(".selectmenu-"+this.ids[0]);$(document).unbind(".selectmenu-"+this.ids[0]);this.newelementWrap.remove();this.listWrap.remove();this.element.unbind(".selectmenu").show();$.Widget.prototype.destroy.apply(this,arguments);},_typeAhead:function(code,eventType){var self=this,c=String.fromCharCode(code).toLowerCase(),items=this.list.find('li a'),matchee=null,nextIndex=null;if(self._typeAhead_timer){window.clearTimeout(self._typeAhead_timer);self._typeAhead_timer=undefined;}
self._typeAhead_chars=(self._typeAhead_chars===undefined?"":self._typeAhead_chars).concat(c);if(self._typeAhead_chars.length<2||(self._typeAhead_chars.substr(-2,1)===c&&self._typeAhead_cycling)){self._typeAhead_cycling=true;matchee=c;}
else{self._typeAhead_cycling=false;matchee=self._typeAhead_chars;}
var selectedIndex=(eventType!=='focus'?this._selectedOptionLi().data('index'):this._focusedOptionLi().data('index'))||0;for(var i=0;i<items.length;i++){var thisText=items.eq(i).text().substr(0,matchee.length).toLowerCase();if(thisText===matchee){if(self._typeAhead_cycling){if(nextIndex===null)
nextIndex=i;if(i>selectedIndex){nextIndex=i;break;}}else{nextIndex=i;}}}
if(nextIndex!==null){items.eq(nextIndex).trigger(eventType);}
self._typeAhead_timer=window.setTimeout(function(){self._typeAhead_timer=undefined;self._typeAhead_chars=undefined;self._typeAhead_cycling=undefined;},self.options.typeAhead);},_uiHash:function(){var index=this.index();return{index:index,option:$("option",this.element).get(index),value:this.element[0].value};},open:function(event){var self=this,o=this.options;if(self.newelement.attr("aria-disabled")!='true'){self._closeOthers(event);self.newelement.addClass('ui-state-active');self.listWrap.appendTo(o.appendTo);self.list.attr('aria-hidden',false);self.listWrap.addClass(self.widgetBaseClass+'-open');var selected=this._selectedOptionLi();if(o.style=="dropdown"){self.newelement.removeClass('ui-corner-all').addClass('ui-corner-top');}else{this.list.css("left",-5000).scrollTop(this.list.scrollTop()+selected.position().top-this.list.outerHeight()/2+selected.outerHeight()/2).css("left","auto");}
self._refreshPosition();var link=selected.find("a");if(link.length)link[0].focus();self.isOpen=true;self._trigger("open",event,self._uiHash());}},close:function(event,retainFocus){if(this.newelement.is('.ui-state-active')){this.newelement.removeClass('ui-state-active');this.listWrap.removeClass(this.widgetBaseClass+'-open');this.list.attr('aria-hidden',true);if(this.options.style=="dropdown"){this.newelement.removeClass('ui-corner-top').addClass('ui-corner-all');}
if(retainFocus){this.newelement.focus();}
this.isOpen=false;this._trigger("close",event,this._uiHash());}},change:function(event){this.element.trigger("change");this._trigger("change",event,this._uiHash());},select:function(event){if(this._disabled(event.currentTarget)){return false;}
this._trigger("select",event,this._uiHash());},_closeOthers:function(event){$('.'+this.widgetBaseClass+'.ui-state-active').not(this.newelement).each(function(){$(this).data('selectelement').selectmenu('close',event);});$('.'+this.widgetBaseClass+'.ui-state-hover').trigger('mouseout');},_toggle:function(event,retainFocus){if(this.isOpen){this.close(event,retainFocus);}else{this.open(event);}},_formatText:function(text){return(this.options.format?this.options.format(text):text);},_selectedIndex:function(){return this.element[0].selectedIndex;},_selectedOptionLi:function(){return this._optionLis.eq(this._selectedIndex());},_focusedOptionLi:function(){return this.list.find('.'+this.widgetBaseClass+'-item-focus');},_moveSelection:function(amt,recIndex){if(!this.options.disabled){var currIndex=parseInt(this._selectedOptionLi().data('index')||0,10);var newIndex=currIndex+amt;if(newIndex<0){newIndex=0;}
if(newIndex>this._optionLis.size()-1){newIndex=this._optionLis.size()-1;}
if(newIndex===recIndex){return false;}
if(this._optionLis.eq(newIndex).hasClass(this.namespace+'-state-disabled')){(amt>0)?++amt:--amt;this._moveSelection(amt,newIndex);}else{return this._optionLis.eq(newIndex).trigger('mouseup');}}},_moveFocus:function(amt,recIndex){if(!isNaN(amt)){var currIndex=parseInt(this._focusedOptionLi().data('index')||0,10);var newIndex=currIndex+amt;}else{var newIndex=parseInt(this._optionLis.filter(amt).data('index'),10);}
if(newIndex<0){newIndex=0;}
if(newIndex>this._optionLis.size()-1){newIndex=this._optionLis.size()-1;}
if(newIndex===recIndex){return false;}
var activeID=this.widgetBaseClass+'-item-'+Math.round(Math.random()*1000);this._focusedOptionLi().find('a:eq(0)').attr('id','');if(this._optionLis.eq(newIndex).hasClass(this.namespace+'-state-disabled')){(amt>0)?++amt:--amt;this._moveFocus(amt,newIndex);}else{this._optionLis.eq(newIndex).find('a:eq(0)').attr('id',activeID).focus();}
this.list.attr('aria-activedescendant',activeID);},_scrollPage:function(direction){var numPerPage=Math.floor(this.list.outerHeight()/this.list.find('li:first').outerHeight());numPerPage=(direction=='up'?-numPerPage:numPerPage);this._moveFocus(numPerPage);},_setOption:function(key,value){this.options[key]=value;if(key=='disabled'){if(value)this.close();this.element.add(this.newelement).add(this.list)[value?'addClass':'removeClass'](this.widgetBaseClass+'-disabled'+' '+
this.namespace+'-state-disabled').attr("aria-disabled",value);}},disable:function(index,type){if(typeof(index)=='undefined'){this._setOption('disabled',true);}else{if(type=="optgroup"){this._disableOptgroup(index);}else{this._disableOption(index);}}},enable:function(index,type){if(typeof(index)=='undefined'){this._setOption('disabled',false);}else{if(type=="optgroup"){this._enableOptgroup(index);}else{this._enableOption(index);}}},_disabled:function(elem){return $(elem).hasClass(this.namespace+'-state-disabled');},_disableOption:function(index){var optionElem=this._optionLis.eq(index);if(optionElem){optionElem.addClass(this.namespace+'-state-disabled').find("a").attr("aria-disabled",true);this.element.find("option").eq(index).attr("disabled","disabled");}},_enableOption:function(index){var optionElem=this._optionLis.eq(index);if(optionElem){optionElem.removeClass(this.namespace+'-state-disabled').find("a").attr("aria-disabled",false);this.element.find("option").eq(index).removeAttr("disabled");}},_disableOptgroup:function(index){var optGroupElem=this.list.find('li.'+this.widgetBaseClass+'-group-'+index);if(optGroupElem){optGroupElem.addClass(this.namespace+'-state-disabled').attr("aria-disabled",true);this.element.find("optgroup").eq(index).attr("disabled","disabled");}},_enableOptgroup:function(index){var optGroupElem=this.list.find('li.'+this.widgetBaseClass+'-group-'+index);if(optGroupElem){optGroupElem.removeClass(this.namespace+'-state-disabled').attr("aria-disabled",false);this.element.find("optgroup").eq(index).removeAttr("disabled");}},index:function(newValue){if(arguments.length){if(!this._disabled($(this._optionLis[newValue]))){this.element[0].selectedIndex=newValue;this._refreshValue();}else{return false;}}else{return this._selectedIndex();}},value:function(newValue){if(arguments.length){this.element[0].value=newValue;this._refreshValue();}else{return this.element[0].value;}},_refreshValue:function(){var activeClass=(this.options.style=="popup")?" ui-state-active":"";var activeID=this.widgetBaseClass+'-item-'+Math.round(Math.random()*1000);this.list.find('.'+this.widgetBaseClass+'-item-selected').removeClass(this.widgetBaseClass+"-item-selected"+activeClass).find('a').attr('aria-selected','false').attr('id','');this._selectedOptionLi().addClass(this.widgetBaseClass+"-item-selected"+activeClass).find('a').attr('aria-selected','true').attr('id',activeID);var currentOptionClasses=(this.newelement.data('optionClasses')?this.newelement.data('optionClasses'):"");var newOptionClasses=(this._selectedOptionLi().data('optionClasses')?this._selectedOptionLi().data('optionClasses'):"");this.newelement.removeClass(currentOptionClasses).data('optionClasses',newOptionClasses).addClass(newOptionClasses).find('.'+this.widgetBaseClass+'-status').html(this._selectedOptionLi().find('a:eq(0)').html());this.list.attr('aria-activedescendant',activeID);},_refreshPosition:function(){var o=this.options;if(o.style=="popup"&&!o.positionOptions.offset){var selected=this._selectedOptionLi();var _offset="0 "+(this.list.offset().top-selected.offset().top-(this.newelement.outerHeight()+selected.outerHeight())/2);}
this.listWrap.zIndex(this.element.zIndex()+1).position({of:o.positionOptions.of||this.newelement,my:o.positionOptions.my,at:o.positionOptions.at,offset:o.positionOptions.offset||_offset,collision:o.positionOptions.collision||'flip'});}});})(jQuery);


/*

CUSTOM FORM ELEMENTS

Created by Ryan Fait
www.ryanfait.com

The only things you may need to change in this file are the following
variables: checkboxHeight, radioHeight and selectWidth (lines 24, 25, 26)

The numbers you set for checkboxHeight and radioHeight should be one quarter
of the total height of the image want to use for checkboxes and radio
buttons. Both images should contain the four stages of both inputs stacked
on top of each other in this order: unchecked, unchecked-clicked, checked,
checked-clicked.

You may need to adjust your images a bit if there is a slight vertical
movement during the different stages of the button activation.

The value of selectWidth should be the width of your select list image.

Visit http://ryanfait.com/ for more information.

*/

var checkboxHeight = "25";
var radioHeight = "25";
var selectWidth = "190";


/* No need to change anything after this */


document.write('<style type="text/css">input.styled { display: none; } select.styled { position: relative; width: ' + selectWidth + 'px; opacity: 0; filter: alpha(opacity=0); z-index: 5; } .disabled { opacity: 0.5; filter: alpha(opacity=50); }</style>');

var Custom = {
	init: function() {
		var inputs = document.getElementsByTagName("input"), span = Array(), textnode, option, active;
		for(a = 0; a < inputs.length; a++) {
			if((inputs[a].type == "checkbox" || inputs[a].type == "radio") && inputs[a].className == "styled") {
				span[a] = document.createElement("span");
				span[a].className = inputs[a].type;

				if(inputs[a].checked == true) {
					if(inputs[a].type == "checkbox") {
						position = "0 -" + (checkboxHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					} else {
						position = "0 -" + (radioHeight*2) + "px";
						span[a].style.backgroundPosition = position;
					}
				}
				inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				inputs[a].onchange = Custom.clear;
				if(!inputs[a].getAttribute("disabled")) {
					span[a].onmousedown = Custom.pushed;
					span[a].onmouseup = Custom.check;
				} else {
					span[a].className = span[a].className += " disabled";
				}
			}
		}
		inputs = document.getElementsByTagName("select");
		for(a = 0; a < inputs.length; a++) {
			if(inputs[a].className == "styled") {
				option = inputs[a].getElementsByTagName("option");
				active = option[0].childNodes[0].nodeValue;
				textnode = document.createTextNode(active);
				for(b = 0; b < option.length; b++) {
					if(option[b].selected == true) {
						textnode = document.createTextNode(option[b].childNodes[0].nodeValue);
					}
				}
				span[a] = document.createElement("span");
				span[a].className = "select";
				span[a].id = "select" + inputs[a].name;
				span[a].appendChild(textnode);
				inputs[a].parentNode.insertBefore(span[a], inputs[a]);
				if(!inputs[a].getAttribute("disabled")) {
					inputs[a].onchange = Custom.choose;
				} else {
					inputs[a].previousSibling.className = inputs[a].previousSibling.className += " disabled";
				}
			}
		}
		document.onmouseup = Custom.clear;
	},
	pushed: function() {
		element = this.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 -" + checkboxHeight*3 + "px";
		} else if(element.checked == true && element.type == "radio") {
			this.style.backgroundPosition = "0 -" + radioHeight*3 + "px";
		} else if(element.checked != true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 -" + checkboxHeight + "px";
		} else {
			this.style.backgroundPosition = "0 -" + radioHeight + "px";
		}
	},
	check: function() {
		element = this.nextSibling;
		if(element.checked == true && element.type == "checkbox") {
			this.style.backgroundPosition = "0 0";
			element.checked = false;
		} else {
			if(element.type == "checkbox") {
				this.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
			} else {
				this.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
				group = this.nextSibling.name;
				inputs = document.getElementsByTagName("input");
				for(a = 0; a < inputs.length; a++) {
					if(inputs[a].name == group && inputs[a] != this.nextSibling) {
						inputs[a].previousSibling.style.backgroundPosition = "0 0";
					}
				}
			}
			element.checked = true;
		}
	},
	clear: function() {
		inputs = document.getElementsByTagName("input");
		for(var b = 0; b < inputs.length; b++) {
			if(inputs[b].type == "checkbox" && inputs[b].checked == true && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 -" + checkboxHeight*2 + "px";
			} else if(inputs[b].type == "checkbox" && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 0";
			} else if(inputs[b].type == "radio" && inputs[b].checked == true && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 -" + radioHeight*2 + "px";
			} else if(inputs[b].type == "radio" && inputs[b].className == "styled") {
				inputs[b].previousSibling.style.backgroundPosition = "0 0";
			}
		}
	},
	choose: function() {
		option = this.getElementsByTagName("option");
		for(d = 0; d < option.length; d++) {
			if(option[d].selected == true) {
				document.getElementById("select" + this.name).childNodes[0].nodeValue = option[d].childNodes[0].nodeValue;
			}
		}
	}
}
window.onload = Custom.init;