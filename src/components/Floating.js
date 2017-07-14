import React from 'react';
const Floating = (props) => {
  return (
    <div id="container-floating">
        <div id="floating-button" onClick={props.onScreenShot}>
          <p className="plus">Õ</p>
        </div>
      </div>

  );
  return null;
}

export default Floating;
