import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { markAllNotificationsAsSeen } from "../api/api";
import { setUser } from "../redux/userSlice";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllAsSeen = async () => {
    const userId = user._id;
    try {
      dispatch(showLoading());
      const response = await markAllNotificationsAsSeen(userId);
      console.log(response);
      dispatch(setUser(response.data));
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
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
              <h6 className="underline cursor-pointer sans link-danger">
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
