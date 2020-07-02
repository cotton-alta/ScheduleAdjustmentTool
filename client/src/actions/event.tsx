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