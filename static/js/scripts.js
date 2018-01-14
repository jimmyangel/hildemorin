jQuery(function($){

'use strict';



    // ----------------------------------------------
    // Preloader
    // ----------------------------------------------
	(function () {
	    $(window).load(function() {
	        $('#pre-status').fadeOut();
	        $('#st-preloader').delay(350).fadeOut('slow');
	    });
	}());



    // ----------------------------------------------
    //  magnific-popup
    // ----------------------------------------------

	/*
	(function () {

		$('.portfolio-items').magnificPopup({
			delegate: 'a',
			type: 'image',
			// other options
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',

			gallery: {
				enabled: false
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element.find('i');
				}
			}

		});

	}());
	*/

	// -------------------------------------------------------------
	// Animated scrolling / Scroll Up
	// -------------------------------------------------------------

	(function () {
			$('li a[href*="#"]').bind("click", function(e){
					var anchor = $(this);
					$('html, body').stop().animate({
							scrollTop: $(anchor.attr('href')).offset().top -79
					}, 1000);
					e.preventDefault();
			});
	}());

	// ----------------------------------------------
	// B Carousel
	// ----------------------------------------------
	(function () {
		$("#studio-carousel").carousel();

		$(".studio-carousel-left").click(function(){
    	$("#studio-carousel").carousel("prev");
			return false;
		});

		$(".studio-carousel-right").click(function(){
			$("#studio-carousel").carousel("next");
			return false;
		});

	}());

    // -------------------------------------------------------------
    // Back To Top
    // -------------------------------------------------------------

    (function () {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
    }());


    // ----------------------------------------------
    // Parallax Scrolling
    // ----------------------------------------------
	(function () {
		$(window).bind('load', function () {
			parallaxInit();
		});
		function parallaxInit() {
			$("#testimonial").parallax("50%", 0.3);
		}
		parallaxInit();
	}());



    // ----------------------------------------------
    // fitvids js
    // ----------------------------------------------
    (function () {

        $(".post-video").fitVids();

    }());

		// ----------------------------------------------
    // auto close collapsible menu
    // ----------------------------------------------

		(function () {
			$('.nav a').on('click', function(){
					$("#st-navbar-collapse").removeClass('in');
			});
		}());

});
