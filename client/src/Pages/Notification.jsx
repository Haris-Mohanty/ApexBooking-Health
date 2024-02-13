import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <h2 className="montserrat">Notifications</h2>
        <Tabs>
          <Tabs.TabPane tab="Unseen" key={"unseen"}>
            <div className="d-flex justify-content-end">
              <h6 className="underline cursor-pointer sans link-success mb-3">
                Mark all as seen
              </h6>
            </div>
            {user.unSeenNotifications.map((notification, index) => (
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
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    </>
  );
};

export default Notification;
