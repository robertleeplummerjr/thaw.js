tf.test('stopping', function() {
	var t = new Thaw([0,1,2,3], {
		each: function() {

		}
	});

	t.stop();

	tf.assertEquals(-1, t.i, 'is the index correct?');
});

tf.test('adding', function() {
	var t = new Thaw([0,1,2,3], {
		each: function() {

		}
	});

	t.add(4);

	tf.assertEquals(t.items.length, 5, 'is the length correct?');
	tf.assertEquals(t.items.join(','), '0,1,2,3,4', 'array is correct?');
});

tf.test('inserting', function() {
	var t = new Thaw([0,1,2,3], {
		each: function() {

		}
	});

	t.insert(4);

	tf.assertEquals(t.items.length, 5, 'is the length correct?');
	tf.assertEquals(t.items.join(','), '0,4,1,2,3', 'array is correct?');
});

tf.test('adding array', function() {
	var t = new Thaw([0,1,2,3], {
		each: function() {

		}
	});

	t.addArray([4,5,6,7]);

	tf.assertEquals(t.items.length, 8, 'is the length correct?');
	tf.assertSame(t.items.join(','), '0,1,2,3,4,5,6,7', 'array is correct');
});

tf.test('inserting array', function() {
	var t = new Thaw([0,1,2,3], {
		each: function() {

		}
	});

	t.insertArray([4,5,6,7]);

	tf.assertEquals(t.items.length, 8, 'is the length correct?');
	tf.assertSame(t.items.join(','), '0,4,5,6,7,1,2,3', 'array is correct');
});


tf.test('stopping, adding, going', function() {
	var t = new Thaw([0,1,2,3], {
		each: function() {

		}
	});

	t.stop();

	t.add(4);

	tf.assertEquals(t.i > -1, true, 'is thawing');
});