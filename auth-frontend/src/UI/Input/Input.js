import React from "react";

import "./Input.css";

const Input = (props) => {
  return (
    <div className="form-group">
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={(e) => props.getValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
