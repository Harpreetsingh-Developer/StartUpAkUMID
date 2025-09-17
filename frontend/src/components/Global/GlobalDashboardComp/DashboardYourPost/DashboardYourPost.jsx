import React, { useState, useEffect } from 'react';
import './DashboardYourPost.scss';
import icons from '../../../../constants/icons';
import updateService from '../../../../services/updateService';

const DashboardYourPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImage, setEditImage] = useState('');

  useEffect(() => {
    fetchPosts();
    // Make refreshPosts available globally
    window.refreshPosts = fetchPosts;
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      // Fetch posts by the current user (GlobalAdmin)
      const response = await updateService.getAllUpdates();
      if (response.success) {
        // Filter posts by author (you can enhance this with user context)
        const userPosts = response.data.updates.filter(post => 
          post.author === 'GlobalAdmin' || post.author === 'Global Admin'
        );
        setPosts(userPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditImage(post.imageUrl || '');
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditTitle('');
    setEditContent('');
    setEditImage('');
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const updateData = {
        title: editTitle.trim(),
        content: editContent.trim(),
        imageUrl: editImage
      };

      const response = await updateService.updateUpdate(editingPost, updateData, token);
      if (response.success) {
        alert('Post updated successfully!');
        handleCancelEdit();
        fetchPosts(); // Refresh the list
      } else {
        alert('Failed to update post: ' + response.message);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const response = await updateService.deleteUpdate(postId, token);
      if (response.success) {
        alert('Post deleted successfully!');
        fetchPosts(); // Refresh the list
      } else {
        alert('Failed to delete post: ' + response.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="your-posts-card">
        <h3>Your Posts</h3>
        <div className="loading">Loading your posts...</div>
      </div>
    );
  }

  return (
    <div className="your-posts-card">
      <h3>Your Posts</h3>
      
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>You haven't created any posts yet.</p>
          <p>Use the "Post Update" section to create your first post!</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-item">
              {editingPost === post._id ? (
                // Edit Mode
                <div className="edit-mode">
                  <input
                    type="text"
                    className="edit-title-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Post title"
                  />
                  <textarea
                    className="edit-content-input"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Post content"
                  />
                  <input
                    type="text"
                    className="edit-image-input"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    placeholder="Image URL (optional)"
                  />
                  <div className="edit-actions">
                    <button className="save-btn" onClick={handleSaveEdit}>
                      Save
                    </button>
                    <button className="cancel-btn" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="view-mode">
                  <div className="post-header">
                    <h4 className="post-title">{post.title}</h4>
                    <span className="post-date">{formatDate(post.date)}</span>
                  </div>
                  
                  <div className="post-content">
                    <p>{post.content}</p>
                    {post.imageUrl && (
                      <img 
                        src={post.imageUrl} 
                        alt="Post image" 
                        className="post-image"
                      />
                    )}
                  </div>
                  
                  <div className="post-actions">
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEdit(post)}
                    >
                      <img src={icons.SettingsIcon} alt="Edit" />
                      Edit
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(post._id)}
                    >
                      <img src={icons.Image} alt="Delete" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardYourPost;
