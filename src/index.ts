import { Thaw, thaw } from './thaw';
import { Block } from './block';

export { Thaw, thaw, Block };

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.Thaw = Thaw;
  // @ts-ignore
  window.thaw = thaw;
  // @ts-ignore
  window.Thaw.Block = Block;
}

if (typeof module !== 'undefined') {
  module.exports = { 
    Thaw, 
    thaw, 
    Block 
  };
}
