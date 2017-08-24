import React, { Component } from 'react'

class ReviewerView extends Component {
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
        <p>Reviewer</p>
    )
  }
}

export default ReviewerView
