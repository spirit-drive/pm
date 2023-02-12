import * as React from 'react';
import { Helmet } from 'react-helmet';

export const defaultSetting = {
  titleTemplate: '%s - ПM Лаборатория',
  defaultTitle: 'ПM Лаборатория',
};

export const Head: React.FC = () => (
  <Helmet {...defaultSetting}>
    <html lang="ru" />
  </Helmet>
);
