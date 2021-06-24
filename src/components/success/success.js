import React from 'react';

import './success.scss';

const Success = ({ message }) => (
  <div className="success-overlay">
    <div className="success">
      <div className="success__icon">
        <span>&#10003;</span>
      </div>
      <div className="success__message">{message}</div>
    </div>
  </div>
);

export default Success;
