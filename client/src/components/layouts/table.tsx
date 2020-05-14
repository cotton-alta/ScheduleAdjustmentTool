import React from 'react';
import '../../assets/style/table.scss';

const App: React.FC = () => {
  interface StringObjectKey {
    [key: string]: any;
  }
  const data = {
    "title": "event",
    "dates": [
      "2020/005/11",
      "2020/005/12",
      "2020/005/13"
    ],
    "participant": [
      {
        "name": "Taro",
        "2020/005/11": "〇",
        "2020/005/12": "〇",
        "2020/005/13": "〇",
      },
      {
        "name": "Sato",
        "2020/005/11": "〇",
        "2020/005/12": "×",
        "2020/005/13": "〇",
      },
      {
        "name": "Suzuki",
        "2020/005/11": "〇",
        "2020/005/12": "〇",
        "2020/005/13": "〇",
      }
    ]
  }

  return (
    <div className="table-wrapper">
      <div>
        <span>{ data.title }</span>
      </div>
      <div className="table-line">
        <div className="table-cell"></div>
        {
          data.dates.map( date => {
            return (
              <div key={ date } className="table-cell">{ date }</div>
              )
          })
        }
      </div>
      { 
        data.participant.map( man => {
          const stringMan: StringObjectKey = man;
          return (
            <div key={ stringMan.date } className="table-line">
              <div className="table-cell">{ stringMan.name }</div>
              { data.dates.map( date => 
                <div key={ date } className="table-cell">{ stringMan[date] }</div>
              )}
            </div>
          )
        }) 
      }
    </div>
  )
}

export default App;