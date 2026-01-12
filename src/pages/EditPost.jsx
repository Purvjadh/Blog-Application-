import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/container/Container';
import PostForm from '../components/PostForm/PostForm';

function EditPost(){
    const{slug}=useParams()
    const [post,setPost] = useState(null)
    const navigate=useNavigate()


   useEffect(() => {
     if (slug) {
        appwriteService.getPost(slug)
        .then((post) => {
            setPost(post)
        })
        .catch((error) => {console.log(error)})
    } else {
        navigate('/')
    }
   },[slug,navigate])


  return post ? (
    <div>
        <Container className='py-8'>
            
            <PostForm post={post}/>

        </Container>
    </div>
  ) : null
    
}

export default EditPost;