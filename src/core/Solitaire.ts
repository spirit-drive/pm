/* eslint-disable class-methods-use-this */
import { SolitaireBasis } from './SolitaireBasis';
import { Balance, BalanceValue, Hexagrams, HexagramsMold, SelfBalance } from './types';
import { EXCHANGE_HELPED_SYMBOL, hexagramsEngine, initHexagramMold } from './helpers';
import { InvalidDataForExchange } from './Errors';
import { canBeBalanced, getCombination, getPossibleLines, LineData, linesDataToHexagrams } from './balancing';

export class Solitaire extends SolitaireBasis {
  hexagramsMold: HexagramsMold;
  yin: string[];
  yan: string[];
  transits: { value: string; efl: number }[];
  private targetTransit: string;

  constructor(input: string) {
    super(input);
    this.hexagramsMold = {
      spades: initHexagramMold(),
      diamonds: initHexagramMold(),
      clubs: initHexagramMold(),
      hearts: initHexagramMold(),
    };
    this.yin = [];
    this.yan = [];
    this.transits = [];
    this.converge();
  }

  get hexagrams(): Hexagrams {
    return hexagramsEngine(this.hexagramsMold);
  }

  get balance(): Balance {
    const { hexagrams } = this;
    const result: Balance = [] as unknown as Balance;
    for (let i = 0; i < 6; i++) {
      const value = (hexagrams.clubs[i] +
        hexagrams.hearts[i] +
        hexagrams.spades[i] +
        hexagrams.diamonds[i] -
        2) as BalanceValue;
      result.push(value);
    }
    return result;
  }

  static exchangeUnit(that: string, to: string, chain: string[]): string[] {
    const $that = SolitaireBasis.tenToX(that);
    const $to = SolitaireBasis.tenToX(to);
    if ($that.length !== 1) throw new InvalidDataForExchange(`$that: "${$that}"`);
    if ($to.length !== 1) throw new InvalidDataForExchange(`$to: "${$to}"`);
    return chain
      .map((item) => SolitaireBasis.tenToX(item))
      .map((item) => item.replace(new RegExp($to, 'g'), EXCHANGE_HELPED_SYMBOL))
      .map((item) => item.replace(new RegExp($that, 'g'), $to))
      .map((item) => item.replace(EXCHANGE_HELPED_SYMBOL, $that))
      .map((item) => SolitaireBasis.xToTen(item));
  }

  exchange(that: string, to: string): string[] {
    const $that = SolitaireBasis.tenToX(that);
    const $to = SolitaireBasis.tenToX(to);
    const thatV = $that.slice(0, -1);
    const thatS = $that.slice(-1);
    const toV = $to.slice(0, -1);
    const toS = $to.slice(-1);
    const chain = Solitaire.exchangeUnit(thatV, toV, this.chain);
    return Solitaire.exchangeUnit(thatS, toS, chain);
  }

  static selfBalancingEngine(balance: Balance, hexagramsMold: HexagramsMold): SelfBalance {
    /**
     * ?????????? 2, 4, 5 ???????????? ???????? ????????????????????????????
     * ?????????? 0, 1, 3 ???????????? ?????????? ?????????????????????? ???????? ????????????????????????????
     * ???????????????? ?????????????????? ???????????????? ??????????
     * ?????????????????????? ?????? ??????????
     * */
    if (balance.every((v) => v === 0)) return null;
    if (!canBeBalanced(balance, hexagramsMold)) return null;

    const possibleLines = getPossibleLines(balance, hexagramsMold);
    const combination = getCombination<LineData>(possibleLines);
    return linesDataToHexagrams(combination);
  }

  get selfBalancing(): SelfBalance {
    return Solitaire.selfBalancingEngine(this.balance, this.hexagramsMold);
  }

  private addToYin(string: string): void {
    if (this.yin.includes(string) || this.yan.includes(string)) return;
    this.yin.push(string);
  }

  private addToYan(string: string): void {
    if (this.yin.includes(string) || this.yan.includes(string)) return;
    this.yan.push(string);
  }

  getPossibleReplacing(card: string): string[] {
    const cards: string[] = [];
    const transits = [...this.transits];
    const chain = [...this.chain];
    for (let i = 0; i < chain.length; i++) {
      const c1 = chain[i];
      if (card !== c1 && this.replace(card, c1)) {
        cards.push(c1);
      }
    }
    this.transits = transits;
    return cards;
  }

  replace(that: string, to: string): string[] {
    try {
      const chain = this.chain
        .map((c) => {
          if (c === that) return EXCHANGE_HELPED_SYMBOL;
          return c;
        })
        .map((c) => {
          if (c === to) return that;
          return c;
        })
        .map((c) => {
          if (c === EXCHANGE_HELPED_SYMBOL) return to;
          return c;
        });
      this.transits = [];
      this.converge(chain);
      return chain;
    } catch (e) {
      return null;
    }
  }

  handlePassive(string: string): void {
    const { suit, value } = SolitaireBasis.getValueAndSuit(string);
    const energy = this.hexagramsMold[suit][value];
    if (energy !== null) return;
    this.hexagramsMold[suit][value] = 0;
    this.addToYin(string);
  }

  handleCurrent(card: string): void {
    if (this.targetTransit === card) {
      this.targetTransit = null;
    }
  }

  handleTransit(card: string): void {
    if (this.targetTransit) {
      const index = this.transits.findIndex((t) => t.value === this.targetTransit);
      if (index === -1) {
        return;
      }
      Object.assign(this.transits[index], { efl: this.transits[index].efl + 1 });
      return;
    }
    const index = this.transits.findIndex((t) => t.value === card);
    if (index === -1) {
      this.transits.push({ value: card, efl: 1 });
    } else {
      Object.assign(this.transits[index], { efl: this.transits[index].efl + 1 });
    }
    this.targetTransit = card;
  }

  handleActive(string: string): void {
    const { suit, value } = SolitaireBasis.getValueAndSuit(string);
    const energy = this.hexagramsMold[suit][value];
    if (energy !== null) return;
    this.hexagramsMold[suit][value] = 1;
    this.addToYan(string);
  }
}
