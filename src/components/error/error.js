import React from 'react';

import './error.scss';

const Error = ({ message }) => (
  <div className="error-overlay">
    <div className="error">
      <div className="error__icon">
        <span>!</span>
      </div>
      <div className="error__message">{message}</div>
    </div>
  </div>
);

export default Error;
