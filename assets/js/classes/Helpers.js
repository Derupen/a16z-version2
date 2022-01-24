import '../global.js';
import '../plugins/masonry'
import '../plugins/custom-scroll'
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
import 'sticky-sidebar-v2/dist/jquery.sticky-sidebar'


export const MobileNav = () => {
    var navopener = $('.nav-opener'),
    navwrap   = $('.nav-wrap'),
    links     = navwrap.find('a'),
    navactive = 'nav-active';

    navopener.click(function() {
        $('body').toggleClass(navactive);
    });

    $('#nav ul li').each(function() {
        var item = $(this);
        var drop = item.find('ul');
        var link = item.find('a').eq(0);
        if(drop.length) {
            item.addClass('hasdrop');
            if(link.length) link.addClass('hasdrop-a').attr({'data-more': '', 'data-outside': ''});
        }
    });

    links.click(function() {
        $(this).hasClass('hasdrop-a') ? false : $('body').removeClass(navactive);
    });

    $('html').on('click touchstart pointerdown MSPointerDown', function(e) {
        var target = $(e.target);
        if(!target.closest(navopener).length && !target.closest(navwrap).length) {
            $('body').removeClass(navactive);
        }
    });
}

export const Search = () => {
    var searchopener = $('.search-opener'),
    searchblock   = $('.search-block'),
    searchactive = 'search-active';

    searchopener.click(function() {
        $('body').toggleClass(searchactive);
    });

    $('html').on('click touchstart pointerdown MSPointerDown', function(e) {
        var target = $(e.target);
        if(!target.closest(searchopener).length && !target.closest(searchblock).length) {
            $('body').removeClass(searchactive);
        }
    });
}

export const OpenClose = () => {
    $('[data-more]').next().hide();
    $('[data-more].active').next().show();

    $('[data-more]').click(function(e) {
        e.preventDefault();
        $(this).hasClass('active') ? $(this).removeClass('active').next().slideUp(200) : $(this).addClass('active').next().slideToggle(200);

        if($(this).closest('[data-accordion]').length) {
            $(this).parent().siblings().find('[data-more]').removeClass('active');
            $(this).parent().siblings().find('[data-more]').next().slideUp(200);
        }
    })

    $('[data-outside]').next().find('a:not(.hasdrop-a):not([data-more])').click(function() {
        $('[data-outside]').removeClass('active').next('').slideUp(200);
    });
    $('[data-outside]').click(function(e) {
        $('[data-outside]').not(this).removeClass('active').next().slideUp(200);
    });

    $('html').on('click touchstart pointerdown MSPointerDown', function(e) {
        var target = $(e.target);

        if(!(target.closest('[data-outside]').length) && !(target.closest('[data-outside] + *').length)) {
            setTimeout (function() {
                $('[data-outside]').removeClass('active').next().slideUp(200);
            }, 200)
        }

        if(!(target.closest('[data-outside-1]').length) && !(target.closest('[data-outside-1] + *').length)) {
            setTimeout (function() {
                $('[data-outside-1]').removeClass('active').next().slideUp(200);
            }, 200)
        }
    });
}

export const CustomSelect = () => {
    jQuery('[data-select]').each(function(){
        var item = jQuery(this),
        selectDrop = item.next(),
        linkItems = selectDrop.find('a');

        item.attr({'data-outside': '', 'data-more': ''})

        linkItems.on('click', function(e) {
            e.preventDefault();
            item.text(jQuery(this).text());
            selectDrop.slideUp(200);
            item.removeClass('active').addClass('selected');
            
            selectDrop.find('li').removeClass('active');
            jQuery(this).parent().addClass('active');
        });

        if(selectDrop.children().hasClass('active')) {
            item
            .text(jQuery(this).next().find('.active a').text())
            .addClass('selected');
        }
    });
}

export const Masonry = () => {
    jQuery(window).on('load masonry/refresh', function() {
        jQuery('.js-masonry').masonry({
            itemSelector: '.grid-item',
            resize: true,
            isOriginLeft: true,
        });
    });
}

export const initInlineSVG = () => {
    $('.inline-svg').each(function () {
        var img = $(this);
        if (img.length > 0) {
            $.get(img[0].src, function (svgDoc) {
                var importedSVGRootElement = document.importNode(svgDoc.documentElement, true);
                if (img.hasClass('no-fill')) {
                    img.parent().html(importedSVGRootElement);
                } else {
                    img.parent().html(importedSVGRootElement).find('svg').addClass('fill-current');
                }
            });
        }
    });
}

export const Tabs = () => {
    $('[data-tab]').click(function(e){
        e.preventDefault();
        var tab_id = $(this).attr('data-tab');

        $(this).parent().siblings().find('[data-tab]').removeClass('active');
        $("#"+tab_id).siblings().removeClass('active');

        $(this).addClass('active');
        $("#"+tab_id).addClass('active');
    })
    $('#'+$('[data-tab].active').data('tab')).addClass('active');
}

export const SwiperSlider = () => {
    var swiper = new Swiper('.future-carousel', {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
    });

    var swiper = new Swiper('.podcast-slider', {
        slidesPerView: "1",
        loop:true,
        centeredSlides: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: true,
        },
        speed: 6000,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 77,
            },
        },
    });

    var swiper = new Swiper('.instacart-carousel', {
        effect: "fade",

        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
    });

    var swiper = new Swiper('.image-slider', {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
    });
}


export const MobileSwiper = () => {
    const breakpoint = window.matchMedia('(min-width: 768px)');

    let mySwiper;

    const breakpointChecker = function() {
        if ( breakpoint.matches === true ) {
            if ( mySwiper !== undefined ) mySwiper.destroy( true, true );
            return;
        } else if ( breakpoint.matches === false ) {
            return enableSwiper();
        }
    }

    const enableSwiper = function() {
        var mySwiper = new Swiper('.book-slider', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 24,
            centeredSlides: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
          },
        });
    }

    breakpoint.addListener(breakpointChecker);
    breakpointChecker();
}

export const CustomScroll = () => {
    jcf.replaceAll();
}

export const Height = () => {
    var windowHeight = $(window).height(),
        HellobarHeight = $('.hello-bar').outerHeight() || 0,
        HeaderHeight = $('#header').outerHeight(),
        SearchHeight = $('.search-block .header').outerHeight() || 0;
    var Height = function() {
        $('.search-result').each(function() {
            var block = $(this),
            itemHeight  = windowHeight - (HellobarHeight + HeaderHeight + SearchHeight + 120) ;

            block.css('height', itemHeight);
        });

        $('.nav-wrap').each(function() {
            var block = $(this),
            itemHeight  = windowHeight - (HellobarHeight + HeaderHeight + 18) ;

            block.css('height', itemHeight);
        });
    }

    Height();
    $(window).on('resize load orientationChange', Height);
}

export const SocialNetworks = () => {
    document.querySelectorAll('.js-dropdown').forEach(
        function (
            dropdown
        ) {
            dropdown.addEventListener('mouseenter', (e) => {
                if (!dropdown.classList.contains('hover')) {
                    dropdown.classList.add('hover')
                }
            })
            dropdown.addEventListener('mouseleave', (e) => {
                if (dropdown.classList.contains('hover')) {
                    dropdown.classList.remove('hover')
                }
            })
        }
    )
}

export const StickySidebar = () => {
    // var header = $('#header'),
    var holder = $('.sticky-nav'),
        opener = $('.toc-opener'),
        link = holder.find('ul a');

    if (holder.length > 0 && $(window).width() > 1151) {
        holder.stickySidebar({
            topSpacing: function () {
                return ($('#header').outerHeight() + 18);
            },
            bottomSpacing: 60,
        });
    }

    opener.click(function (e) {
        e.preventDefault();
        $('body').toggleClass('sticky-drop-active');
    });

    link.click(function (e) {
        $('body').removeClass('sticky-drop-active');
        $(this).parent().siblings().removeClass('active');
        $(this).parent().hasClass('active') ? $(this).parent().removeClass('active') : $(this).parent().toggleClass('active');
        var href = $(this).attr('href').split('#');
        $('html, body').stop().animate({ scrollTop: $('#' + href[1]).offset().top - 110 + 'px' }, 300);
        opener.find('.currect-item').text($(this).text());
    });

    /*const toc = $('#toc-participants');
    if(toc.length > 0) {
        var resizeToc = function() {
            const t1 = (window.innerHeight - 130);
            const t2 = toc.find('.top').height();

            if(t1 <= t2) {
                toc.addClass('hide');
            } else {
                toc.removeClass('hide');
            }
        }

        resizeToc();
        $(window).on('load scroll resize orientationchange', resizeToc);
    }*/
}

export const moveContent = () => {
	var win = jQuery(window);
	var wrapper = jQuery('#wrapper');
	var videoHold = jQuery('.aside-article .text');

	var desktopContent = jQuery('.desktop-content');
	var mobileContent = jQuery('.mobile-content');

	function init() {
		if (wrapper.css('z-index') == 99) {
			mobileContent.append(videoHold);
		} else {
			desktopContent.append(videoHold);
		}
	}

	init()

	win.resize(function() {
		init()
	})
}

export const Anchor = () => {
    $('a.go-top[href*="#"]:not([href="#"])').click(function () {
        var headerHeight = $('#header').outerHeight();
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 1000);
                return false;
            }
        }
    });
}

export const goTop = () => {
	var win = jQuery(window);
	
	jQuery('.go-top').each(function(){
		var backBtn = jQuery(this);
		
		win.on('load scroll', function(){
			var offset = jQuery('#header').outerHeight();
			
			if (win.scrollTop() > offset) {
				backBtn.addClass('visible');
			}else{
				backBtn.removeClass('visible');
			}
		});
	});
}