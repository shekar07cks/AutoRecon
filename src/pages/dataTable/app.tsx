import * as React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    RouteComponentProps,
} from 'react-router-dom';
import DataTable from './dataTable';

interface IReaderAppState {
}
interface IReaderAppProps extends RouteComponentProps<{}> {
}

class App extends React.Component<IReaderAppProps, IReaderAppState> {
    constructor(props: IReaderAppProps) {
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
                    {/* <Route
                        exact={true}
                        path={`${this.props.match.url}/Reconciled`}
                        component={NostroReconciled}
                    /> */}
                </Switch>
            </ Router>
        );
    }
}

export default App;