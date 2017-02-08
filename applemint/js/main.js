(function($){
	$(document).ready(function(){

        //var parallax1 = document.getElementById('deco1');
        //console.log(parallax1);



        var $navbar = $(".navbar");
            //$clone = $navbar.before($navbar.clone().addClass("clone"));

        $(window).on("scroll", function() {
            var fromTop = $("body").scrollTop();

            if ($('body').hasClass('menu-opened')) {
                $('body').removeClass('menu-opened');
                $('.navbar-collapse').removeClass('in');

                setTimeout(function(){
                    $('.navbar-collapse').removeClass('in');
                    $('body').removeClass('menu-opened');
                }, 500);

            }

            $('body').toggleClass("down", (fromTop > 200));
        });

        if ($('#infoCarousel').length && $('#mainInfo').length) {
            $('#infoCarousel').html($('#mainInfo').html());
            $('#mainInfo').html('');
        }

        if ($('#mainInfo').length) {
            $('#mainInfo').html('');
        }


        if ($('#infoCarousel').length) {

            $('#infoCarousel').owlCarousel({
                nav: false,
                navigationText:['<span class="slide-left"></span>','<span class="slide-right"></span>'],
                items: 1,
                center:true,
                pagination: false,
                navigation: true,
                itemsDesktop: false,
                itemsDesktopSmall: false,
                itemsTablet: false,
                itemsTabletSmall: false,
                itemsMobile: false,
                slideSpeed : 500

                //navigationText: ['<i class="fa fa-chevron-right slick-next"></i>', '<i class="fa fa-chevron-left slick-prev"></i>']

            });
        }


        if ($('#headerSlider').length) {
            $('#headerSlider').owlCarousel({
                nav: false,
                navigationText: '',
                //navigationText:[
                //    '<div class="left carousel-control"><span aria-hidden="true"></span></div>',
                //    '<div class="right carousel-control"><span aria-hidden="true"></span></div>'],
                items: 1,
                center:true,
                pagination: false,
                navigation: true,
                itemsDesktop: false,
                itemsDesktopSmall: false,
                itemsTablet: false,
                itemsTabletSmall: false,
                itemsMobile: false,
                slideSpeed : 500

                //navigationText: ['<i class="fa fa-chevron-right slick-next"></i>', '<i class="fa fa-chevron-left slick-prev"></i>']

            });
        }

        $('.main-infographics .infograph-item').hover(function(){
            if (window.innerWidth <= 550) {
                return;
            }

            $('.main-infographics .infograph-item').removeClass('_hovered');
            $(this).addClass('_hovered');
        });

		$(window).on('load', function(){
			setHeaderHeight($('header.header'));
            $('#deco1').parallax();
		});

		$(window).on('resize', function(){
			if (isMobile.any()){
		        return false;
		    } else {
                setHeaderHeight($('header.header'));
            }
		});

        $('.navbar-toggle').on('click', function(ev){
            //$(this).closest($('.navbar')).find($('.navbar-collapse')).toggleClass('collapse');
            //console.log($(this).closest($('.navbar')));
            $('body').toggleClass('menu-opened');
        });

        // Contacts page animation
        // -----------------------------------------------------

        $('.contact-img').hover(function(){
            $(this).find($('.animated')).addClass('bounceIn');
        }, function(){
            $(this).find($('.animated')).removeClass('bounceIn');
        });

        $('.contact-img').next().hover(function(){
            $(this).prev().find($('.animated')).addClass('bounceIn');
        }, function(){
            $(this).prev().find($('.animated')).removeClass('bounceIn');
        });



        $('.contact-img > .animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('bounceIn');
        });

        // end Contacts page animation -------------------------

        // Blog no-time-to-read event handlers
        // -----------------------------------------------------

        $('.blog-notime').on('click', 'a', function(event) {
            $(this).text($(this).text() === $(this).data('notime') ?
                    $(this).data('read') : $(this).data('notime')
            );
            $('.notime-services').slideToggle();
            event.preventDefault();
        });

        $('.notime-services').find('.notime-service').first()
            .on('click', 'a', function(event) {
                $('.notime-email').slideToggle();
                event.preventDefault();
            });

        // end of Blog no-time-to-read event handlers ----------
		
		console.log($('header.header').height());

        function setHeaderHeight(elem){

            var clientHeight = $(window).height(),
                clientWidth = $(window).width();

            if (clientWidth > 1023) {
                elem.height(clientHeight - 97);
            } else {
                elem.height('auto');
            }
        }


		
	});
})($);




var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}; 