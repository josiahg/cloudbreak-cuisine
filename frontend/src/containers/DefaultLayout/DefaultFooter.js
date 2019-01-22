import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>Cloudbreak Cuisine - <a href="http://hortonworks.com">Hortonworks</a> &copy; 2018</span>
        <span className="ml-auto"><img alt='' src='../../assets/img/cuisine/hwx_logo_30.png' /></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
