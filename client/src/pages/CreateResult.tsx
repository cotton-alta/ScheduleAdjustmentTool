import React from "react";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";
import history from "../history";

const CreateResult: React.FC = () => {
  const { event } = useParams();
  return (
    <div>
      <p>{ event }</p>
    </div>
  )
};

export default withRouter(CreateResult);