const eventAction = (state: any, action: any) => {
  switch(action.type) {
    case "checkEvent":
      return { ...state, ...action.payload };
    case "setUser":
      state.user.push(action.payload.stateUser);
      return state;
    default:
      return state;
  }
};

export {
  eventAction
}