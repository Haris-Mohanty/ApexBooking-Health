import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getUserInfo } from "../api/api";
import { Card, Descriptions, List } from "antd";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserInfo();
      setUser(res.data);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Layout>
      {user && (
        <Card>
          <Descriptions title="User Info">
            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          </Descriptions>
          <Card title="Notifications" className="mt-3 mb-3">
            <List
              className="mb-3"
              header={<div>Seen Notifications</div>}
              bordered
              dataSource={user.seenNotifications}
              renderItem={(item) => (
                <List.Item>
                  <strong className="text-capitalize">{item.type}:</strong>{" "}
                  {item.message}
                </List.Item>
              )}
            />
            <List
              header={<div>Unseen Notifications</div>}
              bordered
              dataSource={user.unSeenNotifications}
              renderItem={(item) => (
                <List.Item>
                  <strong className="text-capitalize">{item.type}:</strong>{" "}
                  {item.message}
                </List.Item>
              )}
            />
          </Card>
        </Card>
      )}
    </Layout>
  );
};

export default UserProfile;
