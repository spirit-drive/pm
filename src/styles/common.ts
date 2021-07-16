import { CSSProperties } from 'react';

// colors
export const $accentColor = '#0081D1';
export const $accentColorLight = '#00a2ff';
export const $accentColorBG = '#e7f9ff';
export const $backgroundColor = '#F2F7FA';
export const $backgroundColorLight = '#f8fafc';
export const $backgroundErrorColor = '#fffbf6';
export const $mainColor = '#8B97A5';
export const $borderColor = '#F0F1F2';
export const $borderDarkColor = '#d9d9d9';
export const $brightTextColor = '#333';
export const $antDTextColor = '#595959';
export const $tableHeaderBright = '#f2f2f2';
export const $tableHeaderLight = '#fafafa';
export const $tableBorder = '#e8e8e8';
export const $colorDisable = '#bfbfbf';
export const $deleteColor = '#FF4500';
export const $successColor = '#ADFF99';
export const $warningColor = '#FFD699';
export const $errorColor = '#FF9999';
export const $successColorDark = '#52c41a';
export const $warningColorDark = '#ffaa33';
export const $errorColorDark = '#f23030';

// fonts
export const $mainFontSize = '14px';
export const $littleFontSize = '12px';

// box-shadows
export const $boxShadow1 = '0 2px 12px rgba(0, 0, 0, 0.05)';
export const $boxShadow2 = '0 2px 12px rgba(0, 0, 0, 0.15)';
export const $boxShadowFocus = `0 2px 12px rgba(0, 129, 209, 0.5)`;

// borders
export const $border1 = 'thin dashed #f3f3f3';
export const $border2 = 'thin solid #eaeaea';

// mixins
export const root = (): CSSProperties => ({
  minWidth: '100%',
  display: 'inline-block',
  padding: '16px',
  borderRadius: '4px',
  backgroundColor: '#fff',
  boxShadow: $boxShadow1,
});

export const littleText = (): CSSProperties => ({
  fontSize: $littleFontSize,
  color: $mainColor,
});
