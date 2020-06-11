import React, { useContext, useState, useEffect, Fragment } from "react";

const eventAction = (state: any, action: any) => {
  switch(action.type) {
    case "checkEvent":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export {
  eventAction
}