import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';


const Spinnerr = () => {
    const isLoading1 = useSelector(state=> state.authReducer.isLoading)
    const isLoading2 = useSelector(state=> state.PostReducer.isLoading)

  return (
    <div>
        { (isLoading1 || isLoading2) && <Spinner animation="border" variant="primary" />}
        </div>
  )
}

export default Spinnerr