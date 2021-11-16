import React, { useEffect } from "react"
import { useInventory } from "../Context/InventoryContext"
import { Navigate, useParams } from "react-router-dom"
import StockItems from "../Components/StockItems"
import ItemForm from "../Components/ItemForm"
import ItemTitles from "../Components/ItemHeaders"
import styled from "styled-components"

const Wrapper = styled.section`
  padding: 2em;

  .upper-div {
    display: flex;
    justify-content: space-between;
    padding-right: 1em;
  }

  .toggle-button {
    height: fit-content;
    align-self: center;
    background-color: transparent;
    border: 0.2em solid gray;
    cursor: pointer;
    transition: all 0.1s ease-in;
    &:hover {
      background-color: rgba(193, 66, 66, 0.5);
      color: white;
      font-weight: bold;
    }
  }
`

const ExistingStock = () => {
  const { user, fetchStockItems, toggleOwn, showOwn } = useInventory()
  const { id } = useParams()

  useEffect(() => {
    fetchStockItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) {
    return <Navigate to="/" />
  }

  if (id) {
    return <ItemForm />
  }

  return (
    <Wrapper>
      <div className="upper-div">
        <h2>Existing Stock</h2>
        <button className="toggle-button" onClick={() => toggleOwn()}>
          {showOwn ? "See common" : "See own"}
        </button>
      </div>
      <ItemForm />
      <ItemTitles />
      <StockItems />
    </Wrapper>
  )
}

export default ExistingStock
