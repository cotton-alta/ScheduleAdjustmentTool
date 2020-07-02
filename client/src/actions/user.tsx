const userAction = (state: any, action: any) => {
  switch(action.type) {
    case "dateChange":
      return { ...state, ...action.payload };
    case "nameChange":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export {
  userAction
}