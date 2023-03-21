import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { AddPost,getAllPostss } from "../Redux/PostSlice";


const Posts = () => {
  const posts = useSelector(state=> state.PostReducer.posts)
  const Message = useSelector(state=> state.PostReducer.Message)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newPost, setNewPost] = useState({})
  const HandleChange=(e)=>{
    setNewPost({...newPost, [e.target.name] : e.target.value})
  }
  const [image, setImage] = useState('')
  const HandleImageChange=(e)=>{
    setImage(e.target.files[0])
  }
  const dispatch = useDispatch()
  const adding =(e)=>{
    e.preventDefault()
    const PostData = new FormData()
    PostData.append('title', newPost.title)
    PostData.append('Des', newPost.Des)
    PostData.append('Image', image)
    dispatch(AddPost(PostData))
    handleClose()
  }

  useEffect(()=>{ dispatch(getAllPostss())
  },[]) 
  return (
    <div>
      {/* add a post */}
      <Button variant="primary" onClick={handleShow}>
        add a Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control onChange={HandleChange} name='title' type="text" placeholder="Enter title" />
        <Form.Control onChange={HandleChange} name='Des' type="text" placeholder="Enter Description" />
        <input onChange={HandleImageChange} type='file' accept="image/*" />



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={adding}>
            add a post
          </Button>
        </Modal.Footer>
      </Modal>
      {Message && <Alert variant="success">{Message}</Alert>}
      {/******************** get all posts          ********************  */ }
      
      <div style={{display:'grid', gridTemplateColumns: 'auto auto '}}>
      {posts?.map(post=> <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={post.Image.imgUrl} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.Des}
        </Card.Text>
        
      </Card.Body>
    </Card>)}
    </div>
      
    </div>
  );
};

export default Posts;
