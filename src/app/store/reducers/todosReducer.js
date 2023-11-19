import * as actions from "../actions/index";

const initialState = {
  todos: []
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_ITEM: {
      return { ...state, openItem: action.payload };
    }
    default:
      return state;
  }
};

export default todoReducer;
