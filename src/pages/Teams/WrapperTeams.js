import React, {useContext} from 'react'

import Sidebar from '../../components/Sidebar'
import AuthContext from '../../context/AuthContext'
import Team from './Team'

const WrapperTeams = () => {

  let {user} = useContext(AuthContext)

  return (
    <Sidebar>
      {user && (user.is_staff || user.is_superuser) ? 
      <React.Fragment>
        <Team/>
      </React.Fragment>:  <h3>You are not allowed to interact with Teams section</h3>
    
      }
    </Sidebar>
  )
}

export default WrapperTeams