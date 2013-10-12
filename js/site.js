$(document).ready(function(){

// panel size
	var winWidth = $(window).width(),
	setHeight = $(window).height()-16,
	setWidth = setHeight * 1.5;

	if (setWidth > winWidth) {
		setWidth = winWidth - 16,
		setHeight = winWidth / 1.5,
		offSet = "bottom-in-view";
		$('.panel').height(setHeight);
		$('body').width(setWidth);
	} 
	else{
		var offSet = setHeight/3;	
		$(".panel").height(setHeight);
		$("body").width(setWidth);
	};

// nav scrolling
	$('a[href^="#"]').on('click',function(event) {
	    event.preventDefault();
	    var target = this.hash,
	    $target = $(target);
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 1500, 'swing', function () {
	        window.location.hash = target;
	    });
	});

// nav arrow
	// waypoint function
	function setWaypoint(panelId, aPanelId){
			$(panelId).waypoint(function(d){
			if(d == 'down'){
				$('a').removeClass();
				$(aPanelId).addClass("onThis");
			}
		},{offset:'bottom-in-view'});
		$(panelId).waypoint(function(d){
			if(d == 'up'){
				$('a').removeClass();
				$(aPanelId).addClass("onThis");
			}
		},{offset:-1});
	}
	// all panels
	var panels = $('.panel');
	for (var i = panels.length - 1; i >= 0; i--) {
		var aId = 'a[href="#panel'+i+'"]';
		setWaypoint(panels[i], aId);
	};

// waypoints animations
	// bonk!
	$("#panel3").waypoint(function(direction){
		if(direction == 'down'){
			$("#frame3-bonk").animate({'opacity': "1", 'height': "100%"}, 200);
			$("#frame3-ball-rotate").animate({'opacity': "1"}, 100);
			$("#frame3-ball").animate({'opacity': "0"}, 100);
		}
		else{
			$("#frame3-bonk").animate({'opacity': "0", 'height': "0%"}, 200);
			$("#frame3-ball-rotate").animate({'opacity': "0"}, 100);
			$("#frame3-ball").animate({'opacity': "1"}, 100);

		}
	},{offset:"10%"});	
	// thought bubble	
	$("#panel4").waypoint(function(direction){
		if(direction == 'down'){
			$("#bg4-3").animate({height: "60%"}, 500);
		}
		else{
			$("#bg4-3").animate({height: "0%"}, 500);
		}
	}, {offset:offSet});

// parallax 
	$(window).bind("scroll", function(e){
		parallaxScroll();
	});

	function parallaxScroll(){
		var scrolled = $(window).scrollTop(),
		oneFrame = (scrolled - setHeight),
		twoFrame = (scrolled - setHeight*2),
		threeFrame = (scrolled - setHeight*3);

		// clouds panel 0
		if(scrolled < setHeight){
			$("#cloud-small").css('bottom',(0+(scrolled*.1))+'%');
			$("#cloud-med").css('bottom',(0+(scrolled*.2))+'%');
			$("#cloud-big").css('bottom',(0+(scrolled*.4 ))+'%');

		}
		if(scrolled < setHeight*2)
		{
			$("#frame1-ball").css({"background-position":(100 + oneFrame/10)+'% '+(0 - oneFrame/20)+'%'});
		}
		if (scrolled > setHeight & scrolled < setHeight*3 )
		{
			$("#frame2-woodstock").css({'background-position':(60 + twoFrame/10)+'% 70%'})
		}

		if(scrolled > setHeight)
		{
			$("#frame3-ball").css({'background-position':(75+threeFrame/3)+'% '+(120+threeFrame/2)+'%'});
			$("#frame3-ball-rotate").css({'background-position':(80+ threeFrame/10)+'% '+(60 - threeFrame/2)+'%'})
		}		
	}

});