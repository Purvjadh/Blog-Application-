import React from 'react'
import {useForm} from 'react-hook-form'
import  Input from '../Input'
import RTE from '../RTE'
import appwriteService from '../../appwrite/config'
import Select from '../Select'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useEffect,useState } from 'react'
import { useCallback } from 'react'


function PostForm ({post}){
    const [imagePreview,setImagePreview]=useState(null)
    const {register,handleSubmit,control,getValues,watch,setValue} = useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.slug || '',
            content:post?.content || '',
            status:post?.status || 'active'
        }
    })
    //getValues=> get current form values without submitting,some decisions are required to make before submitting the form

    //passing values in useForm we set byDefault values

    const navigate = useNavigate()

    const userData=useSelector(state => state.auth.userData)

    const submit = async (data) => {
       if (post) {
       const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

       if(file){
        await appwriteService.deleteFile(post.featuredImage)
        }

        const dbPost=await appwriteService.updatePost(post.$id,{
            title: data.title,
            slug: data.slug,
            content: data.content,
            status: data.status,
            featuredImage:file ? file.$id : post.featuredImage
        })

        if(dbPost){
            navigate(`/post/${dbPost.$id}`)
        }
       } else {
        const file = await appwriteService.uploadFile(data.image[0])

        if(file){

        const fileId=file.$id

        data.featuredImage = fileId

        const dbPost=await appwriteService.createPost({
            ...data,
            userId:userData.$id
        })

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
        }
        }
       }
    }

        const slugTransform=useCallback((value)=>{
                if(value && typeof value === 'string')
                return value
                .trim()// removes starting and ending space
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-") // this replace which are not alphabets space digits
                .replace(/\s/g, "-"); // replace all spaces

                return ''
                // if there is nothing in value and in function if null and undefined will come app will crash so avoid that we are doing this

            },[])

        useEffect(() => {
        const subscription=watch((value,{name}) => {
            if (name === 'title') {
                setValue('slug',slugTransform(value.title),{shouldValidate:true})
            }
        })

        return () => subscription.unsubscribe()
        },[])

        useEffect(() => {
            // This 'watches' the image input field
            const subscription = watch((value, { name }) => {
                if (name === 'image' && value.image && value.image.length > 0) {
                    const file = value.image[0];
                    
                    // Create a temporary local URL for the image on your computer
                    const previewUrl = URL.createObjectURL(file);
                    
                    // Update the state so the UI shows this new image
                    setImagePreview(previewUrl);
                }
            });
            return () => subscription.unsubscribe();
        }, [watch]);

    

    return(
    <div>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

        <div className="w-2/3 px-2">
            <Input
            type='text'
            label='Title: '
            placeholder='Enter title here'
            className='mb-4'
            {...register('title',{
                required:true
            })}
            />

            <Input
            label='slug'
            className='mb-4'
            placeholder='slug'
            onInput={(e) => {setValue('slug',slugTransform(e.currentTarget.value),{shouldValidate:true})}}
            {...register('slug',{
                required:true
            })}

            />

           <RTE 
           name='content'
           control={control}
           label='Content: '
           defaultValue={getValues('content')}
           />

        </div>

        <div  className="w-1/3 px-2">
            <Input
            label='Featured Image: '
            type='file'
            className='mb-4'
            accept='image/png, image/jpg ,image/jpeg ,image/gif'
            {...register('image',{
                required:!post
            })}
            />

            {
                 (imagePreview || post) && (
                    <div className="w-full mb-4">
                        <img 
                            src={imagePreview || appwriteService.getImageView(post.featuredImage)}
                            alt={post?.title || "Preview"}
                            className='rounded-lg'
                        />
                    </div>
                )
            }

            <Select
            label='Status: '
            className='mb-4'
            options={['active','inactive']}
            {...register('status',{
                required:true
            })}
            />

          <Button
          type='submit'
          bgColor={post ? 'bg-green-500' : undefined}
          className='w-full'
          >
           {post ? 'Update' : 'Submit'}
          </Button>




        </div>
            

        </form>
        </div>
    )
}

export default PostForm