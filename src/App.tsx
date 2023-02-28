import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import { Head } from './Head';
import { Navigation } from './navigation/Navigation';

export const App: React.FC = () => (
  <BrowserRouter>
    <div>
      <Head />
      <ConfigProvider locale={ru_RU}>
        <Navigation />
      </ConfigProvider>
    </div>
  </BrowserRouter>
);
