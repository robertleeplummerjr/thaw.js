import { Block } from './index';
import { makeTestItems } from './test-utils';

describe('Block', () => {

  describe('.add()', () => {
    it('uses next.add()', () => {
      const block = new Block();
      const anyBlock = block as any;
      const mockNextThaw = {
        add: jest.fn(),
      };
      anyBlock.next = jest.fn(() => mockNextThaw);
      const nextItem = () => {};
      block.add(nextItem);
      expect(mockNextThaw.add).toHaveBeenCalledWith(nextItem);
    });
  });
  describe('.insert()', () => {
    it('uses next.insert()', () => {
      const block = new Block();
      const anyBlock = block as any;
      const mockNextThaw = {
        insert: jest.fn(),
      };
      anyBlock.next = jest.fn(() => mockNextThaw);
      const nextItem = () => {};
      block.insert(nextItem);
      expect(mockNextThaw.insert).toHaveBeenCalledWith(nextItem);
    });
  });
  describe('.insertArray()', () => {
    it('uses next.insertArray()', () => {
      const block = new Block();
      const anyBlock = block as any;
      const mockNextThaw = {
        insertArray: jest.fn(),
      };
      anyBlock.next = jest.fn(() => mockNextThaw);
      const nextItem = () => {};
      block.insertArray(nextItem);
      expect(mockNextThaw.insertArray).toHaveBeenCalledWith(nextItem);
    });
  });
  describe('.addArray()', () => {
    it('uses single thaw block', () => {
      const t = new Block({
        each: () => {

        }
      });

      t.addArray(makeTestItems(4));
      t.addArray(makeTestItems(4));
      t.addArray(makeTestItems(4));

      expect(t.index).toBe(3);
    });
  });

  describe('.stop()', () => {
    it('stop all thaws', () => {
      const t = new Block({
        each: () => {

        }
      });

      t.addArray(makeTestItems(4));
      t.addArray(makeTestItems(4));
      t.addArray(makeTestItems(4));

      t.stop();

      expect(t.thaws[0].i).toBe(1);
      expect(t.thaws[0].isStopped).toBe(true);
      expect(t.thaws[1].i).toBe(1);
      expect(t.thaws[1].isStopped).toBe(true);
      expect(t.thaws[2].i).toBe(1);
      expect(t.thaws[2].isStopped).toBe(true);
    });
  });

  describe('.next()', () => {
    describe('count = 1', () => {
      it('returns the same thaw', () => {
        const block = new Block({}, 1);
        expect(block.next()).toBe(block.next());
      });
    });
    describe('count = 2', () => {
      it('returns incremented thaw instance', () => {
        const block = new Block({}, 2);
        expect(block.next()).not.toBe(block.next());
      });
      describe('when called more then defined number', () => {
        it('resets increment to 0, and reuses already instantiated thaw', () => {
          const block = new Block({}, 2);
          const expectedValue = block.next();
          block.next(); //skip
          expect(block.next()).toBe(expectedValue);
        });
      });
      describe('when index is outside of bounds', () => {
        it('return null', () => {
          const block = new Block({}, 1);
          block.next();
          block.index = 42;
          expect(block.next()).toBe(null);
        });
      });
    });
  });

  describe('count > 1', () => {
    it('uses several thaw instances, iteratively', () => {
      const t = new Block({
        each: () => {

        }
      },2);

      t.addArray(makeTestItems(4));
      t.addArray(makeTestItems(4));
      t.addArray(makeTestItems(4));

      expect(t.thaws[0].items.length).toBe(8);
      expect(t.thaws[1].items.length).toBe(4);
    });
  });
});
