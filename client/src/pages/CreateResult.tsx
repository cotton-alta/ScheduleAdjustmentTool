import React from "react";
import { useParams, Link } from "react-router-dom";
import { withRouter } from "react-router";
// import history from "../history";

import "../assets/style/result.scss";

const CreateResult: React.FC = () => {
  const { event } = useParams<any>();
  const url = "localhost:3000/event/" + event;
  const pasteURL = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("コピー完了！");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className="result-wrapper">
      <div className="result-box">
        <div className="result-title">
          イベントページURL
        </div>
        <div className="result-url">
          localhost:3000/event/{ event }
        </div>
      </div>
      <div className="result-flex">
        <div 
          className="result-button"
          onClick={pasteURL}
          >
          クリップボードへコピー
        </div>
        <div className="result-button">
          <Link
            className="result-link"
            to={`/event/${event}`}
          >
            イベントページへ！
          </Link>
        </div>
      </div>
    </div>
  )
};

export default withRouter(CreateResult);