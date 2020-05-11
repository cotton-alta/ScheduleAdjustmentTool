import React from 'react';
import '../../assets/style/table.css';

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
      <div>
        {
          data.dates.map( date => {
            return (
              <React.Fragment>{ date }</React.Fragment>
              )
            } )
        }
      </div>
      { 
        data.participant.map( man => {
          const stringMan: StringObjectKey = man;
          return (
            <div>
              { stringMan.name }
              { data.dates.map( date => <React.Fragment>{ stringMan[date] }</React.Fragment>) }
            </div>
          )
        }) 
      }
    </div>
  )
}

export default App;