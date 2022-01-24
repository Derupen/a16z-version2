import './global.js'

import * as Helper from './classes/Helpers'

$(document).ready(function($){
    Helper.MobileNav();
    Helper.CustomSelect();
    Helper.Height();
    Helper.CustomScroll();
    Helper.OpenClose();
    Helper.Tabs();
    Helper.Masonry();
    Helper.initInlineSVG();
    Helper.SwiperSlider();
    Helper.MobileSwiper();
    Helper.Search();
    Helper.SocialNetworks();
    Helper.StickySidebar();
    Helper.moveContent();
    Helper.Anchor();
    Helper.goTop();
});
