import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../store';
import Logo from './Logo';
import { toggleSidebar,logoutUser } from '../features/user/userSlice';

const NavBar = () => {
    const [showLogout, setshowLogout] = useState(false)
    const {user} = useSelector((store)=>store.user)
    const dispatch = useDispatch()
    const toggle = () =>{
        dispatch(toggleSidebar ())
    }
    return (
        <Wrapper>
            <div className='nav-center'>
                <button 
                    type='button' 
                    className='toggle-btn' 
                    onClick={toggle}
                >
                    <FaAlignLeft/>
                </button>
                <div>
                    <Logo/>
                    <h3 className='logo-text'>dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button 
                        type='button' 
                        className='btn' 
                        onClick={()=>setshowLogout(!showLogout)}
                    >
                        <FaUserCircle />
                            {user?.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout? 'dropdown show-dropdown' : 'dropdown'}>
                        <button
                            type='button'
                            className='dropdown-btn'
                            onClick={()=>dispatch(logoutUser())}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>

        </Wrapper>
    )
}

export default NavBar
