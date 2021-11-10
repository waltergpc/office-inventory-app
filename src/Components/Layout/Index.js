import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

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
  margin-left: 23%;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  vertical-align: center;

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
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: rgb(43, 55, 78);
  }
`

const Navbar = ({ children }) => {
  return (
    <div>
      <HeaderWrapper>
        <h1>Office Inventory</h1>
        <nav>
          <StyledList>
            <StyledElement>
              <StyledLink to="/">Home</StyledLink>
            </StyledElement>
            <StyledElement>
              <StyledLink to="stock">Existing Stock</StyledLink>
            </StyledElement>
            <StyledElement>
              <StyledLink to="buy">To Buy</StyledLink>
            </StyledElement>
          </StyledList>
        </nav>
      </HeaderWrapper>
      <MainWrapper>{children}</MainWrapper>
    </div>
  )
}

export default Navbar
