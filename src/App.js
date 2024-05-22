import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Home from './Pages/Home';
import './App.css';
import PostProvider from './Store/PostContext';
import ContextProvider, { AuthContext, FirebaseContext } from './Store/Context';

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [firebase, setUser]);

  return (
    <div>
      <ContextProvider>
        <PostProvider>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/create' element={<Create />} />
              <Route path='/view' element={<View />} />
            </Routes>
          </Router>
        </PostProvider>
      </ContextProvider>
    </div>
  );
}

export default App;
