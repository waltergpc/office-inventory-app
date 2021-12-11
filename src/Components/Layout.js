import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useInventory } from '../Context/InventoryContext'
import { FaBars } from 'react-icons/fa'

const HeaderWrapper = styled.header`
  background-color: rgb(20, 29, 47);
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  height: 100%;
  padding: 1em;
  color: white;

  .header-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .sidebar-btn {
    display: none;
  }

  @media (max-width: 992px) {
    width: 25%;
    h1 {
      font-size: 1.7rem;
      margin-top: 0;
    }
  }

  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3rem;

    .header-section {
      padding-right: 2rem;
      vertical-align: center;
    }

    .sidebar-btn {
      display: block;
      width: 2rem;
      height: fit-content;
      padding: 0.5rem;
      border-radius: 0.3rem;
      background-color: transparent;
      color: white;
      border: 2px solid teal;
      transition: all linear 0.1s;
    }

    .sidebar-btn:hover {
      background-color: teal;
      color: white;
    }

    nav {
      display: none;
    }
  }
`

const MainWrapper = styled.main`
  margin-left: 19%;
  padding-left: 2.5em;

  @media (max-width: 992px) {
    margin-left: 0;
    padding-left: 0;
    margin-top: 7%;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  vertical-align: center;

  &:link {
    color: inherit;
  }

  &:visited {
    color: inherit;
  }
`
const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  flex-wrap: nowrap;
`

const StyledElement = styled.li`
  display: block;
  margin-top: 2em;
  padding: 0.3em;
  width: 90%;
  height: auto;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: rgb(43, 55, 78);
  }

  .logout {
    cursor: pointer;
  }
`

const Navbar = ({ children }) => {
  let navigate = useNavigate()
  const { user, logout, openSideBar } = useInventory()

  const LogOut = () => {
    logout()
    navigate('/')
  }

  return (
    <div>
      <HeaderWrapper>
        <div className='header-section'>
          <h1>Inventory App</h1>
          <button className='sidebar-btn' type='button' onClick={openSideBar}>
            <FaBars />
          </button>
        </div>

        <nav>
          {!user ? (
            <StyledList>
              <StyledElement>
                <StyledLink to='/'>Home</StyledLink>
              </StyledElement>
              <StyledElement>
                <StyledLink to='login'>Sign In</StyledLink>
              </StyledElement>
            </StyledList>
          ) : (
            <StyledList>
              <StyledElement>
                <StyledLink to='/dashboard'>Dashboard</StyledLink>
              </StyledElement>
              <StyledElement>
                <StyledLink to='stock'>Existing Stock</StyledLink>
              </StyledElement>
              <StyledElement>
                <StyledLink to='buy'>To Buy</StyledLink>
              </StyledElement>
              <StyledElement>
                <div className='logout' onClick={LogOut}>
                  Logout
                </div>
              </StyledElement>
            </StyledList>
          )}
        </nav>
      </HeaderWrapper>
      <MainWrapper>{children}</MainWrapper>
    </div>
  )
}

export default Navbar
