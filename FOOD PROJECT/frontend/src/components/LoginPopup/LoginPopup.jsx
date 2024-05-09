import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginPopup = ({ setShowLogin }) => {

  const navigate = useNavigate();

  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }))
  }

  // const onChangeHandler = (event) => {
  //   const { name, value } = event.target;
  //   setData((prevData) => ({ ...prevData, [name]: value }));
  // }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl,data)

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false)
      navigate("/");
    }
    else{
      alert(response.data.message)
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => {
            setShowLogin(false)
          }} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? <></> : <input type="text" placeholder='Your name' name='name' onChange={onChangeHandler} value={data.name} required />}
          <input type="email" placeholder="Your email" name='email' onChange={onChangeHandler} value={data.email} required />
          <input type="password" placeholder="Password" name='password' onChange={onChangeHandler} value={data.password} required />
        </div>
        <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p> : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup;
