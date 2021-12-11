import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useInventory } from '../Context/InventoryContext'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Sidebar = () => {
  const { sideBarOpen, closeSideBar, user, logout } = useInventory()
  let navigate = useNavigate()

  const LogOut = () => {
    logout()
    navigate('/')
  }

  return (
    <SidebarContainer>
      <aside className={sideBarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <div className='sidebar-header'>
          <img src={logo} className='logo' alt='inventory-app' />
          <button className='close-btn' type='button' onClick={closeSideBar}>
            <FaTimes />
          </button>
        </div>

        {!user ? (
          <ul className='links'>
            <li>
              <Link to='/' onClick={closeSideBar}>
                Home
              </Link>
            </li>
            <li>
              <Link to='login' onClick={closeSideBar}>
                Sign In
              </Link>
            </li>
          </ul>
        ) : (
          <ul className='links'>
            <li>
              <Link to='/dashboard' onClick={closeSideBar}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to='stock' onClick={closeSideBar}>
                Existing Stock
              </Link>
            </li>
            <li>
              <Link to='buy' onClick={closeSideBar}>
                To Buy
              </Link>
            </li>
            <li>
              <div className='logout' onClick={LogOut}>
                Logout
              </div>
            </li>
          </ul>
        )}
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: rgb(221, 177, 23);
    transition: all 0.2s linear;
    cursor: pointer;
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: white;
  }
  .logo {
    justify-self: center;
    height: 60px;
  }

  .links {
    margin-bottom: 2rem;
    list-style: none;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: beige;
    transition: all 0.2s linear;
    text-decoration: none;
    width: 30%;
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: rgb(211, 222, 232, 0.1);
    color: green;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    transform: translate(-100%);
    z-index: -1;
    background-color: rgb(0, 52, 101);
    color: beige;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }

  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`

export default Sidebar
