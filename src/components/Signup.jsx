import React,{useRef,useState} from 'react'
import {useForm} from 'react-hook-form'
import Logo from './Logo'
import {Link} from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import authService from '../appwrite/auth'
import {login} from '../store/authSlice'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Signup(){

    const [error,setError]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const{
        register,
        handleSubmit,
        formState:{errors}
    }=useForm()

   const create = async(data) => {
        console.log('data',data)
         console.log('form  Error:',errors)
        setError('')
        try {
         const dataOfUser= await  authService.createAccount(data)
         console.log('dataOfUser',dataOfUser)
         if(dataOfUser) {
            const userData= await authService.getCurrentUser()

            if(userData) dispatch(login({userData}));
            navigate('/')
         }
        } catch (error) {
            setError(error.message)
        }
   }

   //console.log('form  Error:',errors)

    return(
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                <div  className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%'/>
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                      Already have an account?&nbsp;
                      <Link to='/login'
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                      >
                        Sign In
                      </Link>
                </p>

                {
                    error && (
                        <p className="text-red-600 mt-8 text-center">{error}</p>
                    )
                }

                <form onSubmit={handleSubmit(create)}>
                   <div className='space-y-5'>

                    <Input
                    label='Full Name: '
                    placeholder='Enter your full name'
                    type='text'
                    {
                        ...register('name',{
                            required:true
                        })
                    }
                    />

                    <Input
                    label='Email: '
                    type='email'
                    placeholder='Enter your email'

                    {
                        ...register('email',{
                            required:true,
                            validate:{
                                matchPattern:(value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be valid email address'
                            }
                        })
                    }
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message || "Email is required"}</p>}

                    <Input
                    label='Password'
                    type = 'password'
                    placeholder='Enter your password'
                     autoComplete="current-password"
                    {
                        ...register('password',{
                            required:true
                        })
                    }
                    />

                    <Button type='submit' className='w-full'>
                       Create Account
                    </Button>


                   </div>

                </form>

                



            </div>

        </div>
    )
}

export default Signup

//react hook form accepts function not accepts direct regex without function
// we use promise with .then().catch()
// we use async await with try catch   

//I wrote this method

//    const create = (data) => {
//         authService.createAccount({
//             name:data.email,
//             email:data.email,
//             password:data.password
//         })
//         .then((userData) =>{
//             dispatch(login(userData))
//         })
//         .catch((error) => {
//             setError(error)
//         })
//     }