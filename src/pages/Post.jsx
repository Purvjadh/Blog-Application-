import React from 'react';
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/container/Container';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser'
import Button from '../components/Button';

function Post(){
    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate=useNavigate()
    const userData=useSelector(state => state.auth.userData)

    console.log('post :',post)
    console.log('userData',userData)

    const isAuthor= post && userData ? post.userId === userData.$id : false

   useEffect(() => {
    if (slug) {
        appwriteService.getPost(slug)
        .then((post) => {
            if (post) {
              setPost(post)  
            } else {
               navigate('/')
            }
        })
        .catch((error) => {
            console.log(error)
        })
    } else {
        navigate('/')
    }
   },[slug,navigate])

   const deletePost = () => {
    appwriteService.deletePost(post.$id)
    .then((status) => {
        if (status) {
            appwriteService.deleteFile(post.featuredImage)
            navigate('/')
        }
    })
    .catch((error) => {
        console.log('Delete Post Error',error)
    })
   }

   return post ? (
    <div className="py-8">
        <Container>
            <div  className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img 
                src={appwriteService.getImageView(post.featuredImage)} 
                alt={post.title}
                className="rounded-xl"
                />
                {
                    isAuthor && (
                       <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>

                                <Button  bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                           
                       </div>

                    )

                }
            </div>

            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>

            <div className="browser-css">
                {parse(post.content)}
            </div>
        </Container>
    </div>
   ) : null
}

export default Post;