import * as React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  RouteComponentProps
} from 'react-router-dom';
import Login from './component/login';
import AppContainer from './pages/appContainer';
import DataTable from './pages/dataTable/dataTable/app';
import DataTable1 from './pages/dataTable/dataTable1/app';
import DropDown from './pages/reactComponent/dropDown/app';

interface IAppState {
  collapsed?: boolean;
}

class App extends React.Component<{}, IAppState> {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact={true} path="/" component={Login} />
            <Route
              path="/DataTable"
              component={(props: RouteComponentProps<{}>) => <AppContainer {...props}><DataTable {...props} /> </AppContainer>}
            />
            <Route
              path="/DataTable1"
              component={(props: RouteComponentProps<{}>) => <AppContainer {...props}><DataTable1 {...props} /> </AppContainer>}
            />
            <Route
              exact={true}
              path="/DropDown"
              component={(props: RouteComponentProps<{}>) => <AppContainer {...props}><DropDown {...props} /> </AppContainer>}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
