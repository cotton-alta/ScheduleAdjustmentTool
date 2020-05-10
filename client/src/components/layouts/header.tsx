import React from 'react';

const App: React.FC = () => {
  const table_tab = [
    "title",
    "date",
    "detail",
    "contributor"
  ]

  return (
    <React.Fragment>
      { table_tab.map( tab => <div>{ tab }</div>) }
    </React.Fragment>
  )
}

export default App;