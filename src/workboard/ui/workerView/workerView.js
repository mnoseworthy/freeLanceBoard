import React, { Component } from 'react'

class WorkerView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.address
    }
  }


  render() {
    return(
        <p>hi</p>
    )
  }
}

export default WorkerView
