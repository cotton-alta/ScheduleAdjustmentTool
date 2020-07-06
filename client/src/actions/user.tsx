const userAction = (state: any, action: any) => {
  switch(action.type) {
    case "dateInit":
      return { ...action.payload };
    case "dataChange":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export {
  userAction
}