import './global.js'

import * as Helper from './classes/Helpers'

$(document).ready(function($){
    Helper.MobileNav();
    Helper.CustomSelect();
    Helper.OpenClose();
    Helper.Tabs();
    Helper.Slider();
    Helper.Masonry();
    Helper.initInlineSVG();
    Helper.Modal();
});