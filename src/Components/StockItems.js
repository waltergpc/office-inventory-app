import React from "react"
import moment from "moment"
import { useInventory } from "../Context/InventoryContext"
import styled, { css } from "styled-components"
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
  color: rgb(0, 4, 77);

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;

    .product-brand {
      display: none;
    }

    .last-update {
      display: none;
    }
  }

  ${(props) =>
    props.missing === false &&
    css`
      background: rgba(194, 204, 167, 0.5);
    `}
  ${(props) =>
    props.missing === true &&
    css`
      background: rgba(205, 126, 126, 0.5);
    `}

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
  const { stockItems, deleteStockItem, showOwn, missingItems, isLoading } =
    useInventory()
  const { ownItems, commonItems } = stockItems
  const { ownMissing, commonMissing } = missingItems

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

  if (!displayItems) {
    return <p>loading...</p>
  }

  if (displayItems.length < 1) {
    return <p>No items to show</p>
  }

  return (
    <div>
      {displayItems.map((item) => {
        const { _id: id, name, brand, updatedAt, quantity, missing } = item
        let date = moment(updatedAt)
        date = date.format("L")
        return (
          <SyledArticle key={id} missing={missing}>
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
                disabled={isLoading}
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
