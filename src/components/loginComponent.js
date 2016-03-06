import React from 'react';
import LoginActions from '../actions/LoginActions'
import LoginStore from '../stores/LoginStore'


export class Label extends React.Component {
  render() {
    return <span>{this.props.name}</span>;
  }
}

export class Button extends React.Component {
  render() {

    return  <button 
              type="button"
              name={this.props.name}
              className="generalButton"
              onClick={this.props.onClick}>
                {this.props.name}
            </button>;
           
  }
}

export class Textbox extends React.Component{
  constructor(props){
    super();
    this.state={
      txtValue:props.value
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      txtValue: nextProps.value
    });
  }
  handleChange(event){
    this.setState({txtValue:event.target.value});
  }
  render(){
    return (<div>
            <input
              className="generalInput"
              type={this.props.type}
              value={this.state.txtValue} 
              placeholder={this.props.placeholder}
              onChange = {this.handleChange.bind(this)}/>
            </div>);
  }
}

export class LoginForm extends React.Component {
  constructor(){
    super();
    this.state={
      username:'',
      password:'',
      status:null
    };
  }
  componentDidMount() {

    LoginStore.addChangeListener(this._onChange.bind(this));
  }  
  render(){
    return (
      <div ref="LoginForm">
        <div>
          <Label name="User name"/>
          <Textbox ref="txtUsername" 
            placeholder="something@email.com" 
            type="text" 
            value= {this.state.username} />
        </div>
        <div>
          <Label name="Password"/>
          <Textbox ref="txtPassword" 
            placeholder="password here" 
            type="password"
            value={this.state.password} />
        </div>
        <div>
          <label>
            <input name="chkRememberPassword" className="generalInput" type="checkbox"/> 
              Remember password
          </label>
        </div>
        <Button ref="btnLogin" 
          name="Login" 
          onClick={this._handleLogin.bind(this)}/>           
        <Button ref="btnCancel" 
          name="Cancel" 
          onClick={this._handleCancel.bind(this)}/>
        <div>
          <h4 ref="notification" 
              className="notification">{this.state.status}</h4>
        </div>
      </div>);
  }
  //private accessor methods  
  _handleLogin(){
    LoginActions.login({
      username:this.refs.txtUsername.state.txtValue,
      password:this.refs.txtPassword.state.txtValue
    })
  }
  _handleCancel(){
    this.setState({
        username:'',
        password:''
      });
  }
  _getStatus(){

    return LoginStore.getStatus();
  }
  _onChange(){
    this.setState({
      status:this._getStatus()
    });
  }
}