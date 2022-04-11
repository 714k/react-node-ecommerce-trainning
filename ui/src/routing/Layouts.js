import { Route, Switch } from 'react-router-dom';

import { Authorized, UnAuthorized } from '../templates';
import PrivateRoute from './PrivateRoute';
import * as routes from './routes';

function Layouts() {
  return (
    <Switch>
      <Route path={routes.logIn} component={Authorized} />
      <Route path={routes.signUp} component={Authorized} />
      <PrivateRoute path={routes.baseURL} component={UnAuthorized} />
    </Switch>
  );
}

export default Layouts;
