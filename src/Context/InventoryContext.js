import React, { useReducer, createContext, useContext } from "react"
import { Reducer } from "./Reducer"
import axios from "axios"

const InventoryContext = createContext()

export const useInventory = () => useContext(InventoryContext)

const initialState = {
  user: null,
  isLoading: false,
  stockItems: [],
  missingItems: [],
  showAlert: false,
}

export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  console.log(state)

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
        JSON.stringify({ name: data.user.name, token: data.user.token })
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
      console.log(data)
      dispatch({ type: "REGISTER_SUCCESS", payload: data.user.user })
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, token: data.user.token })
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <InventoryContext.Provider value={{ state, register, login }}>
      {children}
    </InventoryContext.Provider>
  )
}
