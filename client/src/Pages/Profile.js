import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector(state=> state.authReducer.user)
    
  return (
    <div>
        <h2>{user.name}</h2>
        <h3>{user.age}</h3>
        <h4>{user.email}</h4>

    </div>
  )
}

export default Profile