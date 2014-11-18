tf.test('stopping', function() {
	var t = thaw([0,1,2,3], {
		each: function() {

		}
	});

	t.stop();

	tf.assertEquals(-1, t.i, 'is the index correct?');
});

tf.test('adding', function() {
	var t = thaw([0,1,2,3], {
		each: function() {

		}
	});

	t.add(4);

	t.stop();

	tf.assertEquals(t.items.length, 5, 'is the length correct?');
});


tf.test('stopping, adding, going', function() {
	var t = thaw([0,1,2,3], {
		each: function() {

		}
	});

	t.stop();

	t.add(4);

	tf.assertEquals(t.i > -1, true, 'is thawing');
});