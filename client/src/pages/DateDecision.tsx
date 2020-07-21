import React, { useState } from "react";

const DateDecision: React.FC = () => {
  const [ authenticated, setAuthenticated ] = useState(false);
  if(!authenticated) {
    return (
      <div className="container">
        
      </div>
    );
  } else {
    return (
      <div className="container">

      </div>
    );
  }
};

export {
  DateDecision
}