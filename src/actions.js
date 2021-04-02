import Axios from "axios";
// action creators handle the api requests instead of the components

// action creator has to return an action object - action object always has a type
// we also want the action creator to handle the logic of fetching the data

// FETCHPOSTS NOT WORKING
// 1. action creators can only return plain javascript objects with a type property
//    if we try to return anything else other than a plain js object we will get an error

// 2. the action will get sent to the reducer before the data is fetched from the API

// export const fetchPosts = async () => {
//   const response = await Axios.get(
//     "https://jsonplaceholder.typicode.com/posts"
//   );

//   // a payload property is added to the action object which receives the data
//   return {
//     type: "FETCH_POSTS",
//     payload: response.data,
//   };
// };

// to get the action creator to perform async actions we need to use a middleware
// like the above the action is sent to the reducer in around 0.1/0.2s, before the data has time to
// fetch the data - around 0.5s
// 3rd party middleware is needed to solve this issue

// redux thunk does one thing - allows action creators to return an object or return a function
// redux only cares what the action creator returns (outer function)
// it doesnt care what the inner function returns - so we can use async/await without any issues

// where now pausing the action from being dispatched - we need to wait to we get a response back from api
// only once we get the response do we continue dispatching the action

// export const fetchPosts = () => {
//   // we can now return a function with thunk
//   // because we now have redux middleware we can return a function instead of just an action object
//   return async (dispatch, getState) => {
//     const response = await Axios.get(
//       "https://jsonplaceholder.typicode.com/posts"
//     );
//     console.log(response.data);
//     // once we get back a response we manually dispatch an action object
//     dispatch({
//       type: "FETCH_POSTS",
//       payload: response.data,
//     });
//   };
// };

// SHORTHAND FOR ABOVE
// export const fetchPosts = () => async (dispatch, getState) => {
//   const response = await Axios.get(
//     "https://jsonplaceholder.typicode.com/posts"
//   );
//   console.log(response.data);
//   dispatch({
//     type: "FETCH_POSTS",
//     payload: response.data,
//   });
// };

// make use of the REQUEST/SUCCESS/FAILURE pattern to handle loading and error state
// seperate action for REQUEST, SUCCESS and failure

export const fetchPosts = () => async (dispatch, getState) => {
  // first try to get the data
  dispatch({ type: "FETCH_POSTS_REQUEST" });

  try {
    const response = await Axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch({ type: "FETCH_POSTS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_POSTS_FAILURE", error });
  }
};
