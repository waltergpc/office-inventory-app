import React from "react"
import moment from "moment"
import { useInventory } from "../Context/InventoryContext"
import styled from "styled-components"
import { TiDelete } from "react-icons/ti"
import { AiOutlineEdit } from "react-icons/ai"
import { Link, useLocation } from "react-router-dom"

const SyledArticle = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5em;
  margin: 0.5em;
  padding: 0.5em;
  border: 2px solid grey;
  border-radius: 3%;
  box-shadow: 1px 1px lightslategray;
  align-items: center;
  background-color: rgba(194, 204, 167, 0.5);
  color: rgb(0, 4, 77);

  .action-button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0;
    width: fit-content;
    font-size: 2rem;
    transition: all 0.1s ease-in;
    vertical-align: middle;

    &:hover {
      color: teal;
    }
  }
`

const StockItems = () => {
  let location = useLocation()
  console.log(location.pathname)
  const { stockItems, deleteStockItem, showOwn, missingItems } = useInventory()
  const { ownItems, commonItems } = stockItems
  const { ownMissing, commonMissing } = missingItems
  console.log(ownMissing, commonMissing)

  if (!ownItems & !ownMissing) {
    return <pre>Loading...</pre>
  }

  let displayItems

  if (showOwn & (location.pathname === "/stock")) {
    displayItems = ownItems
  } else if (!showOwn & (location.pathname === "/stock")) {
    displayItems = commonItems
  } else if (showOwn & (location.pathname === "/buy")) {
    displayItems = ownMissing
  } else if (!showOwn & (location.pathname === "/buy")) {
    displayItems = commonMissing
  }

  if (displayItems.length < 1) {
    return <p>No items to show</p>
  }

  return (
    <div>
      {displayItems.map((item) => {
        const { _id: id, name, brand, updatedAt, quantity } = item
        let date = moment(updatedAt)
        date = date.format("L")
        return (
          <SyledArticle key={id} className="item">
            <span className="product">{name.toLowerCase()}</span>
            <span className="product-brand">{brand}</span>
            <span className="quantity">{quantity}</span>
            <span className="last-update">{date}</span>
            <span>
              <button
                className="action-button"
                onClick={() => {
                  deleteStockItem(id)
                }}
              >
                <TiDelete />
              </button>
              <Link to={`edit/${id}`} className="action-button">
                <AiOutlineEdit />
              </Link>
            </span>
          </SyledArticle>
        )
      })}
    </div>
  )
}

export default StockItems
