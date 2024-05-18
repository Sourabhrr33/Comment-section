// AddCommentForm.js
import React, { useState } from 'react';
import './AddCommentForm.css';  
import Avatar from '@mui/material/Avatar';

const AddCommentForm = ({ addComment }) => {
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && content) {
            addComment({ username, content });
            setUsername('');
            setContent('');
        }
    }

    return (
        <form className="add-comment-form" onSubmit={handleSubmit}>
            <div className="flex-container">
                <Avatar className='avatar'>{username[0]}</Avatar>
                <div className="input-container">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <textarea
                        className="form-textarea-comment"
                        placeholder="Add a comment..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit" className='form-button'>
                    Send
                </button>
            </div>
        </form>
    );
}

export default AddCommentForm;