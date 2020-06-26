import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MainHeader from './MainHeader'
import NavLinks from '../Navigation/NavLinks'
import SideBar from '../Navigation/SideBar'
import Backdrop from '../UIElements/Backdrop'
import './MainNavigation.css'


const MainNavigation = () => {
  const [sideBarIsOpen, setBarIsOpen] = useState(false)

  const openSideBar = () => {
    setBarIsOpen(true)
  }

  const closeSideBar = () => {
    setBarIsOpen(false)
  }

  return (
    <>
    {sideBarIsOpen && <Backdrop onClick={closeSideBar}/>}
    <SideBar show={sideBarIsOpen} onClick={closeSideBar}>
      <nav className="main-navigation__drawer-nav">
        <NavLinks/>
      </nav>
    </SideBar> 
    <MainHeader>
      <h1 className="main-navigation__title">
        <Link to="/">Create Eternity</Link>
      </h1>
      <button className="main-navigation__menu-btn" onClick={openSideBar}>
        <span />
        <span />
        <span />
      </button>
      <nav className="main-navigation__header-nav">
        <NavLinks/>
      </nav>
    </MainHeader>
    </>

  )
}

export default MainNavigation
