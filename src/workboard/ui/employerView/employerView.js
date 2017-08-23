import React, { Component } from 'react'

class EmployerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.address
    }
  }


  render() {
    return(
        <p>Employer</p>
    )
  }
}

export default EmployerView
