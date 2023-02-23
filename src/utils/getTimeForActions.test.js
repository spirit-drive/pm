import { getTimeForActions } from './getTimeForActions';

describe('getTimeForActions', () => {
  describe('1 day', () => {
    it('5 minutes', () => {
      expect(
        getTimeForActions({ minute: 0, hour: 0, day: 0 })([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], {
          minute: 5,
          hour: 0,
          day: 0,
        })
      ).toEqual([
        {
          day: 0,
          hour: 0,
          minute: 0,
        },
        {
          day: 0,
          hour: 0,
          minute: 5,
        },
        {
          day: 0,
          hour: 0,
          minute: 10,
        },
        {
          day: 0,
          hour: 0,
          minute: 15,
        },
        {
          day: 0,
          hour: 0,
          minute: 20,
        },
        {
          day: 0,
          hour: 0,
          minute: 25,
        },
        {
          day: 0,
          hour: 0,
          minute: 30,
        },
        {
          day: 0,
          hour: 0,
          minute: 35,
        },
        {
          day: 0,
          hour: 0,
          minute: 40,
        },
        {
          day: 0,
          hour: 0,
          minute: 45,
        },
        {
          day: 0,
          hour: 0,
          minute: 50,
        },
      ]);
    });

    it('5 minutes after 1 day', () => {
      expect(
        getTimeForActions({ minute: 1, hour: 1, day: 1 })([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], {
          minute: 5,
          hour: 0,
          day: 0,
        })
      ).toEqual([
        {
          day: 1,
          hour: 1,
          minute: 1,
        },
        {
          day: 1,
          hour: 1,
          minute: 6,
        },
        {
          day: 1,
          hour: 1,
          minute: 11,
        },
        {
          day: 1,
          hour: 1,
          minute: 16,
        },
        {
          day: 1,
          hour: 1,
          minute: 21,
        },
        {
          day: 1,
          hour: 1,
          minute: 26,
        },
        {
          day: 1,
          hour: 1,
          minute: 31,
        },
        {
          day: 1,
          hour: 1,
          minute: 36,
        },
        {
          day: 1,
          hour: 1,
          minute: 41,
        },
        {
          day: 1,
          hour: 1,
          minute: 46,
        },
        {
          day: 1,
          hour: 1,
          minute: 51,
        },
      ]);
    });

    it('60 minutes', () => {
      expect(
        getTimeForActions({ minute: 0, hour: 0, day: 0 })([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], {
          minute: 60,
          hour: 0,
          day: 0,
        })
      ).toEqual([
        {
          day: 0,
          hour: 0,
          minute: 0,
        },
        {
          day: 0,
          hour: 1,
          minute: 0,
        },
        {
          day: 0,
          hour: 2,
          minute: 0,
        },
        {
          day: 0,
          hour: 3,
          minute: 0,
        },
        {
          day: 0,
          hour: 4,
          minute: 0,
        },
        {
          day: 0,
          hour: 5,
          minute: 0,
        },
        {
          day: 0,
          hour: 6,
          minute: 0,
        },
        {
          day: 0,
          hour: 7,
          minute: 0,
        },
        {
          day: 0,
          hour: 8,
          minute: 0,
        },
        {
          day: 0,
          hour: 9,
          minute: 0,
        },
        {
          day: 0,
          hour: 10,
          minute: 0,
        },
      ]);
    });

    it('1440 minutes', () => {
      expect(
        getTimeForActions({ minute: 0, hour: 0, day: 0 })([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], {
          minute: 1440,
          hour: 0,
          day: 0,
        })
      ).toEqual([
        {
          day: 0,
          hour: 0,
          minute: 0,
        },
        {
          day: 1,
          hour: 0,
          minute: 0,
        },
        {
          day: 2,
          hour: 0,
          minute: 0,
        },
        {
          day: 3,
          hour: 0,
          minute: 0,
        },
        {
          day: 4,
          hour: 0,
          minute: 0,
        },
        {
          day: 5,
          hour: 0,
          minute: 0,
        },
        {
          day: 6,
          hour: 0,
          minute: 0,
        },
        {
          day: 7,
          hour: 0,
          minute: 0,
        },
        {
          day: 8,
          hour: 0,
          minute: 0,
        },
        {
          day: 9,
          hour: 0,
          minute: 0,
        },
        {
          day: 10,
          hour: 0,
          minute: 0,
        },
      ]);
    });

    it('5 minutes with difference sizes', () => {
      expect(
        getTimeForActions({ minute: 0, hour: 0, day: 0 })([1, 2, 1, 2, 1, 2, 1, 1, 1, 3], {
          minute: 5,
          hour: 0,
          day: 0,
        })
      ).toEqual([
        {
          day: 0,
          hour: 0,
          minute: 0,
        },
        {
          day: 0,
          hour: 0,
          minute: 5,
        },
        {
          day: 0,
          hour: 0,
          minute: 15,
        },
        {
          day: 0,
          hour: 0,
          minute: 20,
        },
        {
          day: 0,
          hour: 0,
          minute: 30,
        },
        {
          day: 0,
          hour: 0,
          minute: 35,
        },
        {
          day: 0,
          hour: 0,
          minute: 45,
        },
        {
          day: 0,
          hour: 0,
          minute: 50,
        },
        {
          day: 0,
          hour: 0,
          minute: 55,
        },
        {
          day: 0,
          hour: 1,
          minute: 0,
        },
        {
          day: 0,
          hour: 1,
          minute: 15,
        },
      ]);
    });
  });

  describe('with sleep time', () => {
    it('5 minutes', () => {
      expect(
        getTimeForActions({ minute: 0, hour: 0, day: 0 })(
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          {
            minute: 5,
            hour: 0,
            day: 0,
          },
          {
            gte: { minute: 0, hour: 0 },
            lte: { minute: 0, hour: 9 },
          }
        )
      ).toEqual([
        {
          day: 0,
          hour: 9,
          minute: 0,
        },
        {
          day: 0,
          hour: 9,
          minute: 5,
        },
        {
          day: 0,
          hour: 9,
          minute: 10,
        },
        {
          day: 0,
          hour: 9,
          minute: 15,
        },
        {
          day: 0,
          hour: 9,
          minute: 20,
        },
        {
          day: 0,
          hour: 9,
          minute: 25,
        },
        {
          day: 0,
          hour: 9,
          minute: 30,
        },
        {
          day: 0,
          hour: 9,
          minute: 35,
        },
        {
          day: 0,
          hour: 9,
          minute: 40,
        },
        {
          day: 0,
          hour: 9,
          minute: 45,
        },
        {
          day: 0,
          hour: 9,
          minute: 50,
        },
      ]);
    });

    it('5 minutes after 1 day', () => {
      expect(
        getTimeForActions({ minute: 1, hour: 1, day: 1 })(
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          {
            minute: 5,
            hour: 0,
            day: 0,
          },
          {
            gte: { minute: 5, hour: 1 },
            lte: { minute: 0, hour: 9 },
          }
        )
      ).toEqual([
        {
          day: 1,
          hour: 1,
          minute: 1,
        },
        {
          day: 1,
          hour: 9,
          minute: 1,
        },
        {
          day: 1,
          hour: 9,
          minute: 6,
        },
        {
          day: 1,
          hour: 9,
          minute: 11,
        },
        {
          day: 1,
          hour: 9,
          minute: 16,
        },
        {
          day: 1,
          hour: 9,
          minute: 21,
        },
        {
          day: 1,
          hour: 9,
          minute: 26,
        },
        {
          day: 1,
          hour: 9,
          minute: 31,
        },
        {
          day: 1,
          hour: 9,
          minute: 36,
        },
        {
          day: 1,
          hour: 9,
          minute: 41,
        },
        {
          day: 1,
          hour: 9,
          minute: 46,
        },
      ]);
    });

    it('60 minutes', () => {
      expect(
        getTimeForActions({ minute: 0, hour: 0, day: 0 })(
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          {
            minute: 60,
            hour: 0,
            day: 0,
          },
          {
            gte: { minute: 0, hour: 0 },
            lte: { minute: 0, hour: 9 },
          }
        )
      ).toEqual([
        {
          day: 0,
          hour: 9,
          minute: 0,
        },
        {
          day: 0,
          hour: 10,
          minute: 0,
        },
        {
          day: 0,
          hour: 11,
          minute: 0,
        },
        {
          day: 0,
          hour: 12,
          minute: 0,
        },
        {
          day: 0,
          hour: 13,
          minute: 0,
        },
        {
          day: 0,
          hour: 14,
          minute: 0,
        },
        {
          day: 0,
          hour: 15,
          minute: 0,
        },
        {
          day: 0,
          hour: 16,
          minute: 0,
        },
        {
          day: 0,
          hour: 17,
          minute: 0,
        },
        {
          day: 0,
          hour: 18,
          minute: 0,
        },
        {
          day: 0,
          hour: 19,
          minute: 0,
        },
      ]);
    });

    it('1440 minutes', () => {
      expect(
        getTimeForActions({ minute: 0, hour: 0, day: 0 })(
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          {
            minute: 1440,
            hour: 0,
            day: 0,
          },
          {
            gte: { minute: 0, hour: 0 },
            lte: { minute: 0, hour: 7 },
          }
        )
      ).toEqual([
        {
          day: 0,
          hour: 7,
          minute: 0,
        },
        {
          day: 1,
          hour: 7,
          minute: 0,
        },
        {
          day: 2,
          hour: 7,
          minute: 0,
        },
        {
          day: 3,
          hour: 7,
          minute: 0,
        },
        {
          day: 4,
          hour: 7,
          minute: 0,
        },
        {
          day: 5,
          hour: 7,
          minute: 0,
        },
        {
          day: 6,
          hour: 7,
          minute: 0,
        },
        {
          day: 7,
          hour: 7,
          minute: 0,
        },
        {
          day: 8,
          hour: 7,
          minute: 0,
        },
        {
          day: 9,
          hour: 7,
          minute: 0,
        },
        {
          day: 10,
          hour: 7,
          minute: 0,
        },
      ]);
    });

    it('5 minutes with difference sizes', () => {
      expect(
        getTimeForActions({ minute: 0, hour: 0, day: 0 })(
          [1, 2, 1, 2, 1, 2, 1, 1, 1, 3],
          {
            minute: 5,
            hour: 0,
            day: 0,
          },
          {
            gte: { minute: 5, hour: 0 },
            lte: { minute: 0, hour: 7 },
          }
        )
      ).toEqual([
        {
          day: 0,
          hour: 0,
          minute: 0,
        },
        {
          day: 0,
          hour: 7,
          minute: 0,
        },
        {
          day: 0,
          hour: 7,
          minute: 10,
        },
        {
          day: 0,
          hour: 7,
          minute: 15,
        },
        {
          day: 0,
          hour: 7,
          minute: 25,
        },
        {
          day: 0,
          hour: 7,
          minute: 30,
        },
        {
          day: 0,
          hour: 7,
          minute: 40,
        },
        {
          day: 0,
          hour: 7,
          minute: 45,
        },
        {
          day: 0,
          hour: 7,
          minute: 50,
        },
        {
          day: 0,
          hour: 7,
          minute: 55,
        },
        {
          day: 0,
          hour: 8,
          minute: 10,
        },
      ]);
    });
  });
});
