(function($){
	'use strict';

	var winScrollPos = $('body').scrollTop();

	
	$(document).ready(function(){

		$('.intro-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			nextArrow: '<button type="button" class="slick-next"></button>',
			prevArrow: '<button type="button" class="slick-prev"></button>',
			// fade: true,
			asNavFor: '.intro-slider-nav'
		});

		$('.intro-slider-nav').slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			asNavFor: '.intro-slider',
			arrows: false,
			dots: true,
			// centerMode: true,
			focusOnSelect: true
		});

		$('.owl-carousel').owlCarousel({
			nav: false,
			items: 1,
			center:true,
		    animateIn: 'fadeIn',
		    animateOut: 'fadeOut',
			mouseDrag: false,
			touchDrag: false,
			// lazyLoad: true,
			dots: true,
			dotsContainer: '.nav-dots .owl-dots',
			// smartSpeed:150
			// startPosition: imgInd
			//autoWidth:true
		});

		// Modal
		// -------
		$('.call-modal').on('click', function(ev) {
			ev.preventDefault();
			winScrollPos = $('body').scrollTop();
			$('body').addClass('modal-opened');
			$('#formModal').addClass('-active');
			$('#formModal .form-error').hide();
			$('#feedbackForm input').removeClass('-error');
			$('#formModal').find('.modal-title-main').text($(this).data('modalTitle'));
		});

		$('.white-page, .close-btn').on('click', function(ev) {
			ev.preventDefault();
			$(this).closest('.modal').removeClass('-active').removeClass('-success').removeClass('-error');
			$(this).closest('.modal').find('form')[0].reset();
			$('body').removeClass('modal-opened');
			$('body').scrollTop(winScrollPos);
		});

		

	    $("#uPhone").mask('+7 (999) 999-99-99',{placeholder:"x"});
		$("#uPhone").on('focus', function(){ 
		if ($(this).val('')) {
				$(this).val('+7 ');
			}
		});

	    $("#uPhone1").mask('+7 (999) 999-99-99',{placeholder:"x"});
		$("#uPhone1").on('focus', function(){ 
		if ($(this).val('')) {
				$(this).val('+7 ');
			}
		});


	    $('#feedbackForm input').on('focus', function(){
	    	$(this).removeClass('-error');
	    	$('input.-error').removeClass('-error');
	    	if (!$('#feedbackForm input').hasClass('-error')) {
	    		$('.form-error').hide();
	    	}
	    });

	    $('#feedbackForm1 input').on('focus', function(){
	    	$(this).removeClass('-error');
	    	$('input.-error').removeClass('-error');
	    	if (!$('#feedbackForm1 input').hasClass('-error')) {
	    		$('.form-error').hide();
	    	}
	    });
	    // end Modal

	    $('#feedbackForm').on('submit', function(ev){
			ev.preventDefault();
			var self = this;

			if ($('#uName').val().length == 0) {
				$('#uName').addClass('-error');
				$(this).find('.form-error').show();
				return false;
			}

			if ($('#uPhone').val().length < 10) {
				$('#uPhone').addClass('-error');
				$(this).find('.form-error').show();
				return false;
			}
			
			var formData = $("#feedbackForm").serialize();

			// console.log(formData);
	        $.ajax({
	            type: "post",
	            url: "send.php",
	            data: formData,
	            // dataType: "text",
	            success: function(data){
	            	$("#feedbackForm")[0].reset();
	                if (data == true){
	                	$('#formModal').removeClass('-error');
	                    $('#formModal').addClass('-success');
	                } else {
	                	$('#formModal').removeClass('-success');
						$('#formModal').addClass('-error');
	                }
	            },
	            error: function(xhr, str){
	                $("#feedbackForm")[0].reset();
	                $('#formModal').removeClass('-success');
	                $('#formModal').addClass('-error');
	            }
	        });
		});

	    $('#feedbackForm1').on('submit', function(ev){
			ev.preventDefault();
			var self = this;

			if ($('#uName1').val().length == 0) {
				$('#uName1').addClass('-error');
				$(this).closest('.order').find('.form-error').show();
				return false;
			}

			if ($('#uPhone1').val().length < 10) {
				$('#uPhone1').addClass('-error');
				$(this).closest('.order').find('.form-error').show();
				return false;
			}
			
			var formData = $("#feedbackForm1").serialize();

			// console.log(formData);
	        $.ajax({
	            type: "post",
	            url: "send.php",
	            data: formData,
	            // dataType: "text",
	            success: function(data){
	            	$("#feedbackForm1")[0].reset();
	            	winScrollPos = $('body').scrollTop();
	            	$('body').addClass('modal-opened');
	            	$('#formModal').addClass('-active');
	                if (data == true){
	                	$('#formModal').addClass('-success');
						// $('#feedbackForm input').removeClass('-error');
						$('#formModal').find('.modal-title-main').text('Спасибо!');
	                } else {
						$('#formModal').addClass('-error');
						// $('#feedbackForm input').removeClass('-error');
						$('#formModal').find('.modal-title-main').text('Ошибка!');
	                }
	            },
	            error: function(xhr, str){
	                $("#feedbackForm1")[0].reset();
	                winScrollPos = $('body').scrollTop();
					$('body').addClass('modal-opened');
					$('#formModal').addClass('-active');
					$('#formModal').addClass('-error');
					// $('#feedbackForm input').removeClass('-error');
					$('#formModal').find('.modal-title-main').text('Ошибка!');
	            }
	        });
		});

	    $('.gallery-filter-item').on('click', function(ev) {
	    	ev.preventDefault();
	    	if (!$(this).hasClass('-active')) {
	    		var gFilter = $(this).attr('href');
	    		$('.gallery-filter-item').removeClass('-active').eq($(this).index()).addClass('-active');
		    	filterGallery(gFilter);
	    	}
	    	
	    	return false;
	    })

		// filter cars in gallery
		function filterGallery(subcat) {
			$.ajax({
				type: "POST",
				dataType: "html",
				url: ajaxData.url,
				data: {
					action: 'filter_gal',
					galSubcat: subcat
				},
				beforeSend: function() {
	            	$('#loaderGal').show();
	            	$('#galleryContent').html('');
	            },
				success: function(data){
					// console.log(data);
					// return;
					var $data = $(data);
					if($data.length){

						//$("#ajax-posts").append($data);
						//$("#more_posts").attr("disabled",false);
						setTimeout(function(){
							$('#loaderGal').hide();
							$('#galleryContent').html($data);
						}, 1000);
						


						// setTimeout(function(){
						// 	$loader.before($data);
						// 	$('body, html').animate({ scrollTop: ($(document).scrollTop() + 300) }, 800);
						// }, 150);

					} else {
						// $("#more_posts").attr("disabled",true);
						// $loader.hide();
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					// $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
				}

			});
			return false;
		};



		$('.gallery-item-link').on('click', function(ev){
			ev.preventDefault();
		});

		$('.current-menu-item').on('click', function(ev){
			ev.preventDefault();
		});

		if ($('#contactsMap').length) {
			initYMap(document.getElementById('contactsMap'), mapData.address, mapData.hint);	
		}
		

		function initYMap(elem, adr, hint){
			console.log(adr);
			ymaps.ready(function(){
				ymaps.geocode(adr).then(function(res) {
					var pointCoords = res.geoObjects.get(0).geometry.getCoordinates();
					//console.log(pointCoords);
					var yaOffice = new ymaps.Placemark(pointCoords, {hintContent: hint, balloonContent: adr});
					var yaMapContacts2 = new ymaps.Map(elem, {
						center: [pointCoords[0], pointCoords[1]],
						zoom: 15
					});
					yaMapContacts2.geoObjects.add(yaOffice);
				});
			});
		};

	});
	


	

})(jQuery);