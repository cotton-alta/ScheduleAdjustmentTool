import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../assets/style/main.scss";

const App: React.FC = () => {
  // const getData = (url: string) => {
  //   axios.get("/api/table")
  //     .then((result: any) => {
  //       console.log(result)
  //     });
  // };

  return (
    <div className="main-wrapper">
      <div className="main-button">
        <Link className="main-link" to="/edit">
          予定を作ろう！
        </Link>
      </div>
    </div>
  );
};

export default App;