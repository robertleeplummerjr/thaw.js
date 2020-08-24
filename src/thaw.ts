export interface IEach {
  (item: () => void, i: number): void;
}

export interface IThawOptions {
  delay?: boolean;
  done?: () => void;
  each?: IEach
}

/**
 * thaw an array of items
 */
export class Thaw {
  static thawing: boolean = false;
  static thaws: Thaw[] = [];
  static defaultSettings: IThawOptions = {
    each: null,
    done: null
  };

  /**
   * returns if Thaw.js is thawing
   */
  static get isThawing(): boolean {
    return Thaw.thawing;
  }

  /**
   * Stops all Thaw instances
   */
  static stopAll(): void {
    for(let i = 0; i < Thaw.thaws.length; i++) {
      Thaw.thaws[i].stop();
    }
  }

  items: (() => void)[];
  i: number;
  options: IThawOptions;
  timeout: number;
  tick: any;
  isStopped: boolean;

  constructor(items: (() => void)[], options: IThawOptions = {}) {
    const { each, done } = {...Thaw.defaultSettings, ...options};
    this.i = 0;
    this.isStopped = false;
    this.items = items;
    this.options = options;
    this.tick = () => {
      if (this.isStopped) return;

      this.timeout = setTimeout(this.tick, 0) as unknown as number;

      if (Thaw.thawing) return;
      const item = this.items[this.i];
      if (this.i >= this.items.length) {
        if (done !== null) {
          Thaw.thawing = true;
          done();
          Thaw.thawing = false;
        }

        this.isStopped = true;
        clearTimeout(this.timeout);
        return;
      }

      if (each !== null) {
        Thaw.thawing = true;
        each(item, this.i);
        Thaw.thawing = false;
      } else if (item !== undefined) {
        item();
      }
      this.i++;
    };

    Thaw.thaws.push(this);
    if (!options.delay) {
      this.tick();
    }
  }

  /**
   * readies thaw to continue
   */
  makeReady(): boolean {
    if (this.isStopped) {
      this.isStopped = false;
      return true;
    }
    return false;
  }

  /**
   * Adds an item to the end of this instance of Thaw and readies Thaw to process it
   */
  add(item): this {
    this.items.push(item);

    if (this.makeReady()) {
      this.tick();
    }
    return this;
  }

  /**
   * Inserts an item just after the current item being processed in Thaw and readies Thaw to process it
   */
  insert(item: () => void): this {
    this.items.splice(this.i, 0, item);

    if (this.makeReady()) {
      this.tick();
    }
    return this;
  }

  /**
   * Adds an Array to the end of this instance of Thaw and readies Thaw to process it
   */
  addArray(items: (() => void)[]): this {
    this.items = this.items.concat(items);

    if (this.makeReady()) {
      this.tick();
    }
    return this;
  }

  /**
   * Inserts an Array just after the current item being processed in Thaw and readies Thaw to process them
   */
  insertArray(items: (() => void)[]): this {
    const before = this.items.splice(0, this.i);
    const after = this.items;
    this.items = before.concat(items, after);

    if (this.makeReady()) {
      this.tick();
    }
    return this;
  }

  /**
   * Stops this instance of Thaw
   */
  stop(): this {
    this.isStopped = true;
    clearTimeout(this.timeout);
    if (this.options.done) {
      this.options.done();
    }
    return this;
  }
}

/**
 * simple thaw
 */
export function thaw(items: (() => void)[], options: IThawOptions): Thaw {
  return new Thaw(items, options);
}
