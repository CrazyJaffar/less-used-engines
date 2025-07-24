"use strict";
document.addEventListener('DOMContentLoaded', function () {
    ToxProgress.create();
    ToxProgress.animate();
});
$(window).load(function () {
    $('.uni-popular-cars-item').isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
    });
});
$(window).resize(function () {
    $('.uni-popular-cars-item').isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
    });
});
(function ($) {
    $.fn.menumaker = function (options) {
        var cssmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);
        return this.each(function () {
            cssmenu.find('li ul').parent().addClass('has-sub');
            var multiTg = function () {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    $(this).toggleClass('active');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideToggle();
                    } else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

            var resizeFix = function () {
                if ($(window).width() > 768) {
                    cssmenu.find('ul').show();
                }

                if ($(window).width() <= 768) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);

$(document).ready(function () {
    "use strict";

    $("#cssmenu").menumaker({
        title: "",
        format: "multitoggle"
    });
    $("#cssmenu").prepend("<div id='menu-line'></div>");

    var foundActive = false, activeElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth,
        defaultPosition, defaultWidth;

    $("#cssmenu > ul > li").each(function () {
        if ($(this).hasClass('active')) {
            activeElement = $(this);
            foundActive = true;
        }
    });

    if (foundActive === false) {
        activeElement = $("#cssmenu > ul > li").first();
    }

    defaultWidth = lineWidth = activeElement.width();
    menuLine.css("width", lineWidth);
    menuLine.css("left", linePosition);
    $("#cssmenu > ul > li").on('mouseenter', function () {
            activeElement = $(this);
            lineWidth = activeElement.width();
            linePosition = activeElement.position().left;
            menuLine.css("width", lineWidth);
            menuLine.css("left", linePosition);
        },
        function () {
            menuLine.css("left", defaultPosition);
            menuLine.css("width", defaultWidth);
        });
    //==================load page===============
    setTimeout(function () {
        jQuery('.load-page').hide();
    }, 500);

    //-----------------Sticky memu-----------------
    $(".sticky-menu").sticky({topSpacing: 0});
    $('.ui.selection.dropdown').dropdown();
    $('.ui.menu .ui.dropdown').dropdown({
        on: 'hover'
    });

    $('#search-click').on('click', function (e) {
        if ($(e.target).is('#search-click, i')) {
            $('.close-search').fadeIn();
            $('.search').css('visibility', 'visible');
            $('.search-field').removeClass('none-search');
            $('.search-field').addClass('block-search');
            return false;
        }
    });
    $('.search-frm').on('click', function (e) {
        if ($(e.target).is('.close-search, .close-search i')) {
            $('.close-search').hide();
            $('.search').css('visibility', 'hidden');
            $('.search-field').removeClass('block-search');
            $('.search-field').addClass('none-search');
            return false;
        }
    });

    $('.uni-processbar-thick .progress .progress-bar').css("width",
        function () {
            return $(this).attr("aria-valuenow") + "%";
        }
    );

    $('[data-toggle="tooltip"]').tooltip({trigger: 'manual'}).tooltip('show');

    //-----------------------------ACORDION---------------------------
    $('.accordion-default .accordion .accordion-toggle').on('click', function (e) {
        if ($(e.target).is('h4.accordion-toggle')) {
            $(this).next().slideToggle('600');
            $(".accordion-content").not($(this).next()).slideUp('600');
            $(this).toggleClass('active').siblings().removeClass('active');
        }
    });

    //-------------------------COUNT ABOUT----------------------------
    jQuery('.counter').each(function(){
        statsCounterAnimation(this);
    });

    function statsCounterAnimation(element) {
        var inView = false;

        if (isScrolledIntoView(element)) {
            if (inView) {
                return;
            }
            inView = true;
            jQuery(element).each(function() {
                jQuery(this).animateNumber({ number: jQuery(this).data('value'), easing: 'easeOutExpo'}, 1500);
            });
        }

        jQuery(window).scroll(function() {
            if (isScrolledIntoView(element)) {
                if (inView) {
                    return;
                }
                inView = true;
                jQuery(element).each(function() {
                    jQuery(this).animateNumber({ number: jQuery(this).data('value'), easing: 'easeOutExpo'}, 1500);
                });
            }
        });
    }
    function isScrolledIntoView(elem) {
        var docViewTop = jQuery(window).scrollTop();
        var docViewBottom = docViewTop + jQuery(window).height();

        var elemTop = jQuery(elem).offset().top;
        var elemBottom = elemTop + jQuery(elem).height();

        return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
    }


    //------------------------checkout-----------------------------
    $('.woocommerce-info').on('click', function (e) {
        if ($(e.target).is('.click-here-to-login')) {
            $('.vk-form-woo-login').slideToggle();
            return false;
        }
        if ($(e.target).is('.click-here-entry-code')) {
            $('.vk-check-coupon').slideToggle();
            return false;
        }
    });
    $('.vk-checkout-billing-left').on('click', function (e) {
        if ($(e.target).is('.checkbox-create-account')) {
            $('.checkbox-create-account-form').slideToggle();
        }
    });

    //----------------------FILTER PRICE-----------------------
    $("#slider-range").each(function () {
        $(this).slider({
            range: true,
            min: 0,
            max: 1000,
            values: [75, 500],
            slide: function (event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
            " - $" + $("#slider-range").slider("values", 1));

    });
    //---------------------SLIDE GALLERY IMAGE--------------------
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 500,
        asNavFor: '.slider-for',
        dots: true,
        focusOnSelect: true,
        slide: 'div'
    });

    //------------------------------OWL CAROUSE----------------------
    if (!$.isFunction('owlCarousel')) {
        $('.owl-four-item-dotted').owlCarousel({
            loop: true,
            margin: 30,
            responsiveClass: true,
            nav: true,
            navText: [],
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
        $('.owl-one-nav-dotted').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: true,
            navText: [],
            margin: 30,
            responsive: {
                0: {
                    items: 1
                }
            }
        });
        $('.owl-two-nav').owlCarousel({
            loop: true,
            responsiveClass: true,
            nav: true,
            navText: [],
            margin: 30,
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                }
            }
        });
        $('.uni-feature-cars-slide').owlCarousel({
            center: true,
            loop: true,
            margin: 90,
            nav: true,
            navText: [],
            dotted: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 30
                },
                1200: {
                    items: 2
                }
            }
        });
        $('.owl-three-item-dotted').owlCarousel({
            items: 3,
            loop: true,
            margin: 30,
            nav: false,
            dots: true
        });
        $('.owl-partner').owlCarousel({
            items: 6,
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            autoplay: true
        });
        $('.owl-partner-nav').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            navText: [],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 4
                },
                992: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        });
    }

    //---------------Show Notification----------------------------
    $('.uni-sell-a-car-1-right').on('click', function (e) {
        if ($(e.target).is('.uni-shortcode-tab-2 .nav-tabs li:nth-child(2) a')) {
            $('.uni-show-notification').show();
        }
        if ($(e.target).is('.uni-shortcode-tab-2 .nav-tabs li:nth-child(1) a')) {
            $('.uni-show-notification').hide();
        }
    });

    //--------------------------SLIDER HOME PAGE------------------------------
    var Slider = function () {
        var singleProjectSlider = function () {
            $('.vk-slider-project .slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                fade: true,
                asNavFor: '.slider-nav',
                focusOnSelect: true
            });
            $('.vk-slider-project .slider-nav').slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                focusOnSelect: true,
                arrows: false,
                responsive: [{

                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }

                }]
            });
        };

        var singleProductSlider = function () {
            $('.vk-slider-shop .slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                arrows: false,
                asNavFor: '.slider-nav',
                adaptiveHeight: true
            });
            $('.vk-slider-shop .slider-nav').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                focusOnSelect: true,
                nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
            });
        };

        var imageSlider = function () {
            $('.vk-slick-slider').slick({
                nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                centerPadding: 0,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            arrows: true,
                        }

                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            centerMode: true,
                            centerPadding: '50px'
                        }

                    }]
            });
        };

        var homepageSlider = function () {
            $('.recent-blog-slider').slick({
                nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                slidesToShow: 2,
                dots: true,
                dotsClass: 'vk-arrow-dots',
                responsive: [{

                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        arrows: false
                    }

                }]
            })
                .on('setPosition', function (event, slick) {
                    arrowDotNav();
                });

        };

        var aboutPageSlider = function () {
            $('.customer-slider').slick({
                nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                adaptiveHeight: true,
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        arrows: false
                    }
                }]
            });
        };

        var homeShopSlider = function () {
            $('.vk-list-client-shop > .vk-list').slick({
                slidesToShow: 6,
                nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-angle-right"></i></button>',
                prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-angle-left"></i></button>',
                responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }]
            });
        };

        var arrowDotNav = function () {
            var arrowDots = $('.vk-arrow-dots');
            if (arrowDots.length > 0) {
                var dots = arrowDots.find('>li');
                var numDots = dots.length;
                dots.css('width', 'calc(100% / ' + numDots + ')')
            }
        };

        var homeOnePage = function () {
            var currentWidth = $(window).outerWidth();
            if (currentWidth >= 768) {
                $('.slick-slider-one-page').addClass('_pc');
                if ($('.slick-slider-one-page.slick-slider').length == 1 && $('.slick-slider-one-page._mobile').length == 1) {
                    $('.slick-slider-one-page').slick('destroy');
                    $('.slick-slider-one-page').removeClass('_mobile');
                }
                if ($('.slick-slider-one-page._pc').length == 1 && $('.slick-slider-one-page.slick-slider').length == 0) {

                    $('.slick-slider-one-page').slick({
                        nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                        prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                        slidesToShow: 3,
                        rows: 2,
                        responsive: [
                            {
                                breakpoint: 991,
                                settings: {
                                    slidesToShow: 2
                                }
                            }]
                    });
                }
            }

            if (currentWidth < 768) {

                $('.slick-slider-one-page').addClass('_mobile');

                if ($('.slick-slider-one-page.slick-slider').length == 1 && $('.slick-slider-one-page._pc').length == 1) {
                    $('.slick-slider-one-page').slick('destroy');
                    $('.slick-slider-one-page').removeClass('_pc');
                }
                if ($('.slick-slider-one-page._mobile').length == 1 && $('.slick-slider-one-page.slick-slider').length == 0) {

                    $('.slick-slider-one-page').slick({
                        nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                        prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                        slidesToShow: 1,
                        rows: 1
                    });
                }
            }

            if (currentWidth >= 1068) {
                $('.slick-slider-left-menu').addClass('_pc');
                if ($('.slick-slider-left-menu.slick-slider').length == 1 && $('.slick-slider-left-menu._mobile').length == 1) {
                    $('.slick-slider-left-menu').slick('destroy');
                    $('.slick-slider-left-menu').removeClass('_mobile');
                }
                if ($('.slick-slider-left-menu._pc').length == 1 && $('.slick-slider-left-menu.slick-slider').length == 0) {

                    $('.slick-slider-left-menu').slick({
                        nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-chevron-right"></i></button>',
                        prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-chevron-left"></i></button>',
                        slidesToShow: 3,
                        rows: 2,
                        responsive: [
                            {
                                breakpoint: 1291,
                                settings: {
                                    slidesToShow: 2
                                }
                            }]
                    });
                }
            }
        };

        var homeOnePageExtra = function () {
            $('.vk-slider-testimonial').slick({
                nextArrow: '<button  class="vk-btn vk-arrow next"><i class="ti-angle-right"></i></button>',
                prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="ti-angle-left"></i></button>',
                adaptiveHeight: true
            });

            $('.vk-pricing-table-slider').slick({
                arrows: false,
                adaptiveHeight: true,
                slidesToShow: 4,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        };

        var homeSlider = function () {
            var slider = $('.vk-baner-slider');

            // slick initial
            slider.on('init', function (event, slick) {

                var imageNext = $('.slick-slide.slick-current').next().css('background-image');
                var imagePrev = $('.slick-slide.slick-current').prev().css('background-image');

                $(this).find('.vk-arrow.next .image-preview-thumbnail').css('background-image', imageNext);
                $(this).find('.vk-arrow.prev .image-preview-thumbnail').css('background-image', imagePrev);

                var $firstAnimatingElements = $('.slick-slide').find('[data-animation]');
                doAnimations($firstAnimatingElements);
            });

            slider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
                var $animatingElements = $('.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
                doAnimations($animatingElements);

            });
            slider.slick({
                nextArrow: '<button  class="vk-btn vk-arrow next"><i class="fa fa-angle-right" aria-hidden="true"></i><span class="image-preview-thumbnail"></span></button>',
                prevArrow: '<button  class="vk-btn vk-arrow prev"><i class="fa fa-angle-left" aria-hidden="true"></i><span class="image-preview-thumbnail"></span></button>',
                dotsClass: 'vk-list vk-dots-nav',
                dots: true,
                fade: false,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            arrows: false
                        }
                    }
                ]
            });

            slider.on('afterChange', function (event, slick, currentSlide) {
                var imageNext = $('.slick-slide.slick-current').next().css('background-image');
                var imagePrev = $('.slick-slide.slick-current').prev().css('background-image');
                $(this).find('.vk-arrow.next .image-preview-thumbnail').css('background-image', imageNext);
                $(this).find('.vk-arrow.prev .image-preview-thumbnail').css('background-image', imagePrev);
            });

            function doAnimations(elements) {
                var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                elements.each(function () {
                    var $this = $(this);
                    var $animationDelay = $this.data('delay');
                    var $animationType = 'animated ' + $this.data('animation');
                    $this.css({
                        'animation-delay': $animationDelay,
                        '-webkit-animation-delay': $animationDelay,
                        'display': 'inline-block',
                    });
                    $this.addClass($animationType).one(animationEndEvents, function () {
                        $this.removeClass($animationType);
                    });
                });
            }
        };

        var _initInstances = function () {
            imageSlider();
            homepageSlider();
            singleProjectSlider();
            aboutPageSlider();
            homeShopSlider();
            singleProductSlider();
            homeOnePage();
            homeOnePageExtra();
            homeSlider();
        };

        return {
            init: function () {
                _initInstances();
            },
            responsive: function () {
                homeOnePage();
            }
        };
    }();

    Slider.init();

    //======================short code hover==================
    $('.hover-element').on({
        mouseenter: function () {
            $('.show-hover-shortcodes').fadeIn();
        },
        mouseleave: function () {
            $('.show-hover-shortcodes').hide();
        }
    });
    $('.show-hover-shortcodes').on({
        mouseenter: function () {
            $(this).show();
        },
        mouseleave: function () {
            $(this).fadeOut();
        }
    });
    //-------------------mega menu----------
    $('.home-mega-hover').on({
        mouseenter: function () {
            $('.uni-mega-menu').fadeIn();
        },
        mouseleave: function () {
            $('.uni-mega-menu').hide();
        }
    });
    $('.uni-mega-menu').on({
        mouseenter: function () {
            $(this).show();
        },
        mouseleave: function () {
            $(this).fadeOut();
        }
    });

    if (!$.isFunction('owlCarousel')) {
        $('.uni-mega-menu-1-default').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: false,
            autoplay: true,
            navText: [],
            items: 3
        });
    }
    //-----------------menu mobile---------------------
    $('.mobile-menu-container .menu-mobile-nav').on('click', function (e) {
        $('#cssmenu').slideToggle();
        $('#cssmenu ul ul').hide();
    });
    $('.uni-icons-close').on('click', function (e) {
        $('#cssmenu').hide();
    });

    $('.uni-popular-cars-menu ul li').on('click', function () {
        $('.uni-popular-cars-menu ul li').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $('.uni-popular-cars-item').isotope({
            filter: selector
        });
        return false;
    });

    //-----------------replace image single product----------------
    jQuery('.flexslider .product-slide .img-small img').on('click', function (e) {
        if ($(e.target).is('img')) {
            var value2 = jQuery(this).attr("data-filter2");
            jQuery('.flexslider .product-slide .img-small img').addClass('none');
            jQuery('.filter2').not("." + value2).removeClass('active');
            jQuery('.filter2').filter("." + value2).addClass('active');
        }
    });

    $('.flexslider .product-slide .img-small').on('click', function (e) {
        if ($(e.target).is('img')) {
            $('.img-small').removeClass('active');
            $(this).addClass('active');
        }
    });

    //----------------BACK TOP TOP-----------------------------
    $('footer .copyright-area').append('<div id="toTop"><div class="btn btn-totop"><i class="fa fa-angle-double-up" aria-hidden="true"></i></div></div>');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }

        $(".progress-bar").each(function () {
            var each_bar_width = $(this).attr('aria-valuenow');
            $(this).width(each_bar_width + '%');
        });
    });

    $('#toTop').on('click', function (e) {
        if ($(e.target).is('.btn-totop')) {
            $("html, body").animate({scrollTop: 0}, 600);
            return false;
        }
        if ($(e.target).is('.btn-totop i')) {
            $("html, body").animate({scrollTop: 0}, 600);
            return false;
        }
    });
});