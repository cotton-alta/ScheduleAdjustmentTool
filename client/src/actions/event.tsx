const eventAction = (state: any, action: any) => {
  switch(action.type) {
    case "checkEvent":
      return { ...state, ...action.payload };
    case "setUser":
      state.user.push(action.payload.stateUser);
      return state;
    case "setDecisionDate":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export {
  eventAction
}