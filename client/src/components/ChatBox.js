import React,{Component} from "react";
import css from "../styles/ChatBox.css";
class ChatBox extends Component{
  constructor(props){
    super(props);
    this.state = {close: false,ownData:[],text:""}
  }
  componentWillMount(){
    console.log("i am here")
  }
  renderChat = () =>{
		return this.props.data.map((item)=>{
      if(this.props.item.username == item.username)
			return <li><span>{item.username}</span>:<span>{item.msg}</span></li>
		});
	}
  setText = (e) =>{
    this.props.setText(e.target.value);
    this.setState({text:e.target.value})
  }
  submitData = ()=>{
    if(this.props.grpUser){
      this.props.grpUser(this.props.item)
      this.setState({ownData:[...this.state.ownData,this.state.text]})
        return;
    }
    this.props.getUser(this.props.item.id);
    this.setState({ownData:[...this.state.ownData,this.state.text]})
  }
  ownData = () =>{
    return this.state.ownData.map((item)=> <li>{"Me"+":  "+item}</li>);
  }
  render(){
    console.log(this.props.data);
    return(
      <div style={this.state.close ? {height:"auto"}:{height:"25px"}}>
      <button className="btn btn-primary btn-sm" onClick={()=>this.setState({close:!this.state.close})}>{this.state.close ? "Close":"Chat"}</button>
      <div className={this.state.close ? "translate-yes":"translate-no"}>
      <div className="container-fluid chat-box" className={this.state.translate ? "container-fluid chat-box translate-yes ":"container-fluid chat-box translate-no "} >
    <div className="my-msg">
    <ul>{this.ownData()}</ul>
    </div>
    <div className="other-msg">
    <ul>{this.renderChat()}</ul>
    </div>
    <div className="row textbar">
      <div className="col-md-10 col-sm-10">
        <input type="text" className="form-control msginput " onChange={this.setText}/>
      </div>
      <div className="col-md-2 col-sm-2">
        <button className="btn btn-primary submit" onClick={this.submitData}>Submit</button>
      </div>
    </div>
      </div>
      </div>
      </div>
    )
  }
}
export default ChatBox;
