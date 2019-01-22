import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/long_logo.png'
import sygnet from '../../assets/img/brand/small_logo.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand className="bg-dark"
          full={{ src: logo, width: 180, height: 45, alt: 'Cuisine Logo' }}
          minimized={{ src: sygnet, width: 45, height: 45, alt: 'Cuisine Logo' }}
        ></AppNavbarBrand>

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/1.png'} className="img-avatar" alt="admin@bootstrapmaster.com" /> admin@hortonworks.com &nbsp; &nbsp;
            </DropdownToggle>
            <DropdownMenu style={{ right: 'auto' }}>
              <DropdownItem href="#/profiles"><i className="fa fa-cloud"></i> Profiles</DropdownItem>
              <DropdownItem href="#/users/1"><i className="fa fa-user"></i> User Details</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
