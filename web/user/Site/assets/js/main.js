/*
Theme Name: iProperty
Theme URI: http://immersivesoul.com/iproperty/
Description: iProperty Responsive HTML5 Bootstrap Template
Author: Immersive Soul
Author URI: http://immersivesoul.com
Version: 1.0
*/

// Theme
window.theme = {};

// Theme Common Functions
window.theme.fn = {

    getOptions: function(opts) {

        if (typeof(opts) == 'object') {

            return opts;

        } else if (typeof(opts) == 'string') {

            try {
                return JSON.parse(opts.replace(/'/g,'"').replace(';',''));
            } catch(e) {
                return {};
            }

        } else {

            return {};

        }

    }

};

// Animate
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__animate';

    var PluginAnimate = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginAnimate.defaults = {
        accX: 0,
        accY: -150,
        delay: 1,
        duration: '1s'
    };

    PluginAnimate.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginAnimate.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            var self = this,
                $el = this.options.wrapper,
                delay = 0,
                duration = '1s';

            $el.addClass('appear-animation animated');

            if (!$('html').hasClass('no-csstransitions') && $(window).width() > 767) {

                $el.appear(function() {

                    $el.one('animation:show', function(ev) {
                        delay = ($el.attr('data-appear-animation-delay') ? $el.attr('data-appear-animation-delay') : self.options.delay);
                        duration = ($el.attr('data-appear-animation-duration') ? $el.attr('data-appear-animation-duration') : self.options.duration);

                        if (duration != '1s') {
                            $el.css('animation-duration', duration);
                        }

                        setTimeout(function() {
                            $el.addClass($el.attr('data-appear-animation') + ' appear-animation-visible');
                        }, delay);
                    });

                    $el.trigger('animation:show');

                }, {
                    accX: self.options.accX,
                    accY: self.options.accY
                });

            } else {

                $el.addClass('appear-animation-visible');

            }

            return this;
        }
    };

    // expose to scope
    $.extend(theme, {
        PluginAnimate: PluginAnimate
    });

    // jquery plugin
    $.fn.themePluginAnimate = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginAnimate($this, opts);
            }

        });
    };

}).apply(this, [window.theme, jQuery]);

// Match Height
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__matchHeight';

    var PluginMatchHeight = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginMatchHeight.defaults = {
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    };

    PluginMatchHeight.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginMatchHeight.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            if (!($.isFunction($.fn.matchHeight))) {
                return this;
            }

            var self = this;

            self.options.wrapper.matchHeight(self.options);

            return this;
        }

    };

    // expose to scope
    $.extend(theme, {
        PluginMatchHeight: PluginMatchHeight
    });

    // jquery plugin
    $.fn.themePluginMatchHeight = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginMatchHeight($this, opts);
            }

        });
    }

}).apply(this, [window.theme, jQuery]);

// Parallax
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__parallax';

    var PluginParallax = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginParallax.defaults = {
        speed: 1.5,
        horizontalPosition: '50%',
        offset: 0
    };

    PluginParallax.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginParallax.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            var self = this,
                $window = $(window),
                offset,
                yPos,
                bgpos,
                background;

            // Create Parallax Element
            background = $('<div class="parallax-background"></div>');

            // Set Style for Parallax Element
            background.css({
                'background-image' : 'url(' + self.options.wrapper.data('image-src') + ')',
                'background-size' : 'cover',
                'position' : 'absolute',
                'top' : 0,
                'left' : 0,
                'width' : '100%',
                'height' : '180%'
            });

            // Add Parallax Element on DOM
            self.options.wrapper.prepend(background);

            // Set Overlfow Hidden and Position Relative to Parallax Wrapper
            self.options.wrapper.css({
                'position' : 'relative',
                'overflow' : 'hidden'
            });

            // Parallax Effect on Scroll & Resize
            var parallaxEffectOnScrolResize = function() {
                $window.on('scroll resize', function() {
                    offset  = self.options.wrapper.offset();
                    yPos    = -($window.scrollTop() - (offset.top - 100)) / ((self.options.speed + 2 ) + (self.options.offset));
                    plxPos  = (yPos < 0) ? Math.abs(yPos) : -Math.abs(yPos);
                    background.css({
                        'transform' : 'translate3d(0, '+ plxPos +'px, 0)',
                        'background-position-x' : self.options.horizontalPosition
                    });
                });

                $window.trigger('scroll');
            }

            if (!$.browser.mobile) {
                parallaxEffectOnScrolResize();
            } else {
                if( self.options.enableOnMobile == true ) {
                    parallaxEffectOnScrolResize();
                } else {
                    self.options.wrapper.addClass('parallax-disabled');
                }
            }

            return this;
        }
    };

    // expose to scope
    $.extend(theme, {
        PluginParallax: PluginParallax
    });

    // jquery plugin
    $.fn.themePluginParallax = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginParallax($this, opts);
            }

        });
    }

}).apply(this, [window.theme, jQuery]);

// Scroll to Top
(function(theme, $) {

    theme = theme || {};

    $.extend(theme, {

        PluginScrollToTop: {

            defaults: {
                wrapper: $('body'),
                offset: 150,
                buttonClass: 'scroll-to-top',
                iconClass: 'fa fa-arrow-up',
                delay: 1000,
                visibleMobile: false,
                label: false,
                easing: 'easeOutQuint'
            },

            initialize: function(opts) {
                initialized = true;

                this
                    .setOptions(opts)
                    .build()
                    .events();

                return this;
            },

            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts);

                return this;
            },

            build: function() {
                var self = this,
                    $el;

                // Base HTML Markup
                $el = $('<a />')
                    .addClass(self.options.buttonClass)
                    .attr({
                        'href': '#',
                    })
                    .append(
                        $('<i />')
                        .addClass(self.options.iconClass)
                );

                // Visible Mobile
                if (!self.options.visibleMobile) {
                    $el.addClass('hidden-mobile');
                }

                // Label
                if (self.options.label) {
                    $el.append(
                        $('<span />').html(self.options.label)
                    );
                }

                this.options.wrapper.append($el);

                this.$el = $el;

                return this;
            },

            events: function() {
                var self = this,
                    _isScrolling = false;

                // Click Element Action
                self.$el.on('click', function(e) {
                    e.preventDefault();
                    $('body, html').animate({
                        scrollTop: 0
                    }, self.options.delay, self.options.easing);
                    return false;
                });

                // Show/Hide Button on Window Scroll event.
                $(window).scroll(function() {

                    if (!_isScrolling) {

                        _isScrolling = true;

                        if ($(window).scrollTop() > self.options.offset) {

                            self.$el.stop(true, true).addClass('visible');
                            _isScrolling = false;

                        } else {

                            self.$el.stop(true, true).removeClass('visible');
                            _isScrolling = false;

                        }

                    }

                });

                return this;
            }

        }

    });

}).apply(this, [window.theme, jQuery]);

// Progress Bar
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__progressBar';

    var PluginProgressBar = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginProgressBar.defaults = {
        accX: 0,
        accY: -50,
        delay: 1
    };

    PluginProgressBar.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginProgressBar.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            if (!($.isFunction($.fn.appear))) {
                return this;
            }

            var self = this,
                $el = this.options.wrapper,
                delay = 1;

            $el.appear(function() {

                delay = ($el.attr('data-appear-animation-delay') ? $el.attr('data-appear-animation-delay') : self.options.delay);

                $el.addClass($el.attr('data-appear-animation'));

                setTimeout(function() {

                    $el.animate({
                        width: $el.attr('data-appear-progress-animation')
                    }, 1500, 'easeOutQuad', function() {
                        $el.find('.progress-bar-tooltip').animate({
                            opacity: 1
                        }, 500, 'easeOutQuad');
                    });

                }, delay);

            }, {
                accX: self.options.accX,
                accY: self.options.accY
            });

            return this;
        }
    };

    // expose to scope
    $.extend(theme, {
        PluginProgressBar: PluginProgressBar
    });

    // jquery plugin
    $.fn.themePluginProgressBar = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginProgressBar($this, opts);
            }

        });
    }

}).apply(this, [window.theme, jQuery]);

// Masonry
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__masonry';

    var PluginMasonry = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginMasonry.defaults = {
        itemSelector: 'li'
    };

    PluginMasonry.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginMasonry.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            if (!($.isFunction($.fn.isotope))) {
                return this;
            }

            var self = this,
                $window = $(window);

            self.$loader = false;

            if (self.options.wrapper.parents('.masonry-loader').get(0)) {
                self.$loader = self.options.wrapper.parents('.masonry-loader');
                self.createLoader();
            }

            self.options.wrapper.one('layoutComplete', function(event, laidOutItems) {
                self.removeLoader();
            });

            self.options.wrapper.waitForImages(function() {
                self.options.wrapper.isotope(this.options);
            });

            setTimeout(function() {
                self.removeLoader();
            }, 3000);

            return this;
        },

        createLoader: function() {
            var self = this;

            var loaderTemplate = [
                '<div class="bounce-loader">',
                    '<div class="bounce1"></div>',
                    '<div class="bounce2"></div>',
                    '<div class="bounce3"></div>',
                '</div>'
            ].join('');

            self.$loader.append(loaderTemplate);

            return this;
        },

        removeLoader: function() {

            var self = this;

            if (self.$loader) {

                self.$loader.removeClass('masonry-loader-showing');

                setTimeout(function() {
                    self.$loader.addClass('masonry-loader-loaded');
                }, 300);

            }

        }
    };

    // expose to scope
    $.extend(theme, {
        PluginMasonry: PluginMasonry
    });

    // jquery plugin
    $.fn.themePluginMasonry = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginMasonry($this, opts);
            }

        });
    }

}).apply(this, [window.theme, jQuery]);

// Sort
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__sort';

    var PluginSort = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginSort.defaults = {
        useHash: true,
        itemSelector: '.isotope-item',
        layoutMode: 'masonry',
        filter: '*',
        hiddenStyle: {
            opacity: 0
        },
        visibleStyle: {
            opacity: 1
        },
        stagger: 30,
        isOriginLeft: ($('html').attr('dir') == 'rtl' ? false : true)
    };

    PluginSort.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginSort.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            if (!($.isFunction($.fn.isotope))) {
                return this;
            }

            var self = this,
                $source = this.options.wrapper,
                $destination = $('.sort-destination[data-sort-id="' + $source.attr('data-sort-id') + '"]'),
                $window = $(window);

            if ($destination.get(0)) {

                self.$source = $source;
                self.$destination = $destination;
                self.$loader = false;

                self.setParagraphHeight($destination);

                if (self.$destination.parents('.sort-destination-loader').get(0)) {
                    self.$loader = self.$destination.parents('.sort-destination-loader');
                    self.createLoader();
                }

                $destination.attr('data-filter', '*');

                $destination.one('layoutComplete', function(event, laidOutItems) {
                    self.removeLoader();
                });

                $destination.waitForImages(function() {
                    $destination.isotope(self.options);
                    self.events();
                });

                setTimeout(function() {
                    self.removeLoader();
                }, 3000);

            }

            return this;
        },

        events: function() {
            var self = this,
                filter = null,
                $window = $(window);

            self.$source.find('a').click(function(e) {
                e.preventDefault();

                filter = $(this).parent().data('option-value');

                self.setFilter(filter);

                if (e.originalEvent) {
                    self.$source.trigger('filtered');
                }

                return this;
            });

            self.$destination.trigger('filtered');
            self.$source.trigger('filtered');

            if (self.options.useHash) {
                self.hashEvents();
            }

            $window.on('resize', function() {
                setTimeout(function() {
                    self.$destination.isotope('layout');
                }, 300);
            });

            setTimeout(function() {
                $window.trigger('resize');
            }, 300);

            return this;
        },

        setFilter: function(filter) {
            var self = this,
                page = false,
                currentFilter = filter;

            self.$source.find('a.active').removeClass('active');
            self.$source.find('li[data-option-value="' + filter + '"] a').addClass('active');

            self.options.filter = currentFilter;

            if (self.$destination.attr('data-current-page')) {
                currentFilter = currentFilter + '[data-page-rel=' + self.$destination.attr('data-current-page') + ']';
            }

            self.$destination.attr('data-filter', filter).isotope({
                filter: currentFilter
            }).one('arrangeComplete', function( event, filteredItems ) {
                
                if (self.options.useHash) {
                    if (window.location.hash != '' || self.options.filter.replace('.', '') != '*') {
                        window.location.hash = self.options.filter.replace('.', '');
                    }
                }
                
                $(window).trigger('scroll');

            }).trigger('filtered');

            return this;
        },

        hashEvents: function() {
            var self = this,
                hash = null,
                hashFilter = null,
                initHashFilter = '.' + location.hash.replace('#', '');

            if (initHashFilter != '.' && initHashFilter != '.*') {
                self.setFilter(initHashFilter);
            }

            $(window).on('hashchange', function(e) {

                hashFilter = '.' + location.hash.replace('#', '');
                hash = (hashFilter == '.' || hashFilter == '.*' ? '*' : hashFilter);

                self.setFilter(hash);

            });

            return this;
        },

        setParagraphHeight: function() {
            var self = this,
                minParagraphHeight = 0,
                paragraphs = $('span.thumb-info-caption p', self.$destination);

            paragraphs.each(function() {
                if ($(this).height() > minParagraphHeight) {
                    minParagraphHeight = ($(this).height() + 10);
                }
            });

            paragraphs.height(minParagraphHeight);

            return this;
        },

        createLoader: function() {
            var self = this;

            var loaderTemplate = [
                '<div class="bounce-loader">',
                    '<div class="bounce1"></div>',
                    '<div class="bounce2"></div>',
                    '<div class="bounce3"></div>',
                '</div>'
            ].join('');

            self.$loader.append(loaderTemplate);

            return this;
        },

        removeLoader: function() {

            var self = this;

            if (self.$loader) {

                self.$loader.removeClass('sort-destination-loader-showing');

                setTimeout(function() {
                    self.$loader.addClass('sort-destination-loader-loaded');
                }, 300);

            }

        }

    };

    // expose to scope
    $.extend(theme, {
        PluginSort: PluginSort
    });

    // jquery plugin
    $.fn.themePluginSort = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginSort($this, opts);
            }

        });
    }

}).apply(this, [window.theme, jQuery]);

// Carousel
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__carousel';

    var PluginCarousel = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginCarousel.defaults = {
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            479: {
                items: 1
            },
            768: {
                items: 2
            },
            979: {
                items: 3
            },
            1199: {
                items: 4
            }
        },
        navText: []
    };

    PluginCarousel.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginCarousel.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            if (!($.isFunction($.fn.owlCarousel))) {
                return this;
            }

            var self = this,
                $el = this.options.wrapper;

            // Add Theme Class
            $el.addClass('owl-theme');

            // Force RTL according to HTML dir attribute
            if ($('html').attr('dir') == 'rtl') {
                this.options = $.extend(true, {}, this.options, {
                    rtl: true
                });
            }

            if (this.options.items == 1) {
                this.options.responsive = {}
            }

            if (this.options.items > 4) {
                this.options = $.extend(true, {}, this.options, {
                    responsive: {
                        1199: {
                            items: this.options.items
                        }
                    }
                });
            }

            // Auto Height Fixes
            if (this.options.autoHeight) {
                var itemsHeight = [];

                $el.find('.owl-item').each(function(){
                    if( $(this).hasClass('active') ) {
                        itemsHeight.push( $(this).height() );
                    }
                });

                $(window).afterResize(function() {
                    $el.find('.owl-stage-outer').height( Math.max.apply(null, itemsHeight) );
                });

                $(window).on('load', function() {
                    $el.find('.owl-stage-outer').height( Math.max.apply(null, itemsHeight) );
                });
            }

            // Initialize OwlCarousel
            $el.owlCarousel(this.options).addClass('owl-carousel-init');

            return this;
        }
    };

    // expose to scope
    $.extend(theme, {
        PluginCarousel: PluginCarousel
    });

    // jquery plugin
    $.fn.themePluginCarousel = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginCarousel($this, opts);
            }

        });
    }

}).apply(this, [window.theme, jQuery]);

// Counter
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__counter';

    var PluginCounter = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginCounter.defaults = {
        accX: 0,
        accY: 0,
        speed: 3000,
        refreshInterval: 100,
        decimals: 0,
        onUpdate: null,
        onComplete: null
    };

    PluginCounter.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginCounter.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            if (!($.isFunction($.fn.countTo))) {
                return this;
            }

            var self = this,
                $el = this.options.wrapper;

            $.extend(self.options, {
                onComplete: function() {
                    if ($el.data('append')) {
                        $el.html($el.html() + $el.data('append'));
                    }

                    if ($el.data('prepend')) {
                        $el.html($el.data('prepend') + $el.html());
                    }
                }
            });

            $el.appear(function() {

                $el.countTo(self.options);

            }, {
                accX: self.options.accX,
                accY: self.options.accY
            });

            return this;
        }
    };

    // expose to scope
    $.extend(theme, {
        PluginCounter: PluginCounter
    });

    // jquery plugin
    $.fn.themePluginCounter = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginCounter($this, opts);
            }

        });
    }

}).apply(this, [window.theme, jQuery]);

// Video Background
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__videobackground';

    var PluginVideoBackground = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginVideoBackground.defaults = {
        overlay: true,
        volume: 1,
        playbackRate: 1,
        muted: true,
        loop: true,
        autoplay: true,
        position: '50% 50%',
        posterType: 'detect'
    };

    PluginVideoBackground.prototype = {
        initialize: function($el, opts) {
            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginVideoBackground.defaults, opts, {
                path: this.$el.data('video-path'),
                wrapper: this.$el
            });

            return this;
        },

        build: function() {

            if (!($.isFunction($.fn.vide)) || (!this.options.path)) {
                return this;
            }

            if (this.options.overlay) {
                this.options.wrapper.prepend(
                    $('<div />').addClass('video-overlay')
                );
            }

            this.options.wrapper.vide(this.options.path, this.options);

            return this;
        }
    };

    // expose to scope
    $.extend(theme, {
        PluginVideoBackground: PluginVideoBackground
    });

    // jquery plugin
    $.fn.themePluginVideoBackground = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginVideoBackground($this, opts);
            }

        });
    }

}).apply(this, [window.theme, jQuery]);

// Thumbnail Gallery
(function($) {

    'use strict';

    // Thumb Gallery
    var $thumbGalleryDetail1 = $('#thumbGalleryDetail'),
        $thumbGalleryThumbs1 = $('#thumbGalleryThumbs'),
        flag = false,
        duration = 300;

    $thumbGalleryDetail1
        .owlCarousel({
            items: 1,
            margin: 10,
            nav: true,
            dots: false,
            loop: false,
            navText: []
        })
        .on('changed.owl.carousel', function(e) {
            if (!flag) {
                flag = true;
                $thumbGalleryThumbs1.trigger('to.owl.carousel', [e.item.index-1, duration, true]);
                flag = false;
            }
        });

    $thumbGalleryThumbs1
        .owlCarousel({
            margin: 15,
            items: 4,
            nav: false,
            center: false,
            dots: false
        })
        .on('click', '.owl-item', function() {
            $thumbGalleryDetail1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
        })
        .on('changed.owl.carousel', function(e) {
            if (!flag) {
                flag = true;
                $thumbGalleryDetail1.trigger('to.owl.carousel', [e.item.index, duration, true]);
                flag = false;
            }
        });

    // Thumb Gallery 2
    var $thumbGalleryDetail2 = $('#thumbGalleryDetail2'),
        $thumbGalleryThumbs2 = $('#thumbGalleryThumbs2'),
        flag = false,
        duration = 300;

    $thumbGalleryDetail2
        .owlCarousel({
            items: 1,
            margin: 10,
            nav: false,
            dots: false
        })
        .on('changed.owl.carousel', function(e) {
            if (!flag) {
                flag = true;
                $thumbGalleryThumbs2.trigger('to.owl.carousel', [e.item.index, duration, true]);
                flag = false;
            }
        });

    $thumbGalleryThumbs2
        .owlCarousel({
            margin: 15,
            items: 4,
            nav: false,
            center: true,
            dots: false
        })
        .on('click', '.owl-item', function() {
            $thumbGalleryDetail2.trigger('to.owl.carousel', [$(this).index(), duration, true]);

        })
        .on('changed.owl.carousel', function(e) {
            if (!flag) {
                flag = true;
                $thumbGalleryDetail2.trigger('to.owl.carousel', [e.item.index, duration, true]);
                flag = false;
            }
        });

}).apply(this, [jQuery]);

// Revolution Slider
(function(theme, $) {

    theme = theme || {};

    var instanceName = '__revolution';

    var PluginRevolutionSlider = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginRevolutionSlider.defaults = {
        sliderType: 'standard',
        sliderLayout: 'fullwidth',
        delay: 9000,
        gridwidth: 1170,
        gridheight: 500,
        spinner: 'spinner3',
        disableProgressBar: 'on',
        parallax: {
            type: 'off',
            bgparallax: 'off'
        },
        navigation: {
            keyboardNavigation: 'off',
            keyboard_direction: 'horizontal',
            mouseScrollNavigation: 'off',
            onHoverStop: 'off',
            touch: {
                touchenabled: 'on',
                swipe_threshold: 75,
                swipe_min_touches: 1,
                swipe_direction: 'horizontal',
                drag_block_vertical: false
            },
            arrows: {
                enable: true,
                hide_onmobile: false,
                hide_under: 0,
                hide_onleave: true,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                left: {
                    h_align: 'left',
                    v_align: 'center',
                    h_offset: 30,
                    v_offset: 0
                },
                right: {
                    h_align: 'right',
                    v_align: 'center',
                    h_offset: 30,
                    v_offset: 0
                }
            }
        }
    };

    PluginRevolutionSlider.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build()
                .events();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginRevolutionSlider.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            if (!($.isFunction($.fn.revolution))) {
                return this;
            }

            // Single Slider Class
            if(this.options.wrapper.find('> ul > li').length == 1) {
                this.options.wrapper.addClass('slider-single-slide');
            }

            this.options.wrapper.revolution(this.options);

            return this;
        },

        events: function() {

            return this;
        }
    };

    // expose to scope
    $.extend(theme, {
        PluginRevolutionSlider: PluginRevolutionSlider
    });

    // jquery plugin
    $.fn.themePluginRevolutionSlider = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginRevolutionSlider($this, opts);
            }

        });
    }

}).apply(this, [window.theme, jQuery]);

// Sticky
(function(theme, $) {
    
    theme = theme || {};
    
    var instanceName = '__sticky';

    var PluginSticky = function($el, opts) {
        return this.initialize($el, opts);
    };

    PluginSticky.defaults = {
        minWidth: 991,
        activeClass: 'sticky-active'
    };

    PluginSticky.prototype = {
        initialize: function($el, opts) {
            if ( $el.data( instanceName ) ) {
                return this;
            }

            this.$el = $el;

            this
                .setData()
                .setOptions(opts)
                .build();

            return this;
        },

        setData: function() {
            this.$el.data(instanceName, this);

            return this;
        },

        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginSticky.defaults, opts, {
                wrapper: this.$el
            });

            return this;
        },

        build: function() {
            if (!($.isFunction($.fn.pin))) {
                return this;
            }

            var self = this,
                $window = $(window);
            
            self.options.wrapper.pin(self.options);

            $window.afterResize(function() {
                self.options.wrapper.removeAttr('style').removeData('pin');
                self.options.wrapper.pin(self.options);
                $window.trigger('scroll');
            });
            
            return this;
        }
    };

    // expose to scope
    $.extend(theme, {
        PluginSticky: PluginSticky
    });

    // jquery plugin
    $.fn.themePluginSticky = function(opts) {
        return this.map(function() {
            var $this = $(this);

            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginSticky($this, opts);
            }
            
        });
    }

}).apply(this, [ window.theme, jQuery ]);

// Nav
(function(theme, $) {

    theme = theme || {};

    var initialized = false;

    $.extend(theme, {

        Nav: {

            defaults: {
                wrapper: $('#mainNav'),
                scrollDelay: 600,
                scrollAnimation: 'easeOutQuad'
            },

            initialize: function($wrapper, opts) {
                if (initialized) {
                    return this;
                }

                initialized = true;
                this.$wrapper = ($wrapper || this.defaults.wrapper);

                this
                    .setOptions(opts)
                    .build()
                    .events();

                return this;
            },

            setOptions: function(opts) {
                this.options = $.extend(true, {}, this.defaults, opts, theme.fn.getOptions(this.$wrapper.data('plugin-options')));

                return this;
            },

            build: function() {
                var self = this,
                    $html = $('html'),
                    $header = $('#header'),
                    thumbInfoPreview;

                // Add Arrows
                $header.find('.dropdown-toggle, .dropdown-submenu > a').append($('<i />').addClass('fa fa-caret-down'));

                // Preview Thumbs
                self.$wrapper.find('a[data-thumb-preview]').each(function() {
                    thumbInfoPreview = $('<span />').addClass('thumb-info thumb-info-preview')
                                            .append($('<span />').addClass('thumb-info-wrapper')
                                                .append($('<span />').addClass('thumb-info-image').css('background-image', 'url(' + $(this).data('thumb-preview') + ')')
                                           )
                                       );

                    $(this).append(thumbInfoPreview);
                });

                // Side Header Right (Reverse Dropdown)
                if($html.hasClass('side-header-right')) {
                    $header.find('.dropdown').addClass('dropdown-reverse');
                }

                // Reverse
                self.checkReverse = function() {

                    self.$wrapper.find('.dropdown-reverse-auto').removeClass('dropdown-reverse dropdown-reverse-auto');

                    self.$wrapper.find('.dropdown-submenu:not(.manual)').each(function() {
                        if(!$(this).find('.dropdown-menu').visible( false, true, 'horizontal' )  ) {
                            $(this).parents('.dropdown').addClass('dropdown-reverse dropdown-reverse-auto');
                        }
                    });
                }

                self.checkReverse();

                $(window).afterResize(function() {
                    self.checkReverse();
                });

                return this;
            },

            events: function() {
                var self    = this,
                    $html   = $('html'),
                    $header = $('#header'),
                    $window = $(window);

                $header.find('a[href="#"]').on('click', function(e) {
                    e.preventDefault();
                });

                // Mobile Arrows
                $header.find('.dropdown-toggle[href="#"], .dropdown-submenu a[href="#"], .dropdown-toggle[href!="#"] .fa-caret-down, .dropdown-submenu a[href!="#"] .fa-caret-down').on('click', function(e) {
                    e.preventDefault();
                    if ($window.width() < 992) {
                        $(this).closest('li').toggleClass('opened');
                    }
                });

                // Touch Devices with normal resolutions
                if('ontouchstart' in document.documentElement) {
                    $header.find('.dropdown-toggle:not([href="#"]), .dropdown-submenu > a:not([href="#"])')
                        .on('touchstart click', function(e) {
                            if($window.width() > 991) {

                                e.stopPropagation();
                                e.preventDefault();

                                if(e.handled !== true) {

                                    var li = $(this).closest('li');

                                    if(li.hasClass('tapped')) {
                                        location.href = $(this).attr('href');
                                    }

                                    li.addClass('tapped');

                                    e.handled = true;
                                } else {
                                    return false;
                                }

                                return false;

                            }
                        })
                        .on('blur', function(e) {
                            $(this).closest('li').removeClass('tapped');
                        });

                }

                // Collapse Nav
                $header.find('[data-collapse-nav]').on('click', function(e) {
                    $(this).parents('.collapse').removeClass('in');
                });

                // Anchors Position
                $('[data-hash]').each(function() {

                    var target = $(this).attr('href'),
                        offset = ($(this).is("[data-hash-offset]") ? $(this).data('hash-offset') : 0);

                    if($(target).get(0)) {
                        $(this).on('click', function(e) {
                            e.preventDefault();

                            // Close Collapse if Opened
                            $(this).parents('.collapse.in').removeClass('in');

                            self.scrollToTarget(target, offset);

                            return;
                        });
                    }

                });

                // Flex header
                var isIE9        = $html.hasClass('ie9'),
                    isHeaderFlex = $header.hasClass('header-flex')
                    isEdge       = /Edge/.test(navigator.userAgent);
 
                if( isIE9 && isHeaderFlex && $window.width() > 991 ) {
                    headerNavHeight = 

                    $header.find('.header-nav').css({
                        height: ( $header.find('.header-top').get(0) ) ? ( $header.find('.header-body').height() - $header.find('.header-top').outerHeight() ) + 4 : $header.find('.header-body').height()
                    });
 
                    $header.find('.header-nav-main nav > ul > li > a').css({
                        'line-height': $('.header-nav-main nav > ul > li > a').height() + 'px'
                    });
 
                    $header.find('.header-nav .header-social-icons').css({
                        'line-height': $header.find('.header-nav').height() + 'px'
                    });
                }

                if( isEdge ) {
                    $('#header.header-flex .header-nav-main nav > ul > li.dropdown .dropdown-menu').css({
                        'margin-top' : '-1px'
                    });
                }

                return this;
            },

            scrollToTarget: function(target, offset) {
                var self = this;

                $('body').addClass('scrolling');

                $('html, body').animate({
                    scrollTop: $(target).offset().top - offset
                }, self.options.scrollDelay, self.options.scrollAnimation, function() {
                    $('body').removeClass('scrolling');
                });

                return this;

            }

        }

    });

}).apply(this, [window.theme, jQuery]);