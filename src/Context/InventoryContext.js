import React, { useReducer, createContext, useContext } from "react"
import { Reducer } from "./Reducer"
import axios from "axios"
import "../axios"
import { useNavigate } from "react-router-dom"

const InventoryContext = createContext()

export const useInventory = () => useContext(InventoryContext)

const initialState = {
  user: null,
  isLoading: false,
  stockItems: [],
  missingItems: [],
  showAlert: false,
  showOwn: true,
}

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  console.log(state)
  let navigate = useNavigate()

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" })
  }

  const register = async (user) => {
    setLoading()
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        { ...user }
      )
      dispatch({ type: "REGISTER_SUCCESS", payload: data.user.name })
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.user, token: data.user.token })
      )
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (user) => {
    setLoading()
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { ...user }
      )
      dispatch({ type: "REGISTER_SUCCESS", payload: data.user.user })
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.user, token: data.user.token })
      )
      navigate("/stock")
    } catch (error) {
      console.log(error)
    }
  }

  const fetchStockItems = async () => {
    setLoading()
    const { data } = await axios.get("http://localhost:5000/api/v1/items")
    console.log(data)
    dispatch({ type: "GET_STOCK_ITEMS_SUCCESS", payload: data })
  }

  const toggleOwn = () => {
    setLoading()
    dispatch({ type: "TOGGLE_COMMON" })
  }

  const createStockItem = async (input) => {
    setLoading()
    const { data } = await axios.post("http://localhost:5000/api/v1/items", {
      ...input,
    })
    console.log(data)
    if ((data.item.generalInput === false) & (data.item.missing === false)) {
      dispatch({ type: "ADD_OWNSTOCK_ITEM_SUCCESS", payload: data.item })
    } else if (
      (data.item.generalInput === true) &
      (data.item.missing === false)
    ) {
      dispatch({ type: "ADD_COMMONSTOCK_ITEM_SUCCESS", payload: data.item })
    } else if (
      (data.item.generalInput === false) &
      (data.item.missing === true)
    ) {
      dispatch({ type: "ADD_OWNMISSING_ITEM_SUCCESS", payload: data.item })
    } else if (
      (data.item.generalInput === true) &
      (data.item.missing === true)
    ) {
      dispatch({ type: "ADD_COMMONMISSING_ITEM_SUCCESS", payload: data.item })
    }
  }

  const deleteStockItem = async (id) => {
    setLoading()
    await axios.delete(`http://localhost:5000/api/v1/items/${id}`)
    fetchStockItems()
  }

  const editStockItem = async (id, userInput) => {
    setLoading()
    const { data } = await axios.patch(
      `http://localhost:5000/api/v1/items/${id}`,
      { ...userInput }
    )
    if ((data.item.generalInput === false) & (data.item.missing === false)) {
      dispatch({ type: "EDIT_OWNSTOCK_ITEM_SUCCESS", payload: data.item })
    } else if (
      (data.item.generalInput === true) &
      (data.item.missing === false)
    ) {
      dispatch({ type: "EDIT_COMMONSTOCK_ITEM_SUCCESS", payload: data.item })
    } else if (
      (data.item.generalInput === false) &
      (data.item.missing === true)
    ) {
      dispatch({ type: "EDIT_OWNMISSING_ITEM_SUCCESS", payload: data.item })
    } else if (
      (data.item.generalInput === true) &
      (data.item.missing === true)
    ) {
      dispatch({ type: "EDIT_COMMONMISSING_ITEM_SUCCESS", payload: data.item })
    }
  }

  return (
    <InventoryContext.Provider
      value={{
        ...state,
        register,
        login,
        fetchStockItems,
        createStockItem,
        deleteStockItem,
        editStockItem,
        toggleOwn,
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}
