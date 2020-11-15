import React from "react";

const EventCard = (props: any) => {
  return (
    <div className="card-wrapper">
      <span className="card-title">{ props.data.title }</span>
      <span className="card-description">
        {
          props.data.description.split("<br />").map((row: string) => {
            return (<p>{row}</p>);
          })
        }
      </span>
    </div>
  );
};

export {
  EventCard
}
