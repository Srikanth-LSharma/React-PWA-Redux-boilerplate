/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export const Contact = (props) => {
  return <div>Contact</div>;
};

Contact.propTypes = {
  second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
