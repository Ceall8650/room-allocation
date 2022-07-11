import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './index.css';

function main() {
  render(<Hello />, document.getElementById('app'));
}

main();
