import { getCombination } from './balancing';

describe('combination', () => {
  describe('exception cases', () => {
    it('invalid data 0', () => {
      expect(() => getCombination()).toThrowError('invalid data: undefined');
    });

    it('invalid data 1', () => {
      expect(() => getCombination({})).toThrowError('invalid data: {}');
    });

    it('invalid data 2', () => {
      expect(() => getCombination('2')).toThrowError('invalid data: "2"');
    });

    it('invalid data 3', () => {
      expect(() => getCombination(false)).toThrowError('invalid data: false');
    });

    it('empty arr 1', () => {
      expect(getCombination([])).toEqual(null);
    });

    it('empty arr 2', () => {
      expect(getCombination([[]])).toEqual([]);
    });

    it('empty arr 3', () => {
      expect(getCombination([[], []])).toEqual([]);
    });
  });

  describe('work cases', () => {
    it('case 1', () => {
      expect(getCombination([[0], [1]])).toEqual([[0, 1]]);
    });

    it('case 2', () => {
      expect(getCombination([[0], [1, 2]])).toEqual([
        [0, 1],
        [0, 2],
      ]);
    });

    it('case 3', () => {
      expect(getCombination([[0], [1, 2], [3]])).toEqual([
        [0, 1, 3],
        [0, 2, 3],
      ]);
    });

    it('case 4', () => {
      expect(getCombination([[0], [1, 2, 3], [4]])).toEqual([
        [0, 1, 4],
        [0, 2, 4],
        [0, 3, 4],
      ]);
    });
    it('case 5', () => {
      expect(getCombination([[0], [1, 2], [3, 4]])).toEqual([
        [0, 1, 3],
        [0, 1, 4],
        [0, 2, 3],
        [0, 2, 4],
      ]);
    });

    it('case 6', () => {
      expect(
        getCombination([
          [0, 1],
          [2, 3],
          [4, 5],
        ])
      ).toEqual([
        [0, 2, 4],
        [0, 2, 5],
        [0, 3, 4],
        [0, 3, 5],
        [1, 2, 4],
        [1, 2, 5],
        [1, 3, 4],
        [1, 3, 5],
      ]);
    });
  });
});
