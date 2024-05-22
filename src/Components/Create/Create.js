import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext, AuthContext } from '../../Store/Context';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const date = new Date();

  const validate = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    } else if (name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
    }

    if (!category) {
      errors.category = 'Category is required';
    }

    if (!price) {
      errors.price = 'Price is required';
    } else if (isNaN(price) || price <= 0) {
      errors.price = 'Price must be a positive number';
    }

    if (!image) {
      errors.image = 'Image is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toDateString(),
        });
        navigate('/');
      });
    });
  };

  return (
    <div className="centerDiv">
      <h4 style={{alignContent:'center',color:'002f34'}}>Sell Your Item!</h4>
      <label htmlFor="name">Name</label>
      <br />
      <input
        className="input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name"
        name="name"
      />
      {errors.name && <span className="error">{errors.name}</span>}
      <br />
      <label htmlFor="category">Category</label>
      <br />
      <input
        className="input"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        id="category"
        name="category"
      />
      {errors.category && <span className="error">{errors.category}</span>}
      <br />
      <label htmlFor="price">Price</label>
      <br />
      <input
        className="input"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        id="price"
        name="price"
      />
      {errors.price && <span className="error">{errors.price}</span>}
      <br />
      {image && (
        <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)} />
      )}
      <br />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      {errors.image && <span className="error">{errors.image}</span>}
      <br />
      <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
    </div>
  );
};

export default Create;
