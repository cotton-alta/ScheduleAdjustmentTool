import React from "react";
import "../../assets/style/header.scss";

import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="header-wrapper">
      <div className="header-tab">
        <Link className="header-tab--medium" to="/">Top</Link>
      </div>
      <div className="header-tab">
        <Link className="header-tab--medium" to="/edit">新規作成</Link>
      </div>
      <div className="header-tab">過去の予定</div>
    </div>
  )
}

export default App;