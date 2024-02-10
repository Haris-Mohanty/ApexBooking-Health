import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../api/api";
import { setUser } from "../../redux/userSlice";
import { hideLoading, showLoading } from "../../redux/spinnerSlice";

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Fetch user
  const fetchUser = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserInfo();
      dispatch(hideLoading());
      if (res.success) {
        dispatch(setUser(res.data));
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
