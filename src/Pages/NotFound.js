import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  padding: 2em;
  margin: 10em 4em;
  height: fit-content;
  background-color: rgba(3, 3, 3, 0.5);
  text-align: center;
  color: white;
  border-radius: 5%;
`

const NotFound = () => {
  return (
    <Wrapper>
      <h2>404! this resource wasn't found or doesn't exist</h2>
    </Wrapper>
  )
}

export default NotFound
