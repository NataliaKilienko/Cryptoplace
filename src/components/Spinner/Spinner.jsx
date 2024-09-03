import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spin">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="circle"></div>
        ))}
      </div>
    </div>
  );
};

export default Spinner;
