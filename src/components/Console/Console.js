import React from 'react';

import Header from './Header';
import History from './History';
import RequestResponse from './RequestResponse';
import Footer from './Footer';

import './Console.css';

export default function Console() {
  return (
    <div className="console">
      <Header className="console__header" />
      <History className="console__history"/>
      <RequestResponse className="console__requestResponse" />
      <Footer className="console__footer" />
    </div>
  );
}
