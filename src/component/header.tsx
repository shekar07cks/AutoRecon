import * as React from 'react';
import {
    Alignment,
    Navbar,
    NavbarGroup,
    Popover,
    Menu,
    Position
} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import gs from '../language/common/en';
import { Icon } from './icon';

const headerLogo = require('../assets/images/headerLogo.png');
const ClientLogo = require('../assets/images/clientLogo.png');

interface IHeaderState {
    toggleNav: boolean;
    
}

interface IheaderProps {
    toggleSidenav?: () => void;
}

class Header extends React.Component<IheaderProps, IHeaderState> {
    constructor(props: IheaderProps ) {
        super(props);
        this.state = {
            toggleNav: true,
            
            };
    }

    toggleNav = () => {
        if (this.props.toggleSidenav != null ) {
            this.props.toggleSidenav();
        }
        this.setState({ toggleNav: !this.state.toggleNav });
    }

    render() {
        const profileMenu = (
                <Menu className="profileDropdown">
                    <Link to={''}><Icon icon={['fas', 'user-circle']} />{gs.Profile}</Link>
                    <Link to={'/'}><Icon icon={['fas', 'cog']} />{gs.Settings}</Link>
                    <Link to={'/'}><Icon icon={['fas', 'power-off']} />{gs.Logout}</Link>
                </Menu> 
        );

        return (
            <div>
                <Navbar className="header">
                    <NavbarGroup onClick={this.toggleNav} className="navButton" align={Alignment.LEFT}>
                      <span className={(this.state.toggleNav) ? 'hide' : 'block'}><Icon className="faicon" icon={['fas', 'align-left']} /> </span>
                      <span className={(this.state.toggleNav) ? 'block' : 'hide'}><Icon className="faicon" icon={['fas', 'bars']} /></span>
                    </NavbarGroup>
                    <div className="headerLogo">
                        <img
                            src={headerLogo}
                            alt="autorecon logo"
                        />
                    </div>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <div className="clientLogo">
                            <img
                                src={ClientLogo}
                                alt="Client logo"
                            />
                        </div>
                        <Popover content={profileMenu}  position={Position.BOTTOM}>
                            <span className="verticalMiddle profileIcon">
                            <Icon className="faicon" size={'2x'} icon={['fas', 'user-circle']} />
                            <Icon className="faicon m-l-5" icon={['fas', 'angle-down']} />
                            </span>
                        </Popover>
                    </NavbarGroup>
                </Navbar>
            </div>
        );
    }
}

export default Header;