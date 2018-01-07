import assert from 'assert';
import Thaw, { Block } from '../src/';

describe('Thaw', () => {
  it('stopping', () => {
    const t = new Thaw([0,1,2,3], {
      each: () => {

      }
    });

    t.stop();

    assert.equal(-1, t.i, 'is the index correct?');
  });

  it('adding', () => {
    const t = new Thaw([0,1,2,3], {
      each: () => {

      }
    });

    t.add(4);

    assert.equal(t.items.length, 5, 'is the length correct?');
    assert.equal(t.items.join(','), '0,1,2,3,4', 'array is correct?');
  });

  it('inserting', () => {
    const t = new Thaw([0,1,2,3], {
      each: () => {

      }
    });

    t.insert(4);

    assert.equal(t.items.length, 5, 'is the length correct?');
    assert.equal(t.items.join(','), '0,4,1,2,3', 'array is correct?');
  });

  it('adding array', () => {
    const t = new Thaw([0,1,2,3], {
      each: () => {

      }
    });

    t.addArray([4,5,6,7]);

    assert.equal(t.items.length, 8, 'is the length correct?');
    assert.equal(t.items.join(','), '0,1,2,3,4,5,6,7', 'array is correct');
  });

  it('inserting array', () => {
    const t = new Thaw([0,1,2,3], {
      each: () => {

      }
    });

    t.insertArray([4,5,6,7]);

    assert.equal(t.items.length, 8, 'is the length correct?');
    assert.equal(t.items.join(','), '0,4,5,6,7,1,2,3', 'array is correct');
  });


  it('stopping, adding, going', () => {
    const t = new Thaw([0,1,2,3], {
      each: () => {

      }
    });

    t.stop();

    t.add(4);

    assert.equal(t.i > -1, true, 'is thawing');
  });

  it('use thaw block', () => {
    const t = new Block({
      each: () => {

      }
    });

    t.addArray([0,1,2,3]);
    t.addArray([0,1,2,3]);
    t.addArray([0,1,2,3]);

    assert.equal(t.index === 3, true, 'is thawing');
  });


  it('stop thaw block', () => {
    const t = new Block({
      each: () => {

      }
    });

    t.addArray([0,1,2,3]);
    t.addArray([0,1,2,3]);
    t.addArray([0,1,2,3]);

    t.stop();

    assert.equal(t.thaws[0].i === -1, true, 'is thawing');
    assert.equal(t.thaws[1].i === -1, true, 'is thawing');
    assert.equal(t.thaws[2].i === -1, true, 'is thawing');
  });

  it('thaw block iteration', () => {
    const t = new Block({
      each: () => {

      }
    },2);

    t.addArray([0,1,2,3]);
    t.addArray([0,1,2,3]);
    t.addArray([0,1,2,3]);

    assert.equal(t.thaws[0].items.length === 8, true, 'added to correct array');
    assert.equal(t.thaws[1].items.length === 4, true, 'added to correct array');
  });
});