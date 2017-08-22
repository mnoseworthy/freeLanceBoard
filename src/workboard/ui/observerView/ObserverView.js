import React, { Component } from 'react'

class ObserverView extends Component {
  constructor(props) {
    
    super(props)
    this.state = {
      address: this.props.address
    }
    return false
  }

  componentWillMount(){
    console.log(this.props.address)
    return false
  }

  render() {
    return(
        <p>hi</p>
    )
  }
}

export default ObserverView
