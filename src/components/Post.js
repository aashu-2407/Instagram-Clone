import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import firebase from 'firebase';

function Post({ caption, username, imageUrl, postId, user }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments').
                orderBy('timestamp', 'desc').
                onSnapshot(snapshot => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt="Aashutosh"
                />
                <h3>{username}</h3>
            </div>
            <img className="post_image" src={imageUrl} alt="" />

            <h4 className="post_text"><strong>{username}</strong>&nbsp;{caption}</h4>

            <div className="post_comments">
                {
                    comments.map((comment) => (
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }
            </div>

            {user && (
                <form className="post_commentbox">
                    <input
                        className="post_input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!comment}
                        className="post_button"
                        onClick={postComment}>Post</button>
                </form>
            )}

        </div>
    )
}

export default Post;
