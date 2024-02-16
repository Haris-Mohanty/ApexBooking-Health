import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import {
  deleteAllSeenNotifications,
  markAllNotificationsAsSeen,
} from "../api/api";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Mark all notifications as seen
  const markAllAsSeen = async () => {
    const userId = user._id;
    try {
      dispatch(showLoading());
      const response = await markAllNotificationsAsSeen(userId);
      dispatch(setUser(response.data));
      dispatch(hideLoading());
      toast.success(response.message);
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  //Delete all seen notifications
  const deleteAllNotifications = async () => {
    const userId = user._id;
    try {
      dispatch(showLoading());
      const response = await deleteAllSeenNotifications(userId);
      dispatch(setUser(response.data));
      dispatch(hideLoading());
      toast.success(response.message);
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Layout>
        <h2 className="montserrat">Notifications</h2>
        <Tabs>
          <Tabs.TabPane tab="Unseen" key={"unseen"}>
            <div className="d-flex justify-content-end">
              <h6
                className="underline cursor-pointer sans link-success mb-3"
                onClick={() => markAllAsSeen()}
              >
                Mark all as seen
              </h6>
            </div>
            {user?.unSeenNotifications.map((notification, index) => (
              <div
                key={index}
                className="card p-2 mb-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Seen" key={"seen"}>
            <div className="d-flex justify-content-end">
              <h6
                className="underline cursor-pointer sans link-danger"
                onClick={() => deleteAllNotifications()}
              >
                Delete all
              </h6>
            </div>
            {user?.seenNotifications.map((notification, index) => (
              <div
                key={index}
                className="card p-2 mb-2"
                onClick={() => navigate(notification.onClickPath)}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    </>
  );
};

export default Notification;
