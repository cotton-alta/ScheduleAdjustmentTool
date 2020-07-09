import React from "react";
import { Link } from "react-router-dom";

import "../assets/style/main.scss";

const App: React.FC = () => {
  return (
    <div className="main-wrapper">
      <img 
        className="main-img"
        src={`${process.env.PUBLIC_URL}top.png`} 
      />
      <div className="main-button">
        <Link className="main-link" to="/edit">
          予定を作ろう！
        </Link>
      </div>
    </div>
  );
};

export default App;