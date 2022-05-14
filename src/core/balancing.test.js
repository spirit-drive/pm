import { getCombination, canBeBalanced, canLineBeBalanced } from './balancing';

describe('balancing', () => {
  describe('getCombination', () => {
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

  describe('canLineBeBalanced', () => {
    it('case 1', () => {
      expect(
        canLineBeBalanced(1, 3, {
          clubs: { mold: { queen: 0, jack: 1 }, balance: 0, value: 0 },
          diamonds: { mold: { queen: 1, jack: 1 }, balance: 2, value: 1 },
          hearts: { mold: { queen: 1, jack: 1 }, balance: 2, value: 1 },
          spades: { mold: { queen: 1, jack: 1 }, balance: 2, value: 1 },
        })
      ).toBeFalsy();
    });

    it('case 2', () => {
      expect(
        canLineBeBalanced(0, 0, {
          clubs: { mold: { 7: 1, 9: 1 }, balance: 2, value: 1 },
          diamonds: { mold: { 7: 1, 9: 0 }, balance: 0, value: 0 },
          hearts: { mold: { 7: 1, 9: 1 }, balance: 2, value: 1 },
          spades: { mold: { 7: 1, 9: 0 }, balance: 0, value: 0 },
        })
      ).toBeTruthy();
    });

    it('case 3', () => {
      expect(
        canLineBeBalanced(0, 1, {
          clubs: { mold: { 6: 0, 8: 0 }, balance: -2, value: 0 },
          diamonds: { mold: { 6: 0, 8: 0 }, balance: -2, value: 0 },
          hearts: { mold: { 6: 1, 8: 1 }, balance: 2, value: 1 },
          spades: { mold: { 6: 1, 8: 0 }, balance: 0, value: 1 },
        })
      ).toBeTruthy();
    });

    it('case 4', () => {
      expect(
        canLineBeBalanced(0, 2, {
          clubs: { mold: { X: 1 }, balance: 1, value: 1 },
          diamonds: { mold: { X: 1 }, balance: 1, value: 1 },
          hearts: { mold: { X: 0 }, balance: -1, value: 0 },
          spades: { mold: { X: 0 }, balance: -1, value: 0 },
        })
      ).toBeTruthy();
    });

    it('case 5', () => {
      expect(
        canLineBeBalanced(0, 4, {
          clubs: { mold: { king: 1 }, balance: 1, value: 1 },
          diamonds: { mold: { king: 0 }, balance: -1, value: 0 },
          hearts: { mold: { king: 0 }, balance: -1, value: 0 },
          spades: { mold: { king: 1 }, balance: 1, value: 1 },
        })
      ).toBeTruthy();
    });

    it('case 6', () => {
      expect(
        canLineBeBalanced(0, 5, {
          clubs: { mold: { ace: 0 }, balance: -1, value: 0 },
          diamonds: { mold: { ace: 1 }, balance: 1, value: 1 },
          hearts: { mold: { ace: 0 }, balance: -1, value: 0 },
          spades: { mold: { ace: 1 }, balance: 1, value: 1 },
        })
      ).toBeTruthy();
    });

    it('case 7', () => {
      expect(
        canLineBeBalanced(-2, 0, {
          spades: { mold: { 7: 1, 9: 0 }, balance: 0, value: 0 },
          diamonds: { mold: { 7: 1, 9: 0 }, balance: 0, value: 0 },
          clubs: { mold: { 7: 1, 9: 0 }, balance: 0, value: 0 },
          hearts: { mold: { 7: 0, 9: 0 }, balance: -2, value: 0 },
        })
      ).toBeTruthy();
    });

    it('case 8', () => {
      expect(
        canLineBeBalanced(-1, 3, {
          spades: { mold: { queen: 0, jack: 0 }, balance: -2, value: 0 },
          diamonds: { mold: { queen: 0, jack: 1 }, balance: 0, value: 0 },
          clubs: { mold: { queen: 1, jack: 1 }, balance: 2, value: 1 },
          hearts: { mold: { queen: 0, jack: 1 }, balance: 0, value: 0 },
        })
      ).toBeTruthy();
    });
  });

  describe('canBeBalanced', () => {
    it('case 1', () => {
      expect(
        canBeBalanced([0, 0, 0, 1, 0, 0], {
          clubs: {
            6: 0,
            7: 1,
            8: 0,
            9: 1,
            X: 1,
            ace: 0,
            jack: 1,
            king: 1,
            queen: 0,
          },
          diamonds: {
            6: 0,
            7: 1,
            8: 0,
            9: 0,
            X: 1,
            ace: 1,
            jack: 1,
            king: 0,
            queen: 1,
          },
          hearts: {
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            X: 0,
            ace: 0,
            jack: 1,
            king: 0,
            queen: 1,
          },
          spades: {
            6: 1,
            7: 1,
            8: 0,
            9: 0,
            X: 0,
            ace: 1,
            jack: 1,
            king: 1,
            queen: 1,
          },
        })
      ).toBeFalsy();
    });

    it('case 2', () => {
      expect(
        canBeBalanced([0, 0, 0, 1, 0, 0], {
          clubs: {
            6: 0,
            7: 1,
            8: 0,
            9: 1,
            X: 1,
            ace: 0,
            jack: 1,
            king: 1,
            queen: 0,
          },
          diamonds: {
            6: 0,
            7: 1,
            8: 0,
            9: 0,
            X: 1,
            ace: 1,
            jack: 1,
            king: 0,
            queen: 1,
          },
          hearts: {
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            X: 0,
            ace: 0,
            jack: 1,
            king: 0,
            queen: 1,
          },
          spades: {
            6: 1,
            7: 1,
            8: 0,
            9: 0,
            X: 0,
            ace: 1,
            jack: 1,
            king: 1,
            queen: 1,
          },
        })
      ).toBeFalsy();
    });
  });
});
