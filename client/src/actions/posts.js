import * as api from "../api";
import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  LIKE,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  POSTERROR,
  COMMENT,
} from "../constants/actionTypes";

//Action Creators

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("message", post.message);
    formData.append("selectedFile", post.selectedFile);
    formData.append("tags", post.tags);
    formData.append("name", post.name);
    const { data } = await api.createPost(formData);
    navigate(`/posts/${data._id}`);
    await dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
    await dispatch(posterror(error.response?.data.message, navigate));
  }
};

export const posterror = (error, navigate) => async (dispatch) => {
  await dispatch({ type: POSTERROR, payload: error });
  navigate("/");
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("message", post.message);
    formData.append("selectedFile", post.selectedFile);
    formData.append("tags", post.tags);
    formData.append("name", post.name);
    const { data } = await api.updatePost(id, formData);
    await dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
