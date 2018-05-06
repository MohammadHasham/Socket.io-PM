
import ChatBox from "./components/ChatBox"

import React from 'react';
import io from 'socket.io-client';
import './App.css';
const socket = io.connect('http://localhost:5000');


class Chat extends React.Component {
	constructor(props){
		super(props);
		this.state={id:"",text:"",username:"",arr:[],text:"",allData:[],input:true}

	}

	componentWillMount(){
		socket.on('connect',()=>{
			let id = socket.id.toString();
			this.setState({id})
			});
			socket.on('updates',function(data){
				this.updateList(data);
			}.bind(this))
			socket.on('reply',function(data){
				this.setState({allData:[...this.state.allData,data]})
			}.bind(this));


	}

	updateList = (data)=>{
		this.setState({arr:[...data]})
	}
	submitSocket = ()=>{
		 let {username,id} = this.state;
		 this.setState({input:false})
			let obj = {username,id}
			socket.emit('socketData',obj)
	}

	getUser =(id)=>{
		socket.emit('sendMessage',{identity:this.state.id,id,msg:this.state.text});
	}


renderList = () =>{
	if(this.state.arr.length < 1) return <h1 className="text-center">No users online!</h1>
	return this.state.arr.filter(item=> item.username !== this.state.username).map(item=>{
		return(
		 <div>
		 <li>
		 {item.username}
		 <span>
		 <ChatBox item={item} data={this.state.allData} getUser={(id)=>this.getUser(id)}  setText={(text)=>this.setState({text})}/>
		 </span>
		 </li>
		 </div>
	 )
 });
}

	render(){
		if(!this.state.input){
			return (
				<div className="row">

		 <div className="col-md-4">
				 {this.renderList()}
			</div>
		 </div>
			)
		}
		return (
			<div className="container-fluid">
			<input type="text" placeholder="Enter Username" className="form-control" onChange={(e)=>this.setState({username:e.target.value})}/>
				<button className="btn btn-primary" onClick={this.submitSocket} >Signup</button>
				 <div className="row">
			<div className="col-md-4">
			 		{this.renderList()}
		   </div>
			</div>
		</div>
		)
	}
}

export default Chat;
