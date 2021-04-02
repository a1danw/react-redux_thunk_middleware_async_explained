import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./actions";

const Posts = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const renderPosts = () => {
    if (state.loading) {
      return <h1>Loading...</h1>;
    }

    return state.items.map((el) => <h3>{el.title}</h3>);
  };
  return (
    <div>
      {renderPosts()}
      {/* {posts.map((el) => (
        <h3>{el.title}</h3>
      ))} */}
    </div>
  );
};

export default Posts;
