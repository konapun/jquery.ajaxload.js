/*
 * Dynamically load content via AJAX
 *
 * Author: Bremen Braun
 */
;(function($) {
  'use strict';

  function AjaxLoader($this, options) {
    if ($this.prop('tagName').toLowerCase() !== 'form') {
      throw new Error("ajaxLoad must be called on a form tag (got " + $this.prop('tagName') + ")");
    }

    var opts = $.extend({
      url: $this.attr('action'),
      data: {},
      beforeSubmit: function() {},
      afterLoad: function() {},
      parseURL: true,
      parseMap: {},
      target: $this
    }, options);

    var self = this;
    self.beforeSubmit = [ opts.beforeSubmit ];
    self.onLoad = [ opts.afterLoad ];

    $this.submit(function(event) {
      event.preventDefault();

      self.load(opts.target, opts);
    });
  }

  /*
   * Support replacement of placeholders in a URL with actual data from a map
   * object containing values to be used for the keys from url. If no map is
   * given, this attempts to find values by treating key from the url as
   * selectors
   */
  function parse(url, map) {
    var tags = {
      start: '[',
      end:   ']'
    };

    var route = "";
    var tokens = url.split(/(\[|\])/);
    var inTag = false;
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      switch (token) {
        case tags.start:
          inTag = true;
          break;
        case tags.end:
          inTag = false;
          break;
        default:
          if (inTag) {
            var key = token;
            if (map && map[key]) { // try to find value in map
              route += map[key];
            }
            else { // get value by treating key as a selector
              route += $(key).val();
            }
          }
          else {
            route += token;
          }
      }
    }

    return route;
  }

  AjaxLoader.prototype.load = function(target, options) {
    var self = this;
    var opts = $.extend({
      error: function() {}
    }, options);

    if (opts.parseURL) {
      opts.url = parse(opts.url, opts.parseMap);
    }

    for (var i = 0; i < self.beforeSubmit.length; i++) {
      var fn = self.beforeSubmit[i];

      if (fn(opts.url) === false) {
        return false;
      }
    }

    $.ajax({
      url: opts.url,
      data: opts.data,
      success: function(data) {
        target.html(data);

        for (var i = 0; i < self.onLoad.length; i++) {
          var fn = self.onLoad[i];

          fn(data);
        }
      },
      error: function(err) {
        opts.error(err);
      }
    });
  };

  $.fn.ajaxLoad = function(opts) {
    return new AjaxLoader(this, opts);
  };
}(jQuery));
