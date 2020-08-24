import { Thaw, IThawOptions } from './thaw';

export class Block {
  index: number;
  thaws: Thaw[];
  count: number;
  options: IThawOptions;
  constructor(options?: IThawOptions, count: number = 200) {
    this.index = 0;
    this.thaws = [];
    this.count = count;
    this.options = options;
  }

  /**
   * add an item to the end of items
   */
  add(item: () => void): this {
    const next = this.next();
    next.add(item);
    return this;
  }

  /**
   * add an Array to the end of items
   */
  addArray(items: (() => void)[]): this {
    const next = this.next();
    next.addArray(items);

    return this;
  }

  /**
   * insert an item into items @ current position
   */
  insert(item: () => void): this {
    const next = this.next();
    next.insert(item);
    return this;
  }

  /**
   * insert and array into items @ current position
   */
  insertArray(items): this {
    const next = this.next();
    next.insertArray(items);
    return this;
  }

  /**
   * Stops all thaws in this block
   */
  stop(): this {
    for (let i = 0;i < this.thaws.length;i++) {
      this.thaws[i].stop();
    }
    return this;
  }

  /**
   * Get next available in block
   */
  next(): Thaw | null {
    let thaw: Thaw;
    const thaws = this.thaws;

    if (thaws.length < this.count) {
      thaw = new Thaw([], this.options);
      thaws.push(thaw);
    } else {
      thaw = thaws[this.index] || null;
    }

    this.index++;
    if (this.index >= this.count) {
      this.index = 0;
    }

    return thaw;
  }
}
