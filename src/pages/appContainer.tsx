import * as React from 'react';
import Sidebar from '../../src/component/sidebar';
import Header from '../../src/component/header';
import Footer from '../../src/component/footer';
import { RouteComponentProps } from 'react-router';
import { FocusStyleManager } from '@blueprintjs/core';

interface IAppContainerState {
    sideNavcollapsed: boolean;
}

interface IAppContainerProps extends RouteComponentProps<{ }> {
    
}

FocusStyleManager.onlyShowFocusOnTabs();

class AppContainer extends React.Component <IAppContainerProps, IAppContainerState > {
    private sidebarInstance: Sidebar;

    constructor(props: IAppContainerProps) {
        super(props);
        this.state = {
            sideNavcollapsed: false
        };
    }
    
    toggleNav = () => {
        this.sidebarInstance.ToggleNav();
        this.setState({ sideNavcollapsed: !this.state.sideNavcollapsed });
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <Header toggleSidenav={this.toggleNav}/>
                <div className="pageContainer">
                    <Sidebar ref={(r) => this.sidebarInstance = r} {...this.props}/>
                    <div className={this.state.sideNavcollapsed ? 'mainContainer sideNavOpen container-fluid' : 'mainContainer container-fluid'}>
                        {this.props.children}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default AppContainer;