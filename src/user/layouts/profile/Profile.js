import React, { Component } from 'react'
import ProfileFormContainer from '../../ui/profileform/ProfileFormContainer'
import ContractTableContainer from '../../../workboard/ui/contracttable/ContractTableContainer'

class Profile extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p>Edit your account details here.</p>
            <ProfileFormContainer />

            <br />
            <ContractTableContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
