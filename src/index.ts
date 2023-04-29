import { IntervalFn, IntervalIds } from './types';

/**
 * A utility class for managing intervals created by `setInterval`.
 */
class SetInterval {
  /** An object to store interval IDs keyed by string identifiers. */
  private intervalIds: IntervalIds = {};

  /**
   * Starts a new interval that calls the specified function at the specified interval.
   * @param fn The function to call.
   * @param interval The interval (in milliseconds) at which to call the function.
   * @param key A unique string identifier for the interval.
   */
  public start(fn: IntervalFn, interval: number, key: string): void {
    if (!this.intervalIds[key]) {
      this.intervalIds[key] = setInterval(fn, interval);
    }
  }

  /**
   * Stops the interval with the specified key.
   * @param key The string identifier for the interval to stop.
   */
  public clear(key: string): void {
    const intervalId = this.intervalIds[key];
    if (intervalId) {
      clearInterval(intervalId);
      delete this.intervalIds[key];
    }
  }

  /**
   * Stops all intervals managed by this utility.
   */
  public clearAll(): void {
    this.listAll().forEach(intervalId => {
      this.clear(intervalId);
    });
  }

  /**
   * Gets an array of all keys currently being used to manage intervals.
   * @returns An array of string keys.
   */
  public listAll(): string[] {
    /**
     * Returns an array of all keys currently being used to manage intervals.
     * @returns An array of string keys.
     */
    return Object.keys(this.intervalIds);
  }
}

export default new SetInterval();
