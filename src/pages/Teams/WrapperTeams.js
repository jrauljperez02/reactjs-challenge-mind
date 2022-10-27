import React from 'react'

import GETTeams from './GETTeams'
import POSTTeam from './POSTTeam'
import UPDATETeam from './UPDATETeam'
import DELETETeam from './DELETETeam'

const WrapperTeams = () => {
  return (
    <div>
      <GETTeams/>
      <POSTTeam/>
      <UPDATETeam/>
      <DELETETeam/>
    </div>
  )
}

export default WrapperTeams