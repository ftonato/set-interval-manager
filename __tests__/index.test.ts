import SetInterval from '../src/index';

describe('SetInterval', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();

    callback = jest.fn(() => Math.floor(Math.random() * 100));
  });

  afterEach(() => {
    SetInterval.clearAll();
  });

  describe('start()', () => {
    it('should start a new interval with the specified function and interval', () => {
      SetInterval.start(callback, 100, 'test-interval');
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(99);
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should not start a new interval if an interval with the same key already exists', () => {
      SetInterval.start(callback, 100, 'test-interval');
      SetInterval.start(callback, 200, 'test-interval');
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(99);
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(2);
      jest.advanceTimersByTime(99);
      expect(callback).toHaveBeenCalledTimes(2);
      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  describe('clear()', () => {
    it('should clear the interval with the specified key', () => {
      SetInterval.start(callback, 100, 'test-interval');
      SetInterval.clear('test-interval');
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(100);
      expect(callback).not.toBeCalled();
    });

    it('should do nothing if no interval with the specified key exists', () => {
      SetInterval.clear('test-interval');
      expect(callback).not.toBeCalled();
    });
  });

  describe('clearAll()', () => {
    it('should clear all intervals managed by the utility', () => {
      SetInterval.start(callback, 100, 'test-interval-1');
      SetInterval.start(callback, 200, 'test-interval-2');
      SetInterval.start(callback, 300, 'test-interval-3');
      SetInterval.clearAll();
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(1000);
      expect(callback).not.toBeCalled();
    });
  });

  describe('listAll()', () => {
    it('should return an array of all keys currently being used to manage intervals', () => {
      SetInterval.start(callback, 100, 'test-interval-1');
      SetInterval.start(callback, 200, 'test-interval-2');
      SetInterval.start(callback, 300, 'test-interval-3');
      expect(SetInterval.listAll()).toEqual(['test-interval-1', 'test-interval-2', 'test-interval-3']);
    });

    it('should return an empty array if no intervals are being managed', () => {
      expect(SetInterval.listAll()).toEqual([]);
    });
  });
});
