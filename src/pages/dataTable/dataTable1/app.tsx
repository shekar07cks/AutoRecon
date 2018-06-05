import * as React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    RouteComponentProps,
} from 'react-router-dom';
import DataTable from './dataTable';

interface IDataTableAppState {
}
interface IDataTableAppProps extends RouteComponentProps<{}> {
}

class App extends React.Component<IDataTableAppProps, IDataTableAppState> {
    constructor(props: IDataTableAppProps) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>                    
                    <Route
                        exact={true}
                        path={`${this.props.match.url}`}
                        component={(props: RouteComponentProps<{}>) => <DataTable {...props} />}
                    />
                </Switch>
            </ Router>
        );
    }
}

export default App;