import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {store, useGlobalState} from "state-pool"
interface loginProps {

}

store.setState("user", {username: ""});

const Login: React.FC<loginProps> = ({}) => {
  let history = useHistory()
  const [user, updateUser, setUser] = useGlobalState("user");
  const handleChange = (event: any) => {
    updateUser((user: any) => {
      user.username = event.target.value
    })
  }
  const submit = () => {
    if (user.username.length < 3) {
      alert("Please enter a valid username")
    }
    updateUser((user: any) => {
      user.username = user.username
      history.push('/chat')
    })
  }
  return (
    <form onSubmit={submit}>
      <input value={user.username} onChange={handleChange} placeholder='Enter Username'></input>
      <button  type="submit">Submit</button>
    </form>
  )
}

export default Login