import { SolitaireBasis } from './SolitaireBasis';
import { Solitaire } from './Solitaire';

describe('Solitaire', () => {
  describe('exchange', () => {
    const solitaire = new Solitaire(
      '8ч Тп Дп 9к 10п 7б 6ч 7п 7к Дч 7ч 9п Вб Вк Вч 8п Тб Тк 6к Дб 10б 10к 6б 9б Дк 6п 8к Кч Вп Кк Кп 10ч Кб Тч 8б 9ч'
    );

    it('буби в пики', () => {
      expect(Solitaire.exchangeUnit('б', 'п', solitaire.chain)).toEqual([
        '8ч',
        'Тб',
        'Дб',
        '9к',
        '10б',
        '7п',
        '6ч',
        '7б',
        '7к',
        'Дч',
        '7ч',
        '9б',
        'Вп',
        'Вк',
        'Вч',
        '8б',
        'Тп',
        'Тк',
        '6к',
        'Дп',
        '10п',
        '10к',
        '6п',
        '9п',
        'Дк',
        '6б',
        '8к',
        'Кч',
        'Вб',
        'Кк',
        'Кб',
        '10ч',
        'Кп',
        'Тч',
        '8п',
        '9ч',
      ]);
    });

    it('7 в 10', () => {
      expect(Solitaire.exchangeUnit('7', 'x', solitaire.chain)).toEqual([
        '8ч',
        'Тп',
        'Дп',
        '9к',
        '7п',
        '10б',
        '6ч',
        '10п',
        '10к',
        'Дч',
        '10ч',
        '9п',
        'Вб',
        'Вк',
        'Вч',
        '8п',
        'Тб',
        'Тк',
        '6к',
        'Дб',
        '7б',
        '7к',
        '6б',
        '9б',
        'Дк',
        '6п',
        '8к',
        'Кч',
        'Вп',
        'Кк',
        'Кп',
        '7ч',
        'Кб',
        'Тч',
        '8б',
        '9ч',
      ]);
    });
  });

  describe('replacing', () => {
    const solitaire = new Solitaire(
      'Вб 7ч 7п 7б Вч Вп 10к 10п Вк 8ч 7к Кп 8б Тч Кк Дп Тб Кч Дк 9п Кб 6ч 9к Тп 6б Дч Тк 8п Дб 9ч 8к 6п 9б 10ч 6к 10б'
    );

    it('Обмен семерок', () => {
      expect(solitaire.replace('7б', '7ч')).toEqual([
        'Вб',
        '7б',
        '7п',
        '7ч',
        'Вч',
        'Вп',
        '10к',
        '10п',
        'Вк',
        '8ч',
        '7к',
        'Кп',
        '8б',
        'Тч',
        'Кк',
        'Дп',
        'Тб',
        'Кч',
        'Дк',
        '9п',
        'Кб',
        '6ч',
        '9к',
        'Тп',
        '6б',
        'Дч',
        'Тк',
        '8п',
        'Дб',
        '9ч',
        '8к',
        '6п',
        '9б',
        '10ч',
        '6к',
        '10б',
      ]);
    });

    it('Возможные перестановки', () => {
      expect(solitaire.getPossibleReplacing('7б')).toEqual([
        'Вб',
        '7ч',
        '7п',
        'Вч',
        '10п',
        '8ч',
        '7к',
        'Кп',
        '8б',
        'Тч',
        'Кк',
        'Дп',
        'Тб',
        'Кч',
        'Дк',
        '6ч',
        '9к',
        'Тп',
        'Дч',
        'Тк',
        '9ч',
        '8к',
        '10ч',
      ]);
    });
  });

  describe('hexagrams', () => {
    describe('hexagrams 1', () => {
      const solitaire = new Solitaire(
        '<8ч Тп Тб 6п> <Дб> <Дк Кп 9ч Вп> <Тк 6б Тч> <Xб> <8к 9к 8б> <Вк> <Вб> <8п Кк 7п> <Вч Xч Кч> <7к 9п Xк> Кб 6к> <Дч 6ч> <Дп> <7ч> <9б Xп 7б>'
      );
      it('hexagrams', () => {
        expect(solitaire.hexagramsMold).toEqual({
          clubs: {
            6: 0,
            7: 0,
            8: 0,
            9: 1,
            X: 0,
            jack: 1,
            queen: 0,
            king: 1,
            ace: 0,
          },
          diamonds: {
            6: 1,
            7: 1,
            8: 1,
            9: 0,
            X: 0,
            jack: 1,
            queen: 0,
            king: 1,
            ace: 1,
          },
          hearts: {
            6: 1,
            7: 1,
            8: 0,
            9: 1,
            X: 1,
            jack: 0,
            queen: 1,
            king: 0,
            ace: 1,
          },
          spades: {
            6: 1,
            7: 0,
            8: 0,
            9: 1,
            X: 1,
            jack: 1,
            queen: 1,
            king: 0,
            ace: 0,
          },
        });
        expect(solitaire.hexagrams).toEqual({
          clubs: [1, 0, 0, 0, 1, 0],
          diamonds: [0, 1, 0, 0, 1, 1],
          hearts: [1, 1, 1, 1, 0, 1],
          spades: [1, 1, 1, 1, 0, 0],
        });
      });

      it('balance', () => {
        expect(solitaire.balance).toEqual([1, 1, 0, 0, 0, 0]);
      });

      it('self balance', () => {
        expect(solitaire.selfBalancing).toEqual([
          {
            clubs: [0, 0, 0, 0, 1, 0],
            diamonds: [0, 1, 0, 0, 1, 1],
            hearts: [1, 1, 1, 1, 0, 1],
            spades: [1, 0, 1, 1, 0, 0],
          },
          {
            clubs: [0, 0, 0, 0, 1, 0],
            diamonds: [0, 1, 0, 0, 1, 1],
            hearts: [1, 0, 1, 1, 0, 1],
            spades: [1, 1, 1, 1, 0, 0],
          },
          {
            clubs: [1, 0, 0, 0, 1, 0],
            diamonds: [0, 1, 0, 0, 1, 1],
            hearts: [1, 1, 1, 1, 0, 1],
            spades: [0, 0, 1, 1, 0, 0],
          },
          {
            clubs: [1, 0, 0, 0, 1, 0],
            diamonds: [0, 1, 0, 0, 1, 1],
            hearts: [1, 0, 1, 1, 0, 1],
            spades: [0, 1, 1, 1, 0, 0],
          },
        ]);
      });
    });

    describe('hexagrams 2', () => {
      const solitaire = new Solitaire(
        'Тк 6п 9п 7ч Вп Тч 8п Дч 10б 9к Дп 10к 6ч Вч 7к Тп 10п 9ч 7п Кп 9б Вк 8ч 10ч 8б Вб 6б 8к Кч 6к Тб Кб Кк Дб 7б Дк'
      );

      it('hexagrams', () => {
        expect(solitaire.hexagramsMold).toEqual({
          clubs: {
            6: 0,
            7: 1,
            8: 0,
            9: 0,
            X: 0,
            ace: 0,
            jack: 0,
            king: 1,
            queen: 1,
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
            queen: 0,
          },
          hearts: {
            6: 1,
            7: 1,
            8: 0,
            9: 1,
            X: 1,
            ace: 1,
            jack: 0,
            king: 1,
            queen: 0,
          },
          spades: {
            6: 0,
            7: 1,
            8: 1,
            9: 0,
            X: 0,
            ace: 0,
            jack: 1,
            king: 0,
            queen: 1,
          },
        });
        expect(solitaire.hexagrams).toEqual({
          clubs: [0, 0, 0, 1, 1, 0],
          diamonds: [0, 0, 1, 0, 0, 1],
          hearts: [1, 1, 1, 0, 1, 1],
          spades: [0, 0, 0, 1, 0, 0],
        });
      });

      it('balance', () => {
        expect(solitaire.balance).toEqual([-1, -1, 0, 0, 0, 0]);
      });

      it('self balance', () => {
        expect(solitaire.selfBalancing).toEqual([
          {
            clubs: [1, 0, 0, 1, 1, 0],
            diamonds: [0, 0, 1, 0, 0, 1],
            hearts: [1, 1, 1, 0, 1, 1],
            spades: [0, 1, 0, 1, 0, 0],
          },
          {
            clubs: [0, 0, 0, 1, 1, 0],
            diamonds: [0, 0, 1, 0, 0, 1],
            hearts: [1, 1, 1, 0, 1, 1],
            spades: [1, 1, 0, 1, 0, 0],
          },
          {
            clubs: [0, 0, 0, 1, 1, 0],
            diamonds: [1, 0, 1, 0, 0, 1],
            hearts: [1, 1, 1, 0, 1, 1],
            spades: [0, 1, 0, 1, 0, 0],
          },
        ]);
      });
    });

    describe('hexagrams 3', () => {
      const solitaire = new Solitaire(
        '8ч Тп Дп 9к 10п 7б 6ч 7п 7к Дч 7ч 9п Вб Вк Вч 8п Тб Тк 6к Дб 10б 10к 6б 9б Дк 6п 8к Кч Вп Кк Кп 10ч Кб Тч 8б 9ч'
      );

      it('hexagrams', () => {
        expect(solitaire.hexagramsMold).toEqual({
          clubs: {
            6: 0,
            7: 0,
            8: 1,
            9: 1,
            X: 1,
            ace: 1,
            jack: 1,
            king: 1,
            queen: 0,
          },
          diamonds: {
            6: 0,
            7: 0,
            8: 1,
            9: 1,
            X: 0,
            ace: 0,
            jack: 0,
            king: 1,
            queen: 1,
          },
          hearts: {
            6: 1,
            7: 0,
            8: 0,
            9: 1,
            X: 1,
            ace: 1,
            jack: 0,
            king: 0,
            queen: 1,
          },
          spades: {
            6: 1,
            7: 1,
            8: 0,
            9: 0,
            X: 0,
            ace: 0,
            jack: 1,
            king: 0,
            queen: 0,
          },
        });
        expect(solitaire.hexagrams).toEqual({
          clubs: [1, 0, 1, 0, 1, 1],
          diamonds: [1, 0, 0, 1, 1, 0],
          hearts: [1, 1, 1, 1, 0, 1],
          spades: [0, 1, 0, 0, 0, 0],
        });
      });

      it('balance', () => {
        expect(solitaire.balance).toEqual([1, 0, 0, 0, 0, 0]);
      });

      it('self balance', () => {
        expect(solitaire.selfBalancing).toEqual([
          {
            clubs: [0, 0, 1, 0, 1, 1],
            diamonds: [1, 0, 0, 1, 1, 0],
            hearts: [1, 1, 1, 1, 0, 1],
            spades: [0, 1, 0, 0, 0, 0],
          },
          {
            clubs: [1, 0, 1, 0, 1, 1],
            diamonds: [0, 0, 0, 1, 1, 0],
            hearts: [1, 1, 1, 1, 0, 1],
            spades: [0, 1, 0, 0, 0, 0],
          },
          {
            clubs: [1, 0, 1, 0, 1, 1],
            diamonds: [1, 0, 0, 1, 1, 0],
            hearts: [0, 1, 1, 1, 0, 1],
            spades: [0, 1, 0, 0, 0, 0],
          },
        ]);
      });
    });

    describe('hexagrams 4', () => {
      const solitaire = new Solitaire(
        'Кб 8б Вч 9б 9к Тб 6к Кп 8к 8ч 8п 10к 6б 7б 6п 10б 9п 9ч 7п 10ч Тч Вб 6ч Дб Дк Кч 7ч Дч Тк Кк Тп Вк Вп 10п 7к Дп'
      );

      it('hexagrams', () => {
        expect(solitaire.hexagramsMold).toEqual({
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
        });
        expect(solitaire.hexagrams).toEqual({
          clubs: [1, 0, 1, 0, 1, 0],
          diamonds: [0, 0, 1, 1, 0, 1],
          hearts: [1, 1, 0, 1, 0, 0],
          spades: [0, 1, 0, 1, 1, 1],
        });
      });

      it('balance', () => {
        expect(solitaire.balance).toEqual([0, 0, 0, 1, 0, 0]);
      });

      it('self balance', () => {
        expect(solitaire.selfBalancing).toBeNull();
      });
    });

    describe('hexagrams 5', () => {
      const solitaire = new Solitaire(
        'Кб 7ч 9ч 6ч 9п Дч 7к Вч 8к Кп Тп 10п Вк Вп Вб 8б Тб 10б 6п 10ч 8п 8ч 10к 6б Кч 6к 7б 9б Тч Дк Тк 7п 9к Дп Кк Дб'
      );

      it('hexagrams', () => {
        expect(solitaire.hexagramsMold).toEqual({
          clubs: {
            6: 0,
            7: 1,
            8: 0,
            9: 1,
            X: 1,
            ace: 0,
            jack: 1,
            king: 1,
            queen: 1,
          },
          diamonds: {
            6: 0,
            7: 0,
            8: 1,
            9: 1,
            X: 0,
            ace: 1,
            jack: 0,
            king: 0,
            queen: 1,
          },
          hearts: {
            6: 1,
            7: 0,
            8: 0,
            9: 1,
            X: 1,
            ace: 0,
            jack: 1,
            king: 1,
            queen: 0,
          },
          spades: {
            6: 1,
            7: 1,
            8: 1,
            9: 1,
            X: 0,
            ace: 1,
            jack: 1,
            king: 0,
            queen: 1,
          },
        });
        expect(solitaire.hexagrams).toEqual({
          clubs: [1, 0, 1, 1, 1, 0],
          diamonds: [1, 0, 0, 1, 0, 1],
          hearts: [1, 1, 1, 0, 1, 0],
          spades: [1, 1, 0, 1, 0, 1],
        });
      });

      it('balance', () => {
        expect(solitaire.balance).toEqual([2, 0, 0, 1, 0, 0]);
      });

      it('self balance', () => {
        expect(solitaire.selfBalancing).toEqual([
          {
            clubs: [1, 0, 1, 1, 1, 0],
            diamonds: [0, 0, 0, 0, 0, 1],
            hearts: [1, 1, 1, 0, 1, 0],
            spades: [1, 1, 0, 1, 0, 1],
          },
          {
            clubs: [1, 0, 1, 1, 1, 0],
            diamonds: [1, 0, 0, 0, 0, 1],
            hearts: [0, 1, 1, 0, 1, 0],
            spades: [1, 1, 0, 1, 0, 1],
          },
        ]);
      });
    });

    describe('hexagrams 6', () => {
      const solitaire = new Solitaire(
        '10ч 7к 7ч 9ч 9б 8к Кк 10б Кп Тк Вч Дп Дб 7б 8б 10к Тб 8п Тп 6п 6к 10п Кч 7п 9к 8ч 9п Дк Вп Тч 6б Вк Дч Кб 6ч Вб'
      );

      it('hexagrams', () => {
        expect(solitaire.hexagramsMold).toEqual({
          clubs: {
            6: 1,
            7: 1,
            8: 1,
            9: 0,
            X: 1,
            ace: 0,
            jack: 1,
            king: 0,
            queen: 1,
          },
          diamonds: {
            6: 0,
            7: 1,
            8: 0,
            9: 0,
            X: 1,
            ace: 0,
            jack: 1,
            king: 1,
            queen: 0,
          },
          hearts: {
            6: 1,
            7: 0,
            8: 1,
            9: 0,
            X: 0,
            ace: 1,
            jack: 1,
            king: 1,
            queen: 0,
          },
          spades: {
            6: 0,
            7: 1,
            8: 1,
            9: 0,
            X: 0,
            ace: 1,
            jack: 0,
            king: 0,
            queen: 0,
          },
        });
        expect(solitaire.hexagrams).toEqual({
          clubs: [0, 1, 1, 1, 0, 0],
          diamonds: [0, 0, 1, 0, 1, 0],
          hearts: [0, 1, 0, 0, 1, 1],
          spades: [0, 0, 0, 0, 0, 1],
        });
      });

      it('balance', () => {
        expect(solitaire.balance).toEqual([-2, 0, 0, -1, 0, 0]);
      });

      it('self balance', () => {
        expect(solitaire.selfBalancing).toEqual([
          {
            clubs: [1, 1, 1, 1, 0, 0],
            diamonds: [0, 0, 1, 1, 1, 0],
            hearts: [0, 1, 0, 0, 1, 1],
            spades: [0, 0, 0, 0, 0, 1],
          },
          {
            clubs: [1, 1, 1, 1, 0, 0],
            diamonds: [0, 0, 1, 0, 1, 0],
            hearts: [0, 1, 0, 1, 1, 1],
            spades: [0, 0, 0, 0, 0, 1],
          },
          {
            clubs: [0, 1, 1, 1, 0, 0],
            diamonds: [0, 0, 1, 1, 1, 0],
            hearts: [0, 1, 0, 0, 1, 1],
            spades: [1, 0, 0, 0, 0, 1],
          },
          {
            clubs: [0, 1, 1, 1, 0, 0],
            diamonds: [0, 0, 1, 0, 1, 0],
            hearts: [0, 1, 0, 1, 1, 1],
            spades: [1, 0, 0, 0, 0, 1],
          },
          {
            clubs: [0, 1, 1, 1, 0, 0],
            diamonds: [1, 0, 1, 1, 1, 0],
            hearts: [0, 1, 0, 0, 1, 1],
            spades: [0, 0, 0, 0, 0, 1],
          },
          {
            clubs: [0, 1, 1, 1, 0, 0],
            diamonds: [1, 0, 1, 0, 1, 0],
            hearts: [0, 1, 0, 1, 1, 1],
            spades: [0, 0, 0, 0, 0, 1],
          },
        ]);
      });
    });

    describe('hexagrams 7', () => {
      const solitaire = new Solitaire(
        'Тч 9к 10б 10ч 8ч Кп 10к 9ч 7б 8б Кб Кк Тб Дб Вк Тк Дч 7к 9п 6б 9б 6ч 7ч Вб Кч 8к 8п Вч 6п Вп 6к 7п 10п Дп Тп Дк'
      );

      it('hexagrams', () => {
        expect(solitaire.hexagramsMold).toEqual({
          clubs: {
            6: 1,
            7: 1,
            8: 1,
            9: 0,
            X: 0,
            ace: 0,
            jack: 1,
            king: 1,
            queen: 1,
          },
          diamonds: {
            6: 1,
            7: 0,
            8: 1,
            9: 1,
            X: 1,
            ace: 1,
            jack: 1,
            king: 0,
            queen: 0,
          },
          hearts: {
            6: 1,
            7: 0,
            8: 0,
            9: 1,
            X: 0,
            ace: 0,
            jack: 1,
            king: 0,
            queen: 1,
          },
          spades: {
            6: 1,
            7: 0,
            8: 0,
            9: 0,
            X: 1,
            ace: 1,
            jack: 1,
            king: 1,
            queen: 1,
          },
        });
        expect(solitaire.hexagrams).toEqual({
          clubs: [0, 1, 0, 1, 1, 0],
          diamonds: [1, 1, 1, 0, 0, 1],
          hearts: [1, 1, 0, 1, 0, 0],
          spades: [0, 1, 1, 1, 1, 1],
        });
      });

      it('balance', () => {
        expect(solitaire.balance).toEqual([0, 2, 0, 1, 0, 0]);
      });

      it('self balance', () => {
        expect(solitaire.selfBalancing).toBeNull();
      });
    });
  });

  describe('init', () => {
    describe('checkout creating of a chain', () => {
      it('normal', () => {
        const solitaire = new SolitaireBasis(
          '[9кКкТк][Вб10чТч9бВкКп9чТбДб8пКб][6б8б][7кДк6к][Дч][10б7бВп7ч][10кТп6пДп][ВчКч8к7п8ч][9п][6ч][10п]'
        );
        expect(solitaire.chain).toEqual([
          '9к',
          'Кк',
          'Тк',
          'Вб',
          '10ч',
          'Тч',
          '9б',
          'Вк',
          'Кп',
          '9ч',
          'Тб',
          'Дб',
          '8п',
          'Кб',
          '6б',
          '8б',
          '7к',
          'Дк',
          '6к',
          'Дч',
          '10б',
          '7б',
          'Вп',
          '7ч',
          '10к',
          'Тп',
          '6п',
          'Дп',
          'Вч',
          'Кч',
          '8к',
          '7п',
          '8ч',
          '9п',
          '6ч',
          '10п',
        ]);
      });

      it('spaces', () => {
        const solitaire = new SolitaireBasis(
          'Вп Дп 6ч Кч Кб 9ч Тч 8к 8ч 7ч Тб Вб Xч Вч 9к 8б 7к Дч 7п 8п 6к Тп Дб Xп Xк Кп 7б 6б Вк 6п Тк Xб Дк 9б Кк 9п'
        );
        expect(solitaire.chain).toEqual([
          'Вп',
          'Дп',
          '6ч',
          'Кч',
          'Кб',
          '9ч',
          'Тч',
          '8к',
          '8ч',
          '7ч',
          'Тб',
          'Вб',
          '10ч',
          'Вч',
          '9к',
          '8б',
          '7к',
          'Дч',
          '7п',
          '8п',
          '6к',
          'Тп',
          'Дб',
          '10п',
          '10к',
          'Кп',
          '7б',
          '6б',
          'Вк',
          '6п',
          'Тк',
          '10б',
          'Дк',
          '9б',
          'Кк',
          '9п',
        ]);
      });

      it('arrows', () => {
        const solitaire = new SolitaireBasis(
          '<8ч Тп Тб 6п> <Дб> <Дк Кп 9ч Вп> <Тк 6б Тч> <Xб> <8к 9к 8б> <Вк> <Вб> <8п Кк 7п> <Вч Xч Кч> <7к 9п Xк> Кб 6к> <Дч 6ч> <Дп> <7ч> <9б Xп 7б>'
        );
        expect(solitaire.chain).toEqual([
          '8ч',
          'Тп',
          'Тб',
          '6п',
          'Дб',
          'Дк',
          'Кп',
          '9ч',
          'Вп',
          'Тк',
          '6б',
          'Тч',
          '10б',
          '8к',
          '9к',
          '8б',
          'Вк',
          'Вб',
          '8п',
          'Кк',
          '7п',
          'Вч',
          '10ч',
          'Кч',
          '7к',
          '9п',
          '10к',
          'Кб',
          '6к',
          'Дч',
          '6ч',
          'Дп',
          '7ч',
          '9б',
          '10п',
          '7б',
        ]);
      });

      it('arrows encoded', () => {
        const solitaire = new SolitaireBasis(
          '<8ч “п “б 6п> <ƒб> <ƒк  п 9ч ¬п> <“к 6б “ч> <Xб> <8к 9к 8б> <¬к> <¬б> <8п  к 7п> <¬ч Xч  ч> <7к 9п Xк> < б 6к> <ƒч 6ч> <ƒп> <7ч> <9б Xп 7б>'
        );
        expect(solitaire.chain).toEqual([
          '8ч',
          'Тп',
          'Тб',
          '6п',
          'Дб',
          'Дк',
          'Кп',
          '9ч',
          'Вп',
          'Тк',
          '6б',
          'Тч',
          '10б',
          '8к',
          '9к',
          '8б',
          'Вк',
          'Вб',
          '8п',
          'Кк',
          '7п',
          'Вч',
          '10ч',
          'Кч',
          '7к',
          '9п',
          '10к',
          'Кб',
          '6к',
          'Дч',
          '6ч',
          'Дп',
          '7ч',
          '9б',
          '10п',
          '7б',
        ]);
      });

      it('merged', () => {
        const solitaire = new SolitaireBasis(
          'ВпДп6чКчКб9чТч8к8ч7чТбВбXчВч9к8б7кДч7п8п6кТпДбXпXкКп7б6бВк6пТкXбДк9бКк9п'
        );
        expect(solitaire.chain).toEqual([
          'Вп',
          'Дп',
          '6ч',
          'Кч',
          'Кб',
          '9ч',
          'Тч',
          '8к',
          '8ч',
          '7ч',
          'Тб',
          'Вб',
          '10ч',
          'Вч',
          '9к',
          '8б',
          '7к',
          'Дч',
          '7п',
          '8п',
          '6к',
          'Тп',
          'Дб',
          '10п',
          '10к',
          'Кп',
          '7б',
          '6б',
          'Вк',
          '6п',
          'Тк',
          '10б',
          'Дк',
          '9б',
          'Кк',
          '9п',
        ]);
      });

      it('error input length', () => {
        expect(
          () => new SolitaireBasis('ВпДп6чКчКб9чТч8к8ч7чТбВбXчВч9к8б7кДч7п8п6кТпДбXпXкКп7б6бВк6пТкXбДк9бКк9')
        ).toThrowError('71');
      });
    });

    describe('checkout converge', () => {
      it('normal', () => {
        const solitaire = new SolitaireBasis(
          '[9кКкТк][Вб10чТч9бВкКп9чТбДб8пКб][6б8б][7кДк6к][Дч][10б7бВп7ч][10кТп6пДп][ВчКч8к7п8ч][9п][6ч][10п]'
        );
        expect(solitaire.converge()).toEqual(['6ч', '10п']);
      });
    });
  });
});
