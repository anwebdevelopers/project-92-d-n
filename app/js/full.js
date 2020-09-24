'use strict';

document.addEventListener( 'DOMContentLoaded', function( event ) {



    /*******************************************************/
    //MENU
    /*******************************************************/
    ( function() {

        let windowWidth = window.innerWidth;

        const elemNav = document.querySelector('.nav'),
            buttonNav = document.querySelector('.header__nav-button');

        buttonNav.addEventListener( 'click', function( e ) {
            e.stopPropagation();
            if ( buttonNav.classList.contains( 'active' ) ) {
                buttonNav.classList.remove('active');
                elemNav.classList.remove('active');
            } else {
                buttonNav.classList.add( 'active' );
                elemNav.classList.add('active');
            }
        } );

        window.addEventListener( 'resize', function() {

            const newWindowWidth = window.innerWidth;

            if ( windowWidth !== newWindowWidth ) {

                windowWidth = newWindowWidth;

                buttonNav.classList.remove('active');
                // elemNav.style.display = '';
                elemNav.classList.remove('active');
            }
        } );

        const navMenuElems = document.querySelectorAll( '.nav__menu a' );

        for ( let i = 0; i < navMenuElems.length; i++ ) {
            navMenuElems[ i ].addEventListener( 'click', function( event ) {
                buttonNav.classList.remove('active');
                elemNav.classList.remove('active');
            } );
        }

    } () );



    /*******************************************************/
    //SCROLL
    /*******************************************************/
    ( function() {

        const scrollTrigElems = document.querySelectorAll( '.scroll' );

        for ( let i = 0; i < scrollTrigElems.length; i++ ) {

            const scrollSectElem = document.querySelector( scrollTrigElems[ i ].getAttribute( 'href') );

            scrollSectElem && scrollTrigElems[ i ].addEventListener( 'click', function( event ) {

                window.scrollBy( {
                    top: scrollSectElem.scrollHeight,
                    behavior: 'smooth'
                } );

            } );
        }

    } () );



    //*********************************************************//
    //Lazy load for images
    //*********************************************************//
    ( function() {

        const lazyLoadImg = new IntersectionObserver(

            function( entries ) {

                for ( let i = 0; i < entries.length; i++  ) {

                    const entry = entries[ i ];
                    const target = entry.target;

                    if ( entry.isIntersecting && target.hasAttribute( 'data-lazy-load' ) ) {

                        if ( target.nodeName === 'IMG' ) {
                            target.setAttribute( 'src', target.getAttribute( 'data-lazy-load' ) );
                        } else if ( target.nodeName === 'SOURCE' ) {
                            target.setAttribute( 'srcset', target.getAttribute( 'data-lazy-load' ) );
                        } else {
                            target.style.backgroundImage = 'url(' + target.getAttribute( 'data-lazy-load' ) + ')';
                        }

                        target.removeAttribute( 'data-lazy-load' )

                        lazyLoadImg.unobserve( target );

                        target.style.opacity = 1;
                    }
                }
            },
            {
                root: null,
                rootMargin: ( window.innerHeight / 2 ) + 'px ' + ( window.innerWidth / 2 ) + 'px',
                threshold: [ 0 ],
            }
        );

        // Start observing an element
        const lazyLoadImgElems = document.querySelectorAll( '[ data-lazy-load ]' );

        for ( let i = 0; i < lazyLoadImgElems.length; i++  ) {

            lazyLoadImg.observe( lazyLoadImgElems[ i ] );

            lazyLoadImgElems[ i ].style.opacity = 0;
            lazyLoadImgElems[ i ].style.transition = '1s';
        }

    } () );


    //Выключение при клике по странице
    document.addEventListener( 'click', function( event ) {
        if ( ! event.target.closest( '.selector' ) ) {

        }
    } );

    //Выключение скрытого меню по ресайзу
    $(window).resize(function() {

        if (w > 992 && $(".header__nav").is(':hidden')) {
            $('.header__nav').removeAttr('style');
        }
    });

    /*******************************************************/
    //ABOUT SLIDER
    /*******************************************************/

    (function() {
        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'complete') {
                $( '.about__box' ).each( function () {

                    const $about__box = $( this );



                    /*$about__box.before( '<div class="about__dots"></div>' );
                    $about__box.after( '<div class="about__nav"></div>' );

                    $about__box.on( 'init', function( event, slick ) {
                        console.log( /!*event,*!/ slick );

                        slick.$slides.each( function ( i ) {

                            const itemIndex = $( this ).index();

                            slick.$dots.find( 'button' ).eq( itemIndex - 1 ).text( $( this ).find( '.about__item-title' ).text() ).attr( 'data-count', itemIndex < 10 ? ( '0' + itemIndex ) : itemIndex );

                            $( this ).attr( 'data-count', itemIndex < 10 ? ( '0' + itemIndex ) : itemIndex );
                        } )

                    } ).slick( {
                        dots: true,
                        speed: 500,
                        rows: 0,
                        infinite: false,
                        // adaptiveHeight: true,
                        nextArrow: '<button type="button" class="about__nav-next"></button>',
                        prevArrow: '<button type="button" class="about__nav-prev"></button>',
                        dotsClass: '',
                        appendDots: $about__box.prev( '.about__dots' ),
                        appendArrows: $about__box.next( '.about__nav' ),
                    } );*/

                    $about__box.find( '.about__item' )
                        .addClass( 'swiper-slide' )
                        .wrapAll( '<div class="about__container swiper-container"><div class="about__wrapper swiper-wrapper"></div></div>' ).closest( '.about__container' )
                        .after( '<div class="about__nav"><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div>' ).after( '<div class="about__dots"></div>' );

                    const aboutSwiper = new Swiper( $about__box.find( '.about__container' ), {

                        speed: 800,
                        spaceBetween: 0,
                        autoHeight: true,
                        // loop: true,
                        // containerModifierClass: 'about__box',
                        // wrapperClass: 'about__wrapper',
                        // slideClass: 'about__item',
                        // autoplay: {
                        //     delay: 3000,
                        // },
                        navigation: {
                            nextEl: '.about__nav .swiper-button-next',
                            prevEl: '.about__nav .swiper-button-prev',
                        },
                        pagination: {
                            el: $about__box.find( '.about__dots'),
                            clickable: true,
                            type: 'bullets',
                        },
                        on: {
                            init: function () {

                                const thisSwiper = this;

                                $( thisSwiper.slides ).each( function ( i ) {

                                    const itemIndex = + ( $( this ).attr( 'data-swiper-slide-index' ) ? $( this ).attr( 'data-swiper-slide-index' ) : i ) + 1;

                                    $( this ).attr( 'data-count', itemIndex < 10 ? ( '0' + itemIndex ) : itemIndex );
                                } );
                            },
                            paginationRender: function () {

                                const thisSwiper = this;

                                $( thisSwiper.pagination.bullets ).each( function ( i ) {

                                    const itemIndex = i;

                                    $( this ).text( $( thisSwiper.slides ).eq( itemIndex ).find( '.about__item-title' ).text() ).attr( 'data-count', itemIndex < 10 ? ( '0' + ( itemIndex + 1 ) ) : itemIndex + 1 );
                                } );
                            }
                        },
                    } );

                    window.addEventListener( 'resize', function () {
                        aboutSwiper.updateSize();
                    } );

                    // aboutSwiper.destroy(true, true);

                } );
            }
        });

        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'complete') {
                $( '.hero__box' ).each( function () {
                    const $hero__box = $( this );
                    $hero__box.wrap('<div class="hero__slider"></div>')
                        .before('<div class="hero__head"><div class="hero__head-container swiper-container"><div class="hero__head-wrapper swiper-wrapper"></div></div></div>')

                        // .prev('.activity__services-head')
                        // .append( '<div class="activity__services-thumbs"><div class="activity__services-thumbs-container swiper-container"><div class="activity__services-thumbs-wrapper swiper-wrapper"></div></div></div>' )
                        // .end()
                        .find( '.hero__item' )
                        .addClass( 'swiper-slide' )
                        .wrapAll( '<div class="hero__container swiper-container"><div class="hero__wrapper swiper-wrapper"></div></div>' )
                        .each( function () {
                            $hero__box.closest('.hero__slider').find('.hero__head-wrapper').append( $( this ).find('.hero__item-image').addClass( 'swiper-slide' ) )


                            //$( this ).find('.hero__item-image').appendTo($hero__box.closest('.activity__slider').find('.hero__head'))
                        } )
                        .end().append( '<div class="hero__dots"></div>' );

                    const heroHeadSwiper = new Swiper( $hero__box.closest('.hero__slider').find( '.hero__head-container' ), {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        loop: true,
                        //loopedSlides: 10,
                        //freeMode: true,
                        // direction: 'vertical',

                        watchSlidesVisibility: true,
                        watchSlidesProgress: true,
                        speed: 2500,
                        // autoplay: {
                        //     delay: 3000,
                        // },
                    });

                    const heroSwiper = new Swiper( $hero__box.find( '.hero__container' ), {
                        slidesPerView: 1,
                        speed: 1500,
                        spaceBetween: 0,
                        //autoHeight: true,
                        loop: true,
                        //loopedSlides: 10,
                        watchSlidesVisibility: true,
                        watchSlidesProgress: true,

                        autoplay: {
                            delay: 5000,
                        },
                        // thumbs: {
                        //     swiper: heroHeadSwiper
                        // },
                        pagination: {
                            el: $hero__box.find('.hero__dots'),
                            clickable: true,
                            type: 'bullets',
                        },
                        on: {
                            paginationRender: function () {

                                const thisSwiper = this;

                                $(thisSwiper.pagination.bullets).each(function(i) {

                                    //const itemandex = i;

                                    $(this).text(/*$(thisSwiper.slides).eq(itemandex).attr('data-services-title')*/ i + 1 );

                                });
                            }
                        },
                    } );

                    // heroHeadSwiper.on('click', function () {
                    //     console.log(heroHeadSwiper.clickedIndex, heroHeadSwiper.clickedSlide);
                    //     heroHeadSwiper.slideTo(heroHeadSwiper.clickedIndex, 800, false);
                    // });

                    heroSwiper.on('slideChange', function () {
                        heroHeadSwiper.slideTo(heroSwiper.activeIndex, 2000, false);
                    });

                    window.addEventListener( 'resize', function () {
                        heroHeadSwiper.updateSize();
                        heroSwiper.updateSize();
                    } );

                } );
            }
        });
    }());



    /*******************************************************/
    //ACCORDION
    /*******************************************************/
    $( '.accordion' ).each( function() {
        const $this = $( this );
        if ( $this.children( '.accordion__box' ).length ) {
            $this.prepend( '<button type="button" class="accordion__button"></button>' );
        }
        ( $this.hasClass( 'current' ) || $this.find( '.current' ).length ) ? $this.addClass( 'active' ) : $this.children( '.accordion__box' ).hide();
    } ).on( 'click', '.accordion__button', function( e ) {
        e.stopPropagation();
        const $this = $( this );
        $this.closest( '.accordion' ).hasClass( 'active' ) ? $this.closest( '.accordion' ).removeClass( 'active' ).children( '.accordion__box' ).slideUp( 200 ) : $this.closest( '.accordion' ).addClass( 'active' ).children( '.accordion__box' ).slideDown( 200 ).end().siblings().removeClass( 'active' ).children( '.accordion__box' ).slideUp( 200 );
    } );


    //---------------------------------
    //Адаптивный слайдер
    //---------------------------------
    $( '.slider' ).addClass( 'owl-carousel' ).owlCarousel( {
        loop: true,
        items: 1,
        nav: true,
        navText: '',
        autoplayTimeout: 5000,
        autoplay: true,
        smartSpeed: 1200,
        autoHeight: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            481: {
                items: 3
            },
            769: {
                items: 4
            },
            993: {
                items: 5
            }
        },
        onInitialize: function( event ) {
            $( event.target ).find( '.about__item' ).each( function() {
                $( this ).attr( 'data-item-counter', $( this ).index() + 1 )
            } );
        },
        onInitialized: function( event ) {
            $( event.target ).append( '<div class="about__counter"><div class="about__counter-current">' + $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) + '</div><div class="about__counter-amount"> / ' + ( $( event.target ).find( '.owl-item:not( .cloned )' ).length ) + '</div></div>' );
        },
        onTranslated: function( event ) {
            $( event.target ).find( '.about__counter-current' ).text( $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) )
        }
    } );

    //---------------------------------------------------------------
    //Отключение автоплея по скроллу
    //---------------------------------------------------------------
    $(window).scroll(function() {
        var st = $(this).scrollTop();
        //Отключение автоплея в шапке
        if (st > $('.header').offset().top - $(window).height() && st < ($('.header').offset().top) + $('.header').height()) {
            $(".header__slider").trigger('play.owl.autoplay', [100, 5000]);
        } else {
            $(".header__slider").trigger('stop.owl.autoplay', [100]);
        }
    });

    //---------------------------------------------------------------
    //Подсчет итемов в слайдере отзывов и вывод на страницу
    //---------------------------------------------------------------
    $('.reviews__slider-item').each(function() {
        $(this).find('.reviews__slider-text').after('<div class="reviews__slider-numeral"><span class="reviews__slider-numeral-number">' + ($(this).index() + 1) + '</span><span class="reviews__slider-numeral-quantity">' + $('.reviews__slider-item').length + '</span></div>');
    });

    /*******************************************************/
    //TABS
    /*******************************************************/

    ( function( $ ) {

        $('.tabs').each( function () {
            const $tabs = $( this );
            $tabs.prepend( '<div class="tabs__buttons"></div>' )
                .find( '.tabs__section' ).wrapAll( '<div class="tabs__box"></div>' )
                .each( function () {
                    $tabs.find('.tabs__buttons').append( '<button type="button">' + $( this ).attr('data-tabs-title') + '</button>' );

                } );

            $tabs.find( '> .tabs__buttons button' ).first().attr( 'active', '' );
            $tabs.find( '> .tabs__box > .tabs__section' ).not( ':first-child' ).hide();
            $tabs.find( '> .tabs__buttons' ).on( 'click', 'button:not( [ active ] )', function() {
                $( this ).attr( 'active', '' ).siblings().removeAttr( 'active' ).closest( '.tabs' ).find( '> .tabs__box > .tabs__section' ).slideUp( 300 ).eq( $( this ).index() ).slideDown( 300 );
            } );
        } );

    } ( jQuery) );

    //-------------------------------
    //Gallery
    //-------------------------------
    $('.details__galery-box').on('click', '.details__galery-item:not(.active)', function() {
        var imgPath = $(this).children('img').attr('src');
        var oldImage = $('.details__galery-bigphoto img');
        var newImage = $('<img src="' + imgPath + '">');
        newImage.hide();
        $('.details__galery-bigphoto').append(newImage);
        newImage.fadeIn(600);
        oldImage.fadeOut(600, function() {
            $(this).remove();
        });
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.details__galery-item:first').click();

    //------------------------------------
    //Выравнивание блоков по высоте
    //------------------------------------

    $(".services__item h4").equalHeights();
    $(".news__text h4").equalHeights();
    $(".news__text p").equalHeights();
    $(".links__item span").equalHeights();

    //------------------------------------
    //popup
    //------------------------------------

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });
    $('.doc_item').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });
    //---------------------------------------------
    //Видеопопап
    //---------------------------------------------
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });



    //------------------------------------------------
    // Плавный скролл.mPageScroll2id()
    //------------------------------------------------

    //$("a[href*='#']").mPageScroll2id();
    $("a[href='#registration']").mPageScroll2id();
    $("a[href='#speakers']").mPageScroll2id();
    $("a[href='#about']").mPageScroll2id();


    //------------------------------------------------
    // Плавный скролл
    //------------------------------------------------

    $('.scroll').click(function(e) {
        e.preventDefault();
        var thisSect = $($(this).attr('href')).offset().top;
        $('html, body').animate({scrollTop: thisSect }, ((Math.abs(thisSect - $(window).scrollTop()) * 0.1) + 600), 'swing');
    });

    //-------------------------------------------------------------
    //Parallax
    //-------------------------------------------------------------

    $(window).scroll(function() {
        var st = $(this).scrollTop();

        //Один фон
        if (st > $('.registration').offset().top - $(window).height() && st < ($('.registration').offset().top) + $('.registration').height()) {
            $('.registration').css({
                'background-position': 'center ' + (st / 20) + '%'
            });
        }

        //Множественный фон
        if (st > $('.result').offset().top - $(window).height() && st < ($('.result').offset().top) + $('.result').height()) {
            $('.result').css({
                'background': 'url(img/parallax1.png) 20% ' + (180 - (st / 28)) + '% / 44px 45px no-repeat, url(img/parallax2.png) 10% ' + (-100 + (st / 20)) + '% / 61px 61px no-repeat, url(img/parallax1.png) 36% ' + (-190 + (st / 13)) + '% / 80px 80px no-repeat, url(img/parallax2.png) 66% ' + (-100 + (st / 26)) + '% / 74px 74px no-repeat, url(img/parallax2.png) 52% ' + (160 - (st / 28)) + '% / 35px 35px no-repeat, url(img/parallax1.png) 80% ' + (-260 + (st / 10)) + '% / 26px 26px no-repeat, url(img/bg-result.png) center 0 / 840px 650px no-repeat'
            });
        }
    });

    //--------------------------------------------
    //Прокрутка чисел
    //--------------------------------------------

    function numAnimate(num, sim) {
        $(num).each(function() {
            var $num = $(this).html().replace(/[^-0-9]/gim, '');
            $(this).animate({
                num: $num
            }, {
                duration: 2000,
                step: function(num) {
                    $(this).html((num).toFixed(0) + sim);
                }
            });
        });
    }

    //-----------------------------------------------
    //SVG Fallback
    //-----------------------------------------------
    if (!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function() {
            return $(this).attr("src").replace(".svg", ".png");
        });
    };

    /*  -------------
    //Валидация полей формы на странице заказа
    ------------- */

    var validator = $("#contactForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            mesage: {
                required: true
            },
        },
        messages: {
            name: {
                required: 'Поле "Имя" обязательно для заполнения.',
                minlength: 'Имя не может быть меньше двух символов.'
            },
            email: {
                required: 'Поле "E-mail" обязательно для заполнения.',
                email: 'Введите корректный адрес электронной почты.'
            },
            message: {
                required: 'Поле "Сообщение" обязательно для заполнения.'
            },
        }
    });

    /*  -------------
         Contact Form
        ------------- */

    //E-mail Ajax Send
    //Documentation & Example: https://github.com/agragregra/uniMail

    $("#contactForm").submit(function() { //Change
        var th = $(this);
        if (validator.form() == true) {
            $.ajax({
                type: "POST",
                url: "mail.php", //Change
                data: th.serialize()
            }).done(function() {
                $(".success").fadeIn(200);
                setTimeout(function() {
                    // Done Functions
                    th.trigger("reset");
                    $(".success").fadeOut(200);

                }, 3000);
            });
        }
        return false;
    });


    //--------------------------------------------------------
    //E-mail Ajax Send
    //--------------------------------------------------------
    //Documentation & Example: https://github.com/agragregra/uniMail
    $("#callback").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            $(".success").addClass("visible");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
                $(".success").removeClass("visible");
                $.magnificPopup.close();
            }, 3000);
        });
        return false;
    });

    //------------------------------------------------------
    //Chrome Smooth Scroll
    //------------------------------------------------------
    try {
        $.browserSelector();
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $("img, a").on("dragstart", function(event) {
        event.preventDefault();
    });

    //------------------------------------------------------------
    //fullscreen header
    //------------------------------------------------------------

    var $header = $('.header');

    function fullscreen() {
        if($('html').hasClass('ie')) {
            $header.removeAttr('style');
            var windowHeight = $(window).height(),
                windowWidth = $(window).width(),
                headerHeight = $header.height();
            if (windowHeight > $header.height() && windowWidth > 640) {
                $header.css({
                    'height' : windowHeight + 'px'
                });
            }
        }
    }

    fullscreen();

    $(window).resize(function() {
        fullscreen();
    });


    //-------------------------------
    // Google Map ( for contact page )
    //-------------------------------

    $('#google-map').gMap({
        latitude: 59.9342802,
        longitude: 30.3350986,
        maptype: 'TERRAIN',
        scrollwheel: false,
        zoom: 12,
        markers: [{
            latitude: 59.9342802,
            longitude: 30.3350986,
            html: "Я живу в Санкт-Петербурге",
            icon: {
                image: "img/icon/map_marker.png",
                iconsize: [46, 46],
                iconanchor: [12, 46]
            }
        }],
        controls: {
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        }
    });


    //*********************************************************//
    //YANDEX MAP
    //*********************************************************//
    ( function() {

        const mapElem = document.querySelector( '#map' );

        const lazyLoadMap = new IntersectionObserver(

            function( entries ) {

                for ( let i = 0; i < entries.length; i++  ) {

                    const entry = entries[ i ];
                    const target = entry.target;

                    if ( entry.isIntersecting ) {

                        const script = document.createElement( 'script' );

                        script.src = '//api-maps.yandex.ru/2.1/?lang=ru_RU';

                        document.getElementsByTagName( 'head' )[ 0 ].appendChild( script );

                        script.onload = function() {

                            ymaps.ready( function() {

                            const myMap = new ymaps.Map( 'map', {
                                center: [ 55.769833, 37.426492 ],
                                zoom: 16,
                                controls: [],
                                behaviors: [ 'drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch' ]
                            }, {
                                searchControlProvider: 'yandex#search'
                            });

                            //Элементы управления
                            myMap.controls.add( 'zoomControl', {
                                size: 'small',
                                position: {
                                    top: 'auto',
                                    right: 10,
                                    bottom: 50
                                }
                            } );

                            myMap.geoObjects.add( new ymaps.Placemark(
                                [ 55.769833, 37.426492 ],
                                {
                                    hintContent: 'Адрес: г. Москва, ул. Крылатская, д.15',
                                    balloonContent: 'Адрес: г. Москва, ул. Крылатская, д.15',
                                },
                                {
                                    iconLayout: 'default#image',
                                    iconImageHref: 'img/icon-mark.svg',
                                    iconImageSize: [ 53, 62 ],
                                    iconImageOffset: [- 26, -62 ],
                                }
                            ) );

                            //Вкл/Выкл драг карты при адаптиве
                            const manageDrag = function() {
                                window.innerWidth <= 992 ? myMap.behaviors.disable( 'drag' ) : myMap.behaviors.enable( 'drag' )
                            };
                            window.onload = manageDrag
                            window.onresize = manageDrag

                            //перерисуем карту по ресайзу
                            typeof ResizeObserver === 'object' && new ResizeObserver( function( entries ) {
                                myMap.container.fitToViewport()
                            } ).observe( mapElem );

                            //перерисуем карту после инициализации
                            myMap.container.fitToViewport();

                        } );

                        }

                        lazyLoadMap.unobserve( target );
                    }
                }
            },
            {
                root: null,
                rootMargin: ( window.innerHeight / 2 ) + 'px ' + ( window.innerWidth / 2 ) + 'px',
                threshold: [ 0 ],
            }
        );

        // Start observing an element
        lazyLoadMap.observe( mapElem );

    } () );


    //--------------------------------------------------------------------------
    //Определение местоположения пользователя
    //--------------------------------------------------------------------------
    window.onload = function() {
        jQuery("#user-city").text(ymaps.geolocation.city);
        jQuery("#user-region").text(ymaps.geolocation.region);
        jQuery("#user-country").text(ymaps.geolocation.country);
    }

	//-------------------------------------------------------------------------
	//Редирект пользователя на другую страницу
	//--------------------------------------------------------------------------
	setTimeout(function() {
	    window.location.replace("http://anwebdevelopers.ru/");
		window.location.href = "http://anwebdevelopers.ru/";
	}, 3000);


    //-------------------------------------------------------------------------
	//Эффект круга в кнопке
	//--------------------------------------------------------------------------
    $('.b-btn:not(.m-btn_load_more)')
       .on('mouseenter', function(e) {
           var parentOffset = $(this).offset(),
               relX = e.pageX - parentOffset.left,
               relY = e.pageY - parentOffset.top;
           $(this).find('span').css({top:relY, left:relX})
       })
       .on('mouseout', function(e) {
           var parentOffset = $(this).offset(),
               relX = e.pageX - parentOffset.left,
               relY = e.pageY - parentOffset.top;
           $(this).find('span').css({top:relY, left:relX})
       });


       //Срабатывание по свайпу
       (function() {
           var initialPoint;
           var finalPoint;
           var nav = document.querySelector('nav');
           nav.addEventListener('touchstart', function(event) {
               event.preventDefault();
               event.stopPropagation();
               initialPoint = event.changedTouches[0];
           }, false);
           nav.addEventListener('touchend', function(event) {
               event.preventDefault();
               event.stopPropagation();
               finalPoint = event.changedTouches[0];
               var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
               var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
               if (xAbs > 20 || yAbs > 20) {
                   if (xAbs > yAbs) {
                       if (finalPoint.pageX < initialPoint.pageX) {
                           /*СВАЙП ВЛЕВО*/

                           nav.classList.remove('show');
                       } else {
                           /*СВАЙП ВПРАВО*/
                           nav.classList.add('show');
                       }
                   } else {
                       if (finalPoint.pageY < initialPoint.pageY) {
                           /*СВАЙП ВВЕРХ*/
                       } else {
                           /*СВАЙП ВНИЗ*/
                       }
                   }
               }
           }, false);
       }());
});
