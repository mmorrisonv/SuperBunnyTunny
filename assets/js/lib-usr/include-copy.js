//example of namespace
/*
    var namespace1 = new function () {
        var internalFunction = function () {
        };

        this.publicFunction = function () {
        };
    };
*/
var MODELSEARCH = new function() {

    
    this.setupBannerGallery = function ()
    {
        var $banner = $('.js-voteNowBanner'),
            $thumbGallery = $('.js-voteNowGallery');
        var galleryOnClick = function()
        {
            var $this = $(this),
                bannerurl = $this.data('url'),
                bannersrc = $this.data('src');
                
            $this.siblings().removeClass('current').end().addClass('current');
            
            $banner.attr({ 'src': bannersrc , 'data-url':bannerurl });
            if( bannerurl != '' && bannerurl != undefined )
                $banner.css({cursor:'pointer'});
            else
                $banner.css({cursor:'normal'});
        };
        
        var voteBannerOnClick = function()
        {
            var url = $(this).data('url');
            if( url != '' && url != undefined )
                window.location = url;
        }
        //BING EVENT LISTENERS
        $('a',$thumbGallery).click(galleryOnClick);
        $banner.click(voteBannerOnClick);
        
    };  
};	
	
var NS_CAMPAIGN = new function()
{
//------VARIABLES
    	var vars = {
            campaignOpenHeight : 600,
            campaignClosedHeight : 550,
            currentSlideShowJSON:null
            //galleryScrollable : window.scrollableAPI.items()
        };

        this.campaignOpen = false;
	    
//------EVENT LISTENERS
	    var onSlideImageLoaded = function(){
	        //console.log(this);
	    }
	    
	    this.onSliderNavigationNumberClick = function()
	    {//when the slide number menu is clicked - to change slides by index...with the 1 2 3 4
	        var $thisBtn = $(this);
	        
	        //update slideGalleryNav
	        $thisBtn.parent().children().removeClass('current');
	        $thisBtn.addClass('current');
	        //move the scrollable Gallery
	        
	        window.scrollableAPI.seekTo( $thisBtn.index() );
	        
	        return false;
	        
	    }
	    this.onAttemptToOpenGallery = function ()
	    {
	       NS_CAMPAIGN.startCampaignGallery();
	    }
	    this.onSlideNavigation = function(event,slideNum)
	    { //when a slide is changed - either through the slide number menu or the next / prev buttons
	        var $slideNumberNavDOM = $('#campaignGalleryNav .js-campaignPageNav');
	        
	        NS_CAMPAIGN.buildSlideRow2Information(slideNum);
	        
	        //update the slide number menu
	        $slideNumberNavDOM.children().removeClass('current').eq(slideNum).addClass('current');
	        
	        return false;
	    }
	    
	    this.onChangeCampaign = function(e)
	    {
	        var $this = $(this),
	            newCatID = $this.data('catid');
	            
	        //find within the slideshowJSON which campaign section we are loading
	        $.each(window.slideShowJSON,function(i,ssJSON){
	            if( newCatID == ssJSON.id )
	                vars.currentSlideShowJSON = ssJSON;
	        });
	       
	        //load it
	        NS_CAMPAIGN.resetCampaignGallery();
	        NS_CAMPAIGN.loadCampaignLandingSlide( vars.currentSlideShowJSON );
	        NS_CAMPAIGN.loadCampaign( vars.currentSlideShowJSON );
	        //NS_CAMPAIGN.loadNewSlideShow(vars.currentSlideShowJSON);
	    }
	    
//------FUNCTIONS
	    this.loadCampaignLandingSlide = function(slideshow)
	    {/*builds the first slide of a campaign
	       currently this does nothing diffrent than the normal loadSlide function, but was built seperatly just in case extra or diffrent functionality is needed*/
	        var firstimagesrc = slideshow.slides[0].image,
	            img = new Image();
	            
	        $('.js-firstSlide img').load(onSlideImageLoaded)
	            .error()
	            .attr('src',firstimagesrc);
	    }
	    
	    this.buildGallerySlideMenu = function(slideCount)
	    {//build the slide number menu 1 2 3 4 5 that allows users to skip to diffrent sldies
	        var $navList = $('#campaignGalleryNav .js-campaignPageNav'),
	            listHTML = '<a class="current" href="#">1</a>';//start off with the first one and well make it current
	        
	        for( var i = 2; i <= slideCount; i++ )
	        {
	            listHTML += '<a href="#">'+i+'</a>'
	        }
	        $navList.html(listHTML);
	    }
	    
	    this.buildSlideRow2Information = function(slideNum)
	    {//function updates row2 information for each slide
	    
	        //update product list
	        var newLIlist = '';
	        $.each(vars.currentSlideShowJSON.slides[slideNum].products,function(i,productName)
	        {
	            newLIlist += '<li>'+productName+'</li>';
	            
	        });
	        //set the gallery list
	        $('#campaignGalleryNav .js-galleryProductList').html(newLIlist);
	        //set the modelname on the bottom left
	        $('#campaignGalleryNav .js-galleryModelName').text( vars.currentSlideShowJSON.slides[slideNum].model );
	        //set the shop by link
	        $('#campaignGalleryNav .js-galleryShopBtn a').attr( 'href', '/quickshop.aspx?id=' + vars.currentSlideShowJSON.slides[slideNum].id );
	    
	    }
	    
	    this.loadScrollablePlugin = function()
	    {//actually load the scrollable plugin
	        $("#scrollableCampaign").scrollable({ 
	            circular:true,
	            items:".items",
	            onSeek:this.onSlideNavigation 
	        });
	        //$("#scrollableCampaign").scrollableAddClones(2);
	        window.scrollableAPI = $('#scrollableHomepage,#scrollableCampaign').data('scrollable');
	    }
	    
	    
	    this.loadCampaign = function(slideshowJSON)
	    { 
            vars.currentSlideShowJSON = slideshowJSON;
	        this.buildGallerySlideMenu(slideshowJSON.slides.length);
	        //load the slides into the scrollable gallery
	        

	        
	        $.each(slideshowJSON.slides, function(i,val){
	            if(i == 0) return;//we already built the first one
	            
	                var $templateSlide = $('.js-template.js-template-slide').clone().removeClass('js-template-slide js-template hide'),
	                    $imageHolder = $templateSlide.find('.js-imageHolder').removeClass('.js-imageHolder'); 
	            
	                $imageHolder.attr('src',val.image);
	                $templateSlide.appendTo('#scrollableCampaign #page.items');
	                
	                //window.scrollableAPI.addItem($templateSlide);
	                
	        });  
	    }
	    

	    
	    this.startCampaignGallery = function(e)
	    {
	        
	      
        	adjustScrollable();
            NS_CAMPAIGN.loadScrollablePlugin();
            $('.slide').fadeTo('slow',1);
            //setupScrollable();
           
            //show nav
            NS_CAMPAIGN.buildSlideRow2Information(0)//update nav with clide0
            $('#herolayout').animate({'height':vars.campaignOpenHeight},300);
            $('#campaignGalleryNav').show();
	        $('.next,.prev').fadeTo(300,1);
	        $('#campaign-hero ').fadeOut();
	        
	    }
	    
	    this.closeCampaignGallery = function(e){
 
            //initScrollable();
            //$('.slide').fadeTo('slow',1);
            //setupScrollable();
            if( window.scrollableAPI) window.scrollableAPI.seekTo(0);
            //close nav
            $('#herolayout').animate({'height':vars.campaignClosedHeight},300);
            $('#campaignGalleryNav').hide();
      
            $('.slide:not(.js-firstSlide)').fadeTo(300,0);
            $('.slide.cloned').fadeTo(300,0);
            if(window.scrollableAPI)window.scrollableAPI.seekTo(0,0);
          
	        $('.next,.prev').fadeTo(300,0);
	        $('#campaign-hero ').fadeIn();
	        
	         
	        
	    }
	    this.resetCampaignGallery = function(e)
	    {
	        $('.slide:not(.js-firstSlide),.slide.cloned','#scrollableCampaign').remove();
	        console.log( $('#scrollableCampaign').data('scrollable') );
	        if( window.scrollableAPI !== undefined ) 
	        {
	            window.scrollableAPI.seekTo(0,0);
	            window.scrollableAPI - null;
	            $('#scrollableCampaign').data('scrollable','');
	        }
	    }
    
};

var NS_SCROLLABLEGALLERY = new function(){
    
    this.setupGallery = function()
    {
        var $thumbGallery = $('.thumb-gallery');
        $thumbGallery.scrollable({ circular: true, items: ".mask .thumbs" }).scrollableAddClones(10);
        
        //inside of the thumbgallery is a number of slides or images. All contained within <div> tags, do not assume they may not be wrapped in a or some other tags as well.
        $('img',$thumbGallery).click(function(){
            var $this = $(this),
                $mainGalleryImage = $('#imgMain'),
                newImageSrc = $this.data('largesrc');
                
            $mainGalleryImage.attr({src:newImageSrc});
        });
    }
    
}

var NS_PRODUCTLISTING = new function(){
    this.onSwatchClick = function(){
        //when color swatches (under each image) on the listing page is clicked
        var $this = $(this),
            $listingImage = $this.closest('.listing').find('.js-productImage');
            
            $listingImage.attr( 'src' , $this.data('largesrc') );
    }
}

var NS_TWITTERDISPLAY = new function(){

    this.dispBBunnyTwitterInfo = function()
    {
        //display statistics about a certain twitter account and place them on the page
        $.ajax({

            url : "http://api.twitter.com/1/users/show.json?screen_name=beachbunnyswim",
            dataType : "jsonp",
            success : function(data)
            {
                //console.log(data);
                window.twitter_followerscount = data.followers_count;
                window.twitter_friendscount = data.friends_count;
                window.twitter_tweetcount = data.statuses_count;
                
                $('.js-tweetTweetCount','.twitteroverview').text(window.twitter_tweetcount);
                $('.js-tweetFriendCount','.twitteroverview').text(window.twitter_friendscount);
                $('.js-tweetFollowersCount','.twitteroverview').text(window.twitter_followerscount);
                
                $('.twitteroverview').fadeIn();
            }

        });
        
        
    }
}