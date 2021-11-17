import React from "react"
import styled from "styled-components"
import img from "../images/office.jpg"
import Exampleimg from "../images/Ejemplo1.png"
import Exampleimg2 from "../images/Ejemplo2.png"

const Wrapper = styled.div`
  .img-container {
    background-image: url(${img});
    height: 100%;
    background-position: left;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .text {
      text-align: center;
      padding: 2em;
      margin: 2em;
      background-color: rgba(3, 3, 3, 0.5);
      color: white;
    }

    .example-image {
      height: 100%;
      width: 40%;
    }
  }

  @media (max-width: 750px) {
    .text {
      font-size: 0.7rem;
    }
  }
`

const Home = () => {
  return (
    <Wrapper>
      <div className="img-container">
        <div className="text">
          <h2>Welcome to the inventory app</h2>
          <div>
            Save your items for in-stock supplies and to buy needs, have them
            ordered in personal use or general items. Check out also your last
            updates an quantities to avoid confusion!
          </div>
        </div>
        <div className="text">
          Made for office settings with small-medium number of employees.
          <br />
          Use for Restaurants: use it to divide items in kitchen and cleaning or
          maintenance. <br />
          Also useful for Health clinics: Appointement supplies and devices and
          cleaning or maintenance and utilities.
        </div>
        <div className="text">
          <img className="example-image" src={Exampleimg} alt="app example" />
          <img className="example-image" src={Exampleimg2} alt="app example" />
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
