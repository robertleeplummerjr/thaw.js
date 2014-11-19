var Thaw = (function(window) {

	//private variables
	var thawing = false,
		thaws = [];

	/**
	 * thaw an array of items
	 * @param {Array} items
	 * @param {Object} [options]
	 * @constructor
	 */
	function Thaw(items, options) {
		options = options || {};

		var timeout,
			each = options.each || null,
			done = options.done || null,
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
						}

						self.i = -1;
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
	Thaw.defaultSettings = {
		each: null,
		done: null
	};

	Thaw.prototype = {
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

			this.items = this.items.concat(items);

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
	Thaw.it = function(item, options) {
		return new Constructor([item], options)
	};

	/**
	 * returns if Thaw.js is thawing
	 * @returns {boolean}
	 */
	Thaw.isThawing = function() {
		return thawing;
	};

	/**
	 * Stops all Thaw.js instances
	 */
	Thaw.stopAll = function() {
		var i = 0,
			max = thaws.length;

		for(;i< max; i++) {
			thaws[i].stop();
		}
	};


	/**
	 * simple thaw
	 * @param {Array} items
	 * @param {Object} [options]
	 * @returns Thaw
	 */
	function thaw(items, options) {
		options = options || {};

		var timeout,
			i = 0,
			done = options.done || null,
			each = options.each || null;

		function tick() {
			if (i < 0) return;

			timeout = setTimeout(tick, 0);

			if (!thawing) {
				if (i >= items.length) {

					if (done !== null) {
						thawing = true;
						done.call(items[i]);
						thawing = false;
					}

					i = -1;
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
				i++;
			}
		}

		tick();
	}

	thaw.stopAll = Thaw.stopAll;
	thaw.isThawing = Thaw.isThawing;

	if (window !== null) {
		window.thaw = thaw;
	}

	return Thaw;
})(typeof window !== 'undefined' ? window : null);