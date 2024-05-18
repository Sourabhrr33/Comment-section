
import React, { useState, useEffect } from 'react';
import Comment from './components/Comment/comment';
import AddCommentForm from './components/AddCommentForm/AddCommentForm';
import "./App.css";

const App = () => {
  const [comments, setComments] = useState(() => {
      // Load comments from localStorage or use default
      const savedComments = localStorage.getItem('comments');
      return savedComments ? JSON.parse(savedComments) : [
          { id: 1, username: 'Alexandra', content: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled.', upvotes: 4, downvotes: 0 },
          { id: 2, username: 'Carolyn', content: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled.', upvotes: 6, downvotes: 0 }
      ];
  });

  useEffect(() => {
      localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (newComment) => {
      setComments([...comments, { id: comments.length + 1, ...newComment, upvotes: 0, downvotes: 0 }]);
  }

  const deleteComment = (id) => {
      setComments(comments.filter(comment => comment.id !== id));
  }

  const updateComment = (id, updatedContent) => {
      setComments(comments.map(comment => comment.id === id ? { ...comment, content: updatedContent } : comment));
  }

  const handleVote = (id, voteType) => {
      setComments(comments.map(comment => {
          if (comment.id === id) {
              if (voteType === 'upvote') {
                  return { ...comment, upvotes: comment.upvotes + 1 };
              } else if (voteType === 'downvote') {
                  return { ...comment, upvotes: comment.upvotes - 1 };
              }
          }
          return comment;
      }));
  }

  return (
      <div className="App">
          <h1>Interactive Comments Section</h1>
          <div className="comments-list">
              {comments.map(comment => (
                  <Comment
                      key={comment.id}
                      id={comment.id}
                      username={comment.username}
                      content={comment.content}
                      totalVotes={comment.upvotes - comment.downvotes}
                      onDelete={deleteComment}
                      onUpdate={updateComment}
                      onVote={handleVote}
                  />
              ))}
              <AddCommentForm addComment={addComment} />
          </div>
      </div>
  );
}

export default App;