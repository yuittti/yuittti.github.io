jQuery(document).ready(function($) {

    // Change header height on load
    setHeaderHeight();

    // Init pre-footer carousel (Partners images) on load
    // Using bxslider plugin (http://bxslider.com/)
    // ------------------------------------------------------------------------
    var modeType, minS, maxS, moveS;

    if ($(window).width() >= 768) {
        modeType = "horizontal";
        minS = 5;
        maxS = 5;
        moveS = 1;
    } else {
        modeType = "vertical";
        minS = 3;
        maxS = 3;
        moveS = 3;
    }

    var sliderParams = {
        minSlides: minS,
        maxSlides: maxS,
        moveSlides: moveS,
        slideWidth: 327,
        slideMargin: 30,
        controls: true,
        pause: 2000,
        autoStart: true,
        autoHover: true,
        auto: false,
        adaptiveHeight: true,
        infiniteLoop: true,
        mode: modeType
    };
    var slider = $('.bxslider').bxSlider(sliderParams);


    // Handlers ===============================================================

    $('*').on('touchstart', function(){
        $(this).trigger('hover');
    }).on('touchend', function(){
        $(this).trigger('hover');
    });

    // Window resized
    // ------------------------------------------------------------------------
    $(window).on('resize', function(){

        // Reload Partners carousel
        //
        if ($(window).width() >= 768) {
            modeType = "horizontal";
            minS = 5;
            maxS = 5;
            moveS = 1;
        } else {
            modeType = "vertical";
            minS = 3;
            maxS = 3;
            moveS = 3;
        }

        $.extend(sliderParams, {
            minSlides: minS,
            maxSlides: maxS,
            moveSlides: moveS,
            mode: modeType
        });

        slider.reloadSlider(sliderParams);

        // Change header height
        //
        //if ($(window).width() >= 768) {
        //    setHeaderHeight();
        //}

        // Hide main menu and contact form
        // closeMainMenu();
        // closeMainContactForm();
    });


    // Main Menu button pressed
    // ------------------------------------------------------------------------
    $('#btnMenu').click(function(e){
        if ($(this).hasClass('menu-closed')) {
            // Menu is closed - open it
            // Close other forms first
            if ($('#btnMail').hasClass('mail-opened')) closeMainContactForm();
            if ($('#callOrder').hasClass('call-opened')) closeCallForm();
            if ($('#langChoose').hasClass('lang-opened')) {
                $('#langChoose').removeClass('lang-opened').addClass('lang-closed');
            }

            // open menu
            var $mainNav = $('.header-menu'),
                $navUl = $('nav.header-menu > ul');

            if ($(window).width() >= 768) {
                // open to the right
                $mainNav.css({'width':'324px','padding':'9px 42px 27px 42px', 'height':'100%'});
                $navUl.css({'opacity': '1', 'visibility': 'visible'});
                $('#btnMenu').removeClass('menu-closed').addClass('menu-opened');
            } else {
                $('.fade-screen').show();
                // open slide down
                $mainNav.css({'height':'auto','padding':'9px 42px 27px 42px', 'width': '100%'});
                $navUl.css({'opacity': '1', 'visibility': 'visible'});
                $('#btnMenu').removeClass('menu-closed').addClass('menu-opened');
            }
        } else {
            //  Menu is opened - close it
            closeMainMenu();
        }
    });


    // 'Close Menu' button pressed
    // ------------------------------------------------------------------------
    $('.close-menu').click(function(){
        closeMainMenu();
    });


    // Main Contact Form button pressed
    // ------------------------------------------------------------------------
    $('#btnMail').click(function(e){
        if ($(this).hasClass('mail-closed')) {
            // Form is closed - open it
            // Close other forms first
            if ($('#btnMenu').hasClass('menu-opened')) closeMainMenu();
            if ($('#callOrder').hasClass('call-opened')) closeCallForm();
            if ($('#langChoose').hasClass('lang-opened')) {
                $('#langChoose').removeClass('lang-opened').addClass('lang-closed');
            }

            // open contact form
            var $mainContact = $('.contact-form');
            $mainContact.find('.feedback-message').hide();
            if ($(window).width() >= 768) {
                $mainContact.css({'width': '324px', 'height': '100%', 'padding': '9px 42px 27px 42px'});
                $('.contact-form > form').show(200);
                $('#btnMail').removeClass('mail-closed').addClass('mail-opened');
            } else {
                $('.fade-screen').show();
                $mainContact.css({'width': '100%', 'height': 'auto','padding': '9px 42px 27px 42px'});
                $('.contact-form > form').slideDown(500);
                $('#btnMail').removeClass('mail-closed').addClass('mail-opened');
            }
        } else {
            //  Form is opened - close it
            closeMainContactForm();
        }
    });

    $('.header-menu > ul > li').click(function(e){
        if($(this).find('.submenu').length){
            $('.header-menu').find('.submenu').hide();
            $(this).find('.submenu').show();
        }
    });


    // Send button in Contact form pressed
    // ------------------------------------------------------------------------
    $('#sendFeedback').click(function(e){
        e.preventDefault();
        $('.contact-form > form').hide();
        $('.feedback-message').show();
    });


    // 'Close Contact Form' button pressed
    // ------------------------------------------------------------------------
    $('.close-form').click(function(){
        closeMainContactForm();
    });


    // 'Order Call' button pressed
    // ------------------------------------------------------------------------
    $('#callBtn > a').click(function(e){
        e.preventDefault();
        var $callOrder = $('#callOrder');

        if ($callOrder.hasClass('call-closed')) {
            // Form is closed - open it
            // Close other forms first
            if ($('#btnMenu').hasClass('menu-opened')) closeMainMenu();
            if ($('#btnMail').hasClass('mail-opened')) closeMainContactForm();
            if ($('#langChoose').hasClass('lang-opened')) {
                $('#langChoose').removeClass('lang-opened').addClass('lang-closed');
            }



            $callOrder.removeClass('call-closed').addClass('call-opened');
            $('#callOrder > form').delay(400).show(0);
            $callOrder.find('img').eq(0).show();

        } else if ($callOrder.hasClass('call-opened')) {
            closeCallForm();
        }
    });


    // Close 'Order Call' button pressed
    // ------------------------------------------------------------------------
    $('#callOrder > img').click(function(){
        closeCallForm();
    });


    $('#langBtn').click(function(e){
        e.preventDefault();

        var $langChoose = $('#langChoose');
        if ($langChoose.hasClass('lang-closed')) {
            // Form is closed - open it
            // Close other forms first
            if ($('#btnMenu').hasClass('menu-opened')) closeMainMenu();
            if ($('#btnMail').hasClass('mail-opened')) closeMainContactForm();
            if ($('#callOrder').hasClass('call-opened')) closeCallForm();

            // Show 2 inactive languages to choose in desktop mode
            $langChoose.find('.lang-inactive').each(function(i, elem){
                $(elem).show();
            });

            if ($(window).width() >= 768) {
                $langChoose.find('.lang-active').eq(0).hide();
            } else {
                // Show all 3 languages to choose in mobile mode
                $langChoose.find('.lang-active').eq(0).show();
            }

            // Open the form
            $langChoose.removeClass('lang-closed').addClass('lang-opened');

        // Close the form if it was opened while clicked
        } else if ($langChoose.hasClass('lang-opened')) {

            // Change the language before close
            //
            var choosedLanguage = e.target.closest('a');
            if (choosedLanguage.className == 'lang-inactive') {
                // inactive language was choosed
                
                // switch the language on the social links menu
                var ind = $langChoose.find('a').index(choosedLanguage);
                $(this).find('.lang-active')[0].className = 'lang-inactive';
                $(this).children('a')[ind].className = 'lang-active';

                // switch the language in the language choosing form
                $langChoose.find('.lang-active')[0].className = 'lang-inactive';
                choosedLanguage.className = 'lang-active';            
            }

            // close the form
            $langChoose.removeClass('lang-opened').addClass('lang-closed');
        }
    });


    // Functions ==============================================================

    // Change header height
    // ------------------------------------------------------------------------
    function setHeaderHeight(){
        var clientHeight = $(window).height();
        headWrap = $('.header-wrapper');
        headWrap.height(clientHeight);
    }

    // Close Main Menu
    // ------------------------------------------------------------------------
    function closeMainMenu(){
        var $mainNav = $('.header-menu'),
            $navUl = $('nav.header-menu > ul');

        if ($(window).width() >= 768) {
            $mainNav.css({'width':'0', 'padding': '9px 0 27px 0', 'height':'100%'});
            $navUl.css({'opacity': '0', 'visibility': 'hidden'});
            $('#btnMenu').removeClass('menu-opened').addClass('menu-closed');
        } else {
            $('.fade-screen').hide();
            $mainNav.css({'height':'0','padding':'0 42px 0 42px', 'width': '100%'});
            $navUl.css({'opacity': '0', 'visibility': 'hidden'});
            $('#btnMenu').removeClass('menu-opened').addClass('menu-closed');
        }
    }


    // Close Main Contact Form
    // ------------------------------------------------------------------------
    function closeMainContactForm(){
        var $mainContact = $('.contact-form');
        $mainContact.find('.feedback-message').hide();
        if ($(window).width() >= 768) {
            $mainContact.css({'width': '0', 'height':'100%', 'padding': '9px 0 27px 0'});
            $mainContact.find('form').hide(100);
            $('#btnMail').removeClass('mail-opened').addClass('mail-closed');
        } else {
            $('.fade-screen').hide();
            $mainContact.css({'width': '100%', 'height': '0', 'padding': '0 42px'});
            $mainContact.find('form').slideUp(500);
            $('#btnMail').removeClass('mail-opened').addClass('mail-closed');
        }
    }


    // Close 'Order Call' form
    // ------------------------------------------------------------------------
    function closeCallForm(){
        var $callOrder = $('#callOrder');
        if ($callOrder.hasClass('call-opened')){
            $callOrder.removeClass('call-opened').addClass('call-closed');
            $('#callOrder > form').hide(0);
            
        }
    }
});
