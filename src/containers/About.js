import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export const About = (props) => {
  return <div>About</div>;
};

About.propTypes = {
  second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(About);
