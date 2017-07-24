(function($){
	'use strict';
	
	$(document).ready(function(){

		var sHolder = $('.slider-holder'),
			sItems = $('.slider-item'),
			sLength = sItems.length;

		function rotate(aInd) {
			sItems
				.removeClass('_active')
				.fadeOut()
				.eq(aInd)
				.addClass('_active')
				.fadeIn();
		}

		function getActive() {
			return sHolder.find('._active').index();
		}

		$('#prevSlide').click(function(){
			var aInd = getActive();
			aInd = (aInd > 0) ? aInd -= 1 : sLength - 1;
			rotate(aInd);
		});

		$('#nextSlide').click(function(){
			var aInd = getActive();
			aInd = (aInd < sLength - 1) ? aInd += 1 : 0;
			rotate(aInd);
		});

	});

})(jQuery);