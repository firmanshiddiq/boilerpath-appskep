import React from 'react';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom'

const Landing =()=> {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>
                    Boiler <span>Path </span> React Js
                </h1>
                <p>
                    BiolerPath React Js Pelatihan Kompetensi 
                    Solusi pembuatan website menggunakan React Js
                    dan Go
                </p>
                <Link to='/register' className='btn btn-hero'>
                    Login/Register
                </Link>
            </div>
            <img src={main} alt='job hunt' className='img main-img' />
        </div>
    </Wrapper>
    
  )
}


export default Landing