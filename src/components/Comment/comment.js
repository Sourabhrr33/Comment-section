// Comment.js
import React, { useState } from 'react';
import "./comment.css"
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
const Comment = ({ id, username, content, totalVotes, onDelete, onUpdate, onVote }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        onUpdate(id, editedContent);
        setIsEditing(false);
    }

    const handleVote = (voteType) => {
        onVote(id, voteType);
    }

    return (
        <div className="comment-container">
            <div className="comment-header">
                <Avatar style={{ width: "30px", height: "28px" }}>{username[0]}</Avatar>
                <span>{username}</span>
                <div className="comment-votes">
                    <button className="vote-btn" onClick={() => handleVote('upvote')}>+</button>
                    <span className="vote-count">{totalVotes}</span>
                    <button className="vote-btn" onClick={() => handleVote('downvote')}>-</button>
                </div>
            </div>

            {isEditing ? (
                <div className="edit-form">
                    <textarea
                        className="edit-textarea"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button className="save-btn" onClick={handleSave}>Save</button>
                </div>
            ) : (
                <>
                    <p className="comment-content">{content}</p>
                    <div className="comment-actions">
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                            style={{ color: 'blue', borderColor: 'blue', background: "white" }}
                        >
                            Edit
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<DeleteIcon style={{ color: 'red' }} />}
                            onClick={() => onDelete(id)}
                            style={{ color: 'red', borderColor: 'red', background: "white" }}
                        >
                            Delete
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Comment;