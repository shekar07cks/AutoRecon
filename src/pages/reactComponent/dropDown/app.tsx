import * as React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    RouteComponentProps,
} from 'react-router-dom';
import DropDown from './dropDown';

interface IDropDownAppState {
}
interface IDeopDownAppProps extends RouteComponentProps<{}> {
}

class App extends React.Component<IDeopDownAppProps, IDropDownAppState> {
    constructor(props: IDeopDownAppProps) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>                    
                    <Route
                        exact={true}
                        path={`${this.props.match.url}`}
                        component={(props: RouteComponentProps<{}>) => <DropDown {...props} />}
                    />
                </Switch>
            </ Router>
        );
    }
}

export default App;