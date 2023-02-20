export type HexagramItemValue = 0 | 1;
export type BalanceValue = -2 | -1 | 0 | 1 | 2;
export type LineBalance = -1 | 0 | 1;

export enum Suits {
  spades = 'spades',
  diamonds = 'diamonds',
  clubs = 'clubs',
  hearts = 'hearts',
}

export enum SuitsIcon {
  hearts = '♥',
  diamonds = '♦',
  clubs = '♣',
  spades = '♠',
}

export enum CyrillicSuits {
  spades = 'п',
  diamonds = 'б',
  clubs = 'к',
  hearts = 'ч',
}

export enum Nominal {
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  X = 'X',
  jack = 'jack',
  queen = 'queen',
  king = 'king',
  ace = 'ace',
}

export enum CyrillicNominal {
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  X = 'X',
  jack = 'В',
  queen = 'Д',
  king = 'К',
  ace = 'Т',
}

export type HexagramCorrectedLine = Record<Nominal, HexagramItemValue>;
export type CorrectedLine = { suit: Suits; value: HexagramCorrectedLine };
export type CorrectedLines = {
  '0'?: CorrectedLine[];
  '1'?: CorrectedLine[];
  '3'?: CorrectedLine[];
};

export type ValueAndSuit = { value: HexagramItemValue; suit: Suits };

export type HexagramMold = Record<Nominal, HexagramItemValue>;

export type HexagramLineDataItem = {
  value: HexagramItemValue;
  balance: LineBalance;
};

export type HexagramLineData = Record<Suits, HexagramLineDataItem>;

export type HexagramsMold = Record<Suits, HexagramMold>;

export type HexagramValue = [
  HexagramItemValue,
  HexagramItemValue,
  HexagramItemValue,
  HexagramItemValue,
  HexagramItemValue,
  HexagramItemValue
];

export type HexagramInfo = {
  title: string;
  description: string;
};

export type Balance = [BalanceValue, BalanceValue, BalanceValue, BalanceValue, BalanceValue, BalanceValue];
export type Hexagrams = Record<Suits, HexagramValue>;
export type SelfBalance = Hexagrams[];
