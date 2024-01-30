import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <div className="form-group">
      <button type="submit" onClick={() => props.onClick()}>
        {props.value}
      </button>
    </div>
  );
};

export default Button;
