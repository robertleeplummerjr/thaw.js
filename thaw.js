var thaw = (function() {

	function createFutureDate(milliseconds) {
		var t = new Date();
		t.setTime(t.getTime() + milliseconds);
		return t;
	}

	var defaultSettings = {
			each: function() {},
			done: function() {}
		},
		thawing = false;

	/**
	 *
	 * @param {Array} items
	 * @param {Object} [options]
	 * @param {Number} [burnTime]
	 */
	function thaw(items, options, burnTime) {
		burnTime = (burnTime !== undefined ? burnTime : 50);

		if (options !== undefined) {
			for(var key in defaultSettings) {
				if (defaultSettings.hasOwnProperty(key)) {
					if (!options.hasOwnProperty(key)) {
						options[key] = defaultSettings[key];
					}
				}
			}
		} else {
			options = {};
		}

		var i = 0,
			each = (options.each !== undefined ? options.each : null),
			done = (options.done !== undefined ? options.done : null),
			tick = function() {
				if(i<0) return;

				setTimeout(tick, 0);

				if (!thawing) {
					if ((new Date()) < createFutureDate(burnTime)) {
						if (i >= items.length) {
							i = -1;
							thawing = true;
							if (done !== null) done.call(items[i]);
							thawing = false;
							return;
						}
						thawing = true;
						if (each !== null) each.call(items[i], i);
						thawing = false;
						i++;
					}
				}
			};

		tick();
	}

	thaw.isThawing = function() {
		return thawing;
	};

	return thaw;
})();