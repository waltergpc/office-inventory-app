import React from "react"
import styled from "styled-components"

const StyledTitles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5em;
  margin: 0.5em;
  padding: 0.5em;
  background-color: rgba(131, 164, 184, 0.7);
  font-weight: bold;
`

const ItemTitles = () => {
  return (
    <StyledTitles>
      <div>Name</div>
      <div>Brand</div>
      <div>Quantity</div>
      <div>Last update</div>
      <div>Delete/Edit?</div>
    </StyledTitles>
  )
}

export default ItemTitles
