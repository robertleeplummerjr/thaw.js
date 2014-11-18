/**
 * thaw an array of items
 * @param {Array} items
 * @param {Object} [options]
 * @constructor
 */
var Thaw = (function() {

	//private variables
	var thawing = false,
		thaws = [];

	function setDefaults(options) {
		var defaultSettings = Constructor.defaultSettings;

		if (options !== undefined) {
			for(var key in defaultSettings) {
				if (defaultSettings.hasOwnProperty(key)) {
					if (!options.hasOwnProperty(key)) {
						options[key] = defaultSettings[key];
					}
				}
			}
		} else {
			options = defaultSettings;
		}
		return options;
	}

	//Constructor
	function Constructor(items, options) {
		options = setDefaults(options);

		var timeout,
			each = options.each,
			done = options.done,
			self = this,
			tick = this.tick = function () {
				var items = self.items,
					i = self.i;

				if (i < 0) return;

				timeout = setTimeout(tick, 0);

				if (!thawing) {
					if (i >= items.length) {

						if (done !== null) {
							thawing = true;
							done.call(items[i]);
							thawing = false;
							self.i = -1;
						}

						clearTimeout(timeout);
						return;
					}

					if (each !== null) {
						thawing = true;
						each.call(items[i], i);
						thawing = false;
					} else {
						items[i]();
					}
					self.i++;
				}
			};

		this.i = 0;
		this.items = items;

		thaws.push(this);

		tick();
	}

	/**
	 *
	 * @type {{each: null, done: null}}
	 */
	Constructor.defaultSettings = {
		each: null,
		done: null
	};

	Constructor.prototype = {
		/**
		 *
		 * @param item
		 */
		add: function(item) {
			var doTick = false;

			if (this.i < 1) {
				this.i = this.items.length;
				doTick = true;
			}

			this.items.push(item);

			if (doTick) {
				this.tick();
			}
		},

		/**
		 *
		 * @param items
		 */
		addArray: function(items) {
			var doTick = false;

			if (this.i < 1) {
				this.i = this.items.length;
				doTick = true;
			}

			this.items.concat(items);

			if (doTick) {
				this.tick();
			}
		},

		/**
		 *
		 */
		stop: function() {
			this.i = -1;
		}
	};

	/**
	 * thaw a single item
	 * @param {Object} item
	 * @param {Object} [options]
	 */
	Constructor.it = function(item, options) {
		return new Constructor([item], options)
	};

	/**
	 * returns if Thaw.js is thawing
	 * @returns {boolean}
	 */
	Constructor.isThawing = function() {
		return thawing;
	};

	/**
	 * Stops all Thaw.js instances
	 */
	Constructor.stopAll = function() {
		var i = 0,
			max = thaws.length;

		for(;i< max; i++) {
			thaws[i].stop();
		}
	};

	return Constructor;
})(),

/**
 * wraps the constructor Thaw
 * @param {Array} items
 * @param {Object} [options]
 * @returns Thaw
 */
thaw = (function(Thaw) {
	function fn(items, options) {
		return new Thaw(items, options);
	}

	fn.stopAll = Thaw.stopAll;
	fn.isThawing = Thaw.isThawing;

	return fn;
})(Thaw);