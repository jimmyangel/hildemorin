'use strict';

var MAILGUN_LIST_SERVICE_URL = 'https://us-central1-logical-bloom-179219.cloudfunctions.net/addToMailgunList';

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

// Reset subscription form
function resetJoinForm () {
  $('#join-dialog').modal('hide');
  $('#thank-you-msg').hide();
  $('#join-error').hide();
  $('#join-dialog-form')[0].reset();
  $('#join-button').attr('disabled', true);
  return false;
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
  /*
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
  */

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

	// Ignore hash and then smoth scroll to hash
  $(function() {
    if (location.hash) {
        $('html, body').scrollTop(0).show();
        // smooth-scroll to hash
        scrollToAnchor(window.location.hash);
    }

    /*
    setTimeout( function() {
      scroll(0,0);
      if (window.location.hash) {
        scrollToAnchor(window.location.hash);
      };
    }, 10); */
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

  // Mailing list subscriptions

  (function () {
    $('#register-link').click(function () {
      $('#join-dialog').modal('show');
      return false;
    });

    // POST to mailing list service
    $('#join-button').click(function () {
      $.post(MAILGUN_LIST_SERVICE_URL, $('#join-dialog-form').serialize(), function (data) {
          $('#thank-you-msg').fadeIn('slow');
          setTimeout(resetJoinForm, 3000);
        }).fail(function (data) {
          console.log(data);
          $('#join-error-text').text(data.responseJSON.message.startsWith('Address already exists') ? 'Thank you, but you already joined my mailing list!' : data.responseJSON.message);
          $('#join-error').fadeIn('slow');
          setTimeout(resetJoinForm, 3000);
      });
      return false;
    });

    // Cancel join
    $('#cancel-join-button').click(resetJoinForm);

    // Single field forms always trigger a submit
    $('#join-dialog-form').submit(function () {
      if (!$('#join-button').attr('disabled')) {
        $('#join-button').trigger('click');
      }
      return false;
    });

    // Enable join button only if valid email format entered
    $('#join-email').on('change keyup blur', function () {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test($('#join-email').val())) {
        $('#join-button').removeAttr('disabled');
      } else {
        $('#join-button').attr('disabled', true);
      }
    });
  }());

});
