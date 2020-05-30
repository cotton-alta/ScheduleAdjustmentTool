import React, { useContext, useState, useEffect, Fragment } from "react";

export const eventAction = (state: any, action: any) => {
  switch(action.type) {
    case "checkEvent":
      return action.payload;
    default:
      return state;
  }
};