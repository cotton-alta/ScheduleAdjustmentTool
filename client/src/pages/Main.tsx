import React from "react";
import axios from "axios";

import Table from "../components/layouts/table";

const App: React.FC = () => {
  const getData = (url: string) => {
    axios.get("/api/table")
      .then(result => {
        console.log(result)
      })
  }

  return (
    <div className="main-wrapper">
      <Table />
    </div>
  );
};

export default App;