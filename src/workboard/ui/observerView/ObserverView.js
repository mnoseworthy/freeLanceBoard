import React, { Component } from 'react'

class ObserverView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.address
    }
  }

  componentWillMount(){
    console.log(this.props.address)
    return false
  }

  render() {
    return(
        <p>Observer</p>
    )
  }
}

export default ObserverView
