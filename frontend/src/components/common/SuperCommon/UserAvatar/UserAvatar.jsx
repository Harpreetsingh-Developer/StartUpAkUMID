import React from "react";
import "./UserAvatar.scss";

const UserAvatar = ({ initials = "AP" }) => (
  <span className="user-avatar">{initials}</span>
);

export default UserAvatar; 