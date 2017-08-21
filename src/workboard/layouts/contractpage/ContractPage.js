/*
*
*/
import React, { Component } from 'react'
import store from '../../../store'


class Workboard extends Component {

  componentDidMount(){
    console.log(store.getState())
  }
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Contract</h1>
            <p>This page displays information about a contract clicked in the contractTable</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Workboard
