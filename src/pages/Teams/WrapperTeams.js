import React from 'react'

import GETTeams from './GETTeams'
import POSTTeam from './POSTTeam'
import UPDATETeam from './UPDATETeam'
import DELETETeam from './DELETETeam'

import Sidebar from '../../components/Sidebar'

const WrapperTeams = () => {
  return (
    <Sidebar>
      <GETTeams/>
      <POSTTeam/>
      <UPDATETeam/>
      <DELETETeam/>
    </Sidebar>
  )
}

export default WrapperTeams