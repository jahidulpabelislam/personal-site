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
JPI.SlideShow = (function() {

    "use strict";

    var getXPosition = function(e) {
        return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    };

    var removeSelector = function(selector) {
        return selector.substring(1);
    }

    return function(options) {

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

        options = jQuery.extend(defaults, options || {});

        var slideShow, viewport, container, slides, bulletsContainer, bullets, navs, internal;

        // Resets the transition duration of a slide show
        var resetTransition = function() {
            container.css("transition-duration", "");
        };

        // Widens slide show to fit all slides
        var widenSlideShow = function() {
            var slideWidth = viewport.innerWidth();
            var count = slides.length;

            if (options.slidesPerView > 1) {
                slideWidth = slideWidth / options.slidesPerView;
                count++;

                slides.first().css("margin-left", slideWidth);
            }

            slides.css("width", slideWidth + "px");

            container.css("width", slideWidth * count + "px");
        };

        var getPosition = function(slide) {
            var offset = 0;

            if (options.slidesPerView > 1 && !slide.is(":first-child")) {
                offset = slide.innerWidth();
            }

            var position = slide.position();

            return "-" + (position.left - offset) + "px";
        }

        // Moves current slide to correct position
        var resetToCurrentSlide = function() {
            var activeSlide = slideShow.find(options.slideSelector + "--active");
            container.css({
                transitionDuration: "0s",
                left: getPosition(activeSlide),
            });

            resetTransition();
        };

        // Adjusts all slides in slide show to fit
        var repositionSlides = function() {
            widenSlideShow();
            resetToCurrentSlide();
        };

        var setupNav = function() {
            if (navs && !options.loop) {
                var currentSlide = slideShow.find(options.slideSelector + "--active");
                navs.filter("[data-direction='previous']").attr("disabled", currentSlide.is(":first-child"));
                navs.filter("[data-direction='next']").attr("disabled", currentSlide.is(":last-child"));
            }
        }

        var moveToSlide = function(nextSlide) {
            var currentSlide = slideShow.find(options.slideSelector + "--active");

            currentSlide.removeClass(removeSelector(options.slideSelector) + "--active");

            if (bullets) {
                bullets.filter(options.bulletSelector + ".slide-show__bullet--active")
                    .removeClass(removeSelector(options.bulletSelector)  + "--active")
                ;
            }
            nextSlide.addClass(removeSelector(options.slideSelector) + "--active");

            container.css("left", getPosition(nextSlide));

            if (bullets) {
                var newSlideID = nextSlide.attr("id");
                bullets.filter("[data-slide-id='#" + newSlideID + "']")
                    .addClass(removeSelector(options.bulletSelector) + "--active")
                ;
            }

            setupNav();

            JPI.getFocusableChildren(currentSlide).attr("tabindex", -1);
            JPI.getFocusableChildren(nextSlide).attr("tabindex", "");
        };

        // Moves to next or previous slide
        var move = function(direction) {
            var oldSlide = slideShow.find(options.slideSelector + "--active");

            var nextSlide;
            if (direction === "previous") {
                nextSlide = oldSlide.prev();
                if (!nextSlide.length) {
                    nextSlide = slides.last();
                }
            }
            else {
                nextSlide = oldSlide.next();
                if (!nextSlide.length) {
                    nextSlide = slides.first();
                }
            }

            moveToSlide(nextSlide);
        };

        // Sets up events when the user wants to change slides with drag control
        var onSlideDrag = function(startEvent) {
            var dragMove, dragEnd;

            var slidesContainerDom = container[0];
            var slidesContainerLeft = container.position().left;

            var startX = getXPosition(startEvent);

            var removeListeners = function() {
                slidesContainerDom.removeEventListener("touchmove", dragMove);
                slidesContainerDom.removeEventListener("mousemove", dragMove);
                slidesContainerDom.removeEventListener("touchend", dragEnd);
                slidesContainerDom.removeEventListener("mouseup", dragEnd);
                slidesContainerDom.removeEventListener("mouseleave", dragEnd);
            };
            var dragCancel = function() {
                resetToCurrentSlide();
                if (options.autoplay) {
                    resume();
                }
                removeListeners();
            };
            dragMove = function(e) {
                var endX = getXPosition(e);
                var diff = startX - endX;

                container.css({
                    transitionDuration: "0s",
                    left: (slidesContainerLeft - diff) + "px",
                });
            };
            dragEnd = function(e) {
                var endX = getXPosition(e);

                var diff = startX - endX;
                if (Math.abs(diff) >= 15) {
                    resetTransition();
                    move(diff < 0 ? "previous" : "next");
                    if (options.autoplay) {
                        resume();
                    }
                    removeListeners();
                    return;
                }

                dragCancel();
            };

            pause();
            slidesContainerDom.addEventListener("touchmove", dragMove);
            slidesContainerDom.addEventListener("mousemove", dragMove);
            slidesContainerDom.addEventListener("touchend", dragEnd);
            slidesContainerDom.addEventListener("mouseup", dragEnd);
            slidesContainerDom.addEventListener("mouseleave", dragEnd);
        };

        // Pause a slide show by clearing the interval function on slide show id
        var pause = function() {
            clearInterval(internal);
        };

        var stop = function() {
            var slidesContainer = container[0];
            slidesContainer.removeEventListener("mousedown", onSlideDrag);
            slidesContainer.removeEventListener("touchstart", onSlideDrag);

            clearInterval(internal);
        };

        // Resumes a slide show by slide show element id
        var resume = function() {
            internal = setInterval(function() {
                move("next");
            }, options.durationPerSlide);
        };

        // Function when bullet was clicked to change slide show to a particular slide
        var changeToSlide = function(e) {
            var bulletElem = jQuery(e.target);
            var clickedSlideId = bulletElem.attr("data-slide-id");
            var nextSlide = slideShow.find(clickedSlideId);

            pause();
            moveToSlide(nextSlide);

            if (options.autoplay) {
                resume();
            }
        };

        var navigate = function(e) {
            pause();
            move(jQuery(e.target).attr("data-direction"));

            if (options.autoplay) {
                resume();
            }
        }

        var start = function() {
            if (bullets) {
                bullets.off("click", changeToSlide);
            }
            if (navs) {
                navs.off("click", navigate);
            }

            slideShow = jQuery(options.selector);
            viewport = slideShow.find(options.viewportSelector);
            container = slideShow.find(options.slidesContainerSelector);
            slides = slideShow.find(options.slideSelector);

            if (options.bulletsSelector && options.bulletSelector) {
                bulletsContainer = slideShow.find(options.bulletsSelector);
                bullets = slideShow.find(options.bulletSelector);
            }

            navs = slideShow.find(options.navSelector);

            slideShow.on("dragstart", ".slide-show__image", false); // todo: move

            if (bullets) {
                bullets.on("click", changeToSlide);
            }

            if (navs) {
                navs.on("click", navigate);
            }

            jQuery(window).on("orientationchange resize", JPI.debounce(repositionSlides, 150));

            var count = slides.length;

            if (count <= 0) {
                if (bulletsContainer) {
                    bulletsContainer.hide();
                }
                if (navs) {
                    navs.hide();
                }

                return;
            }

            var firstSlide = slides.first();

            var inactiveSlides = slides.not(firstSlide);

            JPI.getFocusableChildren(inactiveSlides).attr("tabindex", -1);

            firstSlide.addClass(removeSelector(options.slideSelector) + "--active");

            if (bullets) {
                bullets.first().addClass(removeSelector(options.bulletSelector) +  "--active");
            }

            if (count > 1) {
                widenSlideShow();

                if (bulletsContainer) {
                    bulletsContainer.show();
                }
                if (navs) {
                    navs.show();
                    setupNav();
                }

                container[0].addEventListener("mousedown", onSlideDrag);
                container[0].addEventListener("touchstart", onSlideDrag);

                if (options.autoplay) {
                    resume();
                }
            }
        };

        this.start = start;
        this.pause = pause;
        this.resume = resume;
        this.stop = stop;
    };

})();

;// Handles all the general JS templating stuff - for use out of Template class as well
JPI.templating = (function() {

    "use strict";

    var global = {
        moustaches: {}, // `Cache` of moustaches
    };

    var fn = {

        // Get a ReEx of a 'moustache' for the field to replace (e.g. `{{ fieldName }}` or `{{fieldName}}`)
        getMoustache: function(field) {
            if (!global.moustaches[field]) {
                global.moustaches[field] = new RegExp("{{2} ?" + field + " ?}{2}", "g");
            }

            return global.moustaches[field];
        },
    };

    return {
        getMoustache: fn.getMoustache,
    };

})();

// A Template 'class' that holds all necessary logic to load a template, replace/process with data and render
JPI.Template = (function() {

    "use strict";

    return function(template, context) {

        context = context || {};

        var fn = {

            replace: function(field, value) {
                var type = typeof value;

                if (type === "string" || type === "number") {
                    var moustache = JPI.templating.getMoustache(field);
                    template = template.replace(moustache, value);
                }
                else if (type === "object") {
                    for (var innerField in value) {
                        if ({}.hasOwnProperty.call(value, innerField)) {
                            var innerKey = field ? field + "." + innerField : innerField;
                            template = fn.replace(innerKey, value[innerField]);
                        }
                    }
                }

                return template;
            },

            process: function(data) {
                if (data) {
                    fn.replace(null, data);
                }
            },

            get: function() {
                fn.process(context);
                return template;
            },

            renderIn: function(parentElem) {
                parentElem.append(fn.get());
            },
        };

        return {
            replace: fn.replace,
            process: fn.process,
            get: fn.get,
            renderIn: fn.renderIn,
        };
    };

})();


;JPI.ajax = (function() {

    "use strict";

    var fn = {

        // Display feedback from server if there is one otherwise output generic message
        checkAndRenderError: function(response, errorRenderer, genericMessage) {
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
        },

        // Loop through data to see if it exists and if it does run a function on each row
        renderRowsOrError: function(response, rowRenderer, errorRenderer, genericMessage) {
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
            fn.checkAndRenderError(response, errorRenderer, genericMessage);
            return false;
        },

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
        request: function(request) {
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
        },
    };

    return {
        renderRowsOrError: fn.renderRowsOrError,
        request: fn.request,
    };
})();

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
 *Holds all functions needed for the homepage
 * eg. to display latest 3 project on the home page
 */
(function() {

    "use strict";

    var Template = JPI.Template;

    var global = {
        slidesContainer: null,
        bulletsElem: null,
        loadingElem: null,
        errorElem: null,
        slideTemplate: "",
        bulletTemplate: "",
    };

    var fn = {

        renderError: function(error) {
            global.errorElem.text(error).show(200);
            global.loadingElem.hide(200);
        },

        renderProject: function(project) {
            project = JPI.api.formatProjectData(project);

            var slideTemplate = new Template(global.slideTemplate);
            var bulletTemplate = new Template(global.bulletTemplate);
            for (var field in project) {
                if ({}.hasOwnProperty.call(project, field)) {
                    var value = project[field];
                    slideTemplate.replace(field, value);
                    bulletTemplate.replace(field, value);
                }
            }

            slideTemplate.renderIn(global.slidesContainer);
            bulletTemplate.renderIn(global.bulletsElem);

            var slideId = "#slide-" + project.id;
            var slideElem = jQuery(slideId);

            if (!project.images || !project.images.length || !project.images[0]) {
                slideElem.find(".slide-show__image").remove();
            }

            var linksContainer = slideElem.find(".latest-project__links");

            if (!project.url && !project.github_url) {
                linksContainer.remove();
                return;
            }

            if (project.url) {
                JPI.renderNewElement("a", linksContainer, {
                    href: project.url,
                    html: "<i class='fas fa-link fa-2x'></i>",
                    class: "button button--clear latest-project__link",
                    target: "_blank",
                    rel: "noopener",
                });
            }

            if (project.github_url) {
                JPI.renderNewElement("a", linksContainer, {
                    href: project.github_url,
                    html: "<i class='fab fa-github fa-2x'></i>",
                    class: "button button--clear latest-project__link",
                    target: "_blank",
                    rel: "noopener noreferrer",
                });
            }
        },

        // Sets up events when projects is received
        gotProjects: function(response) {
            global.errorElem.text("").hide(200);
            global.loadingElem.hide(200);

            global.slideTemplate = jQuery("#slide-template").text();
            global.bulletTemplate = jQuery("#slide-bullet-template").text();

            global.slidesContainer = jQuery(".slide-show__slides");
            global.bulletsElem = jQuery(".slide-show__bullets");

            // Send the data, the function to do if data is valid
            var wasSuccessfullyRendered = JPI.ajax.renderRowsOrError(
                response,
                fn.renderProject,
                fn.renderError,
                "Error Getting the Projects."
            );

            if (wasSuccessfullyRendered) {
                var slideShow = new JPI.SlideShow({
                    selector: "#latest-projects",
                });
                slideShow.start();
            }
        },

        loadProjects: function() {
            JPI.ajax.request({
                method: "GET",
                url: JPI.projects.apiEndpoint + "/projects/",
                data: {limit: 3},
                onSuccess: fn.gotProjects,
                onError: fn.renderError,
            });
        },

        counterFormatter: function(value, options) {
            options = options || {};
            value = value.toFixed(options.decimals || 0);
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return value;
        },

        countTo: function(counter, options) {
            options = jQuery.extend(options || {}, counter.data("countToOptions") || {});
            counter.countTo(options);
        },

        initCounters: function() {
            var groups = jQuery(".js-counters");

            if (groups.length) {
                // Make the initial display be the from value
                jQuery(".js-counter").each(function(j, counterElem) {
                    var counter = jQuery(counterElem);
                    var start = counter.attr("data-from");
                    counter.text(start || 0);
                });

                var countToOptions = {
                    formatter: fn.counterFormatter,
                };
                var waypointArgs = {offset: "95%"};
                groups.each(function(i, groupElem) {
                    jQuery(groupElem).waypoint(function() {
                        var group = jQuery(this.element);
                        var counters = group.find(".js-counter");
                        counters.each(function(j, counter) {
                            fn.countTo(jQuery(counter), countToOptions);
                        });
                    }, waypointArgs);
                });
            }
        },

        initSecondsCounter: function() {
            var secsElems = jQuery(".js-seconds-on-site");
            if (secsElems.length) {
                var secsInMilliseconds = 1000;

                secsElems.each(function(i, secsElem) {
                    secsElem = jQuery(secsElem);
                    setTimeout(function() {
                        setInterval(function() {
                            var lastSec = secsElem.attr("data-current-second");
                            lastSec = JPI.getInt(lastSec, 0);
                            var newSec = lastSec + 1;
                            secsElem.attr("data-current-second", newSec);
                            newSec = fn.counterFormatter(newSec);
                            secsElem.text(newSec);
                        }, secsInMilliseconds);
                    }, secsInMilliseconds);
                });
            }
        },

        init: function() {
            global.loadingElem = jQuery(".latest-projects__loading");
            global.errorElem = jQuery(".latest-projects__error");

            global.loadingElem.show(200);

            fn.initSecondsCounter();
            fn.initCounters();

            jQuery(window).on("jpi-css-loaded", fn.loadProjects);
        },
    };

    fn.init();

})();


//# sourceMappingURL=public/assets/js/maps/home.js.map
