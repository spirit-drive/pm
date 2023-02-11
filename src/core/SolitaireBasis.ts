// 9á 7á Êï 6÷ 8á 7ï 6á Äê Xá Âá Ê÷ X÷ 8ï 6ê Êá 8ê 9ê Òï 9÷ Xê 8÷ Êê 9ï Òá Äï 7ê 6ï Ò÷ Xï Â÷ 7÷ Òê Äá Âê Ä÷ Âï
/* eslint-disable class-methods-use-this */
import { InvalidCartLength, InvalidChain, InvalidInputLength } from './Errors';
import { suitToHexagram, valueToHexagram } from './helpers';
import { CyrillicSuits, HexagramsMold, Nominal } from './types';

export class SolitaireBasis {
  public _chain: string[];

  protected constructor(input: string) {
    const chain = this.prepare(input);
    if ([...new Set(chain)].length !== 36) throw new InvalidChain(chain.join(' '));
    this._chain = chain;
  }

  static parseString(string: string): string {
    return string
      ? string
          .replace(/!\d*/gi, '') // Убрать все efl
          .replace(/T/gi, 'Т') // Русская
          .replace(/t/gi, 'Т') // Английская
          .replace(/K/gi, 'К') // Русская
          .replace(/k/gi, 'К') // Английская
          .replace(/B/gi, 'В') // Русская
          .replace(/b/gi, 'В') // Английская
          .replace(/Х/gi, 'X') // Английская
          .replace(/Х/gi, 'X') // Русская
          .replace(/10/g, 'X')
          .replace(/“/g, 'Т')
          .replace(/ƒ/gi, 'Д')
          .replace(/ /gi, 'К') // eslint-disable-line no-irregular-whitespace
          .replace(/¬/gi, 'В')
      : '';
  }

  static clear(input: string): string {
    return SolitaireBasis.parseString(input).replace(/[^6-9Xвдктчпб]/gi, '');
  }

  static xToTen(string: string): string {
    return string.replace(/x/i, '10');
  }

  static tenToX(string: string): string {
    return string.replace(/10/i, 'X').replace(/x/i, 'X').replace(/х/i, 'X');
  }

  static normalise(string: string): string {
    return `${string[0].toUpperCase()}${string[1].toLowerCase()}`;
  }

  static getValueAndSuit(string: string): { suit: keyof HexagramsMold; value: Nominal } {
    if (string.length !== 2) throw new InvalidCartLength(string.length.toString());
    const [valueRaw, suitRaw] = string;
    const value = valueToHexagram[valueRaw];
    const suit = suitToHexagram[suitRaw as CyrillicSuits];
    return { value, suit };
  }

  static split(input: string): string[] {
    if (input.length % 2 !== 0 || input.length !== 72) {
      throw new InvalidInputLength(input.length.toString());
    }
    const result: string[] = [];
    const inputAsArr = input.split('');
    while (inputAsArr.length > 0) {
      const [val, suit] = inputAsArr.splice(0, 2);
      result.push(`${val}${suit}`);
    }
    return result.map(SolitaireBasis.normalise);
  }

  get chain(): string[] {
    return this._chain.map(SolitaireBasis.xToTen);
  }

  set chain(chain: string[]) {
    const $chain = chain.map(SolitaireBasis.tenToX);
    this.converge($chain);
    this._chain = $chain;
  }

  get input(): string {
    return this.chain.join(' ');
  }

  protected prepare(input: string): string[] {
    const clean = SolitaireBasis.clear(input);
    return SolitaireBasis.split(clean);
  }

  handlePassive(card: string): void;
  handlePassive(): void {}
  handleActive(card: string): void;
  handleActive(): void {}
  handleTransit(card: string): void;
  handleTransit(): void {}
  handleNewChain(chain: string[]): void;
  handleNewChain(): void {}
  handleCurrent(card: string): void;
  handleCurrent(): void {}

  static isSympathy(card1: string, card2: string): boolean {
    return card1[0] === card2[0] || card1[1] === card2[1];
  }

  private convergeRaw(chain: string[]): void {
    for (let i = 2; i < chain.length; i++) {
      this.handleCurrent(chain[i]);
      if (i === 2) {
        this.handlePassive(chain[0]);
        this.handleCurrent(chain[i - 1]);
        this.handleCurrent(chain[i - 2]);
      }
      if (i === chain.length - 1) this.handleActive(chain[i]);

      if (SolitaireBasis.isSympathy(chain[i - 2], chain[i])) {
        this.handleActive(chain[i - 1]);
        this.handleTransit(chain[i]);
        this.handlePassive(chain.splice(i - 2, 1)[0]);
        this.handleNewChain(chain);
        this.convergeRaw(chain);
        break;
      }
    }
  }

  static canBeConverged(chain: string[]): boolean {
    const _chain = chain.map(SolitaireBasis.tenToX);
    for (let i = 2; i < _chain.length; i++) {
      if (this.isSympathy(_chain[i - 2], _chain[i])) {
        _chain.splice(i - 2, 1);
        i = 1;
      }
    }
    return _chain.length === 2;
  }

  converge(chain: string[] = this._chain): string[] {
    const $chain = chain.map(SolitaireBasis.tenToX);
    this.convergeRaw($chain);
    const result = $chain.map(SolitaireBasis.xToTen);
    if (result.length === 2) return result;
    throw new InvalidChain($chain.join(' '));
  }
}
