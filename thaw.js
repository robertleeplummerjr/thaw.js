var thaw = (function() {
	function createFutureDate(milliseconds)
	{
		var t = new Date();
		t.setTime(t.getTime() + milliseconds);
		return t;
	}

	var defaultSettings = {
			each: function() {},
			done: function() {}
		},
		thawing = false;

	function thaw(items, burnTime, options) {
		var i = 0,
			_each = function() {
				if(i<0) return;

				setTimeout(_each, 0);
				if (!thawing) {
					if ((new Date()) < createFutureDate(burnTime)) {
						if (i >= items.length) {
							i = -1;
							options.done.call(items[i]);
							return;
						}
						thawing = true;
						options.each.call(items[i], i);
						thawing = false;
						i++;
					}
				}
			};

		if (options !== undefined) {
			for(var key in defaultSettings) {
				if (defaultSettings.hasOwnProperty(key)) {
					if (!options.hasOwnProperty(key)) {
						options[key] = defaultSettings[key];
					}
				}
			}
		}

		_each();
	}

	thaw.isThawing = function() {
		return thawing;
	};

	return thaw;
})();