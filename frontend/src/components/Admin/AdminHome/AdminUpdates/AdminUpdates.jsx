import React, { useState, useEffect } from 'react';
import './AdminUpdates.scss';
import updateService from '../../../../services/updateService';
import pollService from '../../../../services/pollService'; // Import pollService
import icons from '../../../../constants/icons';
import { CustomPopup } from '../../../common/AdminCommon';

const AdminUpdates = () => {
  const [allPosts, setAllPosts] = useState([]); // Combined updates and polls
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const [error, setError] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]); // Combined and filtered posts
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const CHARACTER_LIMIT = 150;

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    filterAndSortPosts();
  }, [allPosts, searchTerm, sortBy, sortOrder]);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const [updatesResponse, pollsResponse] = await Promise.all([
        updateService.getAllUpdates(),
        pollService.getAllPolls()
      ]);
      
      let combinedPosts = [];

      if (updatesResponse.success) {
        combinedPosts = [...combinedPosts, ...updatesResponse.data.updates.map(update => ({
          ...update,
          type: 'update',
          date: new Date(update.date),
          content: update.content, // Ensure content exists for updates
          tags: update.tags || []
        }))];
      } else {
        console.error('Failed to fetch updates:', updatesResponse.message);
        // Continue fetching polls even if updates fail
      }

      if (pollsResponse.success) {
        combinedPosts = [...combinedPosts, ...pollsResponse.data.polls.map(poll => ({
          ...poll,
          _id: poll._id, // Ensure _id is present for key
          type: 'poll',
          date: new Date(poll.createdAt),
          content: poll.question, // Use question as content for display
          author: poll.createdBy, // Use createdBy as author
          tags: [], // Polls don't have tags by default
          isPublished: poll.isActive, // Map isActive to isPublished for consistency
        }))];
      } else {
        console.error('Failed to fetch polls:', pollsResponse.message);
        // Continue even if polls fail
      }

      setAllPosts(combinedPosts);

      if (!updatesResponse.success && !pollsResponse.success) {
        setPopupMessage('Failed to fetch both updates and polls.');
        setShowErrorPopup(true);
        setError('Failed to fetch all posts.');
      } else if (!updatesResponse.success) {
        setPopupMessage('Failed to fetch updates. Displaying polls only.');
        setShowErrorPopup(true);
        setError('Failed to fetch updates.');
      } else if (!pollsResponse.success) {
        setPopupMessage('Failed to fetch polls. Displaying updates only.');
        setShowErrorPopup(true);
        setError('Failed to fetch polls.');
      }

    } catch (error) {
      console.error('Error fetching all posts:', error);
      setError('Failed to fetch posts. Please try again.');
      setPopupMessage('Failed to fetch posts. Please try again.');
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPosts = () => {
    let filtered = allPosts.filter(post =>
      (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (post.type === 'poll' && post.question.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.type === 'poll' && post.options.some(option => option.text.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    // Sort posts (updates and polls)
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'title':
          aValue = a.type === 'update' ? a.title.toLowerCase() : a.question.toLowerCase();
          bValue = b.type === 'update' ? b.title.toLowerCase() : b.question.toLowerCase();
          break;
        case 'author':
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPosts(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const toggleExpanded = (postId) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleRetry = () => {
    setShowErrorPopup(false);
    fetchAllPosts();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="admin-updates">
        <div className="admin-updates__header">
          <h1 className="admin-updates__title">Posts Management</h1>
          <p className="admin-updates__subtitle">Manage and monitor all platform updates and polls</p>
        </div>
        <div className="admin-updates__loading">
          <div className="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-updates">
      <div className="admin-updates__header">
        <div className="admin-updates__header-left">
          <h1 className="admin-updates__title">Posts Management</h1>
          <p className="admin-updates__subtitle">Manage and monitor all platform updates and polls</p>
        </div>
      </div>

      <div className="admin-updates__controls">
        <div className="admin-updates__search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search posts by title, content, author, tags, question, or options..."
              value={searchTerm}
              onChange={handleSearch}
              className="admin-updates__search-input"
            />
            {searchTerm && (
              <button 
                onClick={handleClearSearch}
                className="clear-search-btn"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="admin-updates__sort-section">
          <div className="sort-controls">
            <label className="sort-label">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="date">Date</option>
              <option value="title">Title/Question</option>
              <option value="author">Author/Creator</option>
            </select>
            <button 
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="sort-order-btn"
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="admin-updates__error">
          <div className="error-content">
            <p>{error}</p>
            <button onClick={handleRetry} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="admin-updates__empty">
          {searchTerm ? (
            <div className="empty-search">
              <div className="empty-icon">🔍</div>
              <h3>No posts found</h3>
              <p>No posts match your search for "{searchTerm}"</p>
              <button onClick={handleClearSearch} className="clear-search-btn">
                Clear Search
              </button>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No posts available</h3>
              <p>There are no updates or polls to display at the moment.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="admin-updates__grid">
          {filteredPosts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-card__header">
                <div className="post-card__author">
                  <img 
                    src={icons.UserAvatar || 'https://via.placeholder.com/40'} 
                    alt={post.author} 
                    className="post-card__avatar"
                  />
                  <div className="post-card__author-info">
                    <h3 className="post-card__author-name">{post.author}</h3>
                    <span className="post-card__date">{formatDate(post.date)}</span>
                  </div>
                </div>
                <span 
                  className={`post-type-badge post-type-badge--${post.type}`}
                >
                  {post.type === 'update' ? 'Update' : 'Poll'}
                </span>
              </div>

              <div className="post-card__content">
                {post.type === 'update' ? (
                  <>
                    <h2 className="post-card__title">{post.title}</h2>
                    <div className="post-card__text">
                      {expandedPosts.has(post._id) ? (
                        <p>{post.content}</p>
                      ) : (
                        <p>
                          {post.content.length > CHARACTER_LIMIT 
                            ? `${post.content.substring(0, CHARACTER_LIMIT)}...` 
                            : post.content
                          }
                        </p>
                      )}
                      {post.content.length > CHARACTER_LIMIT && (
                        <button 
                          className="read-more-btn"
                          onClick={() => toggleExpanded(post._id)}
                        >
                          {expandedPosts.has(post._id) ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                      {post.imageUrl && (
                        <img 
                          src={post.imageUrl} 
                          alt="Update image" 
                          className="post-card__image"
                        />
                      )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="post-card__tags">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="poll-display">
                    <h2 className="post-card__question">{post.question}</h2>
                    <div className="poll-options-list">
                      {post.options.map((option, index) => (
                        <div key={index} className="poll-option">
                          <span className="option-text">{option.text}</span>
                          <span className="option-votes">{option.votes} votes ({((option.votes / (post.totalVotes || 1)) * 100).toFixed(1)}%)</span>
                          <div className="option-bar" style={{ width: `${(option.votes / (post.totalVotes || 1)) * 100}%` }}></div>
                        </div>
                      ))}
                    </div>
                    <div className="poll-footer">
                      <span className="total-votes">Total Votes: {post.totalVotes}</span>
                      <span 
                        className={`status-badge status-badge--${post.isPublished ? 'active' : 'inactive'}`}
                      >
                        {post.isPublished ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Popups */}
      <CustomPopup
        isOpen={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        title="Error"
        type="error"
        size="small"
      >
        <div className="popup-content">
          <p>{popupMessage}</p>
          <div className="popup-actions">
            <button 
              onClick={() => setShowErrorPopup(false)}
              className="popup-btn popup-btn--secondary"
            >
              Close
            </button>
            <button 
              onClick={handleRetry}
              className="popup-btn popup-btn--primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </CustomPopup>

      <CustomPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Success"
        type="success"
        size="small"
      >
        <div className="popup-content">
          <p>{popupMessage}</p>
          <div className="popup-actions">
            <button 
              onClick={() => setShowSuccessPopup(false)}
              className="popup-btn popup-btn--primary"
            >
              OK
            </button>
          </div>
        </div>
      </CustomPopup>
    </div>
  );
};

export default AdminUpdates;