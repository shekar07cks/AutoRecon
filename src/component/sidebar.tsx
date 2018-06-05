import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import g from '../language/sidebar/en';
import { Icon } from './icon';

interface ISidebarState {
  collapsed?: boolean;
}

interface ISidebarProps extends RouteComponentProps<{}> {
  ref?: (r: Sidebar) => void;
}

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  ToggleNav = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  ToggleSubMenu = () => {
    // this.setState({ collapsed: false });
  }

  constructor(props: ISidebarProps) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  render() {
    return (
      <div id="sidenav" className={!this.state.collapsed ? 'sideNav left' : 'sideNav left collapseNavBar'}>
        <ul className="list-sidebar">
          <li>
            <a
              href="#"
              data-toggle="collapse"
              data-target="#DataTable"
              onClick={this.ToggleSubMenu}
              className={(this.props.match.url === '/DataTable' || this.props.match.url === '/DataTable1') ? ' active activeTab' : ' collapsed '}
            >
              <Icon className="sideBarIcons" icon={['fas', 'dollar-sign']} />
              <span className="nav-label">{g.DataTable}
                <span className="pull-right p-r-10"><Icon icon={['fas', 'angle-down']} /><Icon icon={['fas', 'angle-right']} /></span>
              </span>
            </a>
            <ul
              className={(this.props.match.url === '/DataTable' || this.props.match.url === '/DataTable1' ) ? 'sub-menu collapse show' : 'sub-menu collapse'}
              id="DataTable"
            >
              <li>
                <Link className={(this.props.match.url === '/DataTable') ? 'active' : ' '} to={`/DataTable`}><Icon className="sideBarIcons" icon={['fas', 'tachometer-alt']} />
                  <span className="nav-label">{g.DataTable}</span>
                </Link>
              </li>
              <li>
                <Link className={(this.props.match.url === '/DataTable1') ? 'active' : ' '} to={`/DataTable1`}><Icon className="sideBarIcons" icon={['fas', 'briefcase']} />
                  <span className="nav-label">{g.DataTableWithActions}</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#"
              data-toggle="collapse"
              data-target="#React"
              onClick={this.ToggleSubMenu}
              className={(this.props.match.url === '/DropDown') ? ' active activeTab' : ' collapsed '}
            >
              <Icon className="sideBarIcons" icon={['fas', 'underline']} />
              <span className="nav-label">{g.React}
                <span className="pull-right p-r-10"><Icon icon={['fas', 'angle-down']} /><Icon icon={['fas', 'angle-right']} /></span>
              </span>
            </a>
            <ul
              className={(this.props.match.url === '/DropDown') ? 'sub-menu collapse show' : 'sub-menu collapse'}
              id="React"
            >
              <li>
                <Link className={(this.props.match.url === '/DropDown') ? 'active' : ' '} to={`/DropDown`}><Icon className="sideBarIcons" icon={['fas', 'tachometer-alt']} />
                  <span className="nav-label">DropDown</span>
                </Link>
              </li>
              <li>
                <Link className={(this.props.match.url === '/UpiGLBalance') ? 'active' : ' '} to={`/UpiGLBalance`}><Icon className="sideBarIcons" icon={['fas', 'money-bill-alt']} />
                  <span className="nav-label">{g.React}</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;