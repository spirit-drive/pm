import React from 'react';
import 'antd/dist/antd.less';
import '@ant-design/compatible/assets/index.css';
import 'react-virtualized/styles.css';
import './styles/index.sass';
import { hydrate, render } from 'react-dom';
import { App } from './App';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
