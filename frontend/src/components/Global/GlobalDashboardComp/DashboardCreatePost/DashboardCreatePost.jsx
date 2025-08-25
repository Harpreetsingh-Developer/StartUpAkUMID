import React, { useState, useRef } from 'react';
import './DashboardCreatePost.scss';
import icons from '../../../../constants/icons';

const DashboardCreatePost = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [postText, setPostText] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [imagePreview, setImagePreview] = useState(null);
  
  const fileInputRef = useRef(null);

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const handleCancel = () => {
    setActiveTab('post');
    setPostText('');
    setPollQuestion('');
    setPollOptions(['', '']);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMediaClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  }

  const handleEmojiClick = () => {
    setPostText(postText + '😊');
  };

  return (
    <div className="create-post-card">
      <div className="create-post-tabs">
        <button
          className={`tab-button ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => setActiveTab('post')}
        >
          <img src={icons.Post} alt="Post" /> Post
        </button>
        <button
          className={`tab-button ${activeTab === 'poll' ? 'active' : ''}`}
          onClick={() => setActiveTab('poll')}
        >
          <img src={icons.Poll} alt="Poll" /> Poll
        </button>
      </div>

      <div className="create-post-body">
        {activeTab === 'post' ? (
          <>
            <textarea
              className="post-textarea"
              placeholder="Write your post here and mention your peers..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            ></textarea>
            {imagePreview && (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Post preview" className="image-preview" />
                <button onClick={removeImage} className="remove-image-btn">&times;</button>
              </div>
            )}
          </>
        ) : (
          <div className="poll-form">
            <input
              type="text"
              className="poll-question-input"
              placeholder="Enter your poll question"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
            />
            <div className="poll-options-list">
              {pollOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  className="poll-option-input"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handlePollOptionChange(index, e.target.value)}
                />
              ))}
            </div>
            <button className="add-option-btn" onClick={addPollOption}>
              + Add Option
            </button>
          </div>
        )}
      </div>

      <div className="create-post-footer">
        <div className="footer-actions-left">
          <button className="action-icon-btn mention">@</button>
          <button className="action-icon-btn media" onClick={handleMediaClick}>
            <img src={icons.Image} alt="Upload Media" />
          </button>
          <button className="action-icon-btn emoji" onClick={handleEmojiClick}>
            <img src={icons.Emoji} alt="Add Emoji" />
          </button>
        </div>
        <div className="footer-actions-right">
          <button className="action-btn cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="action-btn post">Post</button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*,video/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DashboardCreatePost;
