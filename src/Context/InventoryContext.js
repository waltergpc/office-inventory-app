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
      const { data } = await axios.post("/auth/register", { ...user })
      dispatch({ type: "REGISTER_SUCCESS", payload: data.user.user })
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.user, token: data.user.token })
      )
      navigate("/stock")
    } catch (error) {
      dispatch({ type: "REGISTER_ERROR" })
    }
  }

  const login = async (user) => {
    setLoading()
    try {
      const { data } = await axios.post("/auth/login", { ...user })
      dispatch({ type: "REGISTER_SUCCESS", payload: data.user.user })
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.user, token: data.user.token })
      )
      navigate("/stock")
    } catch (error) {
      dispatch({ type: "REGISTER_ERROR" })
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
  }

  const fetchStockItems = async () => {
    try {
      setLoading()
      const { data } = await axios.get("/items")
      console.log(data)
      dispatch({ type: "GET_STOCK_ITEMS_SUCCESS", payload: data })
    } catch (error) {
      dispatch({ type: "GET_STOCK_ITEMS_ERROR" })
      logout()
    }
  }

  const toggleOwn = () => {
    setLoading()
    dispatch({ type: "TOGGLE_COMMON" })
  }

  const createStockItem = async (input) => {
    try {
      setLoading()
      const { data } = await axios.post("/items", {
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
    } catch (error) {
      dispatch({ type: "ITEM_OPERATION_ERROR" })
      navigate("/dashboard")
    }
  }

  const deleteStockItem = async (id) => {
    try {
      setLoading()
      await axios.delete(`/items/${id}`)
      fetchStockItems()
    } catch (error) {
      dispatch({ type: "ITEM_OPERATION_ERROR" })
      navigate("/dashboard")
    }
  }

  const editStockItem = async (id, userInput) => {
    try {
      setLoading()
      const { data } = await axios.patch(`/items/${id}`, { ...userInput })
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
        dispatch({
          type: "EDIT_COMMONMISSING_ITEM_SUCCESS",
          payload: data.item,
        })
      }
    } catch (error) {
      dispatch({ type: "ITEM_OPERATION_ERROR" })
      navigate("/dashboard")
    }
  }

  const toggleAlert = () => {
    dispatch({ type: "TOGGLE_ALERT" })
  }

  return (
    <InventoryContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        fetchStockItems,
        createStockItem,
        deleteStockItem,
        editStockItem,
        toggleOwn,
        toggleAlert,
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}
