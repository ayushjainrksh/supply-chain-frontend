import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import MDEditor from '@uiw/react-md-editor';

function TextArea() {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <MDEditor height={200} value={value} onChange={setValue} />
    </div>
  );
}
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
      this.handleMD = this.handleMD.bind(this);
    }

    componentDidMount = () => {
      axios.get("https://source.unsplash.com/collection/11374518")
      .then(res=> {
        this.setState({image: res.request.responseURL});
        M.updateTextFields();
      })
    }

    handleChange = e => {
      const blog = {
        title: this.state.title,
        description: this.state.description,
        image: this.state.image,
        username: this.props.username
    }
      this.setState({[e.target.name] : e.target.value})
    }

    handleMD = desc => {
      this.setState({"description": desc})
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
          <h4>Write a blog 
            <i class="small material-icons left">create</i>
          </h4>
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
                  <div className="teal-text">Description</div>
                  <MDEditor height={200} value={description} onChange={this.handleMD} />
                  {/* <textarea id="description" className="materialize-textarea" key="description" type="text" name="description" value={description} onChange={this.handleChange} required></textarea> */}
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
