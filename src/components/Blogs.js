import React, { Component } from 'react'
import axios from 'axios'
import { NavLink, Route, Switch } from 'react-router-dom';
import moment from 'moment';

import View from "./View"

const DateTime = (props) => {
  let date = new Date(Date.parse(props.time)).toString()
  date = date.split(' ')
  let time = date[4];
 
  if(parseInt(time.substr(0,2)) < 12) 
    time = time.substr(0,5)+" AM"
  else
    time = parseInt(time.substr(0,2))-12+time.substr(2,3)+" PM"
  return <span>{date[1] +" "+ date[2] +", "+ date[3]}, {time}</span>
}

const BlogItem = (props) => {
    const url = "/blogs/"+props._id;

    return(
        <div className="col s12 m4">
          <div className="card small">
            <div className="card-image">
              <img alt="blog" src={props.image}></img>
              <span className="card-title textColor">{props.title}</span>
            </div>
            <div className="card-content truncate">
              {props.description}
            </div>
            <div className="card-action">
              <NavLink to={url} className="btn btn-small waves-effect waves-light">View post</NavLink>
              <div className="cardTime right">
                <div><strong>{props.author.substr(0, props.author.indexOf('@'))}</strong></div>
                <DateTime {...props}/>
              </div>
            </div>
          </div>
        </div>
    );
}
  
class Blogs extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        blogs: [{
          title: "",
          description: "",
          image: "",
          author: "",
          time: "",
          id: ""
        }]
      }
  
    }

    componentDidMount() {

      axios.get('https://supplyc.herokuapp.com/blogs')
      .then(res => {
        const data = res.data;
        const blogs = data.map((blg, ind) => {
          return {
            title: blg.title,
            description: blg.description,
            image: blg.image,
            author: blg.author.username,
            time: blg.createdAt,
            _id: blg._id
          }
        })
        this.setState({blogs: blogs})
      })
    }
  
    render() {
      const blogs = this.state.blogs.map((blg, index) => (
        <BlogItem key={index} title={blg.title} description={blg.description} image={blg.image} author={blg.author} time={blg.time} _id={blg._id}/>
        ))
      return(
        <div className="row">
          <Switch>
            <Route path='/blogs/:id' render = {(props) => <View {...props} username={this.props.username}/>}>
            </Route>
            <Route path={'/'}>
              {this.state.blogs[0].title ?
                blogs :
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
              }
            </Route>
          </Switch>

        </div>
        )
    }
  }
  
export default Blogs;