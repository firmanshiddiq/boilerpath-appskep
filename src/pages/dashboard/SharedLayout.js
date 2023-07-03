import React from 'react'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { BigSidebar, NavBar, SmallSidebar } from '../../components'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <Wrapper>
        <main className='dashboard'>
            <SmallSidebar/>
            <BigSidebar/>
            <div>
                <NavBar />
                <div className='dashboard-page'>
                    <Outlet/>
                </div>
            </div>
        </main>
    </Wrapper>
  )
}

export default SharedLayout
