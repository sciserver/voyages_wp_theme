/*!
 *  Liquid Slider v2.0.8
 *  http://liquidslider.com
 *  GPL license
 */
;if(typeof Object.create!=="function"){Object.create=function(b){function a(){}a.prototype=b;return new a()}}(function(d,c,a,e){var b={makeResponsive:function(){var f=this;d(f.sliderId+"-wrapper").addClass("ls-responsive").css({"max-width":d(f.sliderId+" .panel:first-child").width(),width:"100%"});d(f.sliderId+" .panel-container").css("width",100*f.panelCountTotal+f.pSign);d(f.sliderId+" .panel").css("width",100/f.panelCountTotal+f.pSign);if(f.options.hideArrowsWhenMobile){f.leftWrapperPadding=d(f.sliderId+"-wrapper").css("padding-left");f.rightWrapperPadding=(f.$sliderWrap).css("padding-right")}f.responsiveEvents();d(c).bind("resize",function(){f.responsiveEvents();clearTimeout(f.resizingTimeout);f.resizingTimeout=setTimeout(function(){var g=(f.options.autoHeight)?f.getHeight():f.getHeighestPanel(f.nextPanel);f.adjustHeight(false,g)},500)})},responsiveEvents:function(){var g=this,f=(g.options.hideArrowsThreshold||g.options.mobileUIThreshold||(g.totalNavWidth+10));if((g.$sliderId).outerWidth()<f){if(g.options.mobileNavigation){(g.navigation).css("display","none");(g.dropdown).css("display","block");(g.dropdownSelect).css("display","block");d(g.sliderId+"-nav-select").val(g.options.mobileNavDefaultText)}if(g.options.dynamicArrows){if(g.options.hideArrowsWhenMobile){(g.leftArrow).remove().length=0;(g.rightArrow).remove().length=0}else{if(!g.options.dynamicArrowsGraphical){(g.leftArrow).css("margin-"+g.options.dynamicTabsPosition,"0");(g.rightArrow).css("margin-"+g.options.dynamicTabsPosition,"0")}}}}else{if(g.options.mobileNavigation){(g.navigation).css("display","block");(g.dropdown).css("display","none");(g.dropdownSelect).css("display","none")}if(g.options.dynamicArrows){if(g.options.hideArrowsWhenMobile&&(!(g.leftArrow).length||!(g.rightArrow).length)){g.addArrows();g.registerArrows()}else{if(!g.options.dynamicArrowsGraphical){(g.leftArrow).css("margin-"+g.options.dynamicTabsPosition,(g.navigation).css("height"));(g.rightArrow).css("margin-"+g.options.dynamicTabsPosition,(g.navigation).css("height"))}}}}d(g.sliderId+"-wrapper").css("width","100%");if(g.options.mobileNavigation){(g.dropdownSelect).change(function(){g.setNextPanel(parseInt(d(this).val().split("tab")[1],10)-1)})}},autoSlide:function(){var f=this;if(f.options.autoSlideInterval<f.options.slideEaseDuration){f.options.autoSlideInterval=(f.options.slideEaseDuration>f.options.heightEaseDuration)?f.options.slideEaseDuration:f.options.heightEaseDuration}f.autoSlideTimeout=setTimeout(function(){f.setNextPanel(f.options.autoSlideDirection);f.autoSlide()},f.options.autoSlideInterval)},stopAutoSlide:function(){var f=this;f.options.autoSlide=false;clearTimeout(f.autoSlideTimeout)},startAutoSlide:function(g){var f=this;f.options.autoSlide=true;if(!g){f.setNextPanel(f.options.autoSlideDirection)}f.autoSlide(clearTimeout(f.autoSlideTimeout))},adjustHeight:function(h,f,j,i){var g=this;if(h||g.useCSS){if(h){g.configureCSSTransitions("0","0")}(g.$sliderId).height(f);if(h){g.configureCSSTransitions()}return}(g.$sliderId).animate({height:f+"px"},{easing:j||g.options.heightEaseFunction,duration:i||g.options.heightEaseDuration,queue:false})},getHeight:function(f){var g=this;f=f||g.$panelClass.eq(g.sanatizeNumber(g.nextPanel)-1).outerHeight(true);f=(f<g.options.minHeight)?g.options.minHeight:f;return f},addNavigation:function(i){var h=this,f="<"+h.options.navElementTag+' class="ls-nav"><ul id="'+(h.$elem).attr("id")+'-nav-ul"></ul></'+h.options.navElementTag+">";if(h.options.dynamicTabsPosition==="bottom"){(h.$sliderId).after(f)}else{(h.$sliderId).before(f)}if(h.options.mobileNavigation){var j=(h.options.mobileNavDefaultText)?'<option disabled="disabled" selected="selected">'+h.options.mobileNavDefaultText+"</option>":null,g='<div class="ls-select-box"><select id="'+(h.$elem).attr("id")+'-nav-select" name="navigation">'+j+"</select></div>";h.navigation=d(h.sliderId+"-nav-ul").before(g);h.dropdown=d(h.sliderId+"-wrapper .ls-select-box");h.dropdownSelect=d(h.sliderId+"-nav-select");d.each((h.$elem).find(h.options.panelTitleSelector),function(k){d((h.$sliderWrap)).find(".ls-select-box select").append('<option value="tab'+(k+1)+'">'+d(this).text()+"</option>")})}d.each((h.$elem).find(h.options.panelTitleSelector),function(k){d((h.$sliderWrap)).find(".ls-nav ul").append('<li class="tab'+(k+1)+'"><a class="'+(i||"")+'" href="#'+(k+1)+'">'+h.getNavInsides(this)+"</a></li>");if(!h.options.includeTitle){d(this).remove()}})},getNavInsides:function(f){return(this.options.dynamicTabsHtml)?d(f).html():d(f).text()},alignNavigation:function(){var f=this,g=(f.options.dynamicArrowsGraphical)?"-arrow":"";if(f.options.dynamicTabsAlign!=="center"){if(!f.options.responsive){d((f.$sliderWrap)).find(".ls-nav ul").css("margin-"+f.options.dynamicTabsAlign,d((f.$sliderWrap)).find(".ls-nav-"+f.options.dynamicTabsAlign+g).outerWidth(true)+parseInt((f.$sliderId).css("margin-"+f.options.dynamicTabsAlign),10))}d((f.$sliderWrap)).find(".ls-nav ul").css("float",f.options.dynamicTabsAlign)}f.totalNavWidth=d((f.$sliderWrap)).find(".ls-nav ul").outerWidth(true);if(f.options.dynamicTabsAlign==="center"){f.totalNavWidth=0;d((f.$sliderWrap)).find(".ls-nav li a").each(function(){f.totalNavWidth+=d(this).outerWidth(true)});d((f.$sliderWrap)).find(".ls-nav ul").css("width",f.totalNavWidth+1)}},registerNav:function(){var f=this;(f.$sliderWrap).find("[class^=ls-nav] li").on("click",function(){f.setNextPanel(parseInt(d(this).attr("class").split("tab")[1],10)-1);return false})},addArrows:function(g){var f=this,h=(f.options.dynamicArrowsGraphical)?"-arrow ":" ";(f.$sliderWrap).addClass("arrows");if(f.options.dynamicArrowsGraphical){f.options.dynamicArrowLeftText="";f.options.dynamicArrowRightText=""}(f.$sliderId).before('<div class="ls-nav-left'+h+(g||"")+'"><a href="javascript:;">'+f.options.dynamicArrowLeftText+"</a></div>");(f.$sliderId).after('<div class="ls-nav-right'+h+(g||"")+'"><a href="javascript:;">'+f.options.dynamicArrowRightText+"</a></div>");f.leftArrow=d(f.sliderId+"-wrapper [class^=ls-nav-left]").css("visibility","hidden").addClass("ls-hidden");f.rightArrow=d(f.sliderId+"-wrapper [class^=ls-nav-right]").css("visibility","hidden").addClass("ls-hidden");if(!f.options.hoverArrows){f.hideShowArrows(e,true,true,false)}},hideShowArrows:function(k,h,m,l){var i=this,j=(typeof k!=="undefined")?k:i.options.fadeOutDuration,f=(typeof k!=="undefined")?k:i.options.fadeInDuration,g=h?"visible":"hidden";if(!m&&(l||(i.sanatizeNumber(i.nextPanel)===1))){i.leftArrow.stop().fadeTo(j,0,function(){d(this).css("visibility",g).addClass("ls-hidden")})}else{if(m||i.leftArrow.hasClass("ls-hidden")){i.leftArrow.stop().css("visibility","visible").fadeTo(f,1).removeClass("ls-hidden")}}if(!m&&(l||(i.sanatizeNumber(i.nextPanel)===i.panelCount))){i.rightArrow.stop().fadeTo(j,0,function(){d(this).css("visibility",g).addClass("ls-hidden")})}else{if(m||i.rightArrow.hasClass("ls-hidden")){i.rightArrow.stop().css("visibility","visible").fadeTo(f,1).removeClass("ls-hidden")}}},registerArrows:function(){var f=this;d((f.$sliderWrap).find("[class^=ls-nav-]")).on("click",function(){f.setNextPanel(d(this).attr("class").split(" ")[0].split("-")[2])})},registerTouch:function(){var f=this,g=f.options.swipeArgs||{fallbackToMouseEvents:false,allowPageScroll:"vertical",swipe:function(i,h){if(h==="up"||h==="down"){return false}f.swipeDir=(h==="left")?"right":"left";f.setNextPanel(f.swipeDir)}};d(f.sliderId+" .panel").swipe(g)},init:function(g,h){var f=this;f.elem=h;f.$elem=d(h);d("body").removeClass("no-js");f.sliderId="#"+(f.$elem).attr("id");f.$sliderId=d(f.sliderId);f.options=d.extend({},d.fn.liquidSlider.options,g);f.pSign=(f.options.responsive)?"%":"px";if(f.options.responsive){f.determineAnimationType()}else{f.options.mobileNavigation=false;f.options.hideArrowsWhenMobile=false}if(f.options.slideEaseFunction==="animate.css"){if(!f.useCSS){f.options.slideEaseFunction=f.options.slideEaseFunctionFallback}else{f.options.continuous=false;f.animateCSS=true}}f.build();f.events();if(!f.options.responsive&&f.options.dynamicArrows){f.$sliderWrap.width(f.$sliderId.outerWidth(true)+f.leftArrow.outerWidth(true)+f.rightArrow.outerWidth(true))}f.loaded=true;d(c).bind("load",function(){f.options.preload.call(f)})},build:function(){var f=this,h;if((f.$sliderId).parent().attr("class")!=="ls-wrapper"){(f.$sliderId).wrap('<div id="'+(f.$elem).attr("id")+'-wrapper" class="ls-wrapper"></div>')}f.$sliderWrap=d(f.sliderId+"-wrapper");if(f.options.preloader){f.addPreloader()}d(f.sliderId).children().addClass((f.$elem).attr("id")+"-panel panel");f.panelClass=f.sliderId+" ."+(f.$elem).attr("id")+"-panel:not(.clone)";f.$panelClass=d(f.panelClass);(f.$panelClass).wrapAll('<div class="panel-container"></div>');(f.$panelClass).wrapInner('<div class="panel-wrapper"></div>');f.panelContainer=(f.$panelClass).parent();f.$panelContainer=f.panelContainer;if(f.options.slideEaseFunction==="fade"){(f.$panelClass).addClass("fade");f.options.continuous=false;f.fade=true}if(f.options.dynamicTabs){f.addNavigation()}else{f.options.mobileNavigation=false}if(f.options.dynamicArrows){f.addArrows()}else{f.options.hoverArrows=false;f.options.hideSideArrows=false;f.options.hideArrowsWhenMobile=false}h=((f.$leftArrow)&&(f.$leftArrow).css("position")==="absolute")?0:1;f.totalSliderWidth=(f.$sliderId).outerWidth(true)+(d(f.$leftArrow).outerWidth(true))*h+(d(f.$rightArrow).outerWidth(true))*h;d((f.$sliderWrap)).css("width",f.totalSliderWidth);if(f.options.dynamicTabs){f.alignNavigation()}if(f.options.hideSideArrows){f.options.continuous=false}if(f.options.continuous){(f.$panelContainer).prepend((f.$panelContainer).children().last().clone().addClass("clone"));(f.$panelContainer).append((f.$panelContainer).children().eq(1).clone().addClass("clone"))}var g=(f.options.continuous)?2:0;f.panelCount=d(f.panelClass).length;f.panelCountTotal=(f.fade)?1:f.panelCount+g;f.panelWidth=d(f.panelClass).outerWidth();f.totalWidth=f.panelCountTotal*f.panelWidth;d(f.sliderId+" .panel-container").css("width",f.totalWidth);f.slideDistance=(f.options.responsive)?100:d(f.sliderId).outerWidth();if(f.useCSS){f.totalWidth=100*f.panelCountTotal;f.slideDistance=100/f.panelCountTotal}if(f.options.responsive){f.makeResponsive()}f.prepareTransition(f.getFirstPanel(),true);f.updateClass()},determineAnimationType:function(){var f=this,l="animation",j="",h="Webkit Moz O ms Khtml".split(" "),k="",g=0;f.useCSS=false;if(f.elem.style.animationName){f.useCSS=true}if(f.useCSS===false){for(g=0;g<h.length;g++){if(f.elem.style[h[g]+"AnimationName"]!==e){k=h[g];l=k+"Animation";j="-"+k.toLowerCase()+"-";f.useCSS=true;break}}}if(a.documentElement.clientWidth>f.options.useCSSMaxWidth){f.useCSS=false}},configureCSSTransitions:function(g,f){var h=this,i,j;h.easing={easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175,.885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};if(h.useCSS){i="all "+(g||h.options.slideEaseDuration)+"ms "+h.easing[h.options.slideEaseFunction];j="all "+(f||h.options.heightEaseDuration)+"ms "+h.easing[h.options.heightEaseFunction];d(h.panelContainer).css({"-webkit-transition":i,"-moz-transition":i,"-ms-transition":i,"-o-transition":i,transition:i});if(h.options.autoHeight){(h.$sliderId).css({"-webkit-transition":j,"-moz-transition":j,"-ms-transition":j,"-o-transition":j,transition:j})}}},transitionFade:function(){var f=this;d(f.panelClass).eq(f.nextPanel).fadeTo(f.options.fadeInDuration,1).css("z-index",1);d(f.panelClass).eq(f.prevPanel).fadeTo(f.options.fadeOutDuration,0).css("z-index",0);f.callback(f.options.callback,true)},hover:function(){var f=this;(f.$sliderWrap).hover(function(){if(f.options.hoverArrows){f.hideShowArrows(f.options.fadeInDuration,true,true,false)}if(f.options.pauseOnHover){clearTimeout(f.autoSlideTimeout)}},function(){if(f.options.hoverArrows){f.hideShowArrows(f.options.fadeOutnDuration,true,false,true)}if(f.options.pauseOnHover&&f.options.autoSlide){f.startAutoSlide()}})},events:function(){var f=this;if(f.options.dynamicArrows){f.registerArrows()}if(f.options.crossLinks){f.registerCrossLinks()}if(f.options.dynamicTabs){f.registerNav()}if(f.options.swipe){f.registerTouch()}if(f.options.keyboardNavigation){f.registerKeyboard()}(f.$sliderWrap).find("*").on("click",function(){if(f.options.forceAutoSlide){f.startAutoSlide(true)}else{if(f.options.autoSlide){f.stopAutoSlide()}}});f.hover()},setNextPanel:function(g){var f=this;if(g===f.nextPanel){return}f.prevPanel=f.nextPanel;if(f.loaded){if(typeof g==="number"){f.nextPanel=g}else{f.nextPanel+=(~~(g==="right")||-1);if(!f.options.continuous){f.nextPanel=(f.nextPanel<0)?f.panelCount-1:(f.nextPanel%f.panelCount)}}if(f.fade||f.animateCSS){f.prepareTransition(f.nextPanel)}else{f.verifyPanel()}}},getFirstPanel:function(){var g=this,f;if(g.options.hashLinking){f=g.getPanelNumber(c.location.hash,g.options.hashTitleSelector);if(typeof(f)!=="number"){f=0}}return(f)?f:g.options.firstPanelToLoad-1},getPanelNumber:function(i,h){var g=this,j,f=i.replace("#","").toLowerCase();(g.$panelClass).each(function(k){j=g.convertRegex(d(this).find(h).text());if(j===f){f=k+1}});return(parseInt(f,10)?parseInt(f,10)-1:f)},getFromPanel:function(g,h){var f=this;return f.convertRegex(f.$panelClass.find(g).eq(h).text())},convertRegex:function(f){return f.replace(/[^\w -]+/g,"").replace(/ +/g,"-").toLowerCase()},updateClass:function(){var f=this;if(f.options.dynamicTabs){d((f.$sliderWrap)).find(".tab"+f.sanatizeNumber(f.nextPanel)+":first a").addClass("current").parent().siblings().children().removeClass("current")}if(f.options.crossLinks&&f.crosslinks){(f.crosslinks).not(f.nextPanel).removeClass("currentCrossLink");(f.crosslinks).each(function(){if(d(this).attr("href")===("#"+f.getFromPanel(f.options.panelTitleSelector,f.sanatizeNumber(f.nextPanel)-1))){d(this).addClass("currentCrossLink")}})}},sanatizeNumber:function(f){var g=this;if(f>=g.panelCount){return 1}else{if(f<=-1){return g.panelCount}else{return f+1}}},finalize:function(){var g=this;var f=(g.options.autoHeight)?g.getHeight():g.getHeighestPanel(g.nextPanel);if(g.options.autoHeight){g.adjustHeight(true,f)}if(g.options.autoSlide){g.autoSlide()}if(g.options.preloader){g.removePreloader()}g.onload()},callback:function(g,h){var f=this;if(g&&f.loaded){if(f.useCSS&&typeof h!=="undefined"){d(".panel-container").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(i){g.call(f)})}else{setTimeout(function(){g.call(f)},f.options.slideEaseDuration+50)}}},onload:function(){var f=this;f.options.onload.call(f)},prepareTransition:function(j,h,g,i){var f=this;f.nextPanel=j||0;if(!g){f.pretransition(f.options.pretransition)}f.noAnimation=h;f.noPosttransition=i;if(!f.loaded){f.transition()}else{f.options.pretransition.call(f)}},pretransition:function(){var f=this,g;if(f.options.hashLinking){f.updateHashTags()}if(f.options.mobileNavigation){f.dropdownSelect.val("tab"+(f.nextPanel+1))}if(f.options.hideSideArrows){f.hideShowArrows()}f.updateClass()},getTransitionMargin:function(){var f=this;return -(f.nextPanel*f.slideDistance)-(f.slideDistance*~~(f.options.continuous))},transition:function(){var f=this,g=f.getTransitionMargin();if(f.animateCSS&&f.loaded){f.transitionOutAnimateCSS();return false}if((g+f.pSign)!==(f.panelContainer).css("margin-left")||(g!==-100)){if(f.options.autoHeight&&!f.animateCSS){f.adjustHeight(true,f.getHeight())}if(f.fade){f.transitionFade()}else{if(f.animateCSS){f.transitionInAnimateCSS(g)}else{if(f.useCSS){f.transitionCSS(g,f.noAnimation)}else{f.transitionjQuery(g,f.noAnimation)}}}}if(!f.noPosttransition){f.callback(f.options.callback)}},transitionOutAnimateCSS:function(){var f=this;d(f.panelClass).removeClass(f.options.animateIn+" animated");d(f.panelClass).eq(f.prevPanel).addClass("animated "+f.options.animateOut);f.callback(f.transitionInAnimateCSS,e)},transitionInAnimateCSS:function(){var f=this;if(f.options.autoHeight){f.adjustHeight(false,f.getHeight())}f.transitionCSS(f.getTransitionMargin(),!f.loaded);d(f.panelClass).removeClass(f.options.animateOut+" animated");d(f.panelClass).eq(f.nextPanel).addClass("animated "+f.options.animateIn);f.callback(f.options.callback,e)},transitionCSS:function(h,g){var f=this;if(g){f.configureCSSTransitions("0","0")}(f.panelContainer).css({"-webkit-transform":"translate3d("+h+f.pSign+", 0, 0)","-moz-transform":"translate3d("+h+f.pSign+", 0, 0)","-ms-transform":"translate3d("+h+f.pSign+", 0, 0)","-o-transform":"translate3d("+h+f.pSign+", 0, 0)",transform:"translate3d("+h+f.pSign+", 0, 0)"});if(g){f.callback(function(){f.configureCSSTransitions()})}else{f.configureCSSTransitions()}},transitionjQuery:function(h,g){var f=this;if(g){(f.panelContainer).css("margin-left",h+f.pSign)}else{(f.panelContainer).animate({"margin-left":h+f.pSign},{easing:f.options.slideEaseFunction,duration:f.options.slideEaseDuration,queue:false})}},getHeighestPanel:function(){var g=this,f,h=0;g.$panelClass.each(function(){f=d(this).outerHeight(true);h=(f>h)?f:h});if(!g.options.autoHeight){return h}},verifyPanel:function(){var g=this,f=false;if(g.options.continuous){if(g.nextPanel>g.panelCount){g.nextPanel=g.panelCount;g.setNextPanel(g.panelCount)}else{if(g.nextPanel<-1){g.nextPanel=-1;g.setNextPanel(-1)}else{if((!f)&&((g.nextPanel===g.panelCount)||(g.nextPanel===-1))){g.prepareTransition(g.nextPanel);g.updateClass();clearTimeout(h);var h=setTimeout(function(){if(g.nextPanel===g.panelCount){g.prepareTransition(0,true,true,true)}else{if(g.nextPanel===-1){g.prepareTransition(g.panelCount-1,true,true,true)}}},g.options.slideEaseDuration+50)}else{f=true;g.prepareTransition(g.nextPanel)}}}}else{if(g.nextPanel===g.panelCount){g.nextPanel=0}else{if(g.nextPanel===-1){g.nextPanel=(g.panelCount-1)}}g.prepareTransition(g.nextPanel)}}};d.fn.liquidSlider=function(f){return this.each(function(){var g=Object.create(b);g.init(f,this);d.data(this,"liquidSlider",g)})};d.fn.liquidSlider.options={autoHeight:true,minHeight:0,heightEaseDuration:1500,heightEaseFunction:"easeInOutExpo",slideEaseDuration:1500,slideEaseFunction:"easeInOutExpo",slideEaseFunctionFallback:"easeInOutExpo",animateIn:"bounceInRight",animateOut:"bounceOutRight",continuous:true,fadeInDuration:500,fadeOutDuration:500,autoSlide:true,autoSlideDirection:"right",autoSlideInterval:6000,forceAutoSlide:false,pauseOnHover:false,dynamicArrows:true,dynamicArrowsGraphical:true,dynamicArrowLeftText:"&#171; left",dynamicArrowRightText:"right &#187;",hideSideArrows:false,hideSideArrowsDuration:750,hoverArrows:false,hoverArrowDuration:250,dynamicTabs:true,dynamicTabsHtml:true,includeTitle:true,panelTitleSelector:".title",dynamicTabsAlign:"left",dynamicTabsPosition:"top",navElementTag:"div",firstPanelToLoad:1,crossLinks:false,hashLinking:false,hashTitleSelector:".title",keyboardNavigation:false,leftKey:39,rightKey:37,panelKeys:{1:49,2:50,3:51,4:52},responsive:true,mobileNavigation:true,mobileNavDefaultText:"Menu",mobileUIThreshold:0,hideArrowsWhenMobile:true,hideArrowsThreshold:0,useCSSMaxWidth:2200,preload:function(){this.finalize()},onload:function(){},pretransition:function(){this.transition()},callback:function(){},preloader:false,swipe:true,swipeArgs:e}})(jQuery,window,document);