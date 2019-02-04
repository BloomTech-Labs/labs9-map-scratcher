

//== Profile Page ==============================================================
/*
  [Insert Documentation here]
*/

//-- Dependencies --------------------------------
import Auth from '../services/Authentication/auth';

const auth = new Auth((result) => console.log('auth result', result), client);

const handleAuthentication = (nextState, replace) => {
  if(/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

//-- React Implementation ------------------------
export default class extends Component {

  render() {
    handleAuthentication(props); 
    return (
    <Fragment>
    <p>Authenticating....</p>
    </Fragment>
  );
  }
}
