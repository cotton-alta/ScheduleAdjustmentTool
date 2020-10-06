import React from "react";

const EventCard = (props: any) => {
  return (
    <div className="card-wrapper">
      <span className="card-title">{ props.data.title }</span>
      <span className="card-description">{ props.data.description }</span>
    </div>
  );
};

export {
  EventCard
}
