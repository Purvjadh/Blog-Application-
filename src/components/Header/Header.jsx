import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../container/Container';
import {Link} from 'react-router-dom';
import Logo from '../Logo';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from './LogoutBtn'


function Header(){
    const authStatus=useSelector(state => state.auth.status )
    const navigate=useNavigate()
    const navItems = [
        {
            name:'Home',
            slug:'/',
            active:true
        },
        {
            name:'Login',
            slug:'/login',
            active:!authStatus
        },
        {
            name:'Signup',
            slug:'/signup',
            active:!authStatus
        },
        {
            name:'AllPosts',
            slug:'/all-posts',
            active:authStatus
        },
        {
            name:'AddPost',
            slug:'/add-post',
            active:authStatus
        }
    ]

    return(
        <div>
           <header className='py-3 shadow bg-gray-500'>
               <Container>
                    <nav className='flex'>
                        <div className='mr-4'>
                            <Link to='/'>
                                <Logo width='70 px'/>
                            </Link>
                        </div>

                        <ul className='flex ml-auto'>
                            {
                                navItems.map((item) => (
                                    item.active ? (
                                        <li key={item.name}>
                                            <button 
                                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                            onClick={() => navigate(item.slug) }
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    ) : null
                                ))
                            }

                            {
                                authStatus && (
                                    <li>
                                        <LogoutBtn/>
                                    </li>
                                )
                            }
                        </ul>
                    </nav>
               </Container>
           </header>
        </div>
    )
}

export default Header;

// const store = configureStore({
//     reducers:{
//         auth:authSlice
//     }
// })

// store = configureStore({
//     reducers:{
//         auth:initialState
//     }
// })

//redux store it like this

// const state = {
//     auth:{
//         status:true,
//         userData:null
//     }
// }

// console.log(state.auth.status)