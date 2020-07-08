import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";

class Blogs extends Component {
    constructor() {
      super();
  
      this.state = {
        title: "",
        description: "",
        image: "",
        created: Boolean
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidMount = () => {
      axios.get("https://source.unsplash.com/collection/11374518")
      .then(res=> {
        this.setState({image: res.request.responseURL});
        M.updateTextFields();
      })
    }

    handleChange = e => {
      this.setState({[e.target.name] : e.target.value})
    }
  
    handleSubmit = e => {
        e.preventDefault();
        const blog = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            username: this.props.username
        }
  
        axios.post('https://supplyc.herokuapp.com/', null, {params: blog})
        .then(res => {
            this.setState({created: true});
        })
    }
    
    render() {
      const {title, description, image, created} = this.state;
      if(created === true) {
        return <Redirect to={{pathname : "/"}}></Redirect>
      }
      else {
      return(
        <div className="create">
          <h4>Create your blog!</h4>
          <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input id="title" key="title" type="text" name="title" value={title} onChange={this.handleChange} required/>
                <label htmlFor="title">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="image" key="image" type="text" name="image" value={image} onChange={this.handleChange} required/>
                <label class="active" htmlFor="image">Image URL</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea id="description" className="materialize-textarea" key="description" type="text" name="description" value={description} onChange={this.handleChange} required></textarea>
                <label htmlFor="descrption">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                      <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>        
      )
    }
  }
}
  
export default Blogs;
