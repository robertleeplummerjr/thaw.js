import Thaw from './thaw';
import Block from './block';

export default Thaw;
export {
  Block
};

if (typeof window !== 'undefined') {
  window.Thaw = Thaw;
  window.Thaw.Block = Block;
}