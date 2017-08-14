import React, { Component } from 'react'

class Post extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    //Form fields
    this.state = {
        type: '',
        category: '',
        title: '',
        description: '',
        price: ''
    };

    //Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ 
        [name]: value
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <form>
                
                <h1>Post</h1>
                <br />

                <label>
                    Post Type:
                    <select name="post_type" value={this.state.type.post_type} onChange={this.handleChange}>
                        <option value="offer_service">Offer service</option>
                        <option value="seek_service">Seek service</option>
                    </select>
                </label>
                <br />

                <label>
                    category:
                    <select name="post_category" value={this.state.category.post_category} onChange={this.handleChange}>
                        <option value="programming">Programming</option>
                        <option value="digital_media">Digital Media</option>
                        <option value="writing">Writing</option>
                    </select>
                </label>
                <br />

                <label>
                    Title:
                    <input name="post_title" value={this.state.title.post_title} onChange={this.handleChange} type="text"></input>
                </label>
                <br />

                <label>
                    Description:
                    <textarea name="post_description" value={this.state.post_description} onChange={this.handleChange} />
                </label>
                <br />

                <label>
                    Price:
                    <input name="job_price" value={this.state.price.job_price} onChange={this.handleChange} type="number"/>
                </label>
                <br />

                <label>
                    Submit:
                    <input type="submit" value="Submit" />
                </label>

            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default Post