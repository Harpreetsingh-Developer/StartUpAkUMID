import React, { useState, useEffect } from 'react';
import './DashboardYourPost.scss';
import icons from '../../../../constants/icons';

// --- Time Formatting Utility ---
const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "just now";
};

// --- Dummy Data for Posts ---
const dummyPosts = [
  {
    id: 1,
    author: 'KPB Supports Solutions',
    avatar: icons.CompanyLogo,
    timestamp: new Date(new Date().getTime() - 19 * 60 * 60 * 1000),
    text: "We are Launching Soon!!!",
    image: 'https://placehold.co/600x300/2d3748/ffffff?text=KPB+Supports+Solutions'
  },
  {
    id: 2,
    author: 'KPB Supports Solutions',
    avatar: icons.CompanyLogo,
    timestamp: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
    text: 'Just finished a great session on project management. Collaboration is key!',
    image: null
  },
  
];

// --- Delete Confirmation Modal Component ---
const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Are you sure?</h4>
        <p>Do you really want to delete this post? This process cannot be undone.</p>
        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={onCancel}>No</button>
          <button className="modal-btn confirm-btn" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

// --- Single Post Item Component ---
const PostItem = ({ post, onUpdatePost, onDeletePost }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(post.timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(post.timestamp));
    }, 60000);
    return () => clearInterval(interval);
  }, [post.timestamp]);

  const handleEdit = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(post.text);
  };

  const handleSave = () => {
    onUpdatePost(post.id, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeletePost(post.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="post-item-card">
        <div className="post-item-header">
          <div className="author-details">
            <img src={post.avatar} alt={post.author} className="author-avatar" />
            <div className="author-info">
              <span className="author-name">
                {post.author}
              </span>
              <span className="post-timestamp">{timeAgo}</span>
            </div>
          </div>
          <div className="post-menu-container">
            <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              &#x22EE;
            </button>
            {isMenuOpen && (
              <div className="post-menu-dropdown">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => { setIsDeleteModalOpen(true); setIsMenuOpen(false); }}>Delete</button>
              </div>
            )}
          </div>
        </div>
        <div className="post-item-body">
          {isEditing ? (
            <div className="edit-mode-container">
              <textarea
                className="edit-textarea"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <div className="edit-actions">
                <button className="edit-action-btn cancel" onClick={handleCancelEdit}>Cancel</button>
                <button className="edit-action-btn save" onClick={handleSave}>Save</button>
              </div>
            </div>
          ) : (
            <>
              <p className="post-text">{post.text}</p>
              {post.image && <img src={post.image} alt="Post content" className="post-image" />}
            </>
          )}
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

// --- Main Your Posts Component ---
const DashboardYourPost = () => {
  const [posts, setPosts] = useState(dummyPosts);

  const handleUpdatePost = (postId, newText) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, text: newText } : post
    );
    setPosts(updatedPosts);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className="your-posts-container">
      <h3 className="your-posts-title">YOUR POSTS</h3>
      <div className="posts-list">
        {posts.map(post => (
          <PostItem 
            key={post.id} 
            post={post} 
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardYourPost;
