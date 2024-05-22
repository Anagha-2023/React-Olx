import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';

import './View.css';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails, setPostDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    // Retrieve postDetails from localStorage if not available in state
    if (!postDetails) {
      const savedPostDetails = localStorage.getItem('postDetails');
      if (savedPostDetails) {
        setPostDetails(JSON.parse(savedPostDetails));
      }
    }
  }, [postDetails, setPostDetails]);

  useEffect(() => {
    if (postDetails) {
      const { userId } = postDetails;
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
        res.forEach(doc => {
          setUserDetails(doc.data());
        });
      });
    }
  }, [postDetails, firebase]);

  if (!postDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}

export default View;
