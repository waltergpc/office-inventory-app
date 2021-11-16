import React from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useInventory } from "../Context/InventoryContext"

const HeaderWrapper = styled.header`
  background-color: rgb(20, 29, 47);
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  height: 100%;
  padding: 1em;
  color: white;
`

const MainWrapper = styled.main`
  margin-left: 20%;
  padding-left: 2.5em;
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
  const { user, logout } = useInventory()

  const LogOut = () => {
    logout()
    navigate("/")
  }

  return (
    <div>
      <HeaderWrapper>
        <h1>Office Inventory</h1>
        <nav>
          {!user ? (
            <StyledList>
              <StyledElement>
                <StyledLink to="/">Home</StyledLink>
              </StyledElement>
              <StyledElement>
                <StyledLink to="buy">Login</StyledLink>
              </StyledElement>
            </StyledList>
          ) : (
            <StyledList>
              <StyledElement>
                <StyledLink to="/dashboard">Dashboard</StyledLink>
              </StyledElement>
              <StyledElement>
                <StyledLink to="stock">Existing Stock</StyledLink>
              </StyledElement>
              <StyledElement>
                <StyledLink to="buy">To Buy</StyledLink>
              </StyledElement>
              <StyledElement>
                <div className="logout" onClick={LogOut}>
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
