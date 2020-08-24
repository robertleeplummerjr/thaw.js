import { Thaw, thaw } from './thaw';
import { Block } from './block';
import * as ThawLib from './'

describe('ThawLib', () => {
  describe('window assignments', () => {
    it('assigns Thaw, thaw, and Thaw.Block on window', () => {
      // @ts-ignore
      expect(window.Thaw).toBe(Thaw);
      // @ts-ignore
      expect(window.thaw).toBe(thaw);
      // @ts-ignore
      expect(window.Thaw.Block).toBe(Block);
    });
  });
  describe('library exports', () => {
    it('exports Thaw', () => {
      expect(ThawLib.Thaw).toBe(Thaw);
    });
    it('exports thaw', () => {
      expect(ThawLib.thaw).toBe(thaw);
    });
    it('exports Block', () => {
      expect(ThawLib.Block).toBe(Block);
    });
  });
});
