import React, { useState, useRef } from 'react';
import './DashboardCreatePost.scss';
import icons from '../../../../constants/icons';
import updateService from '../../../../services/updateService';
import pollService from '../../../../services/pollService'; // Import pollService
import { CustomPopup } from '../../../common/AdminCommon'; // Import CustomPopup

const DashboardCreatePost = () => {
  const [activeTab, setActiveTab] = useState('post');
  const [postText, setPostText] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State for error popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message
  
  const fileInputRef = useRef(null);

  // Emoji options
  const emojis = ['😊', '😄', '🎉', '🚀', '💡', '🔥', '⭐', '❤️', '👍', '👏', '🎯', '💪', '🌟', '✨', '🎊', '🏆'];

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    if (pollOptions.length < 5) { // Limit to 5 options for now
      setPollOptions([...pollOptions, '']);
    } else {
      setPopupMessage('You can add a maximum of 5 poll options.');
      setShowErrorPopup(true);
    }
  };

  const removePollOption = (indexToRemove) => {
    if (pollOptions.length > 2) { // Ensure at least two options remain
      setPollOptions(pollOptions.filter((_, index) => index !== indexToRemove));
    } else {
      setPopupMessage('A poll must have at least two options.');
      setShowErrorPopup(true);
    }
  };

  const handleCancel = () => {
    setActiveTab('post');
    setPostText('');
    setPostTitle('');
    setPollQuestion('');
    setPollOptions(['', '']);
    setImagePreview(null);
    setShowEmojiPicker(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowErrorPopup(false);
    setShowSuccessPopup(false);
    setPopupMessage('');
  };

  const handleMediaClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setPopupMessage('Please select an image file.');
        setShowErrorPopup(true);
      }
    }
  };
  
  const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
  }

  const handleEmojiClick = (emoji) => {
    setPostText(postText + emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handlePost = async () => {
    setIsPosting(true);
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setPopupMessage('Please login to post updates/polls.');
        setShowErrorPopup(true);
        setIsPosting(false);
        return;
      }

      if (activeTab === 'post') {
        if (!postTitle.trim() || !postText.trim()) {
          setPopupMessage('Please fill in both title and content for the update.');
          setShowErrorPopup(true);
          setIsPosting(false);
          return;
        }

        const updateData = {
          title: postTitle.trim(),
          content: postText.trim(),
          author: 'GlobalAdmin', 
          imageUrl: imagePreview,
          tags: []
        };

        const response = await updateService.createUpdate(updateData, token);
        
        if (response.success) {
          setPopupMessage('Update posted successfully!');
          setShowSuccessPopup(true);
          handleCancel();
          if (window.refreshPosts) {
            window.refreshPosts();
          }
        } else {
          setPopupMessage('Failed to post update: ' + (response.message || 'Unknown error'));
          setShowErrorPopup(true);
        }
      } else if (activeTab === 'poll') {
        if (!pollQuestion.trim() || pollOptions.filter(option => option.trim() !== '').length < 2) {
          setPopupMessage('Please enter a poll question and at least two valid options.');
          setShowErrorPopup(true);
          setIsPosting(false);
          return;
        }

        const pollData = {
          question: pollQuestion.trim(),
          options: pollOptions.filter(option => option.trim() !== '').map(option => ({ text: option.trim() })),
          createdBy: 'GlobalAdmin',
        };

        const response = await pollService.createPoll(pollData, token);

        if (response.success) {
          setPopupMessage('Poll created successfully!');
          setShowSuccessPopup(true);
          handleCancel();
        } else {
          setPopupMessage('Failed to create poll: ' + (response.message || 'Unknown error'));
          setShowErrorPopup(true);
        }
      }
    } catch (error) {
      console.error('Error posting/creating:', error);
      setPopupMessage('An error occurred. Please try again. Error: ' + error.message);
      setShowErrorPopup(true);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="create-post-card">
      <div className="create-post-tabs">
        <button
          className={`tab-button ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => setActiveTab('post')}
        >
          <img src={icons.Post} alt="Post" /> Post Update
        </button>
        <button
          className={`tab-button ${activeTab === 'poll' ? 'active' : ''}`}
          onClick={() => setActiveTab('poll')}
        >
          <img src={icons.Poll} alt="Poll" /> Create Poll
        </button>
      </div>

      <div className="create-post-body">
        {activeTab === 'post' ? (
          <>
            <div className="post-form">
              <input
                type="text"
                className="post-title-input"
                placeholder="Enter update title..."
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
              <textarea
                className="post-textarea"
                placeholder="Write your update content here..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              ></textarea>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Post preview" className="image-preview" />
                  <button onClick={removeImage} className="remove-image-btn">&times;</button>
                </div>
              )}
            </div>
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
                <div key={index} className="poll-option-item">
                  <input
                    type="text"
                    className="poll-option-input"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                  />
                  {pollOptions.length > 2 && (
                    <button 
                      className="remove-option-btn"
                      onClick={() => removePollOption(index)}
                      title="Remove option"
                    >
                      ×
                    </button>
                  )}
                </div>
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
          <button className="action-icon-btn emoji" onClick={toggleEmojiPicker}>
            <img src={icons.Emoji} alt="Add Emoji" />
          </button>
          
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="emoji-picker">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  className="emoji-option"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="footer-actions-right">
          <button className="action-btn cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button 
            className={`action-btn ${isPosting ? 'posting' : ''}`}
            onClick={handlePost}
            disabled={isPosting || (activeTab === 'post' && (!postTitle.trim() || !postText.trim())) || (activeTab === 'poll' && (!pollQuestion.trim() || pollOptions.filter(option => option.trim() !== '').length < 2))}
          >
            {isPosting ? 'Posting...' : (activeTab === 'post' ? 'Post Update' : 'Create Poll')}
          </button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />

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
              className="popup-btn popup-btn--primary"
            >
              Close
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

export default DashboardCreatePost;
