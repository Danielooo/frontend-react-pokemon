import React from "react";
import './Button.css'


function Button({buttonType, clickHandler, children, disabled}){
  return (
    <button
      className="button-nav"
      type={buttonType}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;
