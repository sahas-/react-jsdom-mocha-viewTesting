import React from 'react';


export class Label extends React.Component {
  render() {
    return <span>{this.props.name}</span>;
  }
}

export class Button extends React.Component {
  render() {

    return  <button 
            type="button"
            name={this.props.name}>
              {this.props.name}
            </button>;
           
  }
}

export class Textbox extends React.Component{
  constructor(props){
    super();
    this.state={
      txtValue:''
    }
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
  render(){
    return (
      <div ref="LoginForm">
        <div>
          <Label name="User name"/>
          <Textbox ref="txtUsername" placeholder="something@email.com" type="text" />
        </div>
        <div>
          <Label name="Password"/>
          <Textbox ref="txtPassword" placeholder="password here" type="password"/>
        </div>
        <div>
          <label>
            <input name="chkRememberPassword" className="generalInput" type="checkbox"/> 
              Remember password
          </label>
        </div>
        <Button ref="btnLogin" name="Login"/>
        <Button ref="btnCancel" name="Cancel"/>
      </div>);

  }
}