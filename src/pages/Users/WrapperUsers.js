import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'



import Sidebar from '../../components/Sidebar'
import User from './User'



const WrapperUsers = () => {

  let {user} = useContext(AuthContext)
  
  return (
    <Sidebar>
      {user && (user.is_staff || user.is_superuser) ?  
        <React.Fragment>
          <User/>
        </React.Fragment>: <h3>You are not allowed to interact with Users section</h3>
      }
    </Sidebar>
  )
}

export default WrapperUsers