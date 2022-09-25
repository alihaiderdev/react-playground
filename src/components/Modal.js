import { Modal } from "antd";
import React, { useEffect, useState } from "react";

const TOKEN = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;

const Item = ({ label, info }) => {
  return (
    <li>
      {label}:{" "}
      <span className="text-indigo-600 font-black text-sm">{info}</span>
    </li>
  );
};

const CustomModal = ({ title, isModalOpen, closeModal, username }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const user = await res.json();
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      console.log({ error: error.message });
    }
  };

  useEffect(() => {
    getUser();
  }, [username]);

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={closeModal}
      onCancel={closeModal}
    >
      {isLoading && <h1 className="text-indigo-600 text-2xl">Loading...</h1>}
      {!isLoading && error && (
        <h1 className="text-indigo-600 text-2xl">{error}</h1>
      )}
      {!isLoading && Object.keys(user || {}).length > 0 && (
        <ul>
          <li className="text-center">
            <img
              className="w-96 rounded-full"
              src={user.avatar_url}
              alt={user.login}
              style={{ margin: "0 auto" }}
            />
          </li>
          <Item label={"Followers"} info={user.followers} />
          <Item label={"Following"} info={user.following} />
          <Item label={"Location"} info={user.location} />
          <Item label={"Full Name"} info={user.name} />
        </ul>
      )}
    </Modal>
  );
};

export default CustomModal;
