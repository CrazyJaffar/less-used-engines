(function($) { 



$('[data-toggle="offcanvas"]').on('click', function () {
    $('.navbar-collapse').toggleClass('show');
    });


    
/* ================ Revolution Slider. ================ */
    if($('.tp-banner').length > 0){
        $('.tp-banner').show().revolution({
            delay:6000,
            startheight: 640,
            startwidth: 1140,
            hideThumbs: 1000,
            navigationType: 'none',
            touchenabled: 'on',
            onHoverStop: 'on',
            navOffsetHorizontal: 0,
            navOffsetVertical: 0,
            dottedOverlay: 'none',
            fullWidth: 'on'
        });
    }
    if($('.tp-banner-full').length > 0){
        $('.tp-banner-full').show().revolution({
            delay:6000,
            hideThumbs: 1000,
            navigationType: 'none',
            touchenabled: 'on',
            onHoverStop: 'on',
            navOffsetHorizontal: 0,
            navOffsetVertical: 0,
            dottedOverlay: 'none',
            fullScreen: 'on'
        });
    }   





/*==== Nav ====*/
    $('.navbar-collapse a').on('click',function(){
        $(".navbar-collapse").collapse('hide');
    });

/* ================ Nav ================ */
    $('.fa-caret-down').on("click", function(e) {
        e.preventDefault();
        $(this).next().slideToggle('');
    });


/*==== Smoothscroll ====*/    
    $('#home a, .appointment_btn a').on('click', function(event) {
        var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 2000);
          event.preventDefault();
    });


//Check to see if the window is top if not then display button
    $(window).scroll(function(){

        if ($(this).scrollTop() > 100) {

            $('.scrollToTop').fadeIn();

        } else {

            $('.scrollToTop').fadeOut();
        }

    });
    //Click event to scroll to top
    $('.scrollToTop').click(function(){

        $('html, body').animate({scrollTop : 0},800);

        return false;

    });




/*==== Smoothscroll ====*/    
    $('#home a, .appointment_btn a').on('click', function(event) {
        var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 2000);
          event.preventDefault();
    });



//Check to see if the window is top if not then display button
    $(window).scroll(function(){

        if ($(this).scrollTop() > 100) {

            $('.scrollToTop').fadeIn();

        } else {

            $('.scrollToTop').fadeOut();
        }

    });



})(jQuery);