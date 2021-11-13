import React, { useState, useEffect } from "react"
import { useInventory } from "../Context/InventoryContext"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "../axios"

const ItemForm = () => {
  const { createStockItem, editStockItem } = useInventory()
  let navigate = useNavigate()
  const [newItem, setNewItem] = useState({
    name: "",
    brand: "",
    quantity: "",
    generalInput: false,
  })

  const { id: paramsId } = useParams()
  console.log(paramsId)

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
    if (!paramsId) {
      e.preventDefault()
      createStockItem(newItem)
      setNewItem({ name: "", brand: "", quantity: "", generalInput: false })
    } else {
      e.preventDefault()
      editStockItem(paramsId, newItem)
      setNewItem({ name: "", brand: "", quantity: "", generalInput: false })
      navigate("/stock")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      Register an Item
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
      <button className="submit-button" type="submit">
        Save
      </button>
    </form>
  )
}

export default ItemForm
