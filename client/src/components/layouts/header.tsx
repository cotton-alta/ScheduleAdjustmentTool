import React from 'react';
import '../../assets/style/header.css';

const App: React.FC = () => {
  const table_tab = [
    "title",
    "date",
    "detail",
    "contributor"
  ]

  return (
    <div className="header-wrapper">
      {/* { table_tab.map( tab => <div>{ tab }</div>) } */}
    </div>
  )
}

export default App;