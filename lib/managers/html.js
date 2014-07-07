var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = function(Piler) {
  var HTMLManager, HTMLPile;
  HTMLPile = (function(_super) {
    __extends(HTMLPile, _super);


    /**
     * @member {String} Piler.Main.HTMLPile#ext
     * @default "html"
     */

    HTMLPile.prototype.ext = 'html';


    /**
     * Add line comment
     *
     * @function Piler.Main.HTMLPile#commentLine
     * @returns {String}
     */

    HTMLPile.prototype.commentLine = function(line) {
      return "<!-- " + (line.trim()) + " -->";
    };


    /**
     * @augments Piler.Main.BasePile
     * @constructor Piler.Main.HTMLPile
     */

    function HTMLPile() {
      HTMLPile.__super__.constructor.apply(this, arguments);
    }

    return HTMLPile;

  })(Piler.getPile('BasePile'));
  HTMLManager = (function(_super) {
    __extends(HTMLManager, _super);


    /**
     * @member {Piler.Main.HTMLPile} Piler.Main.HTMLManager#type
     * @default {Piler.Main.HTMLPile}
     */

    HTMLManager.prototype.type = HTMLPile;


    /**
     * @member {String} Piler.Main.HTMLManager#contentType
     * @default "text/html"
     */

    HTMLManager.prototype.contentType = 'text/html';


    /**
     * @constructor Piler.Main.HTMLManager
     * @augments Piler.Main.PileManager
     */

    function HTMLManager() {
      HTMLManager.__super__.constructor.apply(this, arguments);
      return;
    }


    /**
     * @function Piler.Main.HTMLManager#setMiddleware
     * @returns {Piler.Main.HTMLManager} `this`
     */

    HTMLManager.prototype.locals = function(response) {
      var namespace;
      HTMLManager.__super__.locals.call(this, response);
      if (!Piler.utils.objectPath.get(this, 'html.namespace')) {
        Piler.Main.debug('setting HTMLManager locals');
        namespace = this.createTempNamespace();
        Piler.utils.objectPath.set(this, 'html.namespace', namespace);
      } else {
        namespace = this.html.namespace;
      }
      response.piler.html = {
        namespace: namespace,
        addMultiline: this.bindToPile('addMultiline', namespace),
        addRaw: this.bindToPile('addRaw', namespace),
        addFile: this.bindToPile('addFile', namespace)
      };
      return this;
    };


    /**
     * @function Piler.Main.HTMLManager#render
     * @returns {Promise}
     */

    HTMLManager.prototype.render = function(namespaces) {
      var namespace;
      namespaces = this._prepareNamespaces(namespaces);
      return Piler.utils.Promise.reduce((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = namespaces.length; _i < _len; _i++) {
          namespace = namespaces[_i];
          if (this.piles[namespace]) {
            _results.push(this.piles[namespace]);
          }
        }
        return _results;
      }).call(this), function(tags, source) {
        return source.pileUp().then(function(code) {
          return tags += "" + code + "\n";
        });
      }, '');
    };

    HTMLManager.prototype.middleware = function() {
      return HTMLManager.__super__.middleware.apply(this, arguments);
    };

    return HTMLManager;

  })(Piler.getManager('PileManager'));
  Piler.addManager('html', function() {
    return HTMLManager;
  });
  Piler.addPile('html', function() {
    return HTMLPile;
  });
};