'use strict';

// Get url variables
var getUrlVars = function () {
  var urlVars = [];
  var varArray = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < varArray.length; i++) {
    var urlVar = varArray[i].split('=');
    urlVars[urlVar[0]] = urlVar[1];
  }
  return urlVars;
};

// Smooth scroll to anchor
function scrollToAnchor(aId){
var target = $(aId);
	if (target.length) {
		$('html,body').animate({
			scrollTop: target.offset().top - 79
		}, 1000);
	}
}

jQuery(function($){

  // Preloader
	(function () {
	    $(window).load(function() {
	        $('#pre-status').fadeOut();
	        $('#st-preloader').delay(350).fadeOut('slow');
	    });
	}());

	// Remove hash from url
	(function () {
		var hash = window.location.hash;
		window.location.replace("#");
		if (typeof window.history.replaceState == 'function') {
		  history.replaceState({}, '', window.location.href.slice(0, -1));
		}
		if (hash != '') {
			scrollToAnchor(hash);
		}
	}());

  //  magnific-popup
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

	// Masonry
	(function () {
		$('.grid').imagesLoaded(function() {
			// init Masonry after all images have loaded
			// $('.grid').masonry({'itemSelector': '.grid-item', 'columnWidth': 350, 'transitionDuration': 0, 'fitWidth': true, 'gutter': 10});
			$('.grid').masonry({'itemSelector': '.grid-item', 'columnWidth': '.grid-sizer', 'transitionDuration': 0, 'fitWidth': true, 'gutter': 10});
			if(!navigator.userAgent.match('CriOS')) { // There is a bug on Chrome iOS scrollTop
				var clazz = getUrlVars().class;
				if (clazz) {
					$('.grid').on('layoutComplete', scrollToAnchor(clazz));
				}
			}
		});
	}());

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

	// B Carousel
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

  // Back To Top
  (function () {
      $(window).scroll(function() {
          if ($(this).scrollTop() > 100) {
              $('.scroll-up').fadeIn();
          } else {
              $('.scroll-up').fadeOut();
          }
      });
  }());

  // Auto close collapsible menu
	(function () {
		$('.nav a').on('click', function(){
				$("#st-navbar-collapse").removeClass('in');
		});
	}());

  // Attach price popovers (for gallery)
  (function () {
    $('[hm-price]').prepend(function () {
      return '<a tabindex="0" role="button" data-toggle="popover" data-content="Available for purchase at $' + $(this).attr('hm-price') +
              '" class="hm-price-button" data-trigger="hover focus" data-placement="bottom" style="float: right; padding-right: 5px"><small><span class="glyphicon glyphicon glyphicon-tag"></span></small></a>'
    });
  }());

  // Popover needs to be bound to the parent element
  (function () {
    $('.hm-price-button').popover({html: true, viewport: function (t){return t.parent();}});
  }());

  // Close the popovers upon resize and orientation change
  (function () {
    $(window).on('resize', function () {
      // Force popover close upon resize
      $('.hm-price-button').blur();
      // On orientation change, blur does not work well, so make sure popovers close
      $('.hm-price-button').popover('hide');
    });
  }());

  // Initialize gallery pop up functionality
(function () {
    $('.zoom-gallery').magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
        titleSrc: function(item) {
          return item.el.attr('caption');
        }
      },
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function(element) {
          return element.find('img');
        }
      },
      callbacks: {
        change: function () {
          this.contentContainer.css('width', '');
          var scale = (this.currItem.el).attr('hm-scale');
          if (scale) {
            this.contentContainer.css('width', scale);
          }
        }
      }

    });
  }());

});
