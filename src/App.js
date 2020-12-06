import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db, auth } from './components/firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const App = () => {
  // Modal style state
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  // Post and Modal wiget
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  // Managing modal form input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signup = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).catch((error) => alert(error.message));
  };

  return (
    <div className='app'>
      {/* Modal componet to be creared next */}

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img className='app_headerImage' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjtjBw4xwF01ZdKL1cmnYZD3vdavlQPOWA7w&usqp=CAU' alt='instagram' />
            </center>
            <Input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />

            <Input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

            <Input type='password' placeholder='password' value={password} onChange={(e) => setPasssword(e.target.value)} />
            <Button type='sbmit' onClick={signup}>
              Sign up
            </Button>
          </form>
        </div>
      </Modal>

      <div className='app__header'>
        <img className='app_headerImage' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjtjBw4xwF01ZdKL1cmnYZD3vdavlQPOWA7w&usqp=CAU' alt='instagram' />
      </div>
      <Button onClick={() => setOpen(true)}> Sign up</Button>
      <h1>Bulding instagram clone</h1>
      {posts.map(({ post, id }) => (
        <Post key={id} userName={post.userName} imageUrl={post.imageUrl} caption={post.caption} />
      ))}
      {/* posts */}
      {/* posts */}
    </div>
  );
};

export default App;
