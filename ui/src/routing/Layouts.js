import { Redirect, Route, Switch } from 'react-router-dom';

import { Authorized, UnAuthorized } from '../templates';
import PrivateRoute from './PrivateRoute';
import * as routes from './routes';

function Layouts() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/app" component={Authorized} />
      <Route path="/auth" component={UnAuthorized} />
      <PrivateRoute path="/app" component={UnAuthorized} />
      {/* <Route path="/" component={NotFound} /> */}
    </Switch>
  );
}

export default Layouts;
