import React, { useState, useEffect } from "react"
import { useInventory } from "../Context/InventoryContext"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import "../axios"
import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(214, 214, 214, 0.78);
  padding: 0.5em;
  border-radius: 5%;
  .legend {
    font-weight: bold;
    font-size: 0.8rem;
  }
  .item-input {
    width: 15%;
    margin: 0.5em;
    height: 2em;
  }
  .submit-button {
    border: 0.2em teal solid;
    padding: 0.7em;
    border-radius: 5%;
    background-color: rgb(240, 238, 238);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.1s ease-in;
    &:hover {
      color: white;
      background-color: teal;
      transform: scale(1.1);
    }
  }
`

const ItemForm = () => {
  const { createStockItem, editStockItem, isLoading } = useInventory()
  let navigate = useNavigate()
  let location = useLocation()
  const [newItem, setNewItem] = useState({
    name: "",
    brand: "",
    quantity: "",
    generalInput: false,
  })

  const { id: paramsId } = useParams()
  let afterEdit
  if (location.pathname.startsWith("/stock")) {
    afterEdit = "/stock"
  } else {
    afterEdit = "/buy"
  }

  useEffect(() => {
    if (paramsId) {
      const fetchSingleStockItem = async () => {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/items/${paramsId}`
        )
        setNewItem({ ...data.item })
      }
      fetchSingleStockItem()
    }
  }, [paramsId])

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    if (!paramsId & (location.pathname === "/stock")) {
      e.preventDefault()
      createStockItem(newItem)
      setNewItem({ name: "", brand: "", quantity: "", generalInput: false })
    } else if (!paramsId & (location.pathname === "/buy")) {
      e.preventDefault()
      createStockItem({ ...newItem, missing: true })
      setNewItem({ name: "", brand: "", quantity: "", generalInput: false })
    } else if (paramsId) {
      e.preventDefault()
      editStockItem(paramsId, newItem)
      setNewItem({ name: "", brand: "", quantity: "", generalInput: false })
      navigate(afterEdit)
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <p className="legend">{paramsId ? "Update" : "Register and Item"}</p>
      <input
        type="text"
        placeholder="Item name"
        className="item-input"
        name="name"
        value={newItem.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Item brand"
        className="item-input"
        name="brand"
        value={newItem.brand}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="quantity"
        className="item-input"
        name="quantity"
        value={newItem.quantity}
        onChange={handleChange}
      />
      <select
        className="drop-menu"
        name="generalInput"
        value={newItem.generalInput}
        onChange={handleChange}
      >
        <option value={false}>Personal</option>
        <option value={true}>Common</option>
      </select>
      <button
        className="submit-button"
        type="submit"
        disabled={isLoading || !newItem.name}
      >
        Save
      </button>
    </StyledForm>
  )
}

export default ItemForm
