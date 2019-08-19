import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app/App';
import 'whatwg-fetch';// polyfill window.fetch
import './index.scss';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);