import React, { useEffect } from "react"
import { useInventory } from "../Context/InventoryContext"
import { Navigate, useParams } from "react-router-dom"
import StockItems from "../Components/StockItems"
import ItemForm from "../Components/ItemForm"
import ItemTitles from "../Components/ItemHeaders"

const ExistingStock = () => {
  const { user, fetchStockItems } = useInventory()
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
    <div>
      <ItemForm />
      <ItemTitles />
      <StockItems />
    </div>
  )
}

export default ExistingStock
