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

		// Smooth scroll to anchor
	function scrollToAnchor(aId){
	  var target = $(aId);
	    if (target.length) {
	      $('html,body').animate({
	        scrollTop: target.offset().top - 79
	      }, 1000);
	    }
	}


	// Set up mooth scroll to anchor on (menu) click
	$(function() {
	  $('a[href*="#"]').not('[href="#"]').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      scrollToAnchor($(this.hash));
	      return false;
	    }
	  });
	});

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
			    $('.navbar-toggle').click();
			});
		}());




});
