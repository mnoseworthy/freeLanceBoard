import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

class ContractForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      rteValue: RichTextEditor.createEmptyValue(),
      description: '',
      payout: 0
    }
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  onRteChange(event) {
    this.setState({rteValue:event, description: event.toString('html')})
  }

  onPayoutChange(event){
    this.setState({payout:event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.title.length < 2)
    {
      return alert('Please add a title.')
    }
    if (this.state.rteValue === RichTextEditor.createEmptyValue())
    {
      return alert('You must add a description !')
    }
    if ( this.state.payout <= 0)
    {
      return alert('You must enter a payout, and it must be a number greater than 0.')
    }
    // Save text editor state as a HTML string
    this.props.onContractFormSubmit(this.state)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="title">Job Title</label>
          <input id="title" type="text" value={this.state.title} onChange={this.onTitleChange.bind(this)} placeholder="Title..." />
          <br />

          <label htmlFor="description">Description</label>
          <RichTextEditor id="description" value={this.state.rteValue} onChange={this.onRteChange.bind(this)} />
          <br />

          <label htmlFor="payout">Payment Amount</label>
          <input id="payout" type="number" value={this.state.payout} onChange={this.onPayoutChange.bind(this)} />
          <br />


          <button type="submit" className="pure-button pure-button-primary">Submit</button>
        </fieldset>
      </form>
    )
  }
}

export default ContractForm
