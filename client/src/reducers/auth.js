import { AUTH, AUTHERROR, LOGOUT } from "../constants/actionTypes";

const authReducuer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case AUTHERROR:
      return { ...state, error: action.payload };

    case LOGOUT:
      window.localStorage.removeItem("profile");
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducuer;
