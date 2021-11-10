import React, { useState } from "react"
import styled from "styled-components"
import { useInventory } from "../Context/InventoryContext"

const Home = () => {
  const { register } = useInventory()
  const [loginUser, setLoginUser] = useState({ email: "", password: "" })
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  })
  const handleLoginChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value })
  }

  const handleRegisterChange = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value })
  }

  const submitLogin = (e) => {
    e.preventDefault()
    console.log(loginUser)
  }

  const submitRegister = (e) => {
    e.preventDefault()
    register({ ...registerUser })
  }
  return (
    <FormsWrapper>
      <h2>
        Welcome to your Office Inventory, Please login to access your stock or
        Register to start saving your office supplies.
      </h2>

      <div className="form-container">
        <form className="user-form">
          <h3>If you have a user login!</h3>
          <input
            type="email"
            className="common-input"
            name="email"
            placeholder="enter your email please"
            value={loginUser.email}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            className="common-input"
            name="password"
            placeholder="enter your password"
            value={loginUser.password}
            onChange={handleLoginChange}
          />
          <button type="submit" onClick={submitLogin}>
            Submit
          </button>
        </form>

        <form className="user-form">
          <h3>Register a new user</h3>
          <input
            type="text"
            className="common-input"
            name="name"
            placeholder="enter your name please"
            value={registerUser.username}
            onChange={handleRegisterChange}
          />
          <input
            type="email"
            className="common-input"
            name="email"
            placeholder="enter a new email"
            value={registerUser.email}
            onChange={handleRegisterChange}
          />
          <input
            type="password"
            className="common-input"
            name="password"
            placeholder="enter a new password"
            value={registerUser.password}
            onChange={handleRegisterChange}
          />
          <button type="submit" onClick={submitRegister}>
            Register
          </button>
        </form>
      </div>
    </FormsWrapper>
  )
}

const FormsWrapper = styled.div`
  text-align: center;
  padding: 2em;

  .form-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    padding-top: 5em;
  }

  .user-form {
    height: 100%;
    display: flex;
    padding: 1em;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 2%;
    background-color: rgba(47, 116, 113, 0.9);
    color: white;
  }

  h3 {
    margin: 0.5em;
  }

  .common-input {
    width: 75%;
    margin: 0.5em;
    height: 2em;
  }
`

export default Home
