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

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    font-size: 0.6rem;
    margin: 0.2em;
    padding: 0.2em;
    width: 100%;
    gap: 0.2em;
    justify-items: start;

    .brand-title {
      display: none;
    }

    .update-title {
      display: none;
    }
  }
`

const ItemTitles = () => {
  return (
    <StyledTitles>
      <div className="name-title">Name</div>
      <div className="brand-title">Brand</div>
      <div className="quantity-title">Quantity</div>
      <div className="update-title">Last update</div>
      <div className="buttons-title">Delete/Edit?</div>
    </StyledTitles>
  )
}

export default ItemTitles
