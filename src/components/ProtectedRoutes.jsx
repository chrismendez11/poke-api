import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

  const name = useSelector(state => state.nameSlice)

    if (name) {
        return <Outlet />
    } else {
        return <Navigate to='/'/>
    }

  return (
    <div>ProtectedRoutes</div>
  )
}

export default ProtectedRoutes