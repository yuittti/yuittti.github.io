jQuery(document).ready(function($){

    // Hack 'hover' for touch screens
    // ------------------------------------------------------------------------
    $('*').on('touchstart', function(){
        $(this).trigger('hover');
    }).on('touchend', function(){
        $(this).trigger('hover');
    });


    // Main menu button clicked
    // ------------------------------------------------------------------------
    $('#btnMenu').click(function(e) {
        //Close other forms if this click is going to open Menu
        if ($(this).hasClass('menu-closed')) {
            // Close lang choose
            if ($('#langChoose').hasClass('lang-opened')) {
                $('#langChoose').removeClass('lang-opened').addClass('lang-closed');
            }
            // Close call order form
            if ($('#callOrder').hasClass('call-opened')) {
                closeCallOrderForm();
            }
            // Close small feedback form
            if ($('#btnMail').hasClass('mail-opened')) {
                toggleFeedbackForm();
            }
        }

        toggleMainMenu();
    });

    $('.header-menu > ul > li').click(function(){
        if($(this).find('.submenu').length){
            $('.header-menu').find('.submenu').hide();
            $(this).find('.submenu').eq(0).css({'display':''}).addClass('active');
        }
    });

    // Close menu button clicked
    // ------------------------------------------------------------------------
    $('#closeMenu1').click(function(e){
        toggleMainMenu();
    });

    // Toggle Main menu
    // ------------------------------------------------------------------------
    function toggleMainMenu() {
        if ($('#btnMenu').hasClass('menu-closed')) {
            if ($(window).width() < 768) {
                $('.fade-screen.white').show();
            }
            $('#btnMenu').removeClass('menu-closed').addClass('menu-opened');
        } else {
            $('.fade-screen.white').hide();
            $('#btnMenu').removeClass('menu-opened').addClass('menu-closed');
        }

        $('.nav-wrapper').animate({height: 'toggle'}, 500);
    }



    // Leave Feedback on service page clicked
    // ------------------------------------------------------------------------
    $('#serviceFeedback').click(function(e){
        e.preventDefault();

        if ($('#langChoose').hasClass('lang-opened')) {
            $('#langChoose').removeClass('lang-opened').addClass('lang-closed');
        }
        // Close call order form
        if ($('#callOrder').hasClass('call-opened')) {
            closeCallOrderForm();
        }
        // Close small feedback form
        if ($('#btnMail').hasClass('mail-opened')){
            $('#btnMail').removeClass('mail-opened').addClass('mail-closed');
        }
        if ($('#btnMenu').hasClass('menu-opened')){
            toggleMainMenu();
        }


        // 'small' class is for showing form in header - remove it to show full
        $('.anfrage-wrapper').removeClass('small');
        // hide feedback-ok message left after previous form sending
        $('.feedback-message').hide();
        // show form caption, form and fade screen
        $('.anfrage-caption').css({'opacity':'1', 'padding-top':'45px'});
        $('.feedback-form').show();
        $(".fade-screen.blue").show();
        $(".anfrage-wrapper").show();

        var formTop = $('.anfrage-wrapper')[0].offsetTop;
        $(document.body).stop().animate({scrollTop: formTop}, 500);

    });


    // Send Feedback button clicked
    // ------------------------------------------------------------------------
    $('#sendFeedback').click(function(e){
        e.preventDefault();

        // show Feedback-Ok message
        $('.anfrage-caption').css({'opacity':'0', 'padding-top':'0'});
        $('.feedback-form').hide();
        $('.feedback-message').show();

        var formTop = $('.anfrage-wrapper')[0].offsetTop;
        $(document.body).stop().animate({scrollTop: formTop}, 500);
    });


    // Close Big Feedback form clicked
    // ------------------------------------------------------------------------
    $('#closeFeedbackForm').click(function(e){

        // Toggle 'open'/'close' class for mail icon highlighting, if it was shown in header
        if ($('.anfrage-wrapper').hasClass('small')) {
            toggleFeedbackForm();
        } else {
            $(".fade-screen.blue").hide();
            $(".anfrage-wrapper").hide();
        }
    });



    // Mail button clicked (to open/hide small feedback form in header)
    // ------------------------------------------------------------------------
    $('#btnMail').click(function(e){
        if ($('#langChoose').hasClass('lang-opened')) {
            $('#langChoose').removeClass('lang-opened').addClass('lang-closed');
        }
        // Close call order form
        if ($('#callOrder').hasClass('call-opened')) {
            closeCallOrderForm();
        }

        if ($('#btnMenu').hasClass('menu-opened')){
            toggleMainMenu();
        }

        toggleFeedbackForm();
    });

    // Toggle (open/hide) small feedback form in header
    // ------------------------------------------------------------------------
    function toggleFeedbackForm(){

        $('.anfrage-wrapper').addClass('small').animate({height: 'toggle'}, 500);
        $('.feedback-message').hide(500);
        $('.anfrage-caption').css({'opacity':'1', 'padding-top':'45px'});
        $('.feedback-form').show(500);
        //Toggle 'open'/'close' class for mail icon highlighting
        if ($('#btnMail').hasClass('mail-opened')){
            $('.fade-screen.white').hide();
            $('#btnMail').removeClass('mail-opened').addClass('mail-closed');
        } else {
            if ($(window).width() < 768) {
                $('.fade-screen.white').show();
            }
            $('#btnMail').removeClass('mail-closed').addClass('mail-opened');
        }
    }


    // Order call button clicked
    // ------------------------------------------------------------------------
    $('#callBtn > a').click(function(e){
        e.preventDefault();
        var callOrderForm = $('#callOrder');

        if ($('#langChoose').hasClass('lang-opened')) {
            $('#langChoose').removeClass('lang-opened').addClass('lang-closed');
        }

        // Close small feedback form
        if ($('#btnMail').hasClass('mail-opened')){
            toggleFeedbackForm();
        }
        if ($('#btnMenu').hasClass('menu-opened')){
            toggleMainMenu();
        }


        if (callOrderForm.hasClass('call-closed')) {
            $('#callOrder')
                .removeClass('call-closed')
                .addClass('call-opened')
                .find('img').eq(0).show();
            $('#callOrder > form').delay(300).fadeIn(300);
        } else {
            closeCallOrderForm();
        }
    });

    $('#callOrder > img').click(function(e){
        closeCallOrderForm();
    });

    function closeCallOrderForm(){
        $('#callOrder > form').hide();
        $('#callOrder')
            .removeClass('call-opened')
            .addClass('call-closed')
            .find('img').eq(0).hide();  
    }



    $('#langBtn').click(function(e){
        e.preventDefault();


        var $langChoose = $('#langChoose');

        if ($langChoose.hasClass('lang-closed')) {
            // Form is closed - open it
            // Close other forms first

            // Close call order form
            if ($('#callOrder').hasClass('call-opened')) {
                closeCallOrderForm();
            }
            // Close small feedback form
            if ($('#btnMail').hasClass('mail-opened')){
                toggleFeedbackForm();
            }
            if ($('#btnMenu').hasClass('menu-opened')){
                toggleMainMenu();
            }

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
            
            $langChoose.removeClass('lang-opened').addClass('lang-closed');

        }
    });

    $('#btnMailInContacts').click(function(){
        if ($('#btnMenu').hasClass('menu-opened')){
            toggleMainMenu();
        }
        var formTop = $('.anfrage-wrapper')[0].offsetTop;
        $(document.body).stop().animate({scrollTop: formTop}, 500);
    });


});