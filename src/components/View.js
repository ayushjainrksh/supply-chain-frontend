import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'

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

const CommentItem = (props) => {
    return(
        <div className="card-panel comment">
            <strong>{props.author.substr(0, props.author.indexOf('@'))}</strong>
            <span id="comTime">
            <DateTime {...props}/>
            </span>
            <div id="comText">{props.text}</div>
        </div>
    )
}

class View extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            title: "",
            description: "",
            image: "",
            author: "",
            time: "",
            comments: [{
                text: "",
                time: "",
                author: ""
            }]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value})
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const comment = {
            text: this.state.text,
            username: this.props.username
        }

        axios.post('https://supplyc.herokuapp.com/blogs/'+this.props.match.params.id, null, {params: comment})
        .then(res => {
            this.setState({text: ""})
            this.componentDidMount();
        })
    }
      
    componentDidMount() {
        axios.get('https://supplyc.herokuapp.com/blogs/'+this.props.match.params.id)
      .then(res => {
        const data = res.data;
        const comments = data.comments.map((com, ind) => {
            return {
                text: com.text,
                time: com.createdAt,
                author: com.author.username
            }
        })
        const blog = {
            title: data.title,
            description: data.description,
            image: data.image,
            author: data.author.username,
            time: data.createdAt,
            _id: data._id
        }
        this.setState({...blog, comments})
      })
    }
    
    render() {
        const comments = this.state.comments.map((com, index) => (
            <CommentItem key={index} text={com.text} time={com.time} author={com.author}/>
            ))
        const {text} = this.state;
        return(
            <div>
                {this.state.title ?
                <div className="row">
                    <div className="col s12 m8">
                        <div className="card large viewCard">
                            <div className="card-image viewCardImage">
                                <img alt="Blog" src={this.state.image}/>
                            </div>
                                <div className="cardTitle">
                                    <span className="card-title">{this.state.title}</span>
                                </div>
                                <div className="cardAuthor">
                                    <div><strong>{this.state.author.substr(0, this.state.author.indexOf('@'))}</strong></div>
                                    <div className="cardTime">
                                        <DateTime {...this.state}/>
                                     </div>
                                </div>
                            <div className="card-content">
                                {this.state.description}
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="row">
                            <div className="col s12">
                                <h5>Comments</h5>
                            </div>
                            <form className="col s12" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s8">
                                        <input id="text" key="text" type="text" name="text" value={text} onChange={this.handleChange} required/>
                                        <label htmlFor="text">Add a comment</label>
                                    </div>
                                    <div className="input-field col s4 right">
                                        {this.props.username != null ?
                                            <button style={{"marginTop":"10px"}} className="btn-small waves-effect waves-light" type="submit" name="action">
                                                <i className="material-icons">send</i>
                                            </button>
                                            :
                                            <div>
                                            <button style={{"marginTop":"10px"}} className="btn-small waves-effect waves-light" type="submit" name="action" disabled>
                                                <i className="material-icons">send</i>
                                            </button>
                                            <div className="red-text">
                                                Login to comment on this post.
                                            </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </form>
                            <div className="col s12">
                                {comments}
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
                }
            </div>
        )
    }
}

export default View;