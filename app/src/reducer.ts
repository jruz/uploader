const initialState = [];

const Reducer = (state: StateT = initialState, action: ActionT): StateT => {
  switch (action.type) {
    case 'GET_FILES_FULFILLED':
    case 'DELETE_FILE_FULFILLED':
    case 'UPLOAD_FILE_FULFILLED': {
      const data = [...action.payload.data];
      data.sort((a, b) => a.createdAt < b.createdAt);
      return data;
    }
    default: {
      return state;
    }
  }
};
export default Reducer;
