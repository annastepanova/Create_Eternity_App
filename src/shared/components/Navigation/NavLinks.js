import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './NavLinks.css'



const NavLinks = (props) => {
  const auth = useContext(AuthContext)

  return (
    <ul className="nav-links">
      <li>
        <NavLink exact to="/users">ALL CREATORS</NavLink>
      </li>
      { auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/stories`}>MY STORIES</NavLink>
        </li>
      )
      }
      { auth.isLoggedIn && (
        <li>
          <NavLink to="/stories/new">ADD STORY</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOG IN</NavLink>
        </li>
      )}
      { auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOG OUT</button>
        </li>
      )}
    </ul>
  )
}

export default NavLinks
