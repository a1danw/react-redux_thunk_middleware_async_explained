const initState = {
  items: [],
  loading: false,
  error: null,
};

const postsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null, // clear out any previous errors
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        items: action.payload,
        // items: [...state.items, action.payload],
        error: action.error,
      };
    default:
      return state;
  }
};

export default postsReducer;
