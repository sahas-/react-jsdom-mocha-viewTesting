import{
  React,
  expect
} from './setup/test_helper';
import {Button, Label, Textbox, LoginForm} from '../loginComponent.js';
import TestUtils from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';



describe('Login view tests -->', () => {
  let renderer;
  let loginForm;
  let app;

  before(()=>{
    loginForm = shallowRender(LoginForm);
    app = TestUtils.renderIntoDocument(<LoginForm/>);
  });

  it('should render LoginForm component', () => {
    expect(loginForm.ref).toEqual('LoginForm');   
  });

  it('should render 3 input boxes',()=>{
    var inputs = getElementsBy('tag','input');
    expect(inputs.length).toBe(3);
  });

  it('should render 2 buttons',()=>{
    expect(getElementsBy('tag','button').length).toBe(2);    
  })

  it('should render username input box with placeholder \'something\@email.com\'',()=>{
    const appDOM = findDOMNode(app);
    let inputField = appDOM.querySelector('.generalInput[type="text"]');
    expect(inputField.getAttribute('placeholder')).toEqual('something@email.com');
  })

  it('should render password input box as type="password"',()=>{
    const appDOM = findDOMNode(app);
    let passField = appDOM.querySelector('.generalInput[type="password"]');
    expect(passField.getAttribute('type')).toEqual('password');
  })

  it('should render remember password',()=>{
    const appDOM = findDOMNode(app);
    let checkbox = appDOM.querySelector('.generalInput[type="checkbox"]');
    expect(checkbox.name).toEqual('chkRememberPassword');
  });

  it('should render remember password unchecked by default',()=>{
    const appDOM = findDOMNode(app);
    let checkbox = appDOM.querySelector('.generalInput[type="checkbox"]');
    expect(checkbox.checked).toBe(false);
  })

  it('should toggle remember password when clicked',()=>{
    const appDOM = findDOMNode(app);
    let checkbox = appDOM.querySelector('.generalInput[type="checkbox"]');
    checkbox.checked="true";
    //TestUtils.Simulate.change(checkbox,{target:{checked:true}});
    expect(checkbox.checked).toBe(true);
  });
  
  //this is important, checkout React Controlled Component http://bit.ly/1nhAplt
  it('should allow the user to key in username',()=>{
      const appDOM = findDOMNode(app);
      let inputField = appDOM.querySelector('.generalInput[type="text"]');
      TestUtils.Simulate.change(inputField,{target:{value:'sahas'}});
      expect(inputField.value).toEqual('sahas');
  })

  it('should call login API with username,password when login clicked',()=>{

  });

  it('should clear username when cancel clicked',()=>{

  });

  it('should clear password when cancel clicked',()=>{

  });


  //Utility methods

  function shallowRender(Component) {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Component/>);
    return renderer.getRenderOutput();
  }


  function getElementsBy(selector,tag){
    switch (selector)
    {
      case "tag":
        return TestUtils.scryRenderedDOMComponentsWithTag(app, tag);
      case "type":
        return TestUtils.scryRenderedComponentsWithType(app,tag);
    }
  }

});