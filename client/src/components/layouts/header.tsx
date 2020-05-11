import React from 'react';
import '../../assets/style/header.scss';

const App: React.FC = () => {

  return (
    <div className="header-wrapper">
      <div className="header-tab">新規作成</div>
      <div className="header-tab">過去の予定</div>
    </div>
  )
}

export default App;