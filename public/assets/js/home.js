var JPI = JPI || {};

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,n.windowContext||(n.windowContext=!0,n.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s];if(null!==a.triggerPoint){var l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(y+l-f),h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  var CountTo = function (element, options) {
    this.$element = $(element);
    this.options  = $.extend({}, CountTo.DEFAULTS, this.dataOptions(), options);
    this.init();
  };

  CountTo.DEFAULTS = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };

  CountTo.prototype.init = function () {
    this.value     = this.options.from;
    this.loops     = Math.ceil(this.options.speed / this.options.refreshInterval);
    this.loopCount = 0;
    this.increment = (this.options.to - this.options.from) / this.loops;
  };

  CountTo.prototype.dataOptions = function () {
    var options = {
      from:            this.$element.data('from'),
      to:              this.$element.data('to'),
      speed:           this.$element.data('speed'),
      refreshInterval: this.$element.data('refresh-interval'),
      decimals:        this.$element.data('decimals')
    };

    var keys = Object.keys(options);

    for (var i in keys) {
      var key = keys[i];

      if (typeof(options[key]) === 'undefined') {
        delete options[key];
      }
    }

    return options;
  };

  CountTo.prototype.update = function () {
    this.value += this.increment;
    this.loopCount++;

    this.render();

    if (typeof(this.options.onUpdate) == 'function') {
      this.options.onUpdate.call(this.$element, this.value);
    }

    if (this.loopCount >= this.loops) {
      clearInterval(this.interval);
      this.value = this.options.to;

      if (typeof(this.options.onComplete) == 'function') {
        this.options.onComplete.call(this.$element, this.value);
      }
    }
  };

  CountTo.prototype.render = function () {
    var formattedValue = this.options.formatter.call(this.$element, this.value, this.options);
    this.$element.text(formattedValue);
  };

  CountTo.prototype.restart = function () {
    this.stop();
    this.init();
    this.start();
  };

  CountTo.prototype.start = function () {
    this.stop();
    this.render();
    this.interval = setInterval(this.update.bind(this), this.options.refreshInterval);
  };

  CountTo.prototype.stop = function () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  CountTo.prototype.toggle = function () {
    if (this.interval) {
      this.stop();
    } else {
      this.start();
    }
  };

  function formatter(value, options) {
    return value.toFixed(options.decimals);
  }

  $.fn.countTo = function (option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('countTo');
      var init    = !data || typeof(option) === 'object';
      var options = typeof(option) === 'object' ? option : {};
      var method  = typeof(option) === 'string' ? option : 'start';

      if (init) {
        if (data) data.stop();
        $this.data('countTo', data = new CountTo(this, options));
      }

      data[method].call(data);
    });
  };
}));

;/**
 * Holds all functions needed for a project slide show
 */
JPI.SlideShow = function(options) {

    "use strict";

    var slideShow = this;

    var defaults = {
        selector: ".slide-show",
        viewportSelector: ".slide-show__viewport",
        slidesContainerSelector: ".slide-show__slides",
        slideSelector: ".slide-show__slide",
        bulletsSelector: ".slide-show__bullets",
        bulletSelector: ".slide-show__bullet",
        navSelector: ".slide-show__nav",

        slidesPerView: 1,

        durationPerSlide: 5000, // Milliseconds

        autoplay: true,

        loop: true,
    };

    this.getXPosition = function(e) {
        return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    };

    this.removeSelector = function(selector) {
        return selector.substring(1);
    };

    this.options = jQuery.extend(defaults, options || {});

    this.options.activeSlideClass = this.removeSelector(this.options.slideSelector) + "--active";
    if (this.options.bulletSelector) {
        this.options.activeBulletClass = this.removeSelector(this.options.bulletSelector) + "--active";
    }

    this.$slideShow;
    this.$viewport;
    this.$container;
    this.$slides;
    this.$bulletsContainer;
    this.$bullets;
    this.$navs;

    this.interval;

    this.getConfig = function(config) {
        if (window.innerWidth >= JPI.getInt(JPI.breakpoints.desktop)) {
            if (
                this.options.breakpoints &&
                this.options.breakpoints.desktop &&
                this.options.breakpoints.desktop[config]
            ) {
                return this.options.breakpoints.desktop[config]
            }
        }

        if (window.innerWidth >= JPI.getInt(JPI.breakpoints.tablet)) {
            if (
                this.options.breakpoints &&
                this.options.breakpoints.tablet &&
                this.options.breakpoints.tablet[config]
            ) {
                return this.options.breakpoints.tablet[config]
            }
        }

        return this.options[config];
    };

    // Resets the transition duration of a slide show
    this.resetTransition = function() {
        this.$container.css("transition-duration", "");
    };

    // Widens slide show to fit all slides
    this.widenSlideShow = function() {
        var slideWidth = this.$viewport.innerWidth();
        var count = this.$slides.length;

        var fullWidth = slideWidth * count;

        var slidesPerView = this.getConfig("slidesPerView");
        if (slidesPerView > 1) {
            slideWidth = slideWidth / slidesPerView;

            if (slidesPerView % 2 === 0) {
                fullWidth = (slideWidth * count) + (slideWidth / 2);
                var offset = slideWidth / 2;
            } else {
                fullWidth = (slideWidth * count) + slideWidth;
                var offset = slideWidth;
            }

            this.$slides.first().css("margin-left", offset);
        }

        this.$slides.css("width", slideWidth + "px");
        this.$container.css("width", fullWidth + "px");
    };

    this.getPosition = function($slide) {
        var offset = 0;

        var slidesPerView = this.getConfig("slidesPerView");
        if (slidesPerView > 1 && !$slide.is(":first-child")) {
            offset = $slide.innerWidth();

            if (slidesPerView % 2 === 0) {
                offset = offset / 2;
            }
        }

        var position = $slide.position();

        return "-" + (position.left - offset) + "px";
    };

    // Moves current slide to correct position
    this.resetToCurrentSlide = function() {
        var $activeSlide = this.$slideShow.find("." + this.options.activeSlideClass);
        this.$container.css({
            transitionDuration: "0s",
            left: this.getPosition($activeSlide),
        });

        this.resetTransition();
    };

    // Adjusts all slides in slide show to fit
    this.repositionSlides = function() {
        this.widenSlideShow();
        this.resetToCurrentSlide();
    };

    this.setupNav = function() {
        if (this.$navs && !this.options.loop) {
            var $currentSlide = this.$slideShow.find("." + this.options.activeSlideClass);
            this.$navs.filter("[data-direction='previous']").attr("disabled", $currentSlide.is(":first-child"));
            this.$navs.filter("[data-direction='next']").attr("disabled", $currentSlide.is(":last-child"));
        }
    };

    this.moveToSlide = function($nextSlide) {
        var $currentSlide = this.$slideShow.find("." + this.options.activeSlideClass);

        $currentSlide.removeClass(this.options.activeSlideClass);

        if (this.$bullets) {
            this.$bullets.filter("." + this.options.activeBulletClass)
                .removeClass(this.options.activeBulletClass)
            ;
        }
        $nextSlide.addClass(this.options.activeSlideClass);

        this.$container.css("left", this.getPosition($nextSlide));

        if (this.$bullets) {
            var newSlideID = $nextSlide.attr("id");
            this.$bullets.filter("[data-slide-id='#" + newSlideID + "']")
                .addClass(this.options.activeBulletClass)
            ;
        }

        this.setupNav();

        JPI.getFocusableChildren($currentSlide).attr("tabindex", -1);
        JPI.getFocusableChildren($nextSlide).attr("tabindex", "");
    };

    // Moves to next or previous slide
    this.move = function(direction) {
        var $oldSlide = this.$slideShow.find("." + this.options.activeSlideClass);

        var $nextSlide;
        if (direction === "previous") {
            $nextSlide = $oldSlide.prev();
            if (!$nextSlide.length && this.options.loop) {
                $nextSlide = this.$slides.last();
            }
        }
        else {
            $nextSlide = $oldSlide.next();
            if (!$nextSlide.length && this.options.loop) {
                $nextSlide = this.$slides.first();
            }
        }

        if ($nextSlide.length) {
            this.moveToSlide($nextSlide);
        } else {
            this.resetToCurrentSlide();
        }
    };

    // Sets up events when the user wants to change slides with drag control
    this.onSlideDrag = function(startEvent) {
        var dragMove, dragEnd;

        var container = this.$container[0];
        var slidesContainerLeft = this.$container.position().left;

        var startX = this.getXPosition(startEvent);

        var removeListeners = function() {
            container.removeEventListener("touchmove", dragMove);
            container.removeEventListener("mousemove", dragMove);
            container.removeEventListener("touchend", dragEnd);
            container.removeEventListener("mouseup", dragEnd);
            container.removeEventListener("mouseleave", dragEnd);
        };
        var dragCancel = function() {
            slideShow.resetToCurrentSlide();
            if (slideShow.options.autoplay) {
                slideShow.resume();
            }
            removeListeners();
        };
        dragMove = function(e) {
            var endX = slideShow.getXPosition(e);
            var diff = startX - endX;

            slideShow.$container.css({
                transitionDuration: "0s",
                left: (slidesContainerLeft - diff) + "px",
            });
        };
        dragEnd = function(e) {
            var endX = slideShow.getXPosition(e);

            var diff = startX - endX;
            if (Math.abs(diff) >= 15) {
                slideShow.resetTransition();
                slideShow.move(diff < 0 ? "previous" : "next");
                if (slideShow.options.autoplay) {
                    slideShow.resume();
                }
                removeListeners();
                return;
            }

            dragCancel();
        };

        this.pause();
        container.addEventListener("touchmove", dragMove);
        container.addEventListener("mousemove", dragMove);
        container.addEventListener("touchend", dragEnd);
        container.addEventListener("mouseup", dragEnd);
        container.addEventListener("mouseleave", dragEnd);
    };

    // Pause a slide show by clearing the interval function on slide show id
    this.pause = function() {
        clearInterval(this.interval);
    };

    this.stop = function() {
        var container = this.$container[0];
        container.removeEventListener("mousedown", this.onSlideDrag);
        container.removeEventListener("touchstart", this.onSlideDrag);

        clearInterval(this.interval);
    };

    // Resumes a slide show by slide show element id
    this.resume = function() {
        this.interval = setInterval(function() {
            slideShow.move("next");
        }, this.options.durationPerSlide);
    };

    // Function when bullet was clicked to change slide show to a particular slide
    this.changeToSlide = function(e) {
        var $bullet = jQuery(e.target);
        var clickedSlideId = $bullet.attr("data-slide-id");
        var $nextSlide = this.$slideShow.find(clickedSlideId);

        this.pause();
        this.moveToSlide($nextSlide);

        if (this.options.autoplay) {
            this.resume();
        }
    };

    this.navigate = function(e) {
        this.pause();
        this.move(jQuery(e.target).attr("data-direction"));

        if (this.options.autoplay) {
            this.resume();
        }
    };

    this.start = function() {
        if (this.$bullets) {
            this.$bullets.off("click", this.changeToSlide);
        }
        if (this.$navs) {
            this.$navs.off("click", this.navigate);
        }

        this.$slideShow = jQuery(this.options.selector);
        this.$viewport = this.$slideShow.find(this.options.viewportSelector);
        this.$container = this.$slideShow.find(this.options.slidesContainerSelector);
        this.$slides = this.$slideShow.find(this.options.slideSelector);

        if (this.options.bulletsSelector && this.options.bulletSelector) {
            this.$bulletsContainer = this.$slideShow.find(this.options.bulletsSelector);
            this.$bullets = this.$slideShow.find(this.options.bulletSelector);
            this.$bullets.on("click", this.changeToSlide.bind(this));
        }

        this.$navs = this.$slideShow.find(this.options.navSelector);
        if (this.$navs) {
            this.$navs.on("click", this.navigate.bind(this));
        }

        jQuery(window).on("orientationchange resize", JPI.debounce(this.repositionSlides.bind(this), 150));

        var count = this.$slides.length;

        if (count <= 0) {
            if (this.$bulletsContainer) {
                this.$bulletsContainer.hide();
            }
            if (this.$navs) {
                this.$navs.hide();
            }

            return;
        }

        var $firstSlide = this.$slides.first();

        var $inactiveSlides = this.$slides.not($firstSlide);

        JPI.getFocusableChildren($inactiveSlides).attr("tabindex", -1);

        $firstSlide.addClass(this.options.activeSlideClass);

        if (this.$bullets) {
            this.$bullets.first().addClass(this.options.activeBulletClass);
        }

        if (count > 1) {
            this.widenSlideShow();

            if (this.$bulletsContainer) {
                this.$bulletsContainer.show();
            }
            if (this.$navs) {
                this.$navs.show();
                this.setupNav();
            }

            this.$container[0].addEventListener("mousedown", this.onSlideDrag.bind(this));
            this.$container[0].addEventListener("touchstart", this.onSlideDrag.bind(this));

            if (this.options.autoplay) {
                this.resume();
            }
        }
    };

    return {
        start: this.start.bind(this),
        pause: this.pause.bind(this),
        resume: this.resume.bind(this),
        stop: this.stop.bind(this),
    }
};

;// Handles all the general JS templating stuff - for use out of Template class as well
JPI.templating = new function() {

    "use strict";

    this.moustaches = {};

    // Get a ReEx of a 'moustache' for the field to replace (e.g. `{{ fieldName }}` or `{{fieldName}}`)
    this.getMoustache = function(field) {
        if (!this.moustaches[field]) {
            this.moustaches[field] = new RegExp("{{2} ?" + field + " ?}{2}", "g");
        }

        return this.moustaches[field];
    };

    return {
        getMoustache: this.getMoustache.bind(this),
    };
};

// A Template 'class' that holds all necessary logic to load a template, replace/process with data and render
JPI.Template = (function() {

    "use strict";

    return function(template, context) {

        this.context = context || {};

        this.replace = function(field, value) {
            var type = typeof value;

            if (type === "string" || type === "number") {
                var moustache = JPI.templating.getMoustache(field);
                template = template.replace(moustache, value);
            }
            else if (type === "object") {
                for (var innerField in value) {
                    if ({}.hasOwnProperty.call(value, innerField)) {
                        var innerKey = field ? field + "." + innerField : innerField;
                        template = this.replace(innerKey, value[innerField]);
                    }
                }
            }

            return template;
        };

        this.process = function(data) {
            if (data) {
                this.replace(null, data);
            }
        };

        this.get = function() {
            this.process(context);
            return template;
        };

        this.renderIn = function(parentElem) {
            parentElem.append(this.get());
        };
    };
})();


;JPI.ajax = new (function() {

    "use strict";

    // Display feedback from server if there is one otherwise output generic message
    this.checkAndRenderError = function(response, errorRenderer, genericMessage) {
        var message = genericMessage || "";
        if (response) {
            if (response.error) {
                message = response.error;
            } else if (response.message) {
                message = response.message;
            }
        }

        if (message) {
            errorRenderer(message);
        }
    };

    // Loop through data to see if it exists and if it does run a function on each row
    this.renderRowsOrError = function(response, rowRenderer, errorRenderer, genericMessage) {
        // If data/rows exists, For each row run a function
        if (response && response.data && response.data.length) {
            for (var i = 0; i < response.data.length; i++) {
                if ({}.hasOwnProperty.call(response.data, i)) {
                    rowRenderer(response.data[i]);
                }
            }

            return true;
        }

        // Otherwise check feedback and show user and return false as data isn't there
        this.checkAndRenderError(response, errorRenderer, genericMessage);
        return false;
    };

    /**
     * Function for sending XHR requests
     *
     * @param request Object of necessary data needed to do a HTTP request
     * {
     *     "method": HTTP Method (string),
     *     "url": URL to load (string),
     *     "data": object of payload,
     *     "onSuccess": function to run when XHR request is successful
     *     "onError": function to run when there's an error
     * }
     */
    this.request = function(request) {
        return jQuery.ajax({
            url: request.url,
            method: request.method.toUpperCase(),
            data: request.data,
            dataType: "json",
            success: request.onSuccess,
            error: function () {
                request.onError("Error Loading Content.");
            },
        });
    };

    return {
        renderRowsOrError: this.renderRowsOrError.bind(this),
        request: this.request.bind(this),
    };
});

;(new (function() {

    "use strict";

    this.$items = jQuery(".timeline__item");

    this.setItemHeights = function() {
        this.$items.css("height", ""); // reset

        var maxHeight = 0;
        this.$items.each(function(i, elem) {
            var height = jQuery(elem).outerHeight(true);
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        this.$items.css("height", maxHeight * 2);
    };

    this.init = function() {
        this.setItemHeights();

        var slideShow = new JPI.SlideShow({
            selector: ".timeline",
            viewportSelector: ".timeline__viewport",
            slidesContainerSelector: ".timeline__items",
            slideSelector: ".timeline__item",
            bulletsSelector: false,
            bulletSelector: false,
            navSelector: ".timeline__nav",
            slidesPerView: 2,
            autoplay: false,
            loop: false,
            breakpoints: {
                desktop: {
                    slidesPerView: 3,
                },
            },
        });

        slideShow.start();
    }

    jQuery(window).on("resize", this.setItemHeights.bind(this));

    jQuery(window).on("load", this.init.bind(this));
}));

;(new (function() {

    "use strict";

    var skills = this;

    this.$items = jQuery(".skill--expandable");
    this.$expandableContents = jQuery(".skill__description");
    this.$expandableIcons = jQuery(".skill__toggle");

    this.toggleContent = function(e) {
        var $item = jQuery(this);

        // Get the new item elems that was clicked
        var $selected = $item.find(".skill__description");
        var $selectedIcon = $item.find(".skill__toggle");

        // Reset all other item to closed
        skills.$expandableContents.not($selected).slideUp();
        skills.$expandableIcons.not($selectedIcon).addClass("fa-plus").removeClass("fa-minus");

        // Toggle the clicked item
        $selectedIcon.toggleClass("fa-plus");
        $selectedIcon.toggleClass("fa-minus");
        $selected.slideToggle();
    };

    this.$items.on("click", this.toggleContent);
}));

;(new (function() {

    "use strict";

    var map = this;

    this.$map = jQuery(".js-map");

    this.initMap = function() {
        var zoomLevel = 12;
        var bognorRegisLat = 50.7842;
        var bognorRegisLng = -0.674;
        var bognorRegisLocation = new google.maps.LatLng(bognorRegisLat, bognorRegisLng);
        var config = {
            center: bognorRegisLocation,
            zoom: zoomLevel,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            styles: JPI.googleMapStyles || {},
        };
        var map = new google.maps.Map(this.$map[0], config);

        new google.maps.Marker({
            position: bognorRegisLocation,
            icon: window.location.origin + "/assets/images/marker.png",
            map: map,
        });

        google.maps.event.addDomListener(window, "resize", function() {
            map.setCenter(bognorRegisLocation);
        });
    };

    jQuery(function() {
        google.maps.event.addDomListener(window, "load", map.initMap.bind(map));
    });
}));

;(new (function() {

    "use strict";

    var form = this;

    this.$form = jQuery(".contact-form");

    this.$inputs = this.$form.find(".input");
    this.$email = jQuery(".contact-form__email");
    this.$message = jQuery(".contact-form__message");
    this.$subject = jQuery(".contact-form__subject");
    this.$emailFeedback = jQuery(".contact-form__email-feedback");
    this.$messageFeedback = jQuery(".contact-form__message-feedback");
    this.$feedback = jQuery(".contact-form__feedback");
    this.$submit = jQuery(".contact-form__submit");

    this.reset = function() {
        this.$inputs.attr("disabled", false);
        this.$submit.prop("disabled", false)
            .html(this.$submit.attr("data-initial-text"))
        ;
    };

    // Show appropriate & relevant feedback to the user after an attempt of sending a message
    this.renderResponse = function(response) {
        this.reset();

        // Check if message was sent
        if (response.ok) {
            if (response.feedback) {
                this.$feedback.removeClass("field__error").addClass("field__feedback");
            }

            this.$inputs.val("");
            this.$form.find(".field").hide();
            this.$submit.hide();
        }
        else {
            if (response.feedback) {
                this.$feedback.removeClass("field__feedback").addClass("field__error");
            }
            if (response.messageFeedback) {
                this.$messageFeedback.text(response.messageFeedback).show(200);
            }
            if (response.emailAddressFeedback) {
                this.$emailFeedback.text(response.emailAddressFeedback).show(200);
            }
        }

        if (response.feedback) {
            this.$feedback.text(response.feedback).show(200);
        }
    };

    // Render an error message when AJAX has errored
    this.renderErrorMessage = function() {
        this.$feedback.text("Something went wrong, please try again later.")
            .removeClass("field__feedback")
            .addClass("field__error")
            .show(200);

        this.reset();
    };

    this.validateEmail = function(isForm) {
        var emailAddress = this.$email.val();

        this.$feedback.hide(200);
        this.$email.removeClass("input--valid");

        if (emailAddress.trim() === "") {
            if (isForm) {
                this.$email.addClass("input--invalid");
                this.$emailFeedback.text("Email address must be provided and valid.").show(200);
            }
            return false;
        }

        var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im;
        var emailValidationTest = validEmailPattern.test(emailAddress);

        if (emailValidationTest) {
            this.$email.removeClass("input--invalid").addClass("input--valid");
            this.$emailFeedback.hide(200);
            return true;
        }

        if (isForm) {
            this.$email.addClass("input--invalid");
            this.$emailFeedback.text("Email address must be valid.").show(200);
        }

        return false;
    };

    this.validateMessage = function(isForm) {
        var message = this.$message.val();

        this.$feedback.hide(200);
        this.$message.removeClass("input--valid");

        if (message.trim() !== "") {
            this.$message.removeClass("input--invalid").addClass("input--valid");
            this.$messageFeedback.hide(200);
            return true;
        }

        if (isForm) {
            this.$message.addClass("input--invalid");
            this.$messageFeedback.text("Message must be filled out.").show(200);
        }

        return false;
    };

    this.submit = function() {
        this.$inputs.attr("disabled", true);
        this.$submit.prop("disabled", true)
            .html(this.$submit.attr("data-loading-text"))
        ;

        var isEmailValid = this.validateEmail(true);
        var isMessageValid = this.validateMessage(true);

        if (isEmailValid && isMessageValid) {
            JPI.ajax.request({
                method: "POST",
                url: "/contact/",
                data: {
                    emailAddress: this.$email.val(),
                    subject: this.$subject.val(),
                    message: this.$message.val(),
                },
                onSuccess: this.renderResponse.bind(this),
                onError: this.renderErrorMessage.bind(this),
            });
        }
        else {
            this.reset();
        }

        return false;
    };

    this.initListeners = function() {
        this.$subject.on("keyup", function() {
            form.$feedback.hide(200);
        });
        this.$email.on("input", function() {
            form.validateEmail();
        });
        this.$message.on("input", function() {
            form.validateMessage();
        });

        this.$form.on("submit", this.submit.bind(this));
    };

    this.initListeners();
}));

;JPI.api = (function() {

    "use strict";

    var dateFormat = new Intl.DateTimeFormat("default", {
        month: "long",
        year: "numeric",
    });

    // Helper function to format Project data from the API to the necessary format for the Website
    var formatProjectData = function(project) {
        if (project.date) {
            var date = new Date(project.date);
            project.date = dateFormat.format(date);
        }

        return project;
    };

    return {
        formatProjectData: formatProjectData,
    }

})();


;/*
 * Holds all functions needed for the homepage
 * eg. to display latest 3 project on the home page
 */
(function() {

    "use strict";

    var $loading = jQuery(".latest-projects__loading");
    var $error = jQuery(".latest-projects__error");

    var $slidesContainer = jQuery(".slide-show__slides");
    var $bullets = jQuery(".slide-show__bullets");

    var slideTemplateHtml = jQuery("#slide-template").text();
    var bulletTemplateHtml = jQuery("#slide-bullet-template").text();

    var renderProjectsError = function(error) {
        $error.text(error).show(200);
        $loading.hide(200);
    };

    var renderProject = function(project) {
        project = JPI.api.formatProjectData(project);

        var slideTemplate = new JPI.Template(slideTemplateHtml);
        var bulletTemplate = new JPI.Template(bulletTemplateHtml);

        for (var field in project) {
            if ({}.hasOwnProperty.call(project, field)) {
                var value = project[field];
                slideTemplate.replace(field, value);
                bulletTemplate.replace(field, value);
            }
        }

        slideTemplate.renderIn($slidesContainer);
        bulletTemplate.renderIn($bullets);

        var slideId = "#slide-" + project.id;
        var $slide = jQuery(slideId);

        if (!project.images || !project.images.length || !project.images[0]) {
            $slide.find(".slide-show__image").remove();
        }
    };

    // Sets up events when projects is received
    var gotProjects = function(response) {
        $error.text("").hide(200);
        $loading.hide(200);

        // Send the data, the function to do if data is valid
        var wasSuccessfullyRendered = JPI.ajax.renderRowsOrError(
            response,
            renderProject,
            renderProjectsError,
            "Error Getting the Projects."
        );

        if (wasSuccessfullyRendered) {
            var slideShow = new JPI.SlideShow({
                selector: "#latest-projects",
            });
            slideShow.start();
        }
    };

    var getProjects = function() {
        JPI.ajax.request({
            method: "GET",
            url: JPI.projects.apiEndpoint + "/projects/",
            data: {limit: 3},
            onSuccess: gotProjects,
            onError: renderProjectsError,
        });
    };

    var counterFormatter = function(value, options) {
        options = options || {};
        value = value.toFixed(options.decimals || 0);
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return value;
    };

    var initCounters = function() {
        var countToOptions = {
            formatter: counterFormatter,
        };
        var waypointArgs = {offset: "95%"};
        jQuery(".js-counters").waypoint(function() {
            jQuery(this.element).find(".js-counter").each(function(j, counter) {
                jQuery(counter).countTo(countToOptions);
            });
        }, waypointArgs);
    };

    var initSecondsCounter = function() {
        var secsInMilliseconds = 1000;

        var $secsElem = jQuery(".js-seconds-on-site");
        setTimeout(function() {
            setInterval(function() {
                var lastSec = JPI.getInt($secsElem.text());
                var newSec = counterFormatter(lastSec + 1);
                $secsElem.text(newSec);
            }, secsInMilliseconds);
        }, secsInMilliseconds);
    };

    $loading.show(200);

    initSecondsCounter();
    initCounters();

    jQuery(window).on("jpi-css-loaded", getProjects);
})();

//# sourceMappingURL=maps/home.js.map
