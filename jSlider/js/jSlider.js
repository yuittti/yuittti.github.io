(function ($) {

    $.fn.jSlider = function(options){

        // Set default values of sliding speed and delay of slides changing
        // And set new values if it was specified on plugin call
        var settings = $.extend({
            slidingTime: 500,
            rotateDelay: 2000
        }, options);

        var slidingTime = settings.slidingTime,
            rotateDelay = settings.rotateDelay;

        // this = $(this) = Element for which plugin was called.
        // Add class to this element for next manipulations.
        this.addClass('slider');

        // Associate variables with elements of slider for next manipulations
        var $slider = this.find('slider'),
            $sliderItem = this.find('.slider-item'),
            $sliderBox = this.find('.slider-box'),
            $sliderPointers = this.find('.slider-pointers'),
            $sliderLeft = this.find('.slider-left'),
            $sliderRight = this.find('.slider-right');

        // Set variables needs for next usage
        var slideNumbers = $sliderItem.length,
            currentSlide = 0,
            prevSlide,
            slideTimer;

        // Resize Elements
        // --------------------------------------------------------------------
        // Slider Box must be the same size as image inside.
        // By default it is 100% width and height of parent container.
        // Let's resize Slider Box for smaller images.
        //---------------------------------------------------------------------
        //
        // Get width of first image
        var sliderWidth = $sliderItem[0].firstChild.width;

        // Set these value as max-width of Slider Box.
        $sliderBox.css({'max-width': sliderWidth});

        // After image is loaded in Slider Box with right size
        // it size can be bigger then Slider Box.
        // Resize Bigger images to fit Slider Box.
        //
        var $imgElement = $('li.slider-item img');
        var imgWidth,   // will be used for slide rotation
            imgHeight;

        $imgElement.eq(0).ready(function() {
            imgWidth = $sliderBox[0].clientWidth;
            $sliderItem.find('img').css({'max-width': imgWidth});
            imgHeight = $sliderItem[0].firstChild.height;
            $sliderBox.css({'height': imgHeight});
        });

        // Hide all slides, then show first one
        $sliderItem.hide().eq(0).show();

        // Add slide pointers to slide box
        for (var i=0;i<slideNumbers;i++){
            $sliderPointers
                .append("<li></li>")
                .find('li')
                .addClass('slider-point');
        };

        var $sliderPoint = $(this).find('.slider-point');

        // Set first pointer as active
        $sliderPoint.eq(0).addClass('active');

        // Start slides rotation with specific interval
        startRotation();

        // Rotate slides
        // in: 'left', 'right' or slide index
        // --------------------------------------------------------------------
        var rotateSlider = function(rotateDirection) {

            var nextSlide;
            $sliderPoint.eq(currentSlide).removeClass('active');

            if (rotateDirection === 'left') {

                nextSlide = currentSlide+1;
                if (nextSlide === slideNumbers) {nextSlide = 0};
                moveToLeft(nextSlide);

            } else if (rotateDirection === 'right') {

                nextSlide = currentSlide-1;
                if (nextSlide<0) {nextSlide=slideNumbers-1};
                moveToRight(nextSlide);

            } else {

                nextSlide = rotateDirection;
                if (nextSlide - currentSlide > 0) {
                    moveToLeft(nextSlide);
                } else if (nextSlide - currentSlide < 0) {
                    moveToRight(nextSlide);
                }
            }
            prevSlide = currentSlide;
            currentSlide = nextSlide;

            $sliderPoint.eq(currentSlide).addClass('active');
        };

        // Rotate slides to the left
        //---------------------------------------------------------------------
        var moveToLeft = function(nextSlide){
            $sliderItem.eq(nextSlide).css({left: imgWidth+'px', display: 'inline'})
                .animate({left: 0}, slidingTime);
            $sliderItem.eq(currentSlide)
                .animate({left: '-'+imgWidth+'px'}, slidingTime);
        };

        // Rotate slides to the right
        //---------------------------------------------------------------------
        var moveToRight = function(nextSlide){
            $sliderItem.eq(nextSlide).css({left: '-'+imgWidth+'px', display: 'inline'})
                .animate({left: 0}, slidingTime);
            $sliderItem.eq(currentSlide)
                .animate({left: imgWidth+'px'}, slidingTime);
        };

        // Start rotation with specific interval (rotateDelay)
        //---------------------------------------------------------------------
        function startRotation(){
            slideTimer = setTimeout(function timer(){
                rotateSlider('left');
                slideTimer = setTimeout(timer, rotateDelay);
            }, rotateDelay);
        };

        // Events handlers
        // --------------------------------------------------------------------
        $sliderBox
            .hover(function(){
                //stop slides rotation when slide is hover
                clearTimeout(slideTimer);
                $sliderLeft.show();
                $sliderRight.show();

            }, function(){
                //renew slides rotation if not hover
                startRotation();
                $sliderLeft.hide();
                $sliderRight.hide();
            });

        // Left arrow is clicked
        $sliderLeft.click(function(){
            rotateSlider('right');
        });

        // Right arrow is clicked
        $sliderRight.click(function(){
            rotateSlider('left');
        });

        // Specific slide pointer is clicked
        $sliderPoint
            .hover(function() {
                clearTimeout(slideTimer);
            })
            .click(function(){
                rotateSlider($(this).index());
            });

        $(window).resize(function(){
            clearTimeout(slideTimer);
            var i = prevSlide;
            $sliderItem.eq(i).css({"z-index": 0, "display": 'none'});
            imgWidth = ($sliderBox.width());
            $sliderItem.find('img').css({'max-width': imgWidth});
            imgHeight = $sliderItem[currentSlide].firstChild.height;
            $sliderBox.css({'height': imgHeight});
            $slider.css({'height': imgHeight});
            startRotation();
        });

        return this;
    };
})(jQuery);