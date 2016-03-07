import Dispatcher from '../dispatcher/AppDispatcher'
import Constants  from '../constants/AppConstants'

export default {

  login(cred) {
    Dispatcher.dispatch({
      actionType: Constants.LOGIN,
      creds: {
        username:cred.username,
        password: cred.password
        }
    });
  }
}