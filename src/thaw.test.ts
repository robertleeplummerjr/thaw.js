import { Thaw, thaw } from './thaw';
import { makeTestItems } from './test-utils';

describe('Thaw', () => {
  describe('.stop()', () => {
    it('resets .isStopped to true', () => {
      const t = new Thaw(makeTestItems(1), {
        each: () => {

        }
      });

      t.stop();

      expect(t.isStopped).toBe(true);
    });

    describe('when already stopped', () => {
      it('calling .add() restarts thawing', () => {
        const item1 = jest.fn();
        const item2 = jest.fn();
        const item3 = jest.fn();
        const item4 = jest.fn();
        const t = new Thaw([item1, item2, item3, item4], {
          each: () => {

          }
        });

        expect(t.i).toBe(1);
        expect(t.isStopped).toBe(false);
        t.stop();
        expect(t.isStopped).toBe(true);

        const item5 = jest.fn();
        t.add(item5);

        expect(t.i).toBe(2);
        expect(t.isStopped).toBe(false);
        expect(t.items).toEqual([item1, item2, item3, item4, item5]);
      });
    });

    describe('when options.stop is set', () => {
      it('options.done is called', () => {
        const done = jest.fn();
        const t = new Thaw([], { done });
        t.stop();
        expect(done).toHaveBeenCalled();
      });
    });
  });

  describe('.add()', () => {
    it('adds the new item to .items', () => {
      const item1 = jest.fn();
      const item2 = jest.fn();
      const item3 = jest.fn();
      const item4 = jest.fn();
      const t = new Thaw([item1, item2, item3, item4], {
        each: () => {

        }
      }) as any;

      const item5 = jest.fn();
      t.add(item5);

      expect(t.items.length).toEqual(5);
      expect(t.items).toEqual([item1, item2, item3, item4, item5]);
    });
  });

  describe('.insert()', () => {
    it('inserts the item to .items just after the current item', () => {
      const item1 = jest.fn();
      const item2 = jest.fn();
      const item3 = jest.fn();
      const item4 = jest.fn();
      const t = new Thaw([item1, item2, item3, item4], {
        each: () => {

        }
      }) as any;

      const item5 = jest.fn();
      t.insert(item5);

      expect(t.items.length).toEqual(5);
      expect(t.items).toEqual([item1, item5, item2, item3, item4]);
    });
    describe('when .stop() was not called prior', () => {
      it('does not call .tick()', () => {
        const item1 = jest.fn();
        const item2 = jest.fn();
        const t = new Thaw([item1]);
        expect(item1).toBeCalled();

        const tickSpy = jest.spyOn(t, 'tick');
        t.insert(item2);
        expect(item1).toBeCalled();
        expect(item2).not.toBeCalled();
        expect(tickSpy).not.toBeCalled();
      });
    });
    describe('when .stop() was called prior', () => {
      it('calls .tick() to reactivate thawing', () => {
        const item1 = jest.fn();
        const item2 = jest.fn();
        const t = new Thaw([item1]);
        expect(item1).toBeCalled();

        t.stop();
        const tickSpy = jest.spyOn(t, 'tick');
        t.insert(item2);
        expect(item1).toBeCalled();
        expect(item2).toBeCalled();
        expect(tickSpy).toBeCalled();
      });
    });
  });

  describe('.addArray()', () => {
    it('concatenates the items to .items', () => {
      const item1 = jest.fn();
      const item2 = jest.fn();
      const item3 = jest.fn();
      const item4 = jest.fn();
      const t = new Thaw([item1, item2, item3, item4], {
        each: () => {

        }
      }) as any;

      const item5 = jest.fn();
      const item6 = jest.fn();
      const item7 = jest.fn();
      const item8 = jest.fn();
      t.addArray([item5, item6, item7, item8]);

      expect(t.items.length).toEqual(8);
      expect(t.items).toEqual([item1, item2, item3, item4, item5, item6, item7, item8]);
    });
    describe('when .stop() was not called prior', () => {
      it('does not call .tick()', () => {
        const item1 = jest.fn();
        const item2 = jest.fn();
        const t = new Thaw([item1]);
        expect(item1).toBeCalled();

        const tickSpy = jest.spyOn(t, 'tick');
        t.addArray([item2]);
        expect(item1).toBeCalled();
        expect(item2).not.toBeCalled();
        expect(tickSpy).not.toBeCalled();
      });
    });
    describe('when .stop() was called prior', () => {
      it('calls .tick() to reactivate thawing', () => {
        const item1 = jest.fn();
        const item2 = jest.fn();
        const t = new Thaw([item1]);
        expect(item1).toBeCalled();

        t.stop();
        const tickSpy = jest.spyOn(t, 'tick');
        t.addArray([item2]);
        expect(item1).toBeCalled();
        expect(item2).toBeCalled();
        expect(tickSpy).toBeCalled();
      });
    });
  });

  describe('.insertArray()', () => {
    it('splices this array between the next item, and the rest already contained', () => {
      const item1 = jest.fn();
      const item2 = jest.fn();
      const item3 = jest.fn();
      const item4 = jest.fn();
      const t = new Thaw([item1, item2, item3, item4], {
        each: () => {

        }
      }) as any;

      const item5 = jest.fn();
      const item6 = jest.fn();
      const item7 = jest.fn();
      const item8 = jest.fn();
      t.insertArray([item5, item6, item7, item8]);

      expect(t.items.length).toEqual(8);
      expect(t.items).toEqual([item1, item5, item6, item7, item8, item2, item3, item4]);
    });
    describe('when .stop() was not called prior', () => {
      it('does not call .tick()', () => {
        const item1 = jest.fn();
        const item2 = jest.fn();
        const item3 = jest.fn();
        const t = new Thaw([item1, item2]);
        expect(item1).toBeCalled();
        expect(item2).not.toBeCalled();

        const tickSpy = jest.spyOn(t, 'tick');
        t.insertArray([item3]);
        expect(item1).toBeCalled();
        expect(item2).not.toBeCalled();
        expect(item3).not.toBeCalled();
        expect(tickSpy).not.toBeCalled();
      });
    });
    describe('when .stop() was called prior', () => {
      it('calls .tick() to reactivate thawing', () => {
        const item1 = jest.fn();
        const item2 = jest.fn();
        const item3 = jest.fn();
        const t = new Thaw([item1, item2]);
        expect(item1).toBeCalled();
        expect(item2).not.toBeCalled();

        t.stop();
        const tickSpy = jest.spyOn(t, 'tick');
        t.insertArray([item3]);
        expect(item1).toBeCalled();
        expect(item2).not.toBeCalled();
        expect(item3).toBeCalled();
        expect(tickSpy).toBeCalled();
      });
    });
  });

  describe('.isThawing', () => {
    it('returns false when nothing is thawing', () => {
      expect(Thaw.isThawing).toBe(false);
    });
    it('returns true when thawing', (done) => {
      let eachCalled = false;
      new Thaw([() => {}, () => {}], {
        each: () => {
          eachCalled = true;
          expect(Thaw.isThawing).toBe(true);
        },
        done: () => {
          expect(eachCalled).toBe(true);
          done();
        }
      });
    });
  });

  describe('.stopAll()', () => {
    afterEach(() => {
      Thaw.thaws = [];
    });
    it('calls each thaw.stop', () => {
      const thaw1 = new Thaw([]);
      const thaw2 = new Thaw([]);

      Thaw.thaws = [
        thaw1,
        thaw2,
      ];

      const anyThaw1 = thaw1 as any;
      anyThaw1.stop = jest.fn();
      const anyThaw2 = thaw2 as any;
      anyThaw2.stop = jest.fn();

      Thaw.stopAll();

      expect(anyThaw1.stop).toHaveBeenCalled();
      expect(anyThaw2.stop).toHaveBeenCalled();
    });
  });

  describe('.tick()', () => {
    describe('when .isStopped is true', () => {
      it('does not call done', () => {
        const done = jest.fn();
        const t = new Thaw([() => {}, () => {}], { done });
        t.isStopped = true;
        t.tick();
        expect(done).not.toHaveBeenCalled();
      });
      it('does not call each', () => {
        const each = jest.fn();
        const t = new Thaw([() => {}, () => {}], { each });
        t.isStopped = true;
        expect(each).toBeCalledTimes(1);
        t.tick();
        expect(each).toBeCalledTimes(1);
      });
      it('does not call the item', () => {
        const item2 = jest.fn();
        const t = new Thaw([() => {}, item2]);
        t.isStopped = true;
        t.tick();
        expect(item2).not.toBeCalled();
      });
    });
    describe('when Thaw.thawing is true', () => {
      const thawing = Thaw.thawing;
      afterEach(() => {
        Thaw.thawing = thawing;
      });
      it('does not call done', () => {
        const done = jest.fn();
        const t = new Thaw([() => {}, () => {}], { done });
        Thaw.thawing = true;
        t.tick();
        expect(done).not.toHaveBeenCalled();
      });
      it('does not call each', () => {
        const each = jest.fn();
        const t = new Thaw([() => {}, () => {}], { each });
        Thaw.thawing = true;
        expect(each).toBeCalledTimes(1);
        t.tick();
        expect(each).toBeCalledTimes(1);
      });
      it('does not call the item', () => {
        const item2 = jest.fn();
        const t = new Thaw([() => {}, item2]);
        Thaw.thawing = true;
        t.tick();
        expect(item2).not.toBeCalled();
      });
    });
    describe('when not using options.each', () => {
      it('calls the next item', () => {
        const item1 = jest.fn();
        const item2 = jest.fn();
        const thaw = new Thaw([
          item1,
          item2,
        ]);
        expect(item1).toBeCalled();
        expect(item2).not.toBeCalled();
        thaw.tick();
        expect(item1).toBeCalled();
        expect(item2).toBeCalled();
      });
    });
    describe('when item is falsey', () => {
      it('does not throw', () => {
        let t = new Thaw([undefined]);
        expect(() => {
          t.tick();
        }).not.toThrow();
        expect(t.i).toBe(1);
        expect(t.isStopped).toBe(true);
      });
    });
    describe('when delay is true', () => {
      it('does not call item1 initially', () => {
        const item1 = jest.fn();
        const t = new Thaw([item1], {
          delay: true,
        });
        expect(item1).not.toBeCalled();
      });
    });
  });
});

describe('thaw', () => {
  it('instantiates Thaw with options', () => {
    const options = {};
    const item1 = jest.fn();
    const items = [item1];
    const t = thaw(items, options)
    expect(t).toBeInstanceOf(Thaw);
    expect(t.options).toBe(options);
    expect(t.items[0]).toBe(item1);
  });
});
