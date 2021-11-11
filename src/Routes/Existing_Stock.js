import React from "react"
import { useInventory } from "../Context/InventoryContext"
import { Navigate } from "react-router-dom"

const ExistingStock = () => {
  const { state } = useInventory()

  if (!state.user) {
    return <Navigate to="/" />
  }

  return <div>Current Stock for {state.user}</div>
}

export default ExistingStock
