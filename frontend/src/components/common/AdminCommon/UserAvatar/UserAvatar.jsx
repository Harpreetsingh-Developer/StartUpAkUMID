import React from "react";
import icons from "../../../../constants/icons";
import "./UserAvatar.scss";

const UserAvatar = ({ 
  user = { name: "Admin", initials: "AP" }, 
  onClick,
  size = "medium" 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(user);
    }
  };

  return (
    <div 
      className={`admin-user-avatar admin-user-avatar--${size}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {user.avatar ? (
        <img 
          src={user.avatar} 
          alt={`${user.name} avatar`} 
          className="admin-user-avatar__image"
        />
      ) : (
        <div className="admin-user-avatar__initials">
          {user.initials}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
