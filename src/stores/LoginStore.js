import Dispatcher from '../dispatcher/AppDispatcher'
import LoginConstants from '../constants/AppConstants'
import events from 'events'
import promise from 'promise'

let EventEmitter = events.EventEmitter
let CHANGE_EVENT = "change";
var _loginResult = false;
var _status=null;

var LoginStore = Object.assign({}, EventEmitter.prototype, {

  getResult() {
    let _temp = _loginResult;
    _loginResult = false;
    return _temp;
  },
  getStatus(){
    return _status;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  _login(user, pass){
    return new promise((fulfill, reject)=>{
      setTimeout(()=>{
        (user === 'sahas' && pass === 'password')?fulfill():reject();}, 3000);
    })
  },
  _updateStatus(status){
    _status = status;
    _loginResult=(_status==="SUCCESS")?true:false;
    this.emitChange();
  }
});


Dispatcher.register(action => {
  var cred;
  switch (action.actionType) {
    case LoginConstants.LOGIN:
      _status = "WIP";
      LoginStore.emitChange();

      LoginStore._login(action.creds.username,action.creds.password)
      .then(()=>{
        LoginStore._updateStatus("SUCCESS");
      },(error)=>{
        LoginStore._updateStatus("ERROR");
      });
      break;

    default:
      // no op
  }
});


export default LoginStore